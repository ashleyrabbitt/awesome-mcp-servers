// Run against an isolated in-memory PostgreSQL database, never production.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const {PGlite}=await import(process.env.PGLITE_MODULE||'@electric-sql/pglite');
const db=new PGlite();
try{
 await db.exec('create role anon;create role authenticated;create role service_role bypassrls;');
 for(const f of ['submissions-schema.sql','catalog-schema.sql','business-schema.sql','discovery-schema.sql'])await db.exec(await readFile(new URL('../db/'+f,import.meta.url),'utf8'));
 const q=(s,a=[])=>db.query(s,a),one=async(s,a)=>(await q(s,a)).rows[0];
 const tid='test-tool',rid='11111111-1111-4111-8111-111111111111',pending='22222222-2222-4222-8222-222222222222';
 await q('insert into superpowers_tools(id,data) values($1,$2)',[tid,{id:tid,name:'Isolated tool',status:'Documentation reviewed',roles:[],pricing_model:'Paid',trial_available:true}]);
 for(const [id,status]of [[rid,'published'],[pending,'pending']])await q("insert into superpowers_requests(id,email,kind,title,body,status) values($1,'private@example.invalid','request','A synthetic public question','Synthetic task context used only for isolated validation.',$2)",[id,status]);
 await q("insert into superpowers_votes(request_id,email) values($1,'private-voter@example.invalid')",[rid]);
 await assert.rejects(()=>q("insert into superpowers_votes(request_id,email) values($1,'private-voter@example.invalid')",[rid]),/unique/);
 const offer={title:'Isolated approved offer',terms:'Only synthetic data for an isolated PostgreSQL check.'};
 for(const [status,starts,ends]of [['published',-1,1],['published',-3,-1],['published',1,2],['draft',-1,1]])await q("insert into superpowers_deals(tool_id,title,terms,url,source_url,relationship,approval_note,starts_at,ends_at,status) values($1,$2,$3,'https://example.invalid/offer','https://example.invalid/terms','affiliate','PRIVATE APPROVAL EVIDENCE',now()+$4*interval '1 day',now()+$5*interval '1 day',$6)",[tid,offer.title,offer.terms,starts,ends,status]);
 let result=(await one('select superpowers_discovery_public() as data')).data;
 assert.equal(result.requests.length,1);assert.equal(result.requests[0].votes,1);assert.equal(result.deals.length,1);assert.equal(result.popular.length,0);assert.ok(!JSON.stringify(result).includes('private'));assert.ok(!JSON.stringify(result).includes('PRIVATE APPROVAL'));
 await q("insert into superpowers_metrics(day,tool_id,kind,count) values(current_date,$1,'tool_click',10)",[tid]);
 assert.equal((await one('select superpowers_discovery_public() as data')).data.popular.length,0);
 await q("insert into superpowers_metrics(day,tool_id,kind,count) values(current_date-1,$1,'tool_click',1),(current_date-2,$1,'tool_click',1),(current_date,$1,'featured_click',500)",[tid]);
 result=(await one('select superpowers_discovery_public() as data')).data;assert.equal(result.popular[0].clicks,12);assert.equal(result.popular[0].active_days,3);
 assert.equal((await one("select superpowers_search_v2(pricing_filter=>'Free trial')->>'total' as n")).n,'1');
 assert.equal((await one("select superpowers_search_v2(pricing_filter=>'Free')->>'total' as n")).n,'0');
 for(const t of ['libraries','requests','votes','answers','deals'])for(const role of ['anon','authenticated']){assert.equal((await one('select has_table_privilege($1,$2,\'select\') as ok',[role,'superpowers_'+t])).ok,false);assert.equal((await one('select relrowsecurity as ok from pg_class where oid=$1::regclass',['superpowers_'+t])).ok,true);}
 for(const role of ['anon','authenticated'])assert.equal((await one("select has_function_privilege($1,'superpowers_discovery_public()','execute') as ok",[role])).ok,false);
 await q("insert into superpowers_libraries(email,collections,version) values('one@example.invalid','[]',1),('two@example.invalid','[]',1)");
 const changed=await q("update superpowers_libraries set version=2 where email='one@example.invalid' and version=1 returning email");assert.equal(changed.rows.length,1);
 assert.equal((await q("update superpowers_libraries set version=3 where email='one@example.invalid' and version=1 returning email")).rows.length,0);
 assert.equal((await one("select version from superpowers_libraries where email='two@example.invalid'")).version,1);
 console.log('Discovery PostgreSQL checks passed: private grants/RLS, public field projection, pending moderation, unique votes, automatic offer windows, popularity thresholds, paid trial filters and optimistic account updates.');
}finally{await db.close();}
