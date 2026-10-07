import {missions} from './discovery.mjs';
import {extraPrompts} from './spotlight.mjs';

export const promptTemplates=[...missions,...extraPrompts].filter(x=>x.prompt);
export function promptFields(template){
  return [...new Set([...template.prompt.matchAll(/\[([^\]\n]+)\]/g)].map(x=>x[1]))];
}
export function buildPrompt(template,values={}){
  const fields=promptFields(template);
  let result=template.prompt.replace(/\[([^\]\n]+)\]/g,(original,label)=>{
    const value=values['field-'+fields.indexOf(label)];
    return typeof value==='string'&&value.trim()?value.trim().slice(0,2500):original;
  });
  for(const [key,label] of [['context','My context'],['constraints','Constraints and review requirements']]){
    if(typeof values[key]==='string'&&values[key].trim())result+='\n\n'+label+':\n'+values[key].trim().slice(0,5000);
  }
  return result;
}
export function cleanPromptFavorites(value){
  const ids=new Set(promptTemplates.map(x=>x.id));
  return Array.isArray(value)?[...new Set(value.filter(id=>typeof id==='string'&&ids.has(id)))]:[];
}
