import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Readable} from 'node:stream';
import vm from 'node:vm';
import {curated} from '../public/catalog.mjs';
import {renderRoute} from '../public/views.mjs';
import {businessPage} from '../public/business-views.mjs';
import {playbooks,playbookMarkdown} from '../public/useful-work.mjs';
import {installUsefulWork} from '../public/useful-work-client.mjs';
import {taskDecisions} from '../public/task-paths.mjs';
import {browserMeasurementAllowed,taskMetric,installTaskMetrics} from '../public/task-metrics.mjs';
import {businessRequest} from '../business-api.mjs';
import {toolRedirect} from '../dynamic-catalog.mjs';

const ids=['meeting-to-actions','brief-to-campaign','intake-to-handoff','sources-to-brief','recording-to-clips'];
const request=(headers={},method='POST')=>Object.assign(Readable.from(['{"tool_id":"descript","kind":"tool_click"}']),{url:'/api/maker/track',method,headers:{'content-type':'application/json',...headers}});

test('five task paths reach practice, comparison and one contextual working-session inquiry',()=>{
  assert.deepEqual(taskDecisions.map(p=>p.id),ids);
  for(const id of ids){
    const p=playbooks.find(p=>p.id===id),html=renderRoute('/playbooks/'+id,curated);
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.match(html,/id="choose"/);
    assert.match(html,new RegExp('data-field-trial="'+id+'"'));
    assert.match(html,new RegExp('href="/field-tests/'+id+'"'));
    const inquiries=[...html.matchAll(/href="([^\"]*offer=working-session[^\"]*)"/g)];
    assert.equal(inquiries.length,1);
    const u=new URL(inquiries[0][1].replaceAll('&amp;','&'),'https://aisuperpower.cc');
    assert.equal(u.searchParams.get('workflow'),id);
    assert.equal(u.hash,'#request');
    const inquiry=businessPage(u.pathname,Object.fromEntries(u.searchParams));
    assert.match(inquiry,/<option value="working-session" selected>/);
    assert.ok(inquiry.includes(p.title));
    assert.match(html,/\$350 USD AI Working Session/);
    assert.match(html,/session length, timing and terms are agreed before booking or payment/);
    assert.ok(!html.includes('buy.stripe.com'));
    assert.match(playbookMarkdown(p),/not a running automation or a product benchmark/);
    const compare=renderRoute('/field-tests/'+id,curated);
    assert.match(compare,/data-cost-mode="alternatives"/);
    assert.match(compare,/Hands-on vendor runs are not recorded/);
  }
});

test('new practice cases keep fictional inputs and untested vendor results explicit',()=>{
  const research=playbooks.find(p=>p.id==='sources-to-brief');
  assert.match(research.sample,/Fictional sources/);
  assert.match(research.reference,/does not establish market-wide demand/);
  assert.match(research.reference,/unapproved/);
  const recording=playbooks.find(p=>p.id==='recording-to-clips');
  assert.match(recording.sample,/illustrative, not measurements/);
  assert.match(recording.reference,/No video file, vendor-generated clip or measured result/);
  assert.match(recording.trialNote,/same owned audio\/video file/);
  for(const p of [research,recording]){
    assert.equal(p.steps.length,5);
    assert.equal(p.sourcesReviewedAt,'2026-11-08');
    assert.ok(p.checks.length>=5);
    assert.ok(p.ids.every(id=>curated.some(t=>t.id===id)));
  }
});

test('only the existing relevant configured referral is promoted, with adjacent disclosure',()=>{
  const referrals=curated.filter(t=>t.affiliateUrl);
  assert.deepEqual(referrals.map(t=>t.id).sort(),['descript','higgsfield']);
  assert.equal(referrals.find(t=>t.id==='descript').affiliateUrl,'https://get.descript.com/o1zqq5l1l1m4');
  assert.equal(referrals.find(t=>t.id==='higgsfield').affiliateUrl,'https://higgsfield.ai?fpr=ashley-a1cd2d');
  for(const id of ids){
    const html=renderRoute('/playbooks/'+id,curated);
    if(id==='recording-to-clips'){
      assert.match(html,/Affiliate disclosure: We may earn a commission/);
      assert.match(html,/href="https:\/\/get\.descript\.com\/o1zqq5l1l1m4" target="_blank" rel="sponsored nofollow noopener noreferrer"/);
      assert.equal((html.match(/data-task-action="publisher"/g)||[]).length,1);
    }else assert.ok(!html.includes('data-task-action="publisher"'));
    assert.ok(!html.includes('higgsfield.ai?fpr='));
  }
});

test('task metrics emit only fixed editorial IDs, never entered text, query strings or supplied URLs',()=>{
  const data={taskAction:'help',taskId:'sources-to-brief',taskTool:'PRIVATE NOTE',email:'private@example.invalid',href:'https://private.invalid'};
  assert.deepEqual(taskMetric(data,'/playbooks/sources-to-brief?email=secret#notes'),{name:'task_path_action',params:{action:'help',task_id:'sources-to-brief',tool_id:'none',link_kind:'internal',page_path:'/playbooks/sources-to-brief'}});
  assert.equal(taskMetric({...data,taskAction:'send-email'},'/playbooks/sources-to-brief'),null);
  assert.equal(taskMetric({...data,taskId:'PRIVATE NOTE'},'/playbooks/sources-to-brief'),null);
  assert.equal(taskMetric(data,'/account'),null);
  assert.equal(taskMetric({taskAction:'tool',taskId:'sources-to-brief',taskTool:'descript'},'/playbooks/sources-to-brief'),null);
  assert.equal(taskMetric({taskAction:'publisher',taskId:'intake-to-handoff',taskTool:'make'},'/playbooks/intake-to-handoff'),null);
  const issued=taskMetric({taskAction:'publisher',taskId:'recording-to-clips',taskTool:'descript'},'/playbooks/recording-to-clips');
  assert.equal(issued.params.link_kind,'affiliate');
  assert.equal(issued.params.tool_id,'descript');
  assert.equal(taskMetric({affiliateTool:'higgsfield'},'/tools/descript'),null);
  assert.equal(taskMetric({affiliateTool:'higgsfield'},'/tools/higgsfield').name,'tool_referral_click');
});

test('click measurement honors browser privacy signals and requires the existing analytics function',()=>{
  const signals=[{navigator:{globalPrivacyControl:true}},{navigator:{doNotTrack:'1'}},{navigator:{msDoNotTrack:'1'}},{doNotTrack:'yes'},{'ga-disable-G-R9X4RKWE12':true}];
  const el={dataset:{taskAction:'choose',taskId:'sources-to-brief'}};
  for(const privacy of [{},...signals]){
    const calls=[],scope={location:{pathname:'/playbooks'},gtag:(...args)=>calls.push(args),...privacy};
    let handler;installTaskMetrics({addEventListener:(_,fn)=>handler=fn},scope);
    handler({target:{closest:()=>el}});
    assert.equal(calls.length,browserMeasurementAllowed(scope)?1:0);
  }
  let handler;installTaskMetrics({addEventListener:(_,fn)=>handler=fn},{location:{pathname:'/playbooks'}});
  assert.doesNotThrow(()=>handler({target:{closest:()=>el}}));
});

test('production analytics never loads or creates a queue when DNT, GPC or the existing opt-out is set',async()=>{
  const code=await readFile(new URL('../public/analytics.js',import.meta.url),'utf8');
  for(const privacy of [{navigator:{globalPrivacyControl:true}},{navigator:{doNotTrack:'1'}},{navigator:{msDoNotTrack:'1'}},{doNotTrack:'1'},{'ga-disable-G-R9X4RKWE12':true}]){
    const scripts=[],window={...privacy},context={window,navigator:privacy.navigator||{},location:{hostname:'aisuperpower.cc',pathname:'/playbooks'},document:{createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}}};
    vm.runInNewContext(code,context);
    assert.equal(scripts.length,0);
    assert.equal(window.dataLayer,undefined);
    assert.equal(window.gtag,undefined);
  }
});

test('optional backend click measurement stops at the API boundary under DNT/GPC',async()=>{
  for(const headers of [{dnt:'1'},{'sec-gpc':'1'},{dnt:'0, 1'}]){
    let calls=0;const response=await businessRequest(request(headers),{call:async()=>{calls++;return {ok:true};}});
    assert.equal(response.status,200);assert.deepEqual(response.body,{ignored:true});assert.equal(calls,0);
  }
  let calls=0;await businessRequest(request(),{call:async(action,data)=>{calls++;assert.equal(action,'track');assert.match(data.visitor,/^[a-f0-9]{64}$/);return {ok:true};}});
  assert.equal(calls,1);
});

test('publisher redirects remain functional without tracking under privacy signals and for HEAD',async()=>{
  for(const [method,headers,expected]of [['GET',{},1],['GET',{dnt:'1'},0],['GET',{'sec-gpc':'1'},0],['HEAD',{},0]]){
    let tracked=0;const response=await toolRedirect('descript',{method,url:'/go/descript',headers},{lookup:async()=>({url:'https://www.descript.com/tools/video-editor'}),track:async()=>{tracked++;}});
    assert.equal(response.status,302);assert.equal(response.headers.Location,'https://www.descript.com/tools/video-editor');assert.equal(tracked,expected);
  }
});

test('comparison costs stay separate and the new sample enters the existing Trial Lab intact',async()=>{
  const original=globalThis.document,handlers={};globalThis.document={addEventListener:(event,fn)=>(handlers[event]||=[]).push(fn)};
  let trial;
  try{
    installUsefulWork({getItems:()=>curated,loadKit:()=>{},startTrial:p=>trial=p,navigate:()=>{},notice:()=>{}});
    const rows=[['Zero-cost candidate',{price:'0',period:'1',seats:'1',usage:'0'}],['Annual candidate',{price:'240',period:'12',seats:'1',usage:'5'}],['Unknown candidate',{price:'',period:'1',seats:'1',usage:'0'}]].map(([name,values])=>({querySelector:()=>({textContent:name}),querySelectorAll:()=>Object.entries(values).map(([name,value])=>({name,value}))}));
    const result={};const form={id:'stack-cost',dataset:{costMode:'alternatives'},querySelectorAll:()=>rows,querySelector:()=>result};
    await handlers.submit[0]({target:form,preventDefault:()=>{}});
    assert.match(result.textContent,/Zero-cost candidate: \$0\.00 per month/);
    assert.match(result.textContent,/Annual candidate: \$25\.00 per month equivalent; \$300\.00 annual equivalent/);
    assert.match(result.textContent,/Unknown candidate: Unknown/);
    for(const id of ['sources-to-brief','recording-to-clips']){
      const button={dataset:{fieldTrial:id}};await handlers.click[0]({target:{closest:()=>button}});
      const expected=playbooks.find(p=>p.id===id);assert.equal(trial,expected);assert.ok(trial.sample.includes('Fictional'));
    }
  }finally{globalThis.document=original;}
});
