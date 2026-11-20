import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {newsStories,newsEdition,newsTopics} from '../public/news-data.mjs';
import {renderRoute} from '../public/views.mjs';
import {pageSEO} from '../public/seo.mjs';

test('November 18 sandbox brief separates MCP permissions and preserves earlier dates',()=>{
  const story=newsStories.find(s=>s.id==='codex-sandbox-mcp-permission-boundaries');
  assert.equal(story.date,'2026-11-18');
  assert.equal(story.datePublished,'2026-11-18');
  assert.equal(story.sourceUrl,'https://openai.com/index/inside-the-codex-sandbox/');
  assert.match(story.summary,/does not automatically sandbox/);
  assert.match(story.caveat,/no configuration was tested/);
  assert.equal(newsStories.find(s=>s.id==='google-opal-shutdown-recover-prompts').datePublished,'2026-11-17');
  assert.ok(renderRoute('/news',[]).includes('/news/'+story.id));
});

test('November 13 briefs distinguish announcement dates, publication and operational limits',()=>{
  assert.ok(newsEdition>='2026-11-13');
  const ids=['claude-meetings-beta-participant-permission','claude-managed-agents-self-hosted-control-plane','claude-manufacturing-plugin-review-before-release'];
  for(const id of ids){
    const s=newsStories.find(s=>s.id===id);
    assert.equal(s.date,'2026-11-12');
    assert.equal(s.datePublished,'2026-11-13');
    assert.equal(s.dateModified,'2026-11-13');
    assert.equal(s.next[0],'/tool-trial');
    assert.ok(renderRoute('/news',[]).includes('/news/'+id));
  }
  assert.match(newsStories.find(s=>s.id===ids[0]).caveat,/External guests/);
  assert.match(newsStories.find(s=>s.id===ids[1]).takeaway,/does not mean model inference is local/);
  assert.match(newsStories.find(s=>s.id===ids[2]).summary,/does not operate equipment/);
});

test('November 14 edition adds two sourced briefs without changing prior publication dates',()=>{
  assert.ok(newsEdition>='2026-11-14');
  const ids=['ai-studio-cloud-credits-billing-boundaries','google-flow-tools-creative-continuity-check'];
  for(const id of ids){
    const s=newsStories.find(s=>s.id===id);
    assert.equal(s.datePublished,'2026-11-14');
    assert.equal(s.dateModified,'2026-11-14');
    assert.ok(renderRoute('/news',[]).includes('/news/'+id));
  }
  assert.equal(newsStories.find(s=>s.id===ids[0]).date,'2026-11-13');
  assert.equal(newsStories.find(s=>s.id===ids[1]).date,'2026-11-12');
  assert.match(newsStories.find(s=>s.id===ids[0]).caveat,/\$5 minimum prepayment/);
  assert.match(newsStories.find(s=>s.id===ids[1]).takeaway,/not additional documentary evidence/);
  assert.equal(newsStories.find(s=>s.id==='chatgpt-wallet-agent-purchase-approval').datePublished,'2026-11-13');
});

test('November 15 briefs preserve source dates and distinguish access limits',()=>{
  assert.ok(newsEdition>='2026-11-15');
  const ids=['copilot-december-model-retirement-check','copilot-enterprise-server-local-work-boundary'];
  for(const id of ids){
    const s=newsStories.find(s=>s.id===id);
    assert.equal(s.date,'2026-11-13');
    assert.equal(s.datePublished,'2026-11-15');
    assert.equal(s.dateModified,'2026-11-15');
    assert.ok(renderRoute('/news',[]).includes('/news/'+id));
  }
  assert.match(newsStories.find(s=>s.id===ids[0]).summary,/December 14, 2026/);
  assert.match(newsStories.find(s=>s.id===ids[0]).caveat,/annual plans/);
  assert.match(newsStories.find(s=>s.id===ids[1]).caveat,/cloud sessions are unavailable/);
});

test('news briefs retain original sources, chronological dates and distinct publication metadata',async()=>{
  assert.equal(new Set(newsStories.map(s=>s.id)).size,newsStories.length);
  for(const [i,s] of newsStories.entries()){
    assert.ok(newsTopics.includes(s.topic));
    assert.ok(s.date<=newsEdition);
    if(i)assert.ok(newsStories[i-1].date>=s.date);
    assert.equal(new URL(s.sourceUrl).protocol,'https:');
    for(const key of ['summary','takeaway','action','caveat'])assert.ok(s[key].length>40);
    const path='/news/'+s.id,html=renderRoute(path,[]),seo=pageSEO(path,[],html);
    assert.ok(html.includes(s.title));
    assert.ok(html.includes(s.sourceUrl));
    assert.ok(!renderRoute(s.next[0],[]).includes('Page not found'));
    const article=seo.structured['@graph'].find(n=>n['@type']==='NewsArticle');
    assert.deepEqual(article.citation,[s.sourceUrl]);
    assert.match(s.datePublished,/^\d{4}-\d{2}-\d{2}$/);
    assert.match(s.dateModified,/^\d{4}-\d{2}-\d{2}$/);
    assert.ok(s.datePublished<=s.dateModified);
    assert.equal(article.datePublished,s.datePublished);
    assert.equal(article.dateModified,s.dateModified);
    assert.ok(html.includes('Brief published <time datetime="'+s.datePublished+'"'));
    assert.equal(seo.ogType,'article');
    const built=await readFile(new URL('../dist'+path+'/index.html',import.meta.url),'utf8');
    assert.ok(built.includes(s.title));
    assert.ok(built.includes('news.css'));
  }
  const sitemap=await readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8');
  // The sitemap may be an index; the build's route manifest must include every news page.
  assert.ok(sitemap.includes('sitemap'));
  const routes=JSON.parse(await readFile(new URL('../dist/routes.json',import.meta.url),'utf8'));
  assert.ok(newsStories.every(s=>routes.includes('/news/'+s.id)));
  // These three briefs use the built Tool Trial route. Other older guides are
  // served by the separate agent-guide renderer and are not all in this manifest.
  for(const id of ['google-maps-ai-studio-prototype-production-boundary','google-tpu-8tx-8i-max-agent-workloads','copilot-impact-dashboard-chat-agent-usage']){
    const story=newsStories.find(s=>s.id===id);
    assert.equal(story.next[0],'/tool-trial');
    assert.ok(routes.includes(story.next[0]),`Missing built next-step route: ${id}`);
  }
});

test('news filters produce the selected topic and ignore unknown query input',()=>{
  for(const topic of newsTopics.slice(1)){
    const html=renderRoute('/news?topic='+encodeURIComponent(topic),[]);
    for(const s of newsStories)assert.equal(html.includes('href="/news/'+s.id+'"'),s.topic===topic);
  }
  const attack='<img src=x onerror=alert(1)>';
  const html=renderRoute('/news?topic='+encodeURIComponent(attack),[]);
  assert.ok(!html.includes(attack));
  assert.ok(newsStories.every(s=>html.includes('/news/'+s.id)));
  const missing=renderRoute('/news/no-such-story',[]);
  assert.ok(pageSEO('/news/no-such-story',[],missing).noindex);
});

test('November 10 news retains archive routes and actual publication dates',()=>{
  const ids=['gemini-carbon-wider-access-review-boundaries','claude-fable-copilot-retention-review','github-actions-log-secret-scanning-preview'];
  const archive=renderRoute('/news',[]);
  for(const id of ids){
    const s=newsStories.find(s=>s.id===id);
    assert.equal(s.datePublished,'2026-11-10');
    assert.equal(s.dateModified,'2026-11-10');
    assert.equal(s.next[0],'/tool-trial');
    assert.ok(archive.includes('/news/'+id));
  }
  assert.equal(newsStories.find(s=>s.id===ids[1]).date,'2026-11-09');
  assert.equal(newsStories.find(s=>s.id===ids[2]).date,'2026-11-09');
  assert.equal(newsStories.find(s=>s.id==='google-maps-ai-studio-prototype-production-boundary').datePublished,'2026-11-09');
});

test('homepage follows the current six stories without pinning an old edition',()=>{
  const home=renderRoute('/',[]);
  for(const story of newsStories.slice(0,6))assert.ok(home.includes('/news/'+story.id));
  for(const id of ['google-a2ui-1-stable-agent-interfaces','gemini-decisions-api-bounded-choice-review','databricks-genie-grok-bot-governed-context']){
    const story=newsStories.find(s=>s.id===id);
    assert.equal(story.date,'2026-11-11');
    assert.equal(story.datePublished,'2026-11-11');
    assert.equal(story.dateModified,'2026-11-11');
  }
});

test('November 12 briefs retain original dates as the collection advances',()=>{
  assert.ok(newsEdition>='2026-11-12');
  const home=renderRoute('/',[]);
  for(const id of ['gemini-hydrogen-everyday-agent-workflows','gemini-eyewear-preorders-privacy-check']){
    const s=newsStories.find(story=>story.id===id);
    assert.equal(s.date,'2026-11-12');
    assert.equal(s.datePublished,'2026-11-12');
    assert.equal(s.dateModified,'2026-11-12');
    assert.ok(renderRoute('/news',[]).includes('/news/'+id));
    assert.equal(s.next[0],'/tool-trial');
  }
  assert.equal(newsStories.find(s=>s.id==='google-a2ui-1-stable-agent-interfaces').datePublished,'2026-11-11');
});

test('November 20 safety brief keeps observable evidence separate from hidden reasoning',()=>{
  const story=newsStories.find(s=>s.id==='openai-distillation-defenses-audit-evidence');
  assert.equal(story.date,'2026-11-20');
  assert.equal(story.datePublished,'2026-11-20');
  assert.equal(story.dateModified,'2026-11-20');
  assert.equal(story.sourceUrl,'https://openai.com/index/combatting-adversarial-distillation/');
  assert.match(story.caveat,/not an independent security audit/);
  assert.match(story.action,/fictional task/);
  assert.equal(newsStories.find(s=>s.id==='gemini-mac-computer-use-permission-check').datePublished,'2026-11-19');
});

test('article dates come from each story, independently of the collection edition',()=>{
  const story=newsStories[0];
  const original={datePublished:story.datePublished,dateModified:story.dateModified};
  try {
    Object.assign(story,{datePublished:'2026-10-31',dateModified:'2026-11-01'});
    const path='/news/'+story.id,html=renderRoute(path,[]),seo=pageSEO(path,[],html);
    const article=seo.structured['@graph'].find(n=>n['@type']==='NewsArticle');
    assert.equal(article.datePublished,'2026-10-31');
    assert.equal(article.dateModified,'2026-11-01');
    assert.ok(html.includes('Brief published <time datetime="2026-10-31"'));
    assert.ok(html.includes('Updated <time datetime="2026-11-01"'));
    assert.ok(renderRoute('/news',[]).includes('Edition:'));
  } finally { Object.assign(story,original); }
});

