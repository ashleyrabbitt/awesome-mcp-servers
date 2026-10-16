import test from 'node:test';
import assert from 'node:assert/strict';
import {activitySummary,activityCSV,pricingCSV,pricingQueue,pricingState,reportWindow,operationsSummary} from '../public/business-reports.mjs';
import {handleBusiness,hash} from '../functions/superpowers-business/business.mjs';
import {adminView} from '../public/business-views.mjs';
const now=new Date('2026-10-16T12:00:00Z');
test('reporting counts UTC calendar days and keeps sponsored clicks separate from directory clicks',()=>{
 assert.deepEqual(reportWindow(now),{since:'2026-09-17',until:'2026-10-16'});
 const s=activitySummary([{tool_id:'cursor',kind:'tool_click',count:'4'},{tool_id:'cursor',kind:'featured_click',count:2},{tool_id:'cursor',kind:'featured_impression',count:10},{tool_id:'training',kind:'service_inquiry',count:3},{tool_id:'site',kind:'submission_received',count:1},{kind:'tool_click',count:-1}]);
 assert.equal(s.totals.tool_click,4);assert.equal(s.totals.featured_click,2);assert.equal(s.tools.length,1);assert.equal(s.tools[0].featured_impression,10);assert.deepEqual(s.inquiries,[['training',3]]);
});
test('pricing queue distinguishes unknown, stale and future review dates and prioritizes actual activity',()=>{
 const verified={pricing_model:'Freemium',pricing_source:'https://example.com/pricing',pricing_checked_at:'2026-10-16'};
 assert.equal(pricingState(verified,now),'current');assert.equal(pricingState({...verified,pricing_checked_at:'2026-01-01'},now),'due');assert.equal(pricingState({...verified,pricing_checked_at:'2027-01-01'},now),'unverified');assert.equal(pricingState({...verified,pricing_source:''},now),'unverified');
 const tools=[{id:'low',name:'Low',editorial_order:1},{id:'high',name:'High',editorial_order:2},{id:'old',name:'Old',...verified,pricing_checked_at:'2026-01-01'},{id:'fresh',name:'Fresh',...verified}];
 assert.deepEqual(pricingQueue(tools,{metrics:[{tool_id:'high',kind:'tool_click',count:1}],now}).map(t=>t.id),['high','low','old']);
 assert.deepEqual(pricingQueue(tools,{query:'fresh',filter:'all',now}).map(t=>t.id),['fresh']);
});
test('exports exclude contact data, escape CSV content, and neutralize spreadsheet formulas',()=>{
 const csv=activityCSV([{day:'2026-10-16',tool_id:'=HYPERLINK("evil")',kind:'tool_click',count:2,email:'private@example.com'}],reportWindow(now),true);
 assert.match(csv,/'=HYPERLINK\(""evil""\)/);assert.match(csv,/partial/);assert.ok(!csv.includes('private@example.com'));
 assert.match(pricingCSV([{id:'x',name:'\t=1+1',pricing:'a,"b"\nc'}],now),/'\t=1\+1/);
});
test('operations separate unpaid requests, paid delivery, and payment exceptions',()=>{
 const s=operationsSummary({submissions:[{status:'pending',created_at:'2026-10-10'}],orders:[{status:'requested',created_at:'2026-10-16'},{status:'approved'},{status:'paid'},{status:'payment_review'},{status:'refunded'}],changes:[],mail:[]},now);
 assert.equal(s.aging,1);assert.equal(s.requests,1);assert.equal(s.awaiting,1);assert.equal(s.paid,1);assert.equal(s.paymentReview,1);
});
const key='a'.repeat(64),session='b'.repeat(64),version='2026-10-15T12:00:00+00:00';
async function call(action,data={},handler=()=>Response.json([]),isAdmin=true){
 const keyHash=await hash(key);
 return handleBusiness(new Request('https://example.invalid',{method:'POST',headers:{'x-superpowers-key':key},body:JSON.stringify({action,data,session})}),{env:k=>k==='SUPABASE_URL'?'https://db.invalid':'secret',fetcher:async(url,opts)=>{
  if(url.includes('superpowers_config'))return Response.json([{value:keyHash}]);
  if(url.includes('superpowers_sessions'))return Response.json([{email:'admin@example.invalid'}]);
  if(url.includes('superpowers_admins'))return Response.json(isAdmin?[{email:'admin@example.invalid'}]:[]);
  return handler(url,opts);
 }});
}
test('pricing writes require admin, reviewed source, current version and preserve unrelated listing data',async()=>{
 const input={tool_id:'tool',version,pricing_model:'Paid',pricing:'Subscription required; a trial is available.',pricing_source:'https://publisher.example/pricing',reviewed:true};
 let patch;
 const handler=(url,opts)=>{if(opts.method==='PATCH'){patch={url,body:JSON.parse(opts.body)};return Response.json([{id:'tool'}]);}return Response.json([{id:'tool',updated_at:version,data:{id:'tool',name:'Original',description:'Keep this description.'}}]);};
 assert.equal((await call('reviewPricing',input,handler,false)).status,403);assert.equal(patch,undefined);
 assert.equal((await call('reviewPricing',{...input,version:'old'},handler)).status,400);assert.equal(patch,undefined);
 assert.equal((await call('reviewPricing',{...input,pricing_source:'javascript:alert(1)'},handler)).status,400);assert.equal(patch,undefined);
 const r=await call('reviewPricing',input,handler);assert.equal(r.status,200);assert.equal(patch.body.data.description,'Keep this description.');assert.match(patch.url,/updated_at=eq\./);assert.match(patch.body.data.pricing_checked_at,/^\d{4}-\d{2}-\d{2}$/);
 assert.equal((await call('reviewPricing',input,(url,opts)=>opts.method==='PATCH'?Response.json([]):handler(url,opts))).status,400);
});
test('admin activity follows exact counts even when the database returns a smaller page',async()=>{
 const offsets=[];
 const r=await call('admin',{},(url)=>{
  if(url.includes('superpowers_metrics')){const offset=Number(new URL(url).searchParams.get('offset'));offsets.push(offset);const rows=offset===0?[{day:'2026-10-15',tool_id:'one',kind:'tool_click',count:1},{day:'2026-10-15',tool_id:'two',kind:'tool_click',count:2}]:[{day:'2026-10-14',tool_id:'one',kind:'tool_click',count:3}];return Response.json(rows,{headers:{'content-range':`${offset}-${offset+rows.length-1}/3`}});}
  return Response.json([],{headers:{'content-range':'*/0'}});
 });
 assert.equal(r.status,200);const d=await r.json();assert.equal(d.metrics.length,3);assert.deepEqual(offsets,[0,2]);assert.deepEqual(d.truncated,[]);assert.equal(d.email_configured,true);
 const html=adminView(d);assert.match(html,/Pricing review queue/);assert.match(html,/Download activity CSV/);assert.match(html,/not proof of inbox delivery/);
});
test('accepting changed publisher pricing clears the prior editorial source and date',async()=>{
 let saved;
 const id='11111111-1111-4111-8111-111111111111';
 const r=await call('reviewChange',{id,decision:'accepted',note:'Reviewed the publisher update.',reviewed:true},(url,opts)=>{
  if(url.includes('superpowers_changes'))return Response.json([{id,status:'pending',email:'owner@example.invalid',tool_id:'tool',kind:'update',details:{description:'Updated description',pricing_model:'Paid',pricing:'A paid subscription.'}}]);
  if(url.includes('superpowers_owners'))return Response.json([{email:'owner@example.invalid'}]);
  if(url.includes('superpowers_tools')){if(opts.method==='PATCH'){saved=JSON.parse(opts.body).data;return Response.json([{id:'tool'}]);}return Response.json([{updated_at:version,data:{id:'tool',pricing_model:'Free',pricing:'Free forever.',pricing_source:'https://old.example',pricing_checked_at:'2026-10-01'}}]);}
  throw Error('Unexpected request');
 });
 assert.equal(r.status,200);assert.equal(saved.pricing_model,'Paid');assert.equal(saved.pricing_source,undefined);assert.equal(saved.pricing_checked_at,undefined);
});
