// Isolated PostgreSQL verification; no production connection or customer data.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const {PGlite}=await import(process.env.PGLITE_MODULE||'@electric-sql/pglite');
const db=new PGlite(),q=(s,v=[])=>db.query(s,v),one=async(s,v)=>(await q(s,v)).rows[0];
try{
 await db.exec('create role anon;create role authenticated;create role service_role bypassrls;');
 for(const name of ['submissions-schema.sql','catalog-schema.sql','business-schema.sql','discovery-schema.sql','useful-work-schema.sql'])await db.exec(await readFile(new URL('../db/'+name,import.meta.url),'utf8'));
 for(const table of ['public_kits','preferences','tool_reports','tool_events','digest_outbox']){
  assert.equal((await one('select relrowsecurity as enabled from pg_class where oid=$1::regclass',['superpowers_'+table])).enabled,true);
  for(const role of ['anon','authenticated'])assert.equal((await one("select has_table_privilege($1,$2,'select,insert,update,delete') as allowed",[role,'superpowers_'+table])).allowed,false);
 }
 for(const fn of ['superpowers_queue_digest(text,integer,timestamptz,jsonb)','superpowers_claim_digests()','superpowers_unsubscribe_digest(text)'])for(const role of ['anon','authenticated'])assert.equal((await one("select has_function_privilege($1,$2,'execute') as allowed",[role,fn])).allowed,false);
 const tool={id:'qa-tool',name:'Example',description:'Synthetic tool only',url:'https://example.invalid',type:'AI apps',category:'Writing',roles:[],pricing:'Unknown'};
 await q('insert into superpowers_tools(id,data,published,editorial_order) values($1,$2,true,1)',[tool.id,tool]);
 await q("update superpowers_tools set data=data || '{\"directory_updated_at\":\"2026-10-18\"}'::jsonb where id=$1",[tool.id]);
 assert.equal((await one('select count(*)::int n from superpowers_tool_events')).n,0);
 await q("update superpowers_tools set data=data || '{\"pricing\":\"Free tier with limits\",\"pricing_model\":\"Freemium\",\"pricing_source\":\"https://example.invalid/pricing\",\"pricing_checked_at\":\"2026-10-18\"}'::jsonb where id=$1",[tool.id]);
 assert.equal((await one('select count(*)::int n from superpowers_tool_events')).n,1);
 await q("insert into superpowers_preferences(email,unsubscribe_token,digest_enabled,next_digest_at,last_digest_at) values('one@example.invalid',$1,true,now()-interval '1 hour',now()-interval '8 days')",['a'.repeat(64)]);
 const pref=await one("select * from superpowers_preferences where email='one@example.invalid'");
 const payload={items:[{id:tool.id,name:'Example',summary:'Reviewed update',date:'2026-10-18'}],token:'a'.repeat(64),cutoff:new Date(Date.now()-60000).toISOString()};
 const args=[pref.email,pref.version,pref.next_digest_at,payload];
 assert.equal((await one('select superpowers_queue_digest($1,$2,$3,$4) as ok',args)).ok,true);
 assert.equal(new Date((await one('select last_digest_at from superpowers_preferences where email=$1',[pref.email])).last_digest_at).toISOString(),payload.cutoff);
 assert.equal((await one('select superpowers_queue_digest($1,$2,$3,$4) as ok',args)).ok,false);
 assert.equal((await one('select count(*)::int n from superpowers_digest_outbox')).n,1);
 let claimed=(await q('select * from superpowers_claim_digests()')).rows;assert.equal(claimed.length,1);assert.equal(claimed[0].attempts,1);assert.ok(claimed[0].lease_token);
 assert.equal((await q('select * from superpowers_claim_digests()')).rows.length,0);
 await q("update superpowers_digest_outbox set lease_until=now()-interval '1 second'");
 claimed=(await q('select * from superpowers_claim_digests()')).rows;assert.equal(claimed[0].attempts,2);assert.deepEqual(claimed[0].payload,payload);
 await q('select superpowers_unsubscribe_digest($1)',['b'.repeat(64)]);assert.equal((await one("select digest_enabled from superpowers_preferences where email=$1",[pref.email])).digest_enabled,true);
 await q('select superpowers_unsubscribe_digest($1)',['a'.repeat(64)]);assert.equal((await one("select digest_enabled from superpowers_preferences where email=$1",[pref.email])).digest_enabled,false);assert.equal((await one('select status from superpowers_digest_outbox')).status,'cancelled');
 await q("update superpowers_preferences set digest_enabled=true,next_digest_at=now()-interval '1 hour',version=version+1 where email=$1",[pref.email]);
 const next=await one('select * from superpowers_preferences where email=$1',[pref.email]);
 assert.equal((await one('select superpowers_queue_digest($1,$2,$3,$4) as ok',[next.email,next.version,next.next_digest_at,payload])).ok,true);
 await q("update superpowers_digest_outbox set created_at=now()-interval '24 hours' where status='pending'");
 assert.equal((await q('select * from superpowers_claim_digests()')).rows.length,0);assert.equal((await one("select count(*)::int n from superpowers_digest_outbox where status='review'")).n,1);
 await q("insert into superpowers_public_kits(email,title,description,tool_ids) values('one@example.invalid','Example kit','Synthetic test description only','[\"qa-tool\"]')");
 assert.equal((await q("update superpowers_public_kits set status='revoked' where email='two@example.invalid' returning id")).rows.length,0);
 console.log('Useful-work PostgreSQL checks passed: private grants/RLS, reviewed change events, atomic queueing, replay prevention, leases, retry bounds, unsubscribe cancellation and kit ownership filters.');
}finally{await db.close();}
