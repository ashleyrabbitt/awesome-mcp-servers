import {productLogos,darkLogoBackgrounds} from './product-branding.mjs';
import {escapeHTML as e} from './catalog.mjs';
const icons={
 design:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 10h16M10 10v10"/>',
 code:'<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18"/>',
 video:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',
 audio:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8"/>',
 writing:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8m-8 4h6"/>',
 data:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7"/>',
 research:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6M7 10h6m-3-3v6"/>',
 automation:'<rect x="2" y="3" width="7" height="6" rx="2"/><rect x="15" y="15" width="7" height="6" rx="2"/><path d="M9 6h6a3 3 0 0 1 3 3v6m-3-3 3 3 3-3"/>',
 marketing:'<path d="m3 9 15-5v16L3 15zm3 7 2 5h4l-2-4M21 9v6"/>',
 general:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><path d="M14 17h7m-3.5-3.5v7"/>'
};
export function categoryIcon(category=''){
 const c=category.toLowerCase();
 const key=/design|presentation/.test(c)?'design':/develop|code|security|scanning/.test(c)?'code':/video/.test(c)?'video':/audio|meeting/.test(c)?'audio':/writing|document|knowledge/.test(c)?'writing':/data|analytics|observability|monitor/.test(c)?'data':/research|search/.test(c)?'research':/automat|agent|integration/.test(c)?'automation':/market|sales/.test(c)?'marketing':'general';
 return `<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[key]}</svg>`;
}
export function productIdentity(t){
 let host='';try{host=new URL(t.url).hostname.replace(/^www\./,'');}catch{}
 const repository=host==='github.com'||host==='gitlab.com';
 return `<a class="product-identity" href="/tools/${e(t.id)}" aria-label="Explore ${e(t.name)}">${productSymbol(t)}<strong class="product-brand-name">${e(t.name)}</strong><span class="product-brand-purpose">${e(t.category||t.type)}</span><span class="product-brand-source">${repository?'Code repository':e(host||t.publisher)} <span aria-hidden="true">↗</span></span></a>`;
}

export function productSymbol(t){
 const logo=productLogos[t.id];
 return `<span class="product-symbol ${logo?'has-brand':'category-symbol'}${darkLogoBackgrounds.has(t.id)?' dark-logo-background':''}">${logo?`<img src="${e(logo)}" alt="" loading="lazy" decoding="async" width="64" height="64">`:categoryIcon(t.category)}</span>`;
}
