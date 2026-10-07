import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {labWorkflows,workModes,cleanLabPlans,workflowMarkdown,calculateWorkflowTime} from '../public/workflow-lab.mjs';
import {howTos,resourceKits,resourceMarkdown} from '../public/resource-kit.mjs';
import {curated,searchTools} from '../public/catalog.mjs';
import {renderRoute} from '../public/views.mjs';
import {createServer} from '../server.mjs';

test('each workflow has complete handoffs, linked tools and a matching how-to',()=>{
 assert.equal(labWorkflows.length,6);assert.equal(howTos.length,6);
 for(const w of labWorkflows){
  assert.equal(w.steps.length,5);
  assert.equal(howTos.find(h=>h.id===w.howto).workflow,w.id);
  for(const s of w.steps){assert.ok(workModes[s.mode]);assert.ok(s.input&&s.output&&s.ai&&s.human&&s.prompt);assert.ok(s.tools.every(id=>curated.some(t=>t.id===id)));}
  const page=renderRoute('/workflow-lab?workflow='+w.id,curated);
  assert.ok(page.includes(w.steps[0].title));
  assert.ok(renderRoute('/how-to/'+w.howto,curated).includes('Customize this workflow'));
 }
 assert.ok(searchTools(curated,{type:'Workflow tools'}).some(t=>t.id==='tally'));
});

test('stored plans reject unknown workflows and modes, and bound text before export',()=>{
 const plans=cleanLabPlans({campaign:{goal:'g'.repeat(700),modes:{0:'automate',1:'bogus',99:'human'},notes:{0:'Owner: Pat',1:'x'.repeat(1500),99:'ignored'}},unknown:{goal:'discard'}});
 assert.deepEqual(Object.keys(plans),['campaign']);assert.equal(plans.campaign.goal.length,500);
 assert.deepEqual(plans.campaign.modes,{'0':'automate'});assert.equal(plans.campaign.notes[1].length,1000);assert.equal(plans.campaign.notes[99],undefined);
 assert.deepEqual(cleanLabPlans(null),{});
 const md=workflowMarkdown(labWorkflows[0],plans.campaign,curated);
 assert.ok(md.includes('Approach: Automation candidate'));assert.ok(md.includes('Owner: Pat'));assert.ok(md.includes('https://www.make.com/en'));assert.ok(md.includes('Human checkpoint:'));
});

test('time estimates count review and setup, including losses and zero-frequency cases',()=>{
 const example={before:'60',assisted:'20',review:'15',runs:'4',setup:'120'};
 const r=calculateWorkflowTime(example);assert.equal(r.perRun,25);assert.equal(r.weeklyMinutes,100);assert.equal(r.firstFourWeeksHours,280/60);assert.equal(r.paybackWeeks,1.2);
 assert.equal(calculateWorkflowTime({...example,review:'50'}).weeklyMinutes,-40);
 assert.equal(calculateWorkflowTime({...example,runs:'0'}).paybackWeeks,null);
 assert.equal(calculateWorkflowTime({...example,before:''}),null);
 assert.equal(calculateWorkflowTime({...example,review:'-1'}),null);
 assert.equal(calculateWorkflowTime({...example,runs:'Infinity'}),null);
 assert.equal(calculateWorkflowTime({...example,setup:'100001'}),null);
});

test('workflow notes cannot inject HTML and unknown page IDs fail cleanly',()=>{
 const attack='</textarea><script>alert(1)</script>';
 const page=renderRoute('/workflow-lab?workflow=campaign',curated,{labPlans:{campaign:{goal:attack,notes:{0:attack}}}});
 assert.ok(!page.includes(attack));assert.ok(page.includes('&lt;script&gt;'));
 assert.ok(!renderRoute('/how-to/unknown',curated).includes('Customize this workflow'));
 assert.ok(!renderRoute('/resources/unknown',curated).includes('Download the worksheet'));
 assert.ok(renderRoute('/time-savings',curated,{labCalculator:{before:'" onfocus="bad'}}).includes('&quot; onfocus=&quot;bad'));
});

test('all worksheet downloads serve the actual generated content',async()=>{
 assert.equal(resourceKits.length,10);
 const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 try{for(const r of resourceKits){
  const response=await fetch(base+'/downloads/'+r.id+'.md');assert.equal(response.status,200);
  assert.equal(await response.text(),resourceMarkdown(r));
  const html=await readFile(new URL('../dist/resources/'+r.id+'/index.html',import.meta.url),'utf8');assert.ok(html.includes('/downloads/'+r.id+'.md'));
 }}finally{await new Promise(resolve=>server.close(resolve));}
});

