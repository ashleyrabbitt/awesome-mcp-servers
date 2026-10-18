import {playbooks,roleKits,playbookMarkdown,stackCost} from './useful-work.mjs';
import {changeCards,publicKitView} from './useful-work-views.mjs';
import {refreshBusiness} from './business.mjs';
let library=null,extras=null,getItems=()=>[],loadKit=()=>{},startTrial=()=>{},navigate=()=>{},notice=()=>{},publicKit=null,generation=0;
const key='superpowers-playbook-progress-v1';
async function api(action,data){const r=await fetch('/api/maker/'+action,{method:data===undefined?'GET':'POST',headers:data===undefined?{}:{'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data),signal:AbortSignal.timeout(30000)});const result=await r.json();if(!r.ok)throw Object.assign(Error(result.error||'Please retry.'),{status:r.status});return result;}
function progress(){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {};}}
function showProgress(){const saved=progress();for(const p of playbooks){const checked=Array.isArray(saved[p.id])?saved[p.id].filter(i=>Number.isInteger(i)&&i>=0&&i<p.steps.length):[];document.querySelectorAll('[data-playbook-check="'+p.id+'"]').forEach(c=>c.checked=checked.includes(Number(c.value)));const out=document.querySelector('[data-playbook-progress="'+p.id+'"]');if(out)out.textContent=checked.length+' of '+p.steps.length+' steps complete';}}
function download(name,content){const url=URL.createObjectURL(new Blob([content],{type:'text/markdown;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export function installUsefulWork(options){({getItems,loadKit,startTrial,navigate,notice}=options);
 document.addEventListener('growth-ready',event=>{library=event.detail.library||null;extras=event.detail.useful||null;});document.addEventListener('growth-reset',()=>{library=null;extras=null;});
 document.addEventListener('change',event=>{const b=event.target;if(!b.matches('[data-playbook-check]'))return;const p=playbooks.find(p=>p.id===b.dataset.playbookCheck);if(!p)return;const saved=progress();saved[p.id]=[...document.querySelectorAll('[data-playbook-check="'+p.id+'"]:checked')].map(x=>Number(x.value));try{localStorage.setItem(key,JSON.stringify(saved));showProgress();}catch{notice('Browser storage is unavailable. Download the checklist to keep a copy.');}});
 document.addEventListener('submit',async event=>{const f=event.target;
  if(f.id==='useful-starter'){event.preventDefault();navigate('/start?'+new URLSearchParams(new FormData(f)));return;}
  if(f.id==='stack-cost'){event.preventDefault();const rows=[...f.querySelectorAll('[data-cost-row]')].map(el=>Object.fromEntries([...el.querySelectorAll('input,select')].map(x=>[x.name,x.value]))),r=stackCost(rows);f.querySelector('[role="status"]').textContent=r?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(r.monthly)+' per month equivalent · '+new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(r.annualEquivalent)+' annual equivalent, based on your entries.':'Enter each price, seat count and usage allowance. Leave unknown amounts unestimated.';return;}
  if(!f.matches('[data-useful]')&&f.id!=='digest-unsubscribe')return;event.preventDefault();if(f.dataset.sending)return;f.dataset.sending='true';const b=f.querySelector('button'),msg=f.querySelector('[role="status"]'),fd=new FormData(f),d=Object.fromEntries(fd);b.disabled=true;msg.textContent='Saving…';
  try{let action=f.dataset.useful;
   if(f.id==='digest-unsubscribe'){action='unsubscribe-digest';d.token=location.hash.slice(1);}
   if(action==='publish-kit'){const kit=library?.collections[Number(d.collection)];if(!kit||d.collection==='')throw Error('Choose a private account kit first.');f.dataset.reference||=crypto.randomUUID();Object.assign(d,{id:f.dataset.reference,tool_ids:kit.ids,consent:fd.has('consent')});}
   if(action==='report-tool'){f.dataset.reference||=crypto.randomUUID();d.id=f.dataset.reference;}
   if(action==='save-preferences'){d.version=Number(d.version);d.watched=[...new Set([...fd.getAll('watched'),...(d.add_tool?[d.add_tool]:[])])];d.digest_enabled=fd.has('digest_enabled');d.consent=d.digest_enabled;}
   const result=await api(action,d);
   if(action==='unsubscribe-digest'){history.replaceState(null,'',location.pathname);msg.textContent='The weekly tool digest is now off for this link. Your other subscriptions are unchanged.';return;}
   if(action==='report-tool'){msg.textContent='Received for review. Track this report in your account. Reference: '+result.id;return;}
   await refreshBusiness();notice(action==='publish-kit'?'Public copy created. Open its link in your account.':'Saved.');
  }catch(err){msg.textContent=err.status===401?'Sign in at My account, then return to this page to retry. Your draft is still here.':err.message;b.disabled=false;}finally{delete f.dataset.sending;}
 });
 document.addEventListener('click',async event=>{const b=event.target.closest('[data-role-kit],[data-playbook-download],[data-practice-copy],[data-field-trial],[data-playbook-reset],[data-watch-tool],[data-revoke-kit],[data-copy-public-kit]');if(!b||b.disabled)return;
  try{
   if(b.dataset.roleKit){const k=roleKits.find(k=>k.id===b.dataset.roleKit);if(k)loadKit(k.ids);return;}
   if(b.dataset.copyPublicKit){if(publicKit?.id===b.dataset.copyPublicKit)loadKit(publicKit.tool_ids);return;}
   if(b.dataset.playbookReset){const saved=progress();delete saved[b.dataset.playbookReset];localStorage.setItem(key,JSON.stringify(saved));showProgress();return;}
   const id=b.dataset.playbookDownload||b.dataset.practiceCopy||b.dataset.fieldTrial,p=playbooks.find(p=>p.id===id);
   if(p){if(b.dataset.playbookDownload)download(p.id+'.md',playbookMarkdown(p));if(b.dataset.practiceCopy){await navigator.clipboard.writeText(p.sample+'\n\n'+p.prompt);notice('Sample and prompt copied.');}if(b.dataset.fieldTrial)startTrial(p);return;}
   b.disabled=true;
   if(b.dataset.watchTool){await api('watch-tool',{tool_id:b.dataset.watchTool});notice('Tool added to your private watchlist. Manage email preferences in My account.');b.textContent='Watching · manage in My account';}
   if(b.dataset.revokeKit){await api('revoke-kit',{id:b.dataset.revokeKit,version:b.dataset.version});await refreshBusiness();notice('Public copy unpublished. Your private kit is unchanged.');}
  }catch(err){notice(err.status===401?'Sign in at My account to watch a tool or publish a kit.':err.message);}finally{b.disabled=false;}
 });
}
export async function refreshUsefulWork(){showProgress();const gen=++generation,target=document.querySelector('#useful-changes'),shared=document.querySelector('#public-kit');publicKit=null;
 try{if(target){const d=await api('tool-changes');if(gen===generation&&target.isConnected)target.innerHTML=changeCards(d.changes,getItems());}
  const match=location.pathname.match(/^\/community-kits\/([a-f0-9-]{36})$/);if(match){const d=await api('public-kit?id='+encodeURIComponent(match[1]));if(gen===generation){publicKit=d;if(shared?.isConnected)shared.innerHTML=publicKitView(d,getItems());}}
 }catch(err){const el=shared||target;if(el?.isConnected)el.textContent=err.status===404?'This kit is no longer published.':'Live information is temporarily unavailable. Reload to retry.';}
}
