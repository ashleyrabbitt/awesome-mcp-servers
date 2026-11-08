import test from 'node:test';
import assert from 'node:assert/strict';
import {launchFields,cleanLaunch,launchIssues,launchMarkdown} from '../public/launch-planner.mjs';
import {renderRoute} from '../public/views.mjs';
import {curated} from '../public/catalog.mjs';
import {readFile} from 'node:fs/promises';
test('plans require a complete boundary and never imply an activated or tested workflow',()=>{
 assert.equal(launchIssues({}).length,8);
 const p=Object.fromEntries(launchFields.map(([k,,v])=>[k,v]));
 assert.deepEqual(launchIssues(p),[]);
 const report=launchMarkdown(p);
 assert.match(report,/No agent, schedule, integration or permission is activated/);
 assert.equal((report.match(/Observed result: \[not tested\]/g)||[]).length,5);
 assert.match(report,/Duplicate trigger/);assert.match(report,/Provider failure/);assert.match(report,/Status: NOT TESTED/);
 assert.equal(cleanLaunch({outcome:'x'.repeat(1300),owner:{secret:'bad'}}).outcome.length,1200);
 assert.equal(cleanLaunch({owner:{secret:'bad'}}).owner,'');
});
test('launch pages are built, indexable and link to working offer identifiers',async()=>{
 const routes=JSON.parse(await readFile(new URL('../dist/routes.json',import.meta.url)));
 for(const path of ['/launch-lab','/agent-launch-planner']){
  assert.ok(routes.includes(path));const html=renderRoute(path,curated);
  assert.equal((html.match(/<h1/g)||[]).length,1);assert.match(html,/offer=working-session/);assert.match(html,/offer=workflow/);
 }
 const client=await readFile(new URL('../public/launch-client.mjs',import.meta.url),'utf8');
 assert.ok(!client.includes('fetch(')&&!client.includes('sendBeacon'));
 assert.match(client,/textContent=launchMarkdown/);
 assert.match(client,/invalidate\(\)/);
});
