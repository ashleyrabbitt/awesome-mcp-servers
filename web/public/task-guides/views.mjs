import {referenceExamples} from './examples.mjs';
import {escapeHTML as e} from '../catalog.mjs';
import {accessLabel} from '../discovery-plus.mjs';
import {taskBase,tasks,taskGroups,reading} from './tasks.mjs';
import {taskProducts} from './products.mjs';

const pathFor = task => taskBase+'/'+task.id;
const productsFor = task => taskProducts.filter(product=>product.task===task.id);
const searchable = value => value.toLowerCase().normalize('NFKD').replace(/\p{M}/gu,'').replace(/[^a-z0-9]+/g,' ').trim();
const stopWords = new Set('a an and are as at by can do for from how i in into is me my of on or the to tools tool want with ai'.split(' '));
export function findTasks(query){
  if(!query.trim())return tasks;
  const terms=[...new Set(searchable(query).split(' ').filter(term=>term&&!stopWords.has(term)))];
  if(!terms.length)return [];
  return tasks.map(task=>{
    const words=new Set(searchable([task.title,task.group,...task.keywords,...productsFor(task).map(p=>p.name)].join(' ')).split(' '));
    const hits=terms.filter(term=>words.has(term)||words.has(term+'s')||(term.endsWith('s')&&words.has(term.slice(0,-1)))).length;
    return {task,hits};
  }).filter(row=>row.hits>=Math.ceil(terms.length/2)).sort((a,b)=>b.hits-a.hits).map(row=>row.task);
}
const guideCard = task => `<article class="task-tile"><h3><a href="${pathFor(task)}">${e(task.title)}</a></h3><p>${e(task.description)}</p><small>${productsFor(task).map(p=>e(p.name)).join(' · ')}</small></article>`;
export function taskSearchLinks(query){
  const found=query?findTasks(query).slice(0,3):[];
  return `<section class="task-search-links">${found.length?`<h2>Guided comparisons for your search</h2><ul>${found.map(t=>`<li><a href="${pathFor(t)}">${e(t.title)}</a></li>`).join('')}</ul>`:''}<a href="${taskBase}">Browse the task guides and practice briefs →</a></section>`;
}
const testedGuides = `<section class="task-shelf"><h2>See how a real tool test turned out</h2><div class="task-tiles"><article class="task-tile"><h3><a data-editorial-link href="/guides/exa-vs-tinyfish-web-extraction-test">Exa and TinyFish on three live pages</a></h3><p>See which tool returned an outdated service price and which one lost the package headings. Inspect the inputs and outputs behind the findings.</p></article><article class="task-tile"><h3><a data-editorial-link href="/guides/mcp-publishing-workflow-test-report">GitHub, Railway and Supabase in one publishing workflow</a></h3><p>Follow three read-only checks from the source change to the deployment to the published record. See what each connector could verify.</p></article></div></section>`;
function referenceTable(id){
  const example=referenceExamples[id];
  if(!example)return '';
  return `<section class="task-reference"><h2>${e(example.title)}</h2><div class="reference-scroll" tabindex="0" role="region" aria-label="Reference answers"><table><thead><tr>${example.headings.map(h=>`<th scope="col">${e(h)}</th>`).join('')}</tr></thead><tbody>${example.rows.map(row=>`<tr>${row.map((cell,i)=>i?`<td>${e(cell)}</td>`:`<th scope="row">${e(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table></div><p>${e(example.note)}</p></section>`;
}
function indexPage(params){
  const q=(params.get('q')||'').trim().slice(0,160), matches=findTasks(q);
  return `<div class="wrap task-library"><header class="task-cover"><div><a class="text-link" href="/explore-ai">AI resource guide</a><h1>Find AI tools by task</h1><p class="lead">Choose something you want to finish. Compare the tools that can help, try a shared brief and check the result for yourself.</p>
    <form action="${taskBase}" role="search" class="resource-search"><label for="task-filter">Find a task or product</label><div><input type="search" name="q" id="task-filter" maxlength="160" value="${e(q)}" placeholder="Try podcast, inventory or a product name"><button class="button">Find a guide</button></div></form></div><img src="/assets/work-income/professional-work.webp" alt="" width="700" height="500"></header>
    ${q?`<p role="status">${matches.length} ${matches.length===1?'guide':'guides'} matching “${e(q)}”. <a href="${taskBase}">Clear search</a></p>`:''}
    ${taskGroups.map(group=>{const entries=matches.filter(task=>task.group===group);return entries.length?`<section class="task-shelf"><h2>${e(group)}</h2><div class="task-tiles">${entries.map(guideCard).join('')}</div></section>`:''}).join('')}
    ${!matches.length?`<p>Try a shorter task description or <a href="/search?query=${encodeURIComponent(q)}">search the full tool directory</a>.</p>`:''}${!q?testedGuides:''}</div>`;
}
export function guideTrial(id){
  const task=tasks.find(t=>t.id===id);
  if(!task)return null;
  return {task:task.title,criteria:task.checks.join('\n'),sample:task.sample,candidates:productsFor(task).slice(0,2).map(p=>({toolId:p.id}))};
}
function productRow(p){
  return `<tr><th scope="row"><a href="/tools/${e(p.id)}">${e(p.name)}</a><small>${e(p.hosting)}</small></th>
    <td>${e(p.best_for)}<details><summary>First test and access needed</summary><p>${e(p.firstTry)}</p><p>${e(p.permissions)}</p><a href="${e(p.sourceUrl)}">Product documentation ↗</a></details></td>
    <td><strong>${e(accessLabel(p))}</strong><p>${e(p.pricing)}</p><a href="${e(p.pricing_source)}">Check current access ↗</a></td></tr>`;
}
function detailPage(task){
  const products=productsFor(task), [label,href]=reading[task.id];
  return `<article class="wrap task-library"><header class="task-intro"><a href="${taskBase}">← All task guides</a><p class="eyebrow">${e(task.group)}</p><h1>${e(task.title)}</h1><p class="lead">${e(task.description)}</p><nav aria-label="Guide sections"><a href="#products">Compare products</a><a href="#practice">Try the brief</a><a href="#checks">Check the result</a></nav></header>
    <section class="task-shelf" id="products"><h2>Which product fits the job?</h2><p>These four products cover different parts of the task. Check the fit and the plan before starting. Product information reviewed November 21, 2026.</p><div class="task-table-wrap"><table class="task-table"><caption class="sr-only">Products, intended users, first tests and plan access</caption><thead><tr><th scope="col">Product</th><th scope="col">Best fit</th><th scope="col">Access and limits</th></tr></thead><tbody>${products.map(productRow).join('')}</tbody></table></div></section>
    <section class="task-work" id="practice"><div class="task-sample"><h2>Your practice brief</h2><p>${e(task.sample)}</p><a class="button" href="/tool-trial?guide=${task.id}" data-guide-trial="${task.id}">Start a comparison</a><p class="small-note">Opens an editable worksheet with the brief, the checks below and two starting products. Choose the products that fit your sample.</p></div><div><h2>Run the comparison</h2><ol>${task.steps.map(s=>`<li>${e(s)}</li>`).join('')}</ol></div></section>
    ${referenceTable(task.id)}<section class="task-work" id="checks"><div><h2>What a good result includes</h2><ul>${task.checks.map(s=>`<li>${e(s)}</li>`).join('')}</ul></div><aside class="task-reading"><h2>Learn the method</h2><a href="${e(href)}">${e(label)} ↗</a><p>Use the walkthrough to check how the method works before trying your own example.</p></aside></section>
    <section class="task-shelf"><h2>More in ${e(task.group.toLowerCase())}</h2><div class="task-tiles">${tasks.filter(t=>t.group===task.group&&t!==task).map(guideCard).join('')}</div></section></article>`;
}
export function taskGuidePage(path,params=new URLSearchParams()){
  if(path===taskBase)return indexPage(params);
  const task=tasks.find(t=>path===pathFor(t));
  return task?detailPage(task):null;
}
