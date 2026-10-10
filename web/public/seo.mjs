import {siteOrigin} from './site-config.mjs';
import {escapeHTML as e} from './catalog.mjs';
import {answers} from './answers.mjs';
import {missions} from './discovery.mjs';
import {promptTemplates} from './prompt-kit.mjs';
import {howTos,resourceKits} from './resource-kit.mjs';
const privatePaths=new Set(['/my-kit','/saved','/compare','/hq','/shared','/404']);
const summaries={
'/finder':'Find a practical AI task match based on your work, goal, budget approach and setup experience. Save tool starting points and follow a free learning path.',
'/first-win':'A free seven-day AI challenge: choose a task, map the work, test a tool, create a draft, review it and save a reusable kit. Track your progress in your browser.',
'/comparisons':'Compare AI tools for campaign visuals, research and automation with publisher sources, setup tradeoffs and criteria for your own same-task trial.',
'/worksheets':'Free AI workflow mapping, output review, tool trial and team adoption worksheets. Print, complete and download practical templates.',
'/community':'Submit a practical AI workflow, evidence and lessons for editorial review. Share a public example with attribution and learn from community field notes.',

'/journeys':'Complete free self-paced AI courses and guided journeys for campaign creation, customer feedback and weekly reporting. Use practice inputs, prompts and review checks, then save or download your work.',
'/comparison-challenge':'Compare AI reporting tools with the same synthetic dataset, transparent answer key and evaluation criteria. Record your own results in the Tool Trial Lab.',
'/product-hunt-picks':'Eight practical AI tools discovered on Product Hunt, with publisher sources, use cases, limitations and first exercises for marketers, designers, product managers and developers.',
'/working-session':'A $350 AI Working Session with Ashley Kays. Work through one practical marketing, design, product or automation task with human guidance. Inquire about availability.',
'/workshops/campaign':'Practice AI-assisted campaign creation in a guided workshop. Build a brief, explore message directions and review a draft. Dates and pricing confirmed by inquiry.',
'/kits':'Free practical AI kits for campaigns, customer research and careful automation. Mini lessons, editable prompts, worksheets and human review checklists.',
'/opportunity-finder':'Assess recurring tasks for AI assistance with transparent rules for judgment, data sensitivity, consequences and output checks.',
'/field-guide':'Download an eight-page printable AI Field Guide or complete editable worksheets for briefs, permissions, agent missions and tool evaluation.',
'/submit':'Submit an AI tool, MCP server, agent or service provider to Superpowers. Share a useful description and official link for editorial review.',
'/services':'Find AI consultants, automation specialists, designers, marketers, developers, trainers and coaches. Explore service categories or submit your own listing.',
'/tool-trial':'Compare up to three AI tools using the same task and criteria. Record your evidence, verdict and review time, save a browser-local trial and download a decision report.',
'/':'Discover AI tools, MCP servers and agents for real work. Build your superpowers with practical prompts, workflow plans, training, workshops and coaching.',
'/directory':'Browse AI apps, MCP servers, agents, plugins and security tools by role, category and setup level. Read sources, compare tools and save a personal stack.',
'/repositories':'Explore GitHub repositories for MCP servers, agents and developer tools. Check publisher sources, setup requirements and permissions before using them.',
'/discoveries':'Explore recent Superpowers picks for creative work, research, agents, browser assistants, MCP integrations and security, with first tasks and human review checkpoints.',
'/reviewed':'Browse every documentation-reviewed Superpowers tool and integration. Find practical first tasks, permissions, publisher sources and review dates.',
'/answers':'Clear answers about MCP servers, AI agents, prompts and workflows. Use real-work examples and practical next steps from the Superpowers Power Handbook.',
'/workflow-lab':'Map where AI fits in six everyday workflows. Choose human decisions, assisted steps and possible automations, then save or download your plan.',
'/time-savings':'Estimate AI workflow time savings including drafting, review, rework and setup. Compare a weekly baseline and see when setup time could pay back.',
'/resources':'Use free workflow planning tools, step-by-step how-tos and downloadable worksheets to turn an AI idea into a practical pilot.',
'/prompts':`Customize ${promptTemplates.length} prompts for design, marketing, product and development. Add context and constraints, then copy or download a prompt to use in your AI tool.`,
'/training':'All Superpowers courses are free. Explore self-paced AI learning paths for designers, marketers, product managers and developers. Special live workshops are priced separately.',
'/workshops':'Explore special paid Superpowers live workshop topics for practical AI workflows, team learning and responsible tool adoption. Ask about a workshop for your team.',
'/coaching':'Get human guidance from Waymaker for choosing AI tools, building a useful workflow and developing practical skills. Start a coaching conversation.',
'/newsletter':'Power Notes from Superpowers by Waymaker: new tools, practical workflows and news about training and workshops. Subscribe through MailerLite and confirm your email to join.'
};
export const plain=s=>String(s||'').replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();
export function pageSEO(url,items,content,origin=siteOrigin){
 const u=new URL(url,origin),route=u.pathname.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/';
 const tool=items.find(t=>route==='/tools/'+t.id),answer=answers.find(a=>route==='/answers/'+a.id);
 const kind=route.split('/')[1],id=route.split('/')[2];
 const mission=['missions','stacks'].includes(kind)&&missions.find(m=>m.id===id);
 const prompt=kind==='prompts'&&promptTemplates.find(p=>p.id===id);
 const howto=kind==='how-to'&&howTos.find(h=>h.id===id),resource=kind==='resources'&&resourceKits.find(r=>r.id===id);
 const heading=plain(content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1])||'Page not found';
 const title=route==='/'?'AI tools, MCP servers & practical workflows — Superpowers':heading+(prompt?' · Prompt template':mission?kind==='stacks'?' · Guided stack':' · Tool mission':'')+' — Superpowers by Waymaker';
 const intro=plain(content.match(/<div class="page-head"[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/)?.[1]||content.match(/<p class="(?:description|lead|intro)"[^>]*>([\s\S]*?)<\/p>/)?.[1]);
 const specific=prompt?`Customize a ${prompt.role.toLowerCase()} prompt to ${prompt.title.toLowerCase()}. Add source material and constraints, then copy or download your draft for review.`:mission?kind==='stacks'?`Follow a guided stack to ${mission.title.toLowerCase()}. Use suggested tools, practical steps and a reusable prompt to produce ${mission.output.toLowerCase()}.`:`Explore tool starting points to ${mission.title.toLowerCase()}. ${mission.output||mission.intro} Review sources and choose a small first task.`:howto?.intro||resource?.description;
 const description=(tool?.description||answer?.answer||specific||summaries[route]||intro||`${heading}. Explore practical guidance, related tools and next steps with Superpowers by Waymaker.`).slice(0,300);
 const noindex=privatePaths.has(route)||tool?.status==='Community listing'||u.search.length>0||/Page not found|lost your way/i.test(heading);
 const canonical=origin+(route==='/support'?'/coaching':route),image=origin+'/assets/hero-everyday.webp';
 const website={'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Superpowers by Waymaker',publisher:{'@id':origin+'/#organization'}};
 const organization={'@type':'Organization','@id':origin+'/#organization',name:'Waymaker AI INC',url:'https://waymaker.cx',brand:{'@type':'Brand',name:'Superpowers'}};
 const page={'@type':answer?'Article':'WebPage','@id':canonical+'#page',url:canonical,name:heading,description,isPartOf:{'@id':origin+'/#website'},inLanguage:'en',publisher:{'@id':origin+'/#organization'}};
 if(answer)Object.assign(page,{headline:answer.title,author:{'@id':origin+'/#organization'},dateModified:'2026-10-07',image});
 const graph=[website,organization,page];
 if(route!=='/'&&!noindex)graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Superpowers',item:origin+'/'},{'@type':'ListItem',position:2,name:heading,item:canonical}]});
 if(tool&&!noindex)graph.push({'@type':'SoftwareApplication','@id':canonical+'#software',name:tool.name,description:tool.description,url:tool.url,applicationCategory:tool.category,publisher:{'@type':'Organization',name:tool.publisher},mainEntityOfPage:{'@id':canonical+'#page'}});
 return {title,description,canonical,image,noindex,ogType:answer?'article':'website',structured:{'@context':'https://schema.org','@graph':graph}};
}
export function seoMarkup(s){return `<link rel="canonical" href="${e(s.canonical)}"><meta name="robots" content="${s.noindex?'noindex, follow':'index, follow, max-image-preview:large'}"><meta property="og:title" content="${e(s.title)}"><meta property="og:description" content="${e(s.description)}"><meta property="og:url" content="${e(s.canonical)}"><meta property="og:type" content="${s.ogType}"><meta property="og:site_name" content="Superpowers by Waymaker"><meta property="og:image" content="${e(s.image)}"><meta property="og:image:alt" content="Everyday creativity with illustrated superpowers"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${e(s.title)}"><meta name="twitter:description" content="${e(s.description)}"><meta name="twitter:image" content="${e(s.image)}"><script id="structured-data" type="application/ld+json">${JSON.stringify(s.structured).replace(/</g,'\\u003c')}</script>`;}
export function updateSEO(doc,s){
 doc.title=s.title;
 const tag=(selector,attrs)=>{let el=doc.querySelector(selector);if(!el){el=doc.createElement(selector.startsWith('link')?'link':'meta');doc.head.append(el)}for(const [k,v]of Object.entries(attrs))el.setAttribute(k,v);};
 tag('link[rel="canonical"]',{rel:'canonical',href:s.canonical});
 for(const [name,value]of Object.entries({description:s.description,robots:s.noindex?'noindex, follow':'index, follow, max-image-preview:large','twitter:card':'summary_large_image','twitter:title':s.title,'twitter:description':s.description,'twitter:image':s.image}))tag(`meta[name="${name}"]`,{name,content:value});
 for(const [property,value]of Object.entries({'og:title':s.title,'og:description':s.description,'og:url':s.canonical,'og:image':s.image,'og:type':s.ogType}))tag(`meta[property="${property}"]`,{property,content:value});
 let ld=doc.querySelector('#structured-data');if(!ld){ld=doc.createElement('script');ld.id='structured-data';ld.type='application/ld+json';doc.head.append(ld)}ld.textContent=JSON.stringify(s.structured);
}

