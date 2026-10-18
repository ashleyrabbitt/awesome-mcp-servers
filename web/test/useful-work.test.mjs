import test from 'node:test';
import assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import {readFile} from 'node:fs/promises';
import {playbooks,roleKits,usefulRoutes,stackCost,chooseStarter,playbookMarkdown} from '../public/useful-work.mjs';
import {communityAction,digestItems,digestContent,digestPreview,notificationTopics} from '../functions/superpowers-business/community.mjs';
import {safeURL,handleBusiness,hash} from '../functions/superpowers-business/business.mjs';
import {curated} from '../public/catalog.mjs';
import {topics} from '../public/discovery-plus.mjs';
import {digestTopics} from '../functions/superpowers-business/notification-topics.mjs';
import {renderRoute} from '../public/views.mjs';
import {pageSEO} from '../public/seo.mjs';
import {publicKitView,accountExtras} from '../public/useful-work-views.mjs';
import {businessRequest} from '../business-api.mjs';
const id='11111111-1111-4111-8111-111111111111',who={email:'one@example.invalid'},ctx={who,admin:false,rate:async()=>{},safeURL};
test('guided cases and role kits resolve real listings, have substantive checks, and are clear about evidence',async()=>{
 const routes=new Set(JSON.parse(await readFile(new URL('../dist/routes.json',import.meta.url))));
 for(const p of playbooks){assert.equal(p.steps.length,5);assert.ok(p.sample.length>200&&p.reference.length>200);assert.match(playbookMarkdown(p),/not a running automation or a product benchmark/);for(const tool of [...p.ids,...p.kit])assert.ok(curated.some(t=>t.id===tool),tool);}
 for(const k of roleKits)for(const tool of k.ids)assert.ok(curated.some(t=>t.id===tool));
 for(const route of usefulRoutes){const html=renderRoute(route,curated,{saved:[],compare:[]});assert.equal((html.match(/<h1/g)||[]).length,1,route);assert.ok(!html.includes('Page not found'),route);for(const [,href]of html.matchAll(/href="(\/[^"#]*)"/g)){const p=href.split('?')[0];assert.ok(routes.has(p)||p.startsWith('/downloads/'),'Broken '+href+' in '+route);}}
 assert.equal(chooseStarter({task:'invalid',level:'hacker',budget:'fake'}).playbook.id,playbooks[0].id);
});
test('cost comparison handles annual commitments, seats, usage, unknowns and invalid inputs',()=>{
 assert.deepEqual(stackCost([{price:120,seats:2,usage:8,period:12}]),{monthly:28,annualEquivalent:336});
 assert.deepEqual(stackCost([{price:0,seats:1,usage:0,period:1}]),{monthly:0,annualEquivalent:0});
 for(const r of [{price:'',seats:1,usage:0,period:1},{price:10,seats:1.5,usage:0,period:1},{price:-1,seats:1,usage:0,period:1},{price:1e308,seats:999,usage:0,period:1}])assert.equal(stackCost([r]),null);
});
test('shared kit rendering escapes public content and does not reveal account fields',()=>{
 const html=publicKitView({id,title:'<img src=x>',description:'<script>alert(1)</script>',tool_ids:['chatgpt'],updated_at:'2026-10-18',email:'PRIVATE_EMAIL',notes:'PRIVATE_NOTES'},curated);
 assert.ok(!html.includes('<script>')&&!html.includes('PRIVATE_'));assert.match(html,/&lt;img/);
 assert.equal(pageSEO('/community-kits/'+id,curated,html).noindex,true);assert.equal(pageSEO('/digest/unsubscribe',curated,'<h1>Unsubscribe</h1>').noindex,true);
});
test('new account actions require verified identity and admin routes reject ordinary users before reading queues',async()=>{
 for(const action of ['usefulAccount','publishKit','revokeKit','watchTool','savePreferences','reportTool'])await assert.rejects(()=>communityAction(action,{}, {...ctx,who:null}),e=>e.status===401);
 for(const action of ['usefulAdmin','reviewReport'])await assert.rejects(()=>communityAction(action,{}, {...ctx,db:()=>{throw Error('Must not read');}}),e=>e.status===403);
});
test('public kit API uses a narrow projection, published status, and published tool filtering',async()=>{
 const seen=[];const r=await communityAction('publicKit',{id},{db:async p=>{seen.push(p);return p.startsWith('superpowers_public_kits')?[{id,title:'A kit',description:'A useful description.',tool_ids:['chatgpt','missing'],updated_at:'2026-10-18'}]:[{id:'chatgpt'}];}});
 assert.deepEqual(r.tool_ids,['chatgpt']);assert.match(seen[0],/status=eq.published&select=id,title,description,tool_ids,updated_at/);
 await assert.rejects(()=>communityAction('publicKit',{id},{db:async()=>[]}),e=>e.status===404);
});
test('publishing a public kit requires consent and binds ownership to the verified session',async()=>{
 const d={id,title:'Useful kit',description:'A useful fictional description for a test.',tool_ids:['chatgpt'],consent:true,email:'other@example.invalid',notes:'PRIVATE'};let saved;
 const db=async(p,m,b)=>{if(m==='POST'){saved=b;return [];}return p.startsWith('superpowers_tools')?[{id:'chatgpt'}]:[];};
 await assert.rejects(()=>communityAction('publishKit',{...d,consent:false},{...ctx,db}),/confirm/);
 await communityAction('publishKit',d,{...ctx,db});assert.equal(saved.email,who.email);assert.equal(saved.notes,undefined);assert.equal(saved.status,undefined);
});
test('unpublishing is ownership-scoped and refuses stale edits',async()=>{
 let path;await assert.rejects(()=>communityAction('revokeKit',{id,version:'2026-10-18T00:00:00Z'},{...ctx,db:async p=>(path=p,[])}),/changed/);assert.match(path,/email=eq.one%40example.invalid/);assert.match(path,/updated_at=eq/);
});
test('account projections keep unsubscribe capabilities and other users private',async()=>{
 const paths=[];await communityAction('usefulAccount',{}, {...ctx,db:async p=>(paths.push(p),[])});assert.equal(paths.length,3);for(const p of paths){assert.match(p,/email=eq.one%40example.invalid/);assert.ok(!p.includes('unsubscribe_token'));}
});
test('watching a tool does not opt an account into email and preference edits use optimistic checks',async()=>{
 let saved;const db=async(p,m,b)=>{if(m==='POST'){saved=b;return [];}return p.startsWith('superpowers_tools')?[{id:'chatgpt'}]:[];};
 await communityAction('watchTool',{tool_id:'chatgpt',digest_enabled:true,email:'other@example.invalid'},{...ctx,db});assert.equal(saved.digest_enabled,false);assert.equal(saved.email,who.email);assert.equal(saved.unsubscribe_token.length,64);
 await assert.rejects(()=>communityAction('savePreferences',{version:2,watched:['chatgpt'],digest_enabled:true,consent:true},{...ctx,db}),/changed/);
 await assert.rejects(()=>communityAction('savePreferences',{version:0,watched:['chatgpt'],digest_enabled:true},{...ctx,db}),/Confirm/);
});
test('listing reports cannot self-publish a correction or impersonate another reporter',async()=>{
 let saved;await communityAction('reportTool',{id,tool_id:'chatgpt',kind:'pricing',details:'The current publisher source should be reviewed.',source_url:'https://example.invalid/pricing',status:'resolved',email:'other@example.invalid'},{...ctx,db:async(p,m,b)=>{if(m==='POST'){saved=b;return [];}return p.startsWith('superpowers_tools')?[{id:'chatgpt'}]:[];}});
 assert.equal(saved.email,who.email);assert.equal(saved.status,undefined);assert.equal(saved.review_note,undefined);
});
test('digest selection uses real recent changes, excludes unrelated tools and has no synthetic popularity',()=>{
 for(const topic of topics){assert.deepEqual(notificationTopics[topic.id],topic.ids);assert.deepEqual(digestTopics.find(t=>t.id===topic.id).terms,topic.terms);}
 const tools=[{id:'chatgpt',data:{name:'ChatGPT',directory_added_at:'2026-01-01'}},{id:'make',data:{name:'Make',directory_added_at:'2026-10-18'}}];
 const events=[{tool_id:'chatgpt',summary:'Verified change',created_at:'2026-10-18'},{tool_id:'chatgpt',summary:'Old change',created_at:'2026-01-01'}];
 assert.equal(digestItems(tools,events,[],[], '2026-10-10').length,0);
 assert.equal(digestItems(tools,events,[],['writing'],'2026-10-10')[0].summary,'Verified change');
 assert.equal(digestItems(tools,events,['make'],[], '2026-10-10')[0].id,'make');
 assert.equal(digestItems(tools,events,['chatgpt','make'],[], '2026-10-10','2026-10-17').length,0);
});
test('digest content escapes publisher fields and provides opt-out without advertising or private notes',()=>{
 const d=digestContent({token:'a'.repeat(64),items:[{id:'chatgpt',name:'<script>',summary:'<img src=x>',date:'2026-10-18'}]});assert.ok(!d.html.includes('<script>')&&!d.html.includes('<img'));assert.match(d.html,/digest\/unsubscribe#/);assert.ok(!d.html.includes('working-session'));assert.match(d.text,/Unsubscribe/);
});
test('dispatch rechecks opt-out and never sends to a cancelled subscription',async()=>{
 let sends=0,patch;const r=await communityAction('digestTick',{}, {env:()=> 'key',fetcher:async()=>{sends++;},rpc:async()=>[{id,email:'person@example.com',lease_token:id,payload:{items:[],token:'a'.repeat(64)}}],db:async(p,m,b)=>{if(m==='PATCH')patch=b;return [];}});assert.equal(sends,0);assert.equal(r.accepted,0);assert.equal(patch.status,'cancelled');
});
test('unsubscribe capability is single-purpose and scheduler is not publicly routed',async()=>{
 let call;await communityAction('unsubscribeDigest',{token:'a'.repeat(64),email:'victim@example.invalid'}, {rpc:async(...args)=>{call=args;}});assert.deepEqual(call,['unsubscribe_digest',{p_token:'a'.repeat(64)}]);
 const req=(url,body,origin='https://aisuperpower.cc')=>Object.assign(Readable.from([JSON.stringify(body)]),{url,method:'POST',headers:{origin,'content-type':'application/json'}});
 assert.equal((await businessRequest(req('/api/maker/digestTick',{}),{call:async()=>{throw Error('Must not dispatch');}})).status,404);
 assert.equal((await businessRequest(req('/api/maker/publish-kit',{},'https://evil.invalid'),{call:async()=>{throw Error('Must not write');}})).status,403);
 const r=await businessRequest(req('/api/digest/unsubscribe?token='+'a'.repeat(64),{},'https://mail.example'),{call:async(a,d)=>(assert.equal(a,'unsubscribeDigest'),assert.deepEqual(d,{token:'a'.repeat(64)}),{ok:true})});assert.equal(r.status,200);
});
test('edge bridge still authenticates public kit and notification requests',async()=>{
 const bridge='a'.repeat(64),digest=await hash(bridge);const fetcher=async url=>{if(url.includes('superpowers_config'))return Response.json([{value:digest}]);throw Error('Must not access data');};
 const req=new Request('https://test.invalid',{method:'POST',headers:{'x-superpowers-key':'b'.repeat(64)},body:JSON.stringify({action:'digestTick'})});
 assert.equal((await handleBusiness(req,{env:()=> 'secret',fetcher})).status,401);
});

test('admin digest preview includes only real public changes and escapes their content',async()=>{
 const preview=await digestPreview(async path=>path.startsWith('superpowers_tool_events')?[{tool_id:'make',summary:'<img src=x>',created_at:'2026-10-18'},{tool_id:'private',summary:'PRIVATE_CONTENT',created_at:'2026-10-18'}]:[{id:'make',data:{name:'<script>Make</script>'}}]);
 assert.equal(preview.items.length,1);const rendered=digestContent(preview);
 assert.match(rendered.html,/&lt;script/);assert.ok(!rendered.html.includes('<img')&&!rendered.html.includes('PRIVATE_CONTENT'));
 assert.equal(rendered.subject,'AI Superpower digest delivery test');assert.ok(!rendered.text.includes('Unsubscribe:'));
});
