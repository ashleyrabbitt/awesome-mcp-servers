import {searchGuides} from './task-guides/search-guides.mjs';
import {taskProducts} from './task-guides/products.mjs';
import {tasks,taskBase,reading} from './task-guides/tasks.mjs';
import {escapeHTML as e} from './catalog.mjs';
import {affiliateFor, toolLink} from './tool-links.mjs';
import {productLogos} from './product-branding.mjs';
import {toolPicks} from './explore-data/tools.mjs';
import {technologyPicks} from './explore-data/technology.mjs';
import {learningPicks} from './explore-data/learning.mjs';
import {readingPicks} from './explore-data/reading.mjs';
import {careerPicks} from './explore-data/careers.mjs';
import {practicePrompts} from './explore-data/prompts.mjs';

const base = '/explore-ai';
const edition = 'November 21, 2026';
export const resourceTopics = [
  {key:'popular', slug:'popular-tools', title:'Popular AI tools', intro:'Explore selected consumer AI products from the August 2026 a16z web ranking. Positions use Similarweb monthly visits to the whole product. Each pick comes with a small task you can try.', more:['/tool-trial','Compare two tools on your task']},
  {key:'guides',slug:'guided-tool-comparisons',title:'Guided tool comparisons',intro:'Choose a task, compare four products and use a practice case to check the result.',more:[taskBase,'Browse the task library']},
  {key:'work', slug:'tools-by-task', title:'Tools for work and play', intro:'Prototype a business idea, design a screen, edit a video, plan your day or play a drawing game. Choose a tool by the result you want to make.', more:['/search','Find more tools by task']},
  {key:'marketplaces', slug:'product-hunt-and-appsumo', title:'Product Hunt and AppSumo', intro:'Browse Product Hunt launches with dated positions on its daily leaderboard. Explore AppSumo deals with a first task to try and a link to the current offer and limits.', more:['/product-hunt-picks','Browse the Product Hunt archive']},
  {key:'agents', slug:'ai-agents', title:'Agents and agent builders', intro:'Delegate a repository task, route requests or build your own repeatable workflow. These examples show what to give an agent and how to review its work.', more:['/agents','Open the agent guides']},
  {key:'extensions', slug:'mcp-skills-plugins', title:'MCP servers, skills and plugins', intro:'An MCP server connects an assistant to tools or data. A skill supplies reusable instructions. A plugin bundles capabilities for a particular app. Choose the kind of extension your task needs.', more:['/workflow-library','Browse the workflow library']},
  {key:'models', slug:'ai-models', title:'AI models and comparisons', intro:'Choose a model for the kind of input and output your project needs. Compare provider model IDs, supported tasks and evaluation methods, then try the same example on your shortlist.', more:['/prompts/model-trial-scorecard','Build a model evaluation sheet']},
  {key:'prompts', slug:'practical-prompts', title:'Prompts you can put to work', intro:'Start with a real interview, design handoff, product listing or episode. Open a template, add your inputs, and copy a brief with a clear deliverable.', more:['/prompts','Open the full prompt library']},
  {key:'events', slug:'events-and-conferences', title:'AI events and conferences', intro:'Find an upcoming workshop, developer meetup or research conference. Check the dates, location and registration details and pick a question to bring.', more:['/events','Open the full events calendar']},
  {key:'learning', slug:'courses-and-bootcamps', title:'AI courses and bootcamps', intro:'Compare beginner lessons, project-based programs, college credit, live bootcamps and recorded workshops. Each program includes a way to turn what you learn into a sample of your own work.', more:['/learning-picks','Explore AI Superpower learning paths']},
  {key:'follow', slug:'podcasts-and-newsletters', title:'Podcasts, creators and newsletters', intro:'Find a voice worth returning to for AI reporting, research or a practitioner’s perspective. Start with a specific episode, essay or issue and a question to take into it.', more:['/newsletter','Get the AI Superpower newsletter']},
  {key:'news', slug:'ai-advancements', title:'AI news and advancements', intro:'Read what changed in AI products and research, where the evidence comes from and one way to evaluate the announcement in your own work.', more:['/news','Read the full news desk']},
  {key:'jobs', slug:'technology-jobs', title:'AI and technology jobs', intro:'Explore Florida and remote roles in design, product, customer success, sales and engineering. Check the employer’s current location rules and bring a work sample that fits the role.', more:['/jobs','Filter all technology jobs']}
];
export const exploreRoutes = [base, ...resourceTopics.map(t=>base+'/'+t.slug)];
const shelves = [
  ['Choose a tool', ['guides','popular','work','marketplaces']],
  ['Build a workflow', ['agents','extensions','models','prompts']],
  ['Learn and keep up', ['events','learning','follow','news','jobs']]
];
const prompts = practicePrompts.map(p=>({...p,group:'prompts',tags:['Prompt template',p.role],url:'/prompts/'+p.id}));
const taskCards = tasks.map(t=>({group:'guides',title:t.title,description:t.description,tryThis:t.steps[0],url:taskBase+'/'+t.id,sourceLabel:reading[t.id][0],sourceUrl:reading[t.id][1],tags:[t.group,...t.keywords.slice(0,2)]}));
const productCards = taskProducts.map(p=>({group:'work',title:p.name,description:p.description,tryThis:p.firstTry,url:p.url,sourceLabel:'Read the task guide',sourceUrl:taskBase+'/'+p.task,toolId:p.id,tags:[p.category,p.pricing_model],date:p.date}));
const searchTaskCards=searchGuides.map(g=>({group:'guides',title:g.title,description:g.description,tryThis:g.sample,url:g.path,sourceLabel:g.products[0][0],sourceUrl:g.products[0][1],tags:[g.group,...g.keywords]}));
const allResources = [...taskCards,...searchTaskCards,...productCards,...toolPicks,...technologyPicks,...learningPicks,...readingPicks,...careerPicks,...prompts];
const sampleTitles = {
  guides:'Practice briefs, product comparisons and result checks', popular:'ChatGPT, Gemini and Claude', work:'Design, development, creative work and fun', marketplaces:'Dated launch ranks and software deals',
  agents:'Notion Custom Agents and Copilot Studio', extensions:'Figma MCP, Theme Factory and Claude plugins', models:'Model IDs, inputs and benchmarks',
  prompts:'Customer interviews, design handoffs and model trials', events:'Florida meetups, online events and research conferences',
  learning:'Small-business lessons, live cohorts and college credit', follow:'Farzad, Practical AI and One Useful Thing',
  news:'Voice models, world models and applied research', jobs:'Employer listings and career boards'
};
const actions = {guides:'Open the task guide',popular:'Open tool',work:'Open tool',agents:'See the agent',extensions:'View extension',models:'Explore model resource',prompts:'Customize prompt',learning:'Explore program',follow:'Visit publisher',news:'Read our brief',events:'See event details',jobs:'View employer listing',marketplaces:'View marketplace listing'};
const dateFormat = new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
const dateText = date => dateFormat.format(new Date(date+'T12:00:00Z'));
const liveRows = now => allResources.filter(row=>row.group!=='events'||Date.parse(row.expires)>Number(now));
function displayDate(row){
  if(!row.date) return '';
  if(row.group==='events'){
    const label = row.date===row.endDate?dateText(row.date):dateFormat.formatRange(new Date(row.date+'T12:00Z'),new Date(row.endDate+'T12:00Z'));
    return '<time datetime="'+e(row.date)+'">'+e(label)+'</time>';
  }
  if(row.group==='popular') return '';
  const prefix = row.group==='news'?'Announced':row.tags.includes('Product Hunt')?'Launch':'Checked';
  return prefix+' '+dateText(row.date);
}
function card(row){
  const logo=productLogos[row.toolId];
  const date=displayDate(row);
  const target = row.group==='news'?'/news/'+row.id:row.url;
  const source = row.sourceUrl && row.sourceUrl!==target;
  const referral = row.group==='work' && affiliateFor(row.toolId);
  const primaryLink = referral?toolLink({id:row.toolId,name:row.title},'Open '+row.title,'resource-referral'):
    `<a ${target.startsWith('/guides/')?'data-editorial-link ':''}href="${e(target)}">${row.kind==='job board'?'Browse open roles':actions[row.group]}</a>`;
  const tags = row.tags.join(' · ');
  return `<article class="resource-card"><div class="resource-card-meta">${e(tags)}</div><div class="resource-card-title">${logo?`<img src="${e(logo)}" width="36" height="36" loading="lazy" alt="">`:''}<h3>${e(row.title)}</h3></div>
    ${date?`<p class="resource-date">${date}</p>`:''}${row.group==='popular'?`<p><strong>Ranking evidence</strong> · ${e(row.sourceLabel)}. Measure: monthly visits to the full product website.</p>`:''}${row.toolId?`<p><strong>Why it’s featured</strong> · ${e(row.description)}</p><small>Editorial selection reviewed November 22, 2026</small>`:`<p>${e(row.description)}</p>`}
    ${row.group==='events'?`<p class="resource-facts">${e(row.format)} · ${e(row.cost)}</p>`:''}
    ${row.kind==='opening'?`<p class="resource-facts">${e(row.location)} · ${e(row.workMode)}</p>${row.locationNotes?`<p>${e(row.locationNotes)}</p>`:''}`:''}
    <div class="resource-try"><strong>${row.kind==='opening'?'What to prepare':'Try this'}</strong><p>${e(row.tryThis)}</p></div>
    <div class="resource-links">${primaryLink}
    ${row.toolId?`<a href="/tools/${e(row.toolId)}">Directory profile</a>`:''}
    ${source?`<a href="${e(row.sourceUrl)}">${e(row.sourceLabel)}</a>`:''}</div>${referral?`<p class="small-note">${e(referral.disclosure)}</p>`:''}</article>`;
}
const searchForm = (q,action) => `<form class="resource-search" action="${e(action)}" method="get" role="search"><label for="resource-q">Search ${action===base?'all resources':'this collection'}</label><div><input id="resource-q" name="q" value="${e(q)}" type="search" maxlength="160" placeholder="Try Florida, podcast, design or a tool name"><button class="button">Search</button></div></form>`;
function topicGrid(){
  return shelves.map(([heading,keys])=>`<section class="resource-shelf"><h2>${heading}</h2><div class="resource-topics">${keys.map(key=>{
    const t=resourceTopics.find(topic=>topic.key===key);
    return `<a class="resource-topic" href="${base}/${t.slug}"><h3>${e(t.title)}</h3><p>${e(sampleTitles[key])}</p></a>`;
  }).join('')}</div></section>`).join('');
}
export function explorePage(path,params=new URLSearchParams(),now=new Date()){
  if(!exploreRoutes.includes(path)) return null;
  const topic=resourceTopics.find(t=>path===base+'/'+t.slug);
  const query=(params.get('q')||'').trim().slice(0,160);
  const topicTitle=topic?.title||'AI resource guide';
  const intro=topic?.intro||'Find a tool for the job, a class worth your time or a person worth following. Each pick comes with a source and something you can try.';
  const terms=query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const topics=topic?[topic]:resourceTopics;
  const rows=liveRows(now);
  const sections=topics.map(t=>({t,rows:rows.filter(r=>r.group===t.key&&terms.every(term=>[t.title,r.title,r.description,r.tryThis,r.sourceLabel,r.format,r.location,...r.tags].join(' ').toLocaleLowerCase().includes(term)))})).filter(s=>s.rows.length);
  const count=sections.reduce((total,s)=>total+s.rows.length,0);
  const header=`<header class="resource-head ${topic?'':'resource-cover'}"><div>${topic?`<a class="resource-back" href="${base}">All AI resources</a>`:`<span class="eyebrow">THE AI SUPERPOWER EDIT</span>`}<h1>${e(topicTitle)}</h1><p class="lead">${e(intro)}</p>${searchForm(query,path)}</div>${!topic?`<img src="/assets/work-income/professional-work.webp" alt="" width="700" height="500" fetchpriority="high">`:''}</header>`;
  const results = sections.map(({t,rows})=>`<section class="resource-shelf"><h2>${topic?'Selected resources':e(t.title)}</h2><div class="resource-cards">${rows.map(card).join('')}</div></section>`).join('');
  return `<div class="wrap resource-guide">${header}${!topic&&!query?topicGrid():
    `<div class="resource-summary"><p role="status">${count} ${count===1?'resource':'resources'}${query?' matching “'+e(query)+'”':''}</p>${query?`<a href="${path}">Clear search</a>`:''}${topic?`<a href="${topic.more[0]}">${e(topic.more[1])}</a>`:''}</div>${results||'<p>Try a broader search or browse all resource topics.</p>'}` }
    <p class="resource-edition">Edition reviewed ${edition}. Check the provider for current access, pricing and availability.</p></div>`;
}
