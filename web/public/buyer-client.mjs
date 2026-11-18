import {estimateVoice} from './buyer-studies.mjs';
import {browserMeasurementAllowed} from './task-metrics.mjs';

const sources=new Set(['voice','holiday','briefs','missed-inquiries','client-intake','webinar-repurposing']);
function track(name,source){
  if(sources.has(source)&&browserMeasurementAllowed(window)&&typeof window.gtag==='function'){
    window.gtag('event',name,{study_id:source});
  }
}
export function installBuyerStudies(){
  document.addEventListener('input',event=>{
    const form=event.target.closest('[data-voice-calculator]');
    if(!form)return;
    const out=form.querySelector('output');
    if(!form.checkValidity()){out.textContent='Enter valid positive call volume and duration, and a nonnegative rate.';return;}
    const {calls,minutes,extras}=form.elements;
    const cost=estimateVoice(calls.valueAsNumber,minutes.valueAsNumber,extras.valueAsNumber);
    out.textContent=cost.total.toLocaleString(undefined,{maximumFractionDigits:2})+' minutes · Vapi $'+cost.vapiLow.toFixed(2)+'–$'+cost.vapiHigh.toFixed(2)+' · ElevenAgents $'+cost.eleven.toFixed(2)+' plus any unentered charges';
  });
  document.addEventListener('submit',event=>{
    const cart=event.target.closest('[data-cart-check]');
    if(cart){
      event.preventDefault();
      const correct=Math.round(cart.elements.subtotal.valueAsNumber*100)===11700;
      cart.querySelector('[role="status"]').textContent=(correct?'Correct. ':'Check the exclusions. ')+'The subtotal is $117: $16 + $24 + $12 + $25 + $40. The discount saves $13.';
      return;
    }
    const form=event.target.closest('[data-buyer-decision]');
    if(!form)return;
    event.preventDefault();
    const choice=form.elements.decision.selectedOptions[0];
    if(!choice?.value)return;
    form.querySelector('[role="status"]').textContent='Comparison complete. Your decision: '+choice.textContent+'.';
    try{localStorage.setItem('buyer-decision-'+form.dataset.buyerDecision,choice.value);}catch{}
    if(!form.dataset.completed){track('buyer_comparison_complete',form.dataset.buyerDecision);form.dataset.completed='true';}
  });
  document.addEventListener('click',event=>{
    const el=event.target.closest('[data-buyer-download],[data-buyer-help]');
    if(el?.dataset.buyerDownload)track('buyer_worksheet_download',el.dataset.buyerDownload);
    if(el?.dataset.buyerHelp)track('buyer_help_click',el.dataset.buyerHelp);
  });
}

export function restoreBuyerDecision(){
  const form=document.querySelector('[data-buyer-decision]');
  if(!form)return;
  try{
    const choice=localStorage.getItem('buyer-decision-'+form.dataset.buyerDecision);
    if(['pilot','revise','pass'].includes(choice)){
      form.elements.decision.value=choice;
      form.dataset.completed='true';
      form.querySelector('[role="status"]').textContent='Decision saved in this browser: '+form.elements.decision.selectedOptions[0].textContent+'.';
    }
  }catch{}
}
