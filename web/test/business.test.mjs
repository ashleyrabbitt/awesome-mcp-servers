import test from 'node:test';
import assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import {createHmac} from 'node:crypto';
import {businessRequest,verifyStripe} from '../business-api.mjs';
import {handleBusiness,hash,extras,makeTool} from '../functions/superpowers-business/business.mjs';
import {businessPage,accountView} from '../public/business-views.mjs';
const req=(path,data={},headers={},method='POST')=>Object.assign(Readable.from([JSON.stringify(data)]),{url:path,method,headers:{'content-type':'application/json',...headers}});
test('webhook verification rejects altered bodies, old timestamps and missing secrets',()=>{const raw='{"x":1}',secret='whsec_test',time=1700000000;const sig=createHmac('sha256',secret).update(time+'.'+raw).digest('hex');assert.equal(verifyStripe(raw,'t='+time+',v1='+sig,secret,time*1000),true);assert.equal(verifyStripe(raw+' ','t='+time+',v1='+sig,secret,time*1000),false);assert.equal(verifyStripe(raw,'t='+time+',v1='+sig,secret,(time+301)*1000),false);assert.equal(verifyStripe(raw,'t='+time+',v1='+sig,'',time*1000),false);});
test('public routes cannot forge sessions, arbitrary actions or cross-site writes',async()=>{let seen;const call=async(...x)=>{seen=x;return {ok:true}};assert.equal((await businessRequest(req('/api/maker/change',{}, {origin:'https://evil.invalid'}),{call})).status,403);assert.equal(seen,undefined);assert.equal((await businessRequest(req('/api/maker/payment'),{call})).status,404);await businessRequest(req('/api/maker/change',{session:'a'.repeat(64),action:'admin'}),{call});assert.equal(seen[0],'change');assert.equal(seen[2],'');});
test('sign-in token is delivered only in a secure httpOnly cookie',async()=>{const result=await businessRequest(req('/api/maker/verify'),{call:async()=>({session:'b'.repeat(64)})});assert.deepEqual(result.body,{ok:true});assert.match(result.headers['Set-Cookie'],/HttpOnly; Secure; SameSite=Strict/);});
test('edge rejects missing bridge credentials before reading private data',async()=>{let calls=0;const r=await handleBusiness(new Request('https://example.invalid',{method:'POST',body:'{}'}),{env:()=>'',fetcher:async()=>{calls++;throw Error()}});assert.equal(r.status,401);assert.equal(calls,0);});
test('edge requires a verified session and separate administrator authorization',async()=>{const key='a'.repeat(64),keyHash=await hash(key);const fetcher=async url=>{let value=[];if(url.includes('superpowers_config'))value=[{value:keyHash}];if(url.includes('superpowers_sessions'))value=[{email:'founder@example.invalid'}];return new Response(JSON.stringify(value),{status:200});};const env=k=>k==='SUPABASE_URL'?'https://db.invalid':'secret';for(const [session,expected]of [['',401],['b'.repeat(64),403]]){const r=await handleBusiness(new Request('https://example.invalid',{method:'POST',headers:{'x-superpowers-key':key},body:JSON.stringify({action:'admin',session,data:{admin:true}})}),{env,fetcher});assert.equal(r.status,expected);}});
test('login accepts a successful empty PostgREST insert response before sending its code',async()=>{
 const key='a'.repeat(64),keyHash=await hash(key);let delivered=false;
 const fetcher=async(url,options)=>{
  if(url.includes('superpowers_config'))return Response.json([{value:keyHash}]);
  if(url.includes('rpc/superpowers_rate'))return Response.json(true);
  if(url.includes('superpowers_codes'))return new Response(null,{status:201});
  if(url==='https://api.resend.com/emails'){delivered=true;assert.match(JSON.parse(options.body).html,/\d{8}/);return Response.json({id:'mock-email'});}
  throw Error('Unexpected request');
 };
 const r=await handleBusiness(new Request('https://example.invalid',{method:'POST',headers:{'x-superpowers-key':key},body:JSON.stringify({action:'login',data:{email:'founder@example.com'}})}),{env:k=>k==='SUPABASE_URL'?'https://db.invalid':'secret',fetcher});
 assert.equal(r.status,200);assert.equal(delivered,true);
});
test('listing resources reject active URLs and paid pages do not expose immediate checkout',()=>{assert.throws(()=>extras({demo_url:'javascript:alert(1)'}));assert.throws(()=>extras({screenshot_url:'https://a:password@example.com'}));assert.equal(extras({pricing_model:'invented'}).pricing_model,'Unknown');assert.throws(()=>makeTool({},{slug:'../../admin'}));const html=businessPage('/advertise');assert.match(html,/confirm scope/);assert.ok(!html.includes('buy.stripe.com'));const account=accountView({email:'<img src=x>',submissions:[],owners:[],changes:[],orders:[],metrics:[]},[]);assert.ok(!account.includes('<img src=x>'));});

test('service offer links retain a known workflow and tool when switching offers',()=>{
 const html=businessPage('/work-with-us',{offer:'workflow',workflow:'meeting-to-actions',tool:'chatgpt'});
 assert.match(html,/<option value="workflow" selected>/);
 assert.match(html,/I would like help implementing: Turn a meeting into a clear action plan/);
 const links=[...html.matchAll(/href="([^"]+)"[^>]*>Request details/g)].map(m=>m[1].replaceAll('&amp;','&'));
 assert.equal(links.length,4);
 for(const href of links){const u=new URL(href,'https://aisuperpower.cc');assert.equal(u.searchParams.get('workflow'),'meeting-to-actions');assert.equal(u.searchParams.get('tool'),'chatgpt');const next=businessPage(u.pathname,Object.fromEntries(u.searchParams));assert.match(next,/I would like help implementing: Turn a meeting into a clear action plan/);}
 const ad=businessPage('/advertise',{offer:'newsletter',tool:'chatgpt'});
 assert.match(ad,/<option value="newsletter" selected>/);
 assert.match(ad,/offer=featured&amp;tool=chatgpt#request/);
});
test('unrecognized workflow context does not become inquiry text or propagate into offer links',()=>{
 const html=businessPage('/work-with-us',{workflow:'</textarea><script>alert(1)</script>',tool:'../../admin'});
 assert.ok(!html.includes('<script>'));
 assert.ok(!html.includes('workflow='));
 assert.ok(!html.includes('tool='));
 assert.ok(!html.includes('I would like help implementing:'));
});
