import test from 'node:test';
import assert from 'node:assert/strict';
import {curated} from '../public/catalog.mjs';
import {cleanTrial,trialFromTools,minutes,trialIssues,trialResults,trialSummary,trialMarkdown,trialPage} from '../public/tool-trial.mjs';
import {renderRoute} from '../public/views.mjs';
const valid=()=>cleanTrial({task:'Summarize permitted sample notes',criteria:'Preserve decisions and mark missing owners',baseline:'30',candidates:[{toolId:'notion-ai',work:'10',review:'5',verdict:'meets',evidence:'Practice case A; owner checked.'},{toolId:'granola',work:'20',review:'15',verdict:'revise'}]});
test('trial time distinguishes missing data, zero, savings and extra effort',()=>{
 assert.equal(minutes(''),null);assert.equal(minutes('0'),0);assert.equal(minutes('-1'),null);assert.equal(minutes('Infinity'),null);assert.equal(minutes('100001'),null);
 let rows=trialResults(valid(),curated);assert.equal(rows[0].total,15);assert.equal(rows[0].saved,15);assert.equal(rows[1].saved,-5);
 const d=valid();d.candidates[0].review='';assert.equal(trialResults(d,curated)[0].total,null);d.candidates[0].review='0';assert.equal(trialResults(d,curated)[0].total,10);d.baseline='';assert.equal(trialResults(d,curated)[0].saved,null);
});
test('invalid or repeated candidates cannot become a downloadable decision report',()=>{
 const d=valid();assert.deepEqual(trialIssues(d,curated),[]);d.candidates[1].toolId=d.candidates[0].toolId;assert.throws(()=>trialMarkdown(d,curated),/different tool/);
 d.candidates[1].toolId='missing-from-catalog';assert.throws(()=>trialMarkdown(d,curated),/no longer/);d.candidates[1].toolId='';d.candidates[0].work='-10';assert.throws(()=>trialMarkdown(d,curated),/minutes/);
 assert.throws(()=>trialMarkdown({},curated),/Describe the task/);
});
test('stored trials are bounded and shortlists start without borrowed observations',()=>{
 const d=cleanTrial({task:'a'.repeat(900),candidates:[{toolId:'<script>',verdict:'constructor',evidence:'b'.repeat(4000)},null,null,{toolId:'figma'}]});assert.equal(d.task.length,500);assert.equal(d.candidates.length,3);assert.equal(d.candidates[0].toolId,'');assert.equal(d.candidates[0].verdict,'untested');assert.equal(d.candidates[0].evidence.length,2000);
 const next=trialFromTools(['figma','figma','missing','notion'],curated);assert.deepEqual(next.candidates.map(c=>c.toolId),['figma','notion','']);assert.ok(next.candidates.every(c=>c.verdict==='untested'&&c.evidence===''&&c.review===''));
});
test('reports preserve actual evidence and uncertainty without claiming a winner',()=>{
 const d=valid();d.candidates[0].verdict='untested';d.candidates[0].review='';const report=trialMarkdown(d,curated);assert.match(report,/My verdict: Not tested/);assert.match(report,/Review and rework: Not recorded/);assert.match(report,/Practice case A; owner checked/);assert.match(report,/5 min more/);assert.match(report,/Not decided/);assert.ok(!report.includes('winner:'));
 assert.match(trialSummary(d,curated),/Not recorded/);
});
test('trial UI escapes input, exposes a no-JavaScript worksheet and gates exports',()=>{
 const d=valid(),attack='<img src=x onerror=alert(1)>';d.task=attack;d.candidates[0].evidence=attack;const html=trialPage(curated,{trial:d});assert.ok(!html.includes(attack));assert.ok(html.includes('&lt;img'));assert.match(html,/download>download the blank comparison worksheet/);
 assert.match(renderRoute('/tool-trial',curated),/data-trial-download disabled/);assert.ok(!html.includes('data-trial-download disabled'));assert.match(renderRoute('/compare',curated,{compare:['figma']}),/data-trial-compare/);
});
