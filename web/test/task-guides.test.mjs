import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {allPublishedTools} from '../catalog-api.mjs';
import {curated,roles,types} from '../public/catalog.mjs';
import {tasks,reading,taskRoutes} from '../public/task-guides/tasks.mjs';
import {taskProducts} from '../public/task-guides/products.mjs';
import {findTasks,guideTrial,taskGuidePage} from '../public/task-guides/views.mjs';
import {renderRoute} from '../public/views.mjs';
import {trialIssues} from '../public/tool-trial.mjs';

test('all task guides connect four sourced profiles, a practice trial and a reference',async()=>{
 const sitemap=await readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8');
 for(const path of taskRoutes)assert.ok(sitemap.includes(path+'</loc>'));
 for(const task of tasks){
  const group=taskProducts.filter(p=>p.task===task.id);
  assert.equal(group.length,4);
  const html=taskGuidePage('/ai-tasks/'+task.id);
  for(const p of group){
   assert.ok(html.includes('/tools/'+p.id));
   assert.ok(curated.some(t=>t.id===p.id));
   assert.ok(p.roles.every(role=>roles.includes(role))&&types.includes(p.type));
   for(const key of ['url','pricing_source','sourceUrl'])assert.equal(new URL(p[key]).protocol,'https:');
   assert.ok(renderRoute('/tools/'+p.id,curated).includes('/ai-tasks/'+task.id));
  }
  assert.ok(html.includes(reading[task.id][1]));
  assert.equal(guideTrial(task.id).sample,task.sample);
  assert.deepEqual(trialIssues(guideTrial(task.id),curated),[]);
 }
 assert.equal(guideTrial('missing'),null);
});
test('task and product wording reach guides from both native search surfaces',()=>{
 for(const [q,id] of [['podcast cleanup','clean-up-a-podcast'],['Fabrikator','forecast-inventory'],['invoice OCR','extract-data-from-documents'],['model evaluation','evaluate-model-outputs']]){
  assert.equal(findTasks(q)[0]?.id,id);
  assert.ok(renderRoute('/search?query='+encodeURIComponent(q),curated).includes('/ai-tasks/'+id));
 }
 const html=taskGuidePage('/ai-tasks',new URLSearchParams({q:'Brisk Teaching'}));
 assert.match(html,/1 guide matching/);assert.match(html,/prepare-teaching-materials/);
 assert.doesNotMatch(html,/prototype-a-game/);
});
test('full catalog and reviewed sitemap can paginate past one thousand published tools',async()=>{
 const records=Array.from({length:1005},(_,i)=>({id:'test-'+String(i).padStart(4,'0')}));
 let calls=0;
 const rows=await allPublishedTools('id','&data->>status=eq.Documentation%20reviewed',async endpoint=>{
  const q=new URL(endpoint,'https://example.test').searchParams;calls++;
  assert.equal(q.get('published'),'eq.true');assert.equal(q.get('order'),'id.asc');
  assert.equal(q.get('data->>status'),'eq.Documentation reviewed');
  return records.filter(t=>t.id>(q.get('id')||'gt.').slice(3)).slice(0,Number(q.get('limit')));
 });
 assert.equal(calls,3);assert.deepEqual(rows,records);
});
