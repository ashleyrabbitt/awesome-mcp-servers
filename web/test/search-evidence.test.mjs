import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createServer} from '../server.mjs';
import {curated} from '../public/catalog.mjs';
import {renderRoute} from '../public/views.mjs';
import {novemberPricing} from '../public/november-22-pricing.mjs';
import {tasks} from '../public/task-guides/tasks.mjs';
import {referenceExamples} from '../public/task-guides/examples.mjs';
import {findTasks} from '../public/task-guides/views.mjs';
import {studies,testRoutes} from '../public/tool-tests/views.mjs';

test('priority pricing reaches the native catalog, including the retired agent',()=>{
 assert.equal(Object.keys(novemberPricing).length,50);
 for(const [id,p] of Object.entries(novemberPricing)){
  const tool=curated.find(t=>t.id===id);assert.equal(tool.ai_access,p.ai_access);
  assert.equal(new URL(p.ai_access_source).protocol,'https:');assert.equal(tool.pricing_checked_at,'2026-11-22');
  assert.ok(renderRoute('/tools/'+id,curated).includes('AI access on the free plan'));
 }
 assert.match(renderRoute('/tools/devin-desktop',curated),/publisher’s replacement/);
});
test('every task has a worked answer and published comparisons have reproducible inputs',async()=>{
 assert.ok(tasks.every(t=>referenceExamples[t.id]?.rows.length>=2));
 for(const study of studies){
  assert.ok(study.result.length>45);
  assert.ok((await stat(new URL('../public/downloads/tool-tests/'+study.id+'.zip',import.meta.url))).size>1000);
 }
 const sitemap=await readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8');
 for(const path of testRoutes)assert.ok(sitemap.includes(path+'</loc>'));
 for(const [q,route] of [['upwork mcp','/guides/upwork-mcp-freelance-workflow'],['functional prototype creation','/how-to/prototype-with-ai'],['windsor connector','/guides/windsor-ai-and-data-connectors']])assert.equal(findTasks(q)[0].path,route);
});
test('direct search, publisher picks and original landing pages carry their evidence',async()=>{
 const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try{
  const url='http://127.0.0.1:'+server.address().port;
  for(const [path,expected] of [['/search?query=shopify+mcp','/guides/shopify-ai-mcp-practical-guide'],['/ai-tasks?q=windsor+connector','/guides/windsor-ai-and-data-connectors'],['/guides/ten-ai-tools-comparison-field-guide','/tool-tests'],['/how-to/prototype-with-ai','Six'.toLowerCase()+' available seats'],['/product-hunt-picks','How Product Hunt counts points'],['/','Why we picked it'],['/tool-tests/invoice-extraction','invoice-line.png']]){
   const response=await fetch(url+path);assert.equal(response.status,200,path);assert.ok((await response.text()).includes(expected),[path,expected].join(' '));
  }
 }finally{await new Promise(resolve=>server.close(resolve));}
});
