import {requestCards,dealsView,availabilityForm,discoveryCard} from './discovery-plus-views.mjs';
import {refreshBusiness} from './business.mjs';
let library=null,admin=null,getItems=()=>[],getSaved=()=>[],loadKit=()=>{},navigate=()=>{},notice=()=>{},generation=0;
async function api(action,data){const r=await fetch('/api/maker/'+action,{method:data===undefined?'GET':'POST',headers:data===undefined?{}:{'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data),signal:AbortSignal.timeout(30000)});const result=await r.json();if(!r.ok)throw Object.assign(Error(result.error||'Please retry.'),{status:r.status});return result;}
const list=s=>String(s||'').split(',').map(x=>x.trim()).filter(Boolean);
export function installDiscovery(options){({getItems,getSaved,loadKit,navigate,notice}=options);
 document.addEventListener('growth-ready',event=>{library=event.detail.library||null;admin=event.detail.admin||null;});
 document.addEventListener('growth-reset',()=>{library=null;admin=null;});
 document.addEventListener('submit',async event=>{
  const f=event.target;if(f.id==='task-search'){event.preventDefault();navigate('/search?query='+encodeURIComponent(String(new FormData(f).get('query')||'').trim()));return;}
  if(!f.matches('[data-growth]'))return;event.preventDefault();if(f.dataset.sending)return;f.dataset.sending='true';const b=f.querySelector('button'),msg=f.querySelector('.growth-status'),fd=new FormData(f),d=Object.fromEntries(fd);let action=f.dataset.growth;
  b.disabled=true;msg.textContent='Saving…';
  try{
   d.reviewed=fd.has('reviewed');d.consent=fd.has('consent');
   if(['ask','maker-answer'].includes(action)){f.dataset.reference||=crypto.randomUUID();d.id=f.dataset.reference;}
   if(['save-kit','follow-topics'].includes(action)){
    if(!library)throw Error('Refresh your account before saving.');const collections=library.collections.map(c=>({...c,ids:[...c.ids]}));
    if(action==='save-kit'){const name=String(d.name||'').trim(),ids=[...getSaved()];if(!ids.length)throw Error('Save at least one tool to this browser’s stack first.');const i=collections.findIndex(c=>c.name.toLowerCase()===name.toLowerCase());if(i>=0)collections[i]={name,ids};else collections.push({name,ids});}
    await api('save-library',{version:library.version,collections,topics:action==='follow-topics'?fd.getAll('topics'):library.topics});await refreshBusiness();notice('Your account is updated.');return;
   }
   for(const key of ['answer_tools','alternative_ids'])if(key in d)d[key]=list(d[key]);
   for(const key of ['starts_at','ends_at'])if(d[key])d[key]=new Date(d[key]+'Z').toISOString();
   const result=await api(action,d);
   if(['ask','maker-answer'].includes(action)){msg.textContent='Received for editorial review. Reference: '+result.reference+'. Track your questions in your account.';f.querySelectorAll('input,textarea,select,button').forEach(x=>x.disabled=true);msg.focus();return;}
   await refreshBusiness();notice('Review saved.');
  }catch(err){msg.textContent=err.status===401?'Use the sign-in link above to sign in in another tab, then retry this form. Your draft is still here.':err.message;b.disabled=false;msg.focus();}finally{delete f.dataset.sending;}
 });
 document.addEventListener('change',event=>{if(event.target.matches('[data-availability-select]')){const t=admin?.catalog.find(t=>t.id===event.target.value);document.querySelector('#availability-editor').innerHTML=t?availabilityForm(t):'';}});
 document.addEventListener('click',async event=>{
  const b=event.target.closest('[data-load-kit],[data-delete-kit],[data-request-vote]');if(!b||b.disabled)return;
  try{
   if(b.hasAttribute('data-load-kit')){const c=library?.collections[Number(b.dataset.loadKit)];if(c){loadKit(c.ids);notice('Account kit added to this browser’s stack.');}return;}
   b.disabled=true;
   if(b.hasAttribute('data-delete-kit')){if(!library)throw Error('Refresh your account first.');await api('save-library',{version:library.version,collections:library.collections.filter((_,i)=>i!==Number(b.dataset.deleteKit)),topics:library.topics});await refreshBusiness();notice('Account kit removed. This browser’s stack is unchanged.');return;}
   const own=await api('library'),id=b.dataset.requestVote,active=!own.votes.includes(id);await api('vote',{id,active});await refreshDiscovery();notice(active?'Your vote is saved. Click again to remove it.':'Your vote was removed.');
  }catch(err){notice(err.status===401?'Sign in at My account to support a question.':err.message);}finally{b.disabled=false;}
 });
}
export async function refreshDiscovery(){const gen=++generation,requests=document.querySelector('#growth-requests'),deals=document.querySelector('#growth-deals'),popular=document.querySelector('#growth-popular'),questions=document.querySelector('[data-public-questions]');if(!requests&&!deals&&!popular&&!questions)return;
 try{const data=await api('explore');if(gen!==generation)return;const items=getItems();if(requests?.isConnected)requests.innerHTML=requestCards(data.requests,items);if(deals?.isConnected)deals.innerHTML=dealsView(data.deals,items);if(questions?.isConnected)questions.innerHTML=requestCards(data.requests,items,questions.dataset.publicQuestions);if(popular?.isConnected){const rows=data.popular.map(r=>({...r,tool:items.find(t=>t.id===r.tool_id)})).filter(r=>r.tool);popular.innerHTML='<h2>Popular by recent directory clicks</h2><p class="small-note">Last 30 calendar days. Tools qualify after at least 10 outbound clicks across 3 days. Counts are events, not unique people or product quality ratings; bots and blockers may affect them. Sponsored clicks are excluded.</p>'+(rows.length?'<div class="growth-grid">'+rows.map(r=>discoveryCard(r.tool,r.clicks+' outbound clicks across '+r.active_days+' days.')).join('')+'</div>':'<p class="notice">There is not enough qualifying activity to publish a popularity list yet.</p>');}}
 catch{if(gen!==generation)return;for(const el of [requests,deals,questions,popular])if(el?.isConnected)el.innerHTML='<p role="status">Live updates are temporarily unavailable. <button class="text-link" data-discovery-retry>Retry</button></p>';}
}
if(typeof document!=='undefined')document.addEventListener('click',event=>{if(event.target.closest('[data-discovery-retry]'))refreshDiscovery();});
