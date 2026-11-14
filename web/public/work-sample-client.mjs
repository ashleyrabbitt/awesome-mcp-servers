import {cleanSample,sampleExample,sampleMarkdown,sampleReady,sampleFields} from './work-income.mjs';
import {browserMeasurementAllowed} from './task-metrics.mjs';
const key='aisuperpower-work-sample-v1';
export function workSampleMetric(action){return ['example','download_md','download_txt','copy'].includes(action)?{name:'work_sample_action',params:{action,page_path:'/work-sample-builder'}}:null;}
export function installWorkSample(){
 let form=null;
 const measure=action=>{const metric=workSampleMetric(action);if(metric&&browserMeasurementAllowed(window)&&typeof window.gtag==='function')window.gtag('event',metric.name,metric.params);};
 const status=text=>{const n=document.querySelector('#sample-save-status');if(n)n.textContent=text;};
 const read=()=>cleanSample(Object.fromEntries(new FormData(form)));
 const show=()=>{if(!form)return;const s=read();document.querySelector('#work-sample-preview').textContent=sampleMarkdown(s);document.querySelector('#sample-readiness').textContent=sampleReady(s)?'Your case study is ready to review and download.':'Complete the six required fields before downloading.';};
 const fill=s=>{for(const field of ['kind','workflow',...sampleFields.map(([k])=>k)])form.elements.namedItem(field).value=s[field]||'';show();};
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(read()));status('Draft saved in this browser. Clear it below when finished.');}catch{status('This browser could not save your draft. Download it to keep a copy.');}};
 const hydrate=()=>{const next=document.querySelector('#work-sample-form');if(!next){form=null;return;}if(next===form)return;form=next;try{const saved=localStorage.getItem(key);if(saved){fill(cleanSample(JSON.parse(saved)));status('Your saved draft is open. Changes stay in this browser.');}else show();}catch{show();status('Saved draft could not be opened. You can start a new one.');}};
 document.addEventListener('site:navigate',hydrate);hydrate();
 document.addEventListener('input',ev=>{if(form?.contains(ev.target)){show();save();}});
 document.addEventListener('change',ev=>{if(form?.contains(ev.target)){show();save();}});
 document.addEventListener('submit',ev=>{if(ev.target===form)ev.preventDefault();});
 document.addEventListener('click',async ev=>{const b=ev.target.closest('button');if(!b||!form)return;
  if(b.hasAttribute('data-sample-example')){fill(cleanSample(sampleExample));save();measure('example');status('Fictional practice example loaded. Replace it with your own work before sharing.');}
  if(b.hasAttribute('data-sample-clear')){fill(cleanSample());try{localStorage.removeItem(key);status('Draft cleared from this browser.');}catch{status('Fields cleared. Browser storage could not be updated.');}form.elements.namedItem('title').focus();}
  if(b.hasAttribute('data-sample-download')||b.hasAttribute('data-sample-copy')){
   if(!form.reportValidity())return;
   const content=sampleMarkdown(read());
   if(b.hasAttribute('data-sample-copy')){try{await navigator.clipboard.writeText(content);measure('copy');status('Case study copied. Review it before sharing.');}catch{status('Copy was unavailable. Use a download button instead.');}return;}
   const ext=b.dataset.sampleDownload==='txt'?'txt':'md',blob=new Blob([content],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='my-ai-work-sample.'+ext;a.click();measure('download_'+ext);setTimeout(()=>URL.revokeObjectURL(url),1000);status('Download prepared. Review the file before sharing it.');
  }
 });
}
