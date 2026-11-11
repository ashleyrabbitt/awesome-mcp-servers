import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {curated} from '../public/catalog.mjs';
import {renderRoute} from '../public/views.mjs';
import {affiliateFor,toolLink} from '../public/tool-links.mjs';
import {workflowDemos,workflowDemo} from '../public/workflow-demos.mjs';
import {installWorkflowDemos} from '../public/workflow-demo-client.mjs';
import {toolRedirect} from '../dynamic-catalog.mjs';
import {workshopTracks} from '../public/role-learning.mjs';
import {businessPage} from '../public/business-views.mjs';

test('affiliate redirects use owned configuration, keep sponsored placements separate, and honor measurement consent',async()=>{
  let tracked=0;const lookup=async()=>({url:'https://www.descript.com/',affiliateUrl:'https://untrusted.invalid/'}),track=async()=>tracked++;
  for(const method of ['GET','HEAD']){
    const result=await toolRedirect('descript',{url:'/go/descript',method,headers:{dnt:'1'}},{lookup,track});
    assert.equal(result.status,302);assert.equal(result.headers.Location,'https://get.descript.com/o1zqq5l1l1m4');
  }
  const placement=await toolRedirect('descript',{url:'/go/descript?featured=1',method:'HEAD',headers:{}},{lookup,track});
  assert.equal(placement.headers.Location,'https://www.descript.com/');assert.equal(tracked,0);
  const ordinary=await toolRedirect('unregistered',{url:'/go/unregistered',method:'HEAD',headers:{}},{lookup,track});
  assert.equal(ordinary.headers.Location,'https://www.descript.com/');
  assert.equal(affiliateFor('unregistered'),null);
  const bad=await toolRedirect('unregistered',{url:'/go/unregistered',method:'HEAD',headers:{}},{lookup:async()=>({url:'javascript:alert(1)'}),track});
  assert.equal(bad.status,404);
});

test('comparison surfaces disclose issued referrals without labeling ordinary links as affiliates',()=>{
  for(const id of ['descript','higgsfield']){
    const html=toolLink(curated.find(t=>t.id===id));assert.match(html,/sponsored nofollow/);assert.match(html,/Affiliate link/);
  }
  assert.doesNotMatch(toolLink(curated.find(t=>t.id==='veed')),/Affiliate link|sponsored/);
  for(const path of ['/comparisons/video-editors','/field-tests/recording-to-clips','/workflow-demos','/compare']){
    const html=renderRoute(path,curated,{compare:['descript','veed']});
    assert.match(html,/href="\/go\/descript"/);assert.match(html,/We may earn a commission/);
  }
});

test('walkthrough controls move between steps, support direct selection, and stop at either end',()=>{
  let click;installWorkflowDemos({addEventListener:(_,fn)=>click=fn});
  const frame={set innerHTML(html){this.html=html;stage.dataset.demoStage=html.match(/data-demo-stage="(\d+)"/)[1];}},stage={dataset:{demoStage:'0'}},status={},prev={},next={};
  const buttons=Array.from({length:4},(_,i)=>({dataset:{demoIndex:String(i)},setAttribute(k,v){this[k]=v;}}));
  const nodes={'[data-demo-frame]':frame,'[data-demo-stage]':stage,'[data-demo-status]':status,'[data-demo-move="-1"]':prev,'[data-demo-move="1"]':next};
  const root={dataset:{workflowDemo:'brief-to-campaign'},querySelector:s=>nodes[s],querySelectorAll:()=>buttons};
  const press=dataset=>click({target:{closest:()=>({dataset,closest:()=>root})}});
  press({demoMove:'1'});assert.equal(stage.dataset.demoStage,'1');assert.match(frame.html,/Quiet space/);assert.equal(buttons[1]['aria-pressed'],'true');
  press({demoIndex:'3'});assert.equal(next.disabled,true);assert.match(status.textContent,/Step 4 of 4/);assert.match(frame.html,/EMAIL DRAFT/);
  press({demoMove:'1'});assert.equal(stage.dataset.demoStage,'3');
  press({demoIndex:'0'});assert.equal(prev.disabled,true);assert.equal(next.disabled,false);
  press({demoMove:'-1'});assert.equal(stage.dataset.demoStage,'0');
});

test('visual demonstrations keep practice examples distinct from vendor performance and ship all assets',async()=>{
  assert.equal(workflowDemos.length,5);
  for(const demo of workflowDemos){const html=workflowDemo(demo.id);assert.equal(demo.steps.length,4);assert.match(html,/Illustrated practice example/);assert.match(html,new RegExp('data-field-trial="'+demo.id+'"'));}
  const html=renderRoute('/comparisons/video-editors',curated);
  for(const [,src] of html.matchAll(/src="(\/assets\/compare-[^"]+)"/g))assert.match(await readFile(new URL('../public'+src,import.meta.url),'utf8'),/<svg/);
  assert.match(html,/https:\/\/www\.descript\.com\/tools\/video-editor/);
  assert.match(html,/https:\/\/www\.veed\.io\/tools\/video-editor/);
  assert.match(html,/https:\/\/www\.opus\.pro\//);
});

test('each workshop inquiry preserves its subject and selected format without treating it as a paid booking',()=>{
  for(const track of workshopTracks)for(const offer of ['working-session','training']){
    const html=businessPage('/work-with-us',{workshop:track.id,offer});
    assert.match(html,new RegExp('<option value="'+offer+'" selected>'));
    assert.ok(html.includes(track.title));assert.match(html,/name="details"/);assert.match(html,/name="preferred_time"/);assert.match(html,/data-business="inquiry"/);
    assert.match(html,/does not reserve a workshop or take payment/);assert.doesNotMatch(html,/buy\.stripe\.com/);
  }
  const unknown=businessPage('/work-with-us',{workshop:'<script>untrusted</script>'});assert.doesNotMatch(unknown,/<script>untrusted/);
});
