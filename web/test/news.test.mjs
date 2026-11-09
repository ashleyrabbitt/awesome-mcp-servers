import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {newsStories,newsEdition,newsTopics} from '../public/news-data.mjs';
import {renderRoute} from '../public/views.mjs';
import {pageSEO} from '../public/seo.mjs';

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
