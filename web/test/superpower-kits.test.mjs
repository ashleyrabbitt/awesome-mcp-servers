import test from 'node:test';
import assert from 'node:assert/strict';
import {assessTask,kits,sheets,kitPage,fieldGuidePage} from '../public/superpower-kits.mjs';
const task={task:'Draft update',kind:'routine',data:'ordinary',risk:'low',check:'yes'};
test('finder permits only a reviewed pilot for checkable low-risk tasks',()=>{assert.equal(assessTask(task).category,'Try a small assisted pilot')});
test('consequential decisions retain human control even with ordinary inputs',()=>{assert.equal(assessTask({...task,risk:'high'}).category,'Keep the decision human');assert.equal(assessTask({...task,kind:'judgment'}).category,'Keep the decision human')});
test('sensitive inputs and unverifiable outputs require safeguards',()=>{for(const override of [{data:'sensitive'},{check:'no'}])assert.equal(assessTask({...task,...override}).category,'Prepare safeguards first')});
test('missing or unexpected assessment inputs never produce a recommendation',()=>{for(const key of Object.keys(task))assert.ok(assessTask({...task,[key]:''}).error);assert.ok(assessTask({...task,risk:'unexpected'}).error)});
test('release has three complete kits and eight editable printable companions',()=>{assert.equal(kits.length,3);assert.equal(sheets.length,8);for(const k of kits){const html=kitPage(k.id);assert.match(html,/Editable prompt/);assert.match(html,/Fictional example/);assert.match(html,/data-export-notes/)}assert.equal(kitPage('missing'),null);assert.match(fieldGuidePage(),/superpowers-field-guide.pdf/)});
