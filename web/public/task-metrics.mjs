import {curated} from './catalog.mjs';
import {taskDecisions} from './task-paths.mjs';

export function browserMeasurementAllowed(scope=globalThis){
  const n=scope.navigator||{};
  return n.globalPrivacyControl!==true && scope['ga-disable-G-R9X4RKWE12']!==true &&
    ![n.doNotTrack,n.msDoNotTrack,scope.doNotTrack].some(v=>['1','yes'].includes(String(v||'').toLowerCase()));
}

// Only editorial IDs and fixed actions leave this module. Never read form text,
// query strings, referral URLs, sample inputs, downloads or worksheet notes.
export function taskMetric(dataset={},pathname=''){
  const path=String(pathname).split(/[?#]/)[0].replace(/\/$/,'')||'/';
  const id=dataset.taskId||dataset.fieldTrial||dataset.playbookDownload;
  const task=taskDecisions.find(t=>t.id===id);
  if(task){
    const action=dataset.taskAction||(dataset.fieldTrial?'trial':dataset.playbookDownload?'download':'');
    if(!['choose','tool','publisher','help','trial','download'].includes(action))return null;
    if(!['/','/directory','/start','/playbooks','/field-tests','/playbooks/'+id,'/field-tests/'+id].includes(path))return null;
    const tool=['tool','publisher'].includes(action)?dataset.taskTool||'':'';
    if(['tool','publisher'].includes(action)&&!task.candidates.some(([candidate])=>candidate===tool))return null;
    if(action==='publisher'&&!curated.some(t=>t.id===tool&&t.affiliateUrl))return null;
    return {name:'task_path_action',params:{action,task_id:id,tool_id:tool||'none',link_kind:action==='publisher'?'affiliate':'internal',page_path:path}};
  }
  const tool=curated.find(t=>t.id===dataset.affiliateTool&&t.affiliateUrl);
  if(tool&&path==='/tools/'+tool.id)return {name:'tool_referral_click',params:{tool_id:tool.id,placement:'tool_page',page_path:path}};
  return null;
}

export function installTaskMetrics(doc=document,scope=window){
  doc.addEventListener('click',event=>{
    if(!browserMeasurementAllowed(scope)||typeof scope.gtag!=='function')return;
    const el=event.target.closest?.('[data-task-action],[data-field-trial],[data-playbook-download],[data-affiliate-tool]');
    if(!el||el.disabled)return;
    const metric=taskMetric(el.dataset,scope.location.pathname);
    if(metric)scope.gtag('event',metric.name,metric.params);
  });
}
