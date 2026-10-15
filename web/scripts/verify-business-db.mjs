// Isolated PostgreSQL checks. PGLITE_MODULE points to an installed @electric-sql/pglite module.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const {PGlite}=await import(process.env.PGLITE_MODULE||'@electric-sql/pglite');
const db=new PGlite();
try{
 await db.exec('create role anon;create role authenticated;create role service_role bypassrls;');
 for(const f of ['submissions-schema.sql','catalog-schema.sql','business-schema.sql'])await db.exec(await readFile(new URL('../db/'+f,import.meta.url),'utf8'));
 const q=(s,a=[])=>db.query(s,a),one=async(s,a)=>(await q(s,a)).rows[0];
 const sid='11111111-1111-4111-8111-111111111111',tool={id:'test-tool',name:'Test Tool',url:'https://example.invalid/tool',description:'A synthetic tool for isolated database checks.',status:'Documentation reviewed',tested:false,pricing_model:'Free',roles:[]};
 await q("insert into superpowers_submissions(id,kind,name,website,description,category,contact_name,contact_email,consent) values($1,'tool','Test Tool','https://example.invalid/tool','A synthetic tool for isolated database checks.','AI apps','Test Founder','owner@example.invalid',true)",[sid]);
 for(let i=0;i<2;i++)assert.equal((await one('select superpowers_publish($1,$2) as id',[sid,tool])).id,'test-tool');
 assert.equal((await one("select superpowers_search_v2(pricing_filter=>'Free')->>'total' as n")).n,'1');
 assert.equal((await one("select superpowers_search_v2(pricing_filter=>'Paid')->>'total' as n")).n,'0');
 const ids=['22222222-2222-4222-8222-222222222222','33333333-3333-4333-8333-333333333333','44444444-4444-4444-8444-444444444444','55555555-5555-4555-8555-555555555555'];
 for(const id of ids)await q("insert into superpowers_orders(id,email,name,offer,details,tool_id,amount) values($1,'owner@example.invalid','Test Founder','featured','Synthetic placement','test-tool',4900)",[id]);
 const start=new Date(Date.now()+2*86400000).toISOString(),approve=(id,slot)=>q('select superpowers_approve($1,$2,$3,$4,$5)',[id,'Agreed seven day placement',start,slot,'plink_test']);
 const pay=(ev,session,id,intent,amount=4900,em='owner@example.invalid')=>one('select superpowers_payment($1,$2,$3,$4,$5,$6,$7) as result',[ev,session,id,intent,amount,em,'plink_test']);
 await approve(ids[0],1);await assert.rejects(()=>approve(ids[1],1),/reserved/);await approve(ids[1],2);
 assert.equal((await pay('ev1','cs1',ids[0],'pi1')).result,'paid');
 assert.equal((await pay('ev1','cs1',ids[0],'pi1')).result,'duplicate');
 assert.equal((await pay('ev2','cs1',ids[0],'pi1')).result,'duplicate');
 assert.equal(Number((await one('select count(*) from superpowers_placements')).count),1);
 assert.equal((await pay('evbad','csbad',ids[1],'pibad',100)).result,'refund needed');
 assert.equal((await one('select status from superpowers_orders where id=$1',[ids[1]])).status,'payment_review');
 await q('select superpowers_reverse($1,false)',['pi1']);
 assert.equal(Number((await one('select count(*) from superpowers_placements')).count),0);
 assert.equal((await one('select status from superpowers_orders where id=$1',[ids[0]])).status,'refunded');
 await approve(ids[2],1);await q('select superpowers_reverse($1,true)',['pibefore']);
 assert.equal((await pay('evbefore','csbefore',ids[2],'pibefore')).result,'reversed before payment');
 assert.equal(Number((await one('select count(*) from superpowers_placements')).count),0);
 assert.equal((await pay('evunknown','csunknown',null,'piunknown')).result,'unmatched');
 await approve(ids[3],2);assert.equal((await pay('evemail','csemail',ids[3],'piemail',4900,'other@example.invalid')).result,'refund needed');
 assert.equal((await one('select status from superpowers_orders where id=$1',[ids[3]])).status,'approved');
 for(const t of ['config','admins','codes','sessions','limits','owners','changes','orders','payments','reversals','placements','metrics','mail']){assert.equal((await one("select has_table_privilege('anon',$1,'select') as ok",['superpowers_'+t])).ok,false);assert.equal((await one('select relrowsecurity as ok from pg_class where oid=$1::regclass',['superpowers_'+t])).ok,true);}
 assert.equal((await one("select has_function_privilege('anon','superpowers_payment(text,text,uuid,text,integer,text,text)','execute') as ok")).ok,false);
 assert.equal((await one("select superpowers_rate('test',1,60) as ok")).ok,true);assert.equal((await one("select superpowers_rate('test',1,60) as ok")).ok,false);
 console.log('PostgreSQL checks passed: migration, publication, filters, reservation conflicts, payment replay/matching, out-of-order reversal, rate limits and private-table permissions.');
}finally{await db.close();}
