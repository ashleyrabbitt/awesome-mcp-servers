import {curated,escapeHTML as e} from './catalog.mjs';

// Only locally reviewed, owner-issued referrals are eligible. Database submissions
// cannot supply or override the commercial destination.
export function affiliateFor(id){
  const tool=curated.find(t=>t.id===id);
  if(!tool?.affiliateUrl)return null;
  try{const url=new URL(tool.affiliateUrl);return url.protocol==='https:'&&!url.username&&!url.password?{url:url.href,disclosure:tool.affiliateDisclosure}:null;}catch{return null;}
}
export function outboundDestination(id,publisherURL){return affiliateFor(id)?.url||publisherURL;}
export function toolLink(tool,label='Open '+tool.name,className='button light'){
  const affiliate=affiliateFor(tool.id);
  return `<a class="${e(className)}" href="/go/${e(tool.id)}" target="_blank" rel="${affiliate?'sponsored nofollow noopener noreferrer':'noopener noreferrer'}"${affiliate?` data-affiliate-tool="${e(tool.id)}"`:''}>${e(label)} ↗${affiliate?' <span class="affiliate-tag">Affiliate link</span>':''}</a>`;
}
export function affiliateNote(ids=[]){return ids.some(id=>affiliateFor(id))?'<p class="affiliate-note">We may earn a commission through links marked “Affiliate link.” <a href="/disclosure">How we choose tools</a>.</p>':'';}
export function candidateLinks(ids,items){const selected=ids.map(id=>items.find(t=>t.id===id)).filter(Boolean);return `<div class="candidate-launch">${selected.map(t=>toolLink(t)).join('')}</div>${affiliateNote(selected.map(t=>t.id))}`;}
