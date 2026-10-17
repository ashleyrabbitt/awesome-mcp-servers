import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Readable} from 'node:stream';
import {curated,searchTools} from '../public/catalog.mjs';
import {taskMatches,growthRoutes,topics,alternativeGuides} from '../public/discovery-plus.mjs';
import {renderRoute} from '../public/views.mjs';
import {pageSEO} from '../public/seo.mjs';
import {dealsView,requestCards} from '../public/discovery-plus-views.mjs';
import {cleanLibrary,discoveryAction} from '../functions/superpowers-business/discovery.mjs';
import {handleBusiness,hash,safeURL} from '../functions/superpowers-business/business.mjs';
import {businessRequest} from '../business-api.mjs';
import {dynamicDiscovery} from '../dynamic-discovery.mjs';
const rid='11111111-1111-4111-8111-111111111111',aid='22222222-2222-4222-8222-222222222222';
const who={email:'owner@example.invalid'},base={who,admin:false,rate:async()=>{},safeURL};
test('task search explains natural-language matches and does not invent an answer for an unknown task',()=>{
 const r=taskMatches('I need to turn meetings into notes and action items',[...curated,{id:'apple-notes',name:'Apple Notes MCP',category:'Notes',roles:[],description:'Read notes'}]);assert.equal(r.tools[0].tool.id,'otter-ai');assert.ok(r.topics.some(t=>t.id==='meetings'));assert.ok(r.tools.every(r=>r.reason&&r.check));
 assert.equal(taskMatches('zzxxqq unmapped phrase',curated).tools.length,0);assert.equal(taskMatches('I need help',curated).tools.length,0);assert.equal(taskMatches('ChatGPT',curated).tools[0].tool.id,'chatgpt');
});
test('new discovery pages have resolvable internal links and private account routes stay out of indexing',async()=>{
 const routes=new Set(JSON.parse(await readFile(new URL('../dist/routes.json',import.meta.url))));
 for(const route of growthRoutes){const html=renderRoute(route,curated,{saved:[],compare:[]});assert.match(html,/<h1/);for(const [,href]of html.matchAll(/href="(\/[^"#]*)"/g)){const path=href.split('?')[0];assert.ok(routes.has(path),'Unresolved '+href+' from '+route);}}
 for(const t of topics)for(const id of t.ids)assert.ok(curated.some(t=>t.id===id),id);
 for(const g of alternativeGuides)assert.equal(g.ids.length,g.choices.length);
 for(const route of ['/account','/admin/discovery','/search?query=meeting'])assert.equal(pageSEO(route,curated,renderRoute(route,curated)).noindex,true);
 assert.equal(pageSEO('/alternatives/chatgpt',curated,renderRoute('/alternatives/chatgpt',curated)).noindex,false);
});
test('free trial filtering does not turn a paid product into a free plan',()=>{
 const tools=[{id:'trial',name:'Trial',roles:[],pricing_model:'Paid',trial_available:true},{id:'free',name:'Free',roles:[],pricing_model:'Free',trial_available:false}];
 assert.deepEqual(searchTools(tools,{pricing:'Free trial'}).map(t=>t.id),['trial']);assert.deepEqual(searchTools(tools,{pricing:'Free'}).map(t=>t.id),['free']);
});
test('library validation bounds private state and rejects route injection and duplicate kit names',()=>{
 assert.deepEqual(cleanLibrary({version:0,collections:[{name:'Work',ids:['chatgpt','chatgpt']}],topics:['writing']}),{collections:[{name:'Work',ids:['chatgpt']}],topics:['writing']});
 for(const d of [{version:0,collections:[{name:'x',ids:['../../admin']}],topics:[]},{version:0,collections:[{name:'Work',ids:[]},{name:'work',ids:[]}],topics:[]},{version:0,collections:[],topics:['secret-topic']}])assert.throws(()=>cleanLibrary(d));
});
test('account reads scope every query to the verified email and writes use optimistic version checks',async()=>{
 const seen=[];await discoveryAction('library',{}, {...base,db:async p=>{seen.push(p);return [];}});assert.equal(seen.length,3);assert.ok(seen.every(p=>p.includes('email=eq.owner%40example.invalid')));
 let patch;await assert.rejects(()=>discoveryAction('saveLibrary',{email:'other@example.invalid',version:4,collections:[],topics:[]},{...base,db:async(p,m,b)=>{patch={p,m,b};return [];}}),/another tab or device/);assert.match(patch.p,/email=eq.owner%40example.invalid&version=eq.4/);assert.equal(patch.b.version,5);
});
test('community writes require a verified account and admin actions reject ordinary accounts before reading queues',async()=>{
 for(const action of ['library','saveLibrary','ask','vote','makerAnswer'])await assert.rejects(()=>discoveryAction(action,{}, {...base,who:null}),e=>e.status===401);
 for(const action of ['growthAdmin','reviewRequest','reviewAnswer','saveDeal','reviewAvailability'])await assert.rejects(()=>discoveryAction(action,{admin:true}, {...base,db:async()=>{throw Error('Should not read');}}),e=>e.status===403);
});
test('edge authenticates new public, personal and administrator paths through the existing bridge',async()=>{
 const bridge='a'.repeat(64),digest=await hash(bridge);let rpcSeen=false;
 const fetcher=async url=>{if(url.includes('superpowers_config'))return Response.json([{value:digest}]);if(url.includes('superpowers_sessions'))return Response.json([who]);if(url.includes('superpowers_admins'))return Response.json([]);if(url.includes('rpc/superpowers_discovery_public')){rpcSeen=true;return Response.json({requests:[],deals:[],popular:[]});}throw Error('Unexpected read');};
 const call=async(action,session='')=>handleBusiness(new Request('https://test.invalid',{method:'POST',headers:{'x-superpowers-key':bridge},body:JSON.stringify({action,session})}),{env:k=>k==='SUPABASE_URL'?'https://db.invalid':'secret',fetcher});
 assert.equal((await call('explore')).status,200);assert.equal(rpcSeen,true);assert.equal((await call('library')).status,401);assert.equal((await call('growthAdmin','b'.repeat(64))).status,403);
});
test('questions begin pending and cannot set their own answer, author or publication status',async()=>{
 let saved;const result=await discoveryAction('ask',{id:rid,kind:'request',title:'Find a useful meeting workflow',body:'I need a reviewable action plan from a permitted transcript.',consent:true,status:'published',email:'other@example.invalid',answer:'Fake answer'},{...base,db:async(p,m,b)=>{if(m==='POST')saved=b;return [];}});
 assert.equal(result.status,'pending');assert.equal(saved.email,who.email);assert.equal(saved.status,undefined);assert.equal(saved.answer,undefined);
});
test('votes are account-specific and unpublished questions cannot receive votes',async()=>{
 let write;const db=async(p,m,b)=>{if(p.startsWith('superpowers_requests'))return [{id:rid,status:'published'}];write={p,m,b};return [];};
 await discoveryAction('vote',{id:rid,active:true,email:'victim@example.invalid'},{...base,db});assert.equal(write.b.email,who.email);assert.equal(write.b.request_id,rid);
 await discoveryAction('vote',{id:rid,active:false},{...base,db});assert.equal(write.m,'DELETE');assert.match(write.p,/email=eq.owner%40example.invalid/);
 await assert.rejects(()=>discoveryAction('vote',{id:rid,active:true},{...base,db:async()=>[{id:rid,status:'pending'}]}),/published/);
});
test('maker replies require ownership and publication rechecks it',async()=>{
 const db=async p=>p.startsWith('superpowers_requests')?[{id:rid,status:'published',kind:'question',tool_id:'chatgpt'}]:p.startsWith('superpowers_answers')?[{id:aid,request_id:rid,email:who.email,updated_at:'v1'}]:[];
 await assert.rejects(()=>discoveryAction('makerAnswer',{id:aid,request_id:rid,body:'A detailed answer with a useful source.'},{...base,db}),/verified owner/);
 await assert.rejects(()=>discoveryAction('reviewAnswer',{id:aid,status:'published',version:'v1',body:'A detailed answer with a useful source.',reviewed:true},{...base,admin:true,db}),/still owns/);
});
test('moderation detects stale edits and publishes only explicit public fields',async()=>{
 let saved;const db=async(p,m,b)=>{if(m==='PATCH'){saved=b;return [];}return [{id:rid,updated_at:'v1'}];};
 await assert.rejects(()=>discoveryAction('reviewRequest',{id:rid,version:'v1',status:'published',title:'A valid public question',body:'A valid public description with enough context.',answer:'',answer_tools:[],reviewed:true},{...base,admin:true,db}),/changed/);
 assert.equal(saved.email,undefined);assert.equal(saved.status,'published');
});
test('deal publication requires approval evidence, safe URLs and a future expiration',async()=>{
 const d={tool_id:'chatgpt',title:'Example approved offer',terms:'This synthetic offer is only used in isolated tests.',url:'https://example.invalid/offer',source_url:'https://example.invalid/terms',approval_note:'Approved in the isolated test only.',starts_at:'2026-01-01',ends_at:'2099-01-01',relationship:'affiliate',status:'published',reviewed:true};let saved;
 const db=async(p,m,b)=>m==='POST'?(saved=b,[]):[{id:'chatgpt'}];await discoveryAction('saveDeal',d,{...base,admin:true,db});assert.equal(saved.relationship,'affiliate');
 for(const change of [{reviewed:false},{approval_note:''},{url:'javascript:alert(1)'},{ends_at:'2020-01-01'}])await assert.rejects(()=>discoveryAction('saveDeal',{...d,...change},{...base,admin:true,db}));
});
test('untrusted community and offer fields are escaped and private evidence never renders',()=>{
 const html=requestCards([{id:rid,kind:'request',title:'<img src=x>',body:'<script>alert(1)</script>',answer:'<svg>',answer_tools:[],created_at:'2026-10-17',votes:1,maker_answers:[]}],curated);assert.ok(!html.includes('<script>'));assert.match(html,/&lt;img/);
 const offer=dealsView([{id:rid,tool_id:'chatgpt',title:'Offer',terms:'Terms',relationship:'affiliate',url:'javascript:alert(1)',source_url:'https://example.invalid/terms',ends_at:'2099-01-01',checked_at:'2026-10-17',approval_note:'PRIVATE APPROVAL',email:'PRIVATE EMAIL'}],curated);assert.ok(!offer.includes('javascript:'));assert.ok(!offer.includes('PRIVATE'));assert.match(offer,/commission/);
});
test('new API routes keep cookie identity and cross-site protection',async()=>{
 const req=(path,data,origin)=>Object.assign(Readable.from([JSON.stringify(data)]),{url:path,method:'POST',headers:{'content-type':'application/json',origin}});let seen;
 const call=async(...args)=>(seen=args,{ok:true});assert.equal((await businessRequest(req('/api/maker/save-library',{},'https://evil.invalid'),{call})).status,403);assert.equal(seen,undefined);
 await businessRequest(req('/api/maker/save-library',{session:'a'.repeat(64),email:'victim@example.invalid'},'https://aisuperpower.cc'),{call});assert.equal(seen[0],'saveLibrary');assert.equal(seen[2],'');
});
test('public requests render server-side with an honest unavailable response on upstream failure',async()=>{
 const r=await dynamicDiscovery('/requests',{call:async()=>({requests:[{id:rid,kind:'request',title:'A real task question',body:'A moderated question with public information.',answer:'A useful reviewed answer.',answer_tools:['chatgpt'],created_at:'2026-10-17',votes:1}],deals:[],popular:[]}),catalog:async()=>curated.map(data=>({data}))});assert.equal(r.status,200);assert.match(r.body,/A useful reviewed answer/);assert.match(r.body,/canonical/);
 assert.equal((await dynamicDiscovery('/deals',{call:async()=>{throw Error('offline')},catalog:async()=>[]})).status,503);
});
