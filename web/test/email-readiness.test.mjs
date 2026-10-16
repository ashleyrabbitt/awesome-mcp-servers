import test from 'node:test';
import assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import {emailReadiness,handleBusiness,hash} from '../functions/superpowers-business/business.mjs';
import {businessRequest} from '../business-api.mjs';
const key='a'.repeat(64),session='b'.repeat(64),request_id='11111111-1111-4111-8111-111111111111';
const env=k=>k==='SUPABASE_URL'?'https://db.invalid':'test-secret';
test('sender readiness follows pagination and only reveals the configured sender domain',async()=>{
 const urls=[];
 const r=await emailReadiness(env,async(url,options)=>{
  urls.push(url);assert.equal(options.headers.Authorization,'Bearer test-secret');
  return Response.json(url.includes('after=')?{has_more:false,data:[{id:'private-domain-id',name:'waymaker.cx',status:'verified',capabilities:{sending:'enabled'},records:['private-dns']}]}:{has_more:true,data:[{id:'next-id',name:'unrelated.example',status:'verified'}]});
 });
 assert.equal(urls.length,2);assert.match(urls[1],/after=next-id/);assert.equal(r.status,'ready');assert.equal(r.domain,'waymaker.cx');assert.match(r.message,/does not prove inbox delivery/);
 for(const secret of ['test-secret','private-domain-id','private-dns','unrelated.example'])assert.ok(!JSON.stringify(r).includes(secret));
});
test('readiness distinguishes missing config, restricted access, failure and disabled sending',async()=>{
 assert.equal((await emailReadiness(()=>'',()=>{throw Error('must not call')})).status,'not_configured');
 for(const [code,status]of [[403,'restricted'],[401,'unauthorized'],[429,'unavailable'],[500,'unavailable']])assert.equal((await emailReadiness(env,async()=>new Response('private error',{status:code}))).status,status);
 assert.equal((await emailReadiness(env,async()=>{throw Error('secret in network error')})).status,'unavailable');
 assert.equal((await emailReadiness(env,async()=>Response.json({has_more:false,data:[]}))).status,'not_found');
 assert.equal((await emailReadiness(env,async()=>Response.json({has_more:false,data:[{name:'waymaker.cx',status:'verified',capabilities:{sending:'disabled'}}]}))).status,'needs_review');
 assert.equal((await emailReadiness(env,async()=>Response.json({has_more:false,data:[{name:'waymaker.cx',status:'verified'}]}))).status,'needs_review');
 let pages=0;assert.equal((await emailReadiness(env,async()=>Response.json({has_more:true,data:[{id:'page-'+(++pages),name:'other.example'}]}))).status,'incomplete');assert.equal(pages,5);
});
async function fixture({admin=true,authenticated=true,rateAllowed=true,accepted=true}={}){
 const keyHash=await hash(key),outbox=new Map(),sent=[],rates=[];
 const fetcher=async(url,options={})=>{
  if(url.includes('superpowers_config'))return Response.json([{value:keyHash}]);
  if(url.includes('superpowers_sessions'))return Response.json(authenticated?[{email:'operator@example.com'}]:[]);
  if(url.includes('superpowers_admins'))return Response.json(admin?[{email:'operator@example.com'}]:[]);
  if(url.includes('rpc/superpowers_rate')){rates.push(JSON.parse(options.body));return Response.json(rateAllowed);}
  if(url.includes('superpowers_mail')){
   const body=options.body?JSON.parse(options.body):null;
   if(options.method==='POST'){if(!outbox.has(body.id))outbox.set(body.id,body);return new Response(null,{status:201});}
   const id=new URL(url).searchParams.get('id').slice(3),row=outbox.get(id);
   if(options.method==='PATCH')Object.assign(row,body);
   return Response.json(row?[row]:[]);
  }
  if(url==='https://api.resend.com/emails'){sent.push({body:JSON.parse(options.body),id:options.headers['Idempotency-Key']});return Response.json({id:'mock-id'},{status:accepted?200:500});}
  if(url.startsWith('https://api.resend.com/domains'))throw Error('Readiness must not be called without authorization');
  throw Error('Unexpected fixture request');
 };
 return {sent,outbox,rates,call:(action,data={})=>handleBusiness(new Request('https://example.invalid',{method:'POST',headers:{'x-superpowers-key':key},body:JSON.stringify({action,data,session})}),{env,fetcher})};
}
test('both email operations require a real session and separate admin authorization',async()=>{
 for(const action of ['emailHealth','testEmail'])for(const [settings,status]of [[{authenticated:false},401],[{admin:false},403]]){
  const f=await fixture(settings);assert.equal((await f.call(action,{request_id,admin:true,email:'victim@example.com'})).status,status);assert.equal(f.sent.length,0);assert.equal(f.outbox.size,0);assert.equal(f.rates.length,0);
 }
});
test('test mail is restricted to the signed-in operator, idempotent and rate limited',async()=>{
 const f=await fixture();
 for(let i=0;i<2;i++){const r=await f.call('testEmail',{request_id,email:'other@example.com',recipient:'victim@example.com',subject:'override'});assert.equal(r.status,200);const d=await r.json();assert.equal(d.email_sent,true);assert.equal(d.recipient,'operator@example.com');}
 assert.equal(f.sent.length,1);assert.equal(f.outbox.size,1);assert.deepEqual(f.sent[0].body.to,['operator@example.com']);assert.equal(f.sent[0].body.subject,'AI Superpower email delivery check');assert.ok([...f.outbox.values()][0].sent_at);assert.equal(f.rates[0].p_limit,2);
 const limited=await fixture({rateAllowed:false});assert.equal((await limited.call('testEmail',{request_id})).status,429);assert.equal(limited.sent.length,0);assert.equal(limited.outbox.size,0);
 assert.equal((await f.call('testEmail',{request_id:'invalid'})).status,400);
});
test('a failed test remains retryable and does not claim delivery',async()=>{
 const f=await fixture({accepted:false});const d=await (await f.call('testEmail',{request_id})).json();assert.equal(d.email_sent,false);assert.equal([...f.outbox.values()][0].sent_at,undefined);
});
test('public email routes preserve cookie authentication and reject cross-site requests',async()=>{
 const req=(path,headers={})=>Object.assign(Readable.from([JSON.stringify({session,action:'admin',request_id})]),{url:path,method:'POST',headers:{'content-type':'application/json',...headers}});
 for(const [route,action]of [['email-health','emailHealth'],['test-email','testEmail']]){
  let seen;const call=async(...args)=>{seen=args;return {ok:true}};
  assert.equal((await businessRequest(req('/api/maker/'+route,{origin:'https://evil.invalid'}),{call})).status,403);assert.equal(seen,undefined);
  await businessRequest(req('/api/maker/'+route),{call});assert.equal(seen[0],action);assert.equal(seen[2],'');
  await businessRequest(req('/api/maker/'+route,{cookie:'sp_session='+session}),{call});assert.equal(seen[2],session);
 }
});
