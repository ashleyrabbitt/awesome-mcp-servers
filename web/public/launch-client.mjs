import {cleanLaunch,launchFields,launchIssues,launchMarkdown} from './launch-planner.mjs';
const key='ai-superpower-agent-pilot-v1';
const read=()=>cleanLaunch(Object.fromEntries(new FormData(document.querySelector('#agent-launch-plan'))));
const status=text=>{const el=document.querySelector('#launch-status');if(el)el.textContent=text;};
const metric=action=>{if(typeof window.gtag==='function')window.gtag('event','launch_tool_action',{action,tool:'agent_launch_planner'});};
function fill(p){const form=document.querySelector('#agent-launch-plan');if(!form)return;for(const [name]of launchFields)form.elements[name].value=p[name]||'';invalidate();}
function invalidate(){const b=document.querySelector('[data-launch-download]');if(b)b.disabled=true;const p=document.querySelector('#launch-preview');if(p)p.textContent='Build your plan to update this preview.';}
export function installLaunch(){
 document.addEventListener('site:navigate',()=>{const f=document.querySelector('#agent-launch-plan');if(!f||f.dataset.restored)return;f.dataset.restored='true';try{const raw=localStorage.getItem(key);if(raw){fill(cleanLaunch(JSON.parse(raw)));status('Saved draft restored. Build your plan to review it.');}}catch{status('Saved draft is unavailable. You can still build and download a plan.');}});
 document.addEventListener('input',ev=>{if(ev.target.closest('#agent-launch-plan')){invalidate();status('Draft changed. Build your plan again to update the tests.');}});
 document.addEventListener('submit',ev=>{if(ev.target.id!=='agent-launch-plan')return;ev.preventDefault();const p=read(),missing=launchIssues(p);if(missing.length){status('Complete: '+missing.join(', '));return;}document.querySelector('#launch-preview').textContent=launchMarkdown(p);document.querySelector('[data-launch-download]').disabled=false;status('Plan ready. All five tests are marked not tested until you record evidence.');metric('plan_built');});
 document.addEventListener('click',ev=>{const t=ev.target.closest('button,a');if(!t)return;if(t.dataset.launchCta&&typeof window.gtag==='function')window.gtag('event','launch_offer_click',{offer:t.dataset.launchCta,page_path:location.pathname});
  if(t.hasAttribute('data-launch-sample')){fill(Object.fromEntries(launchFields.map(([k,,v])=>[k,v])));status('Fictional weekly research example loaded. Your saved draft is unchanged.');}
  if(t.hasAttribute('data-launch-clear')){try{localStorage.removeItem(key);}catch{}fill({});status('Entries cleared. If browser storage is available, the saved draft was removed.');}
  if(t.hasAttribute('data-launch-save')){try{localStorage.setItem(key,JSON.stringify(read()));status('Draft saved in this browser. Use Download to keep a separate copy.');}catch{status('Browser storage is unavailable. Build and download your plan instead.');}}
  if(t.hasAttribute('data-launch-download')){const p=read();if(launchIssues(p).length)return;const url=URL.createObjectURL(new Blob([launchMarkdown(p)],{type:'text/markdown;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='agent-pilot-plan.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);metric('plan_downloaded');}
 });
}
