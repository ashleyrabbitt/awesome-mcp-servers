import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
test('analytics loads only on the custom production hosts with the correct measurement ID',async()=>{
 const code=await readFile(new URL('../public/analytics.js',import.meta.url),'utf8');
 for(const hostname of ['aisuperpower.cc','www.aisuperpower.cc','localhost','superpowers-complete-production.up.railway.app']){
  const scripts=[],window={};const context={window,location:{hostname},document:{createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}}};vm.runInNewContext(code,context);
  if(hostname==='aisuperpower.cc'||hostname==='www.aisuperpower.cc'){
   assert.equal(scripts.length,1);assert.equal(scripts[0].src,'https://www.googletagmanager.com/gtag/js?id=G-R9X4RKWE12');
   assert.equal(window.dataLayer[1][0],'config');assert.equal(window.dataLayer[1][1],'G-R9X4RKWE12');assert.equal(window.dataLayer[1][2].allow_google_signals,false);
  }else assert.equal(scripts.length,0);
 }
});
