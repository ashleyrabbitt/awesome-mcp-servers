const header=document.querySelector('.site-header');
// Keep the saved-kit badge accurate on article pages, which do not load the app router.
function savedCount(){try{const saved=JSON.parse(localStorage.getItem('waymaker-superpowers-v1')||'{}').saved;const count=document.querySelector('#saved-count');if(count)count.textContent=String(Array.isArray(saved)?new Set(saved.filter(id=>typeof id==='string')).size:0);}catch{}}
savedCount();window.addEventListener('storage',savedCount);
const mobile=matchMedia('(max-width: 940px)');
const menu=header?.querySelector('.site-menu');
const panels=()=>[...header.querySelectorAll('details[data-nav-panel]')].filter(p=>p!==menu||mobile.matches);
if(menu){const updateMenu=()=>{menu.open=!mobile.matches;};updateMenu();mobile.addEventListener('change',updateMenu);}
function closePanels({focus=false}={}){const open=panels().filter(p=>p.open);open.reverse().forEach(p=>{p.open=false});if(focus&&open.length)open.at(-1).querySelector('summary')?.focus();}
function activeNav(){const path=location.pathname;const group=/^\/(directory|tools|search|updates|alternatives|free-tools|collections)/.test(path)?'tools':/^\/agents/.test(path)?'agents':/^\/(training|learn|guides|ai-practice|journeys|prompts|resources|start|workflows)/.test(path)?'learn':/^\/(work-with-us|working-session|coaching|workshops)/.test(path)?'help':'';header.querySelectorAll('[data-nav-group]').forEach(a=>{if(a.dataset.navGroup===group)a.setAttribute('aria-current',a.pathname===path?'page':'true');else a.removeAttribute('aria-current');});}
if(header){document.addEventListener('submit',event=>{if(event.target.id==='search-form')closePanels();});document.addEventListener('click',event=>{if(!header.contains(event.target)||event.target.closest('a'))closePanels();});document.addEventListener('keydown',event=>{if(event.key==='Escape')closePanels({focus:true});});panels().forEach(panel=>panel.addEventListener('toggle',()=>{if(!panel.open)return;panels().forEach(other=>{if(other!==panel&&!other.contains(panel)&&!panel.contains(other))other.open=false;});}));window.addEventListener('popstate',activeNav);document.addEventListener('site:navigate',activeNav);activeNav();}
