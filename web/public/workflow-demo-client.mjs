import {workflowDemos,demoFrame,demoIndex} from './workflow-demos.mjs';
export function installWorkflowDemos(doc=document){doc.addEventListener('click',event=>{
  const button=event.target.closest?.('[data-demo-index],[data-demo-move]');
  if(!button)return;const root=button.closest('[data-workflow-demo]'),d=workflowDemos.find(d=>d.id===root?.dataset.workflowDemo);if(!d)return;
  const current=Number(root.querySelector('[data-demo-stage]')?.dataset.demoStage)||0;
  const index=demoIndex(button.dataset.demoIndex??current+Number(button.dataset.demoMove),d.steps.length);
  root.querySelector('[data-demo-frame]').innerHTML=demoFrame(d,index);
  root.querySelectorAll('[data-demo-index]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.demoIndex)===index)));
  root.querySelector('[data-demo-move="-1"]').disabled=index===0;
  root.querySelector('[data-demo-move="1"]').disabled=index===d.steps.length-1;
  root.querySelector('[data-demo-status]').textContent=`Step ${index+1} of ${d.steps.length}: ${d.steps[index][0]}`;
});}
