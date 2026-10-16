import test from 'node:test';
import assert from 'node:assert/strict';
import {captureInputs,restoreInputs} from '../public/input-state.mjs';

test('catalog refresh keeps URL-selected pricing while preserving an unsent search draft',()=>{
 const doc={activeElement:null};
 const control=(id,type,value,filter=false)=>({id,name:id,type,value,ownerDocument:doc,hasAttribute:name=>name==='data-filter'&&filter,selectionStart:null,selectionEnd:null});
 const previous=[control('pricing-filter','select-one','All',true),control('directory-query','text','my unsent query')];
 const draft=captureInputs({querySelectorAll:()=>previous});
 const rendered=[control('pricing-filter','select-one','Freemium',true),control('directory-query','text','')];
 restoreInputs({querySelectorAll:()=>rendered},draft);
 assert.equal(rendered[0].value,'Freemium');
 assert.equal(rendered[1].value,'my unsent query');
});
