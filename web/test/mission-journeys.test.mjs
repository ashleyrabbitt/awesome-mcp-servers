import test from 'node:test';
import assert from 'node:assert/strict';
import {journeys,reportingSample,reportingTrial,cleanJourney,journeyReport,journeyPage} from '../public/mission-journeys.mjs';
import {curated} from '../public/catalog.mjs';
import {renderRoute} from '../public/views.mjs';
test('reporting challenge answer key matches arithmetic and starts without provider results',()=>{
 const rows=reportingSample.split('\n').slice(1).map(r=>r.split(','));
 const totals=[1,2].map(w=>rows.filter(r=>+r[0]===w).reduce((a,r)=>[a[0]+ +r[2],a[1]+ +r[3]],[0,0]));
 assert.deepEqual(totals,[[400,20],[500,20]]);assert.equal(totals[1][0]/totals[1][1],25);
 const d=reportingTrial();assert.equal(d.sample,reportingSample);assert.ok(d.candidates.every(c=>c.verdict==='untested'&&!c.toolId&&!c.evidence));
 assert.match(renderRoute('/comparison-challenge',curated),/no results published yet/);
});
test('journey work records bound saved data and preserve incomplete review status',()=>{
 const d=cleanJourney({notes:['x'.repeat(12000),7],checks:['true',true]});
 assert.equal(d.notes[0].length,10000);assert.equal(d.notes[1],'');assert.deepEqual(d.checks,[false,true,false]);
 assert.deepEqual(cleanJourney(null),{notes:['','','',''],checks:[false,false,false]});
 assert.match(journeyReport('weekly-report',d),/\[ \] Totals/);assert.match(journeyReport('weekly-report',d),/Not recorded/);
 assert.throws(()=>journeyReport('missing',{}),/Unknown/);
});
test('journeys have working source links and saved notes cannot inject markup',()=>{
 for(const j of journeys){assert.equal(j.steps.length,4);for(const id of j.tools)assert.ok(curated.some(t=>t.id===id));assert.match(renderRoute('/journeys/'+j.id,curated),/data-journey-download/)}
 globalThis.localStorage={getItem:()=>JSON.stringify({notes:['</textarea><script>alert(1)</script>']})};
 try {const html=journeyPage('weekly-report');assert.ok(!html.includes('<script>alert'));assert.match(html,/&lt;script&gt;/)} finally {delete globalThis.localStorage}
 assert.equal(journeyPage('missing'),null);
});
