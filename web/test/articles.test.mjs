import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {practicalArticles} from '../public/practical-articles.mjs';
import {everydayPicks} from '../public/everyday-picks.mjs';
import {curated} from '../public/catalog.mjs';
import {renderRoute} from '../public/views.mjs';
const read=p=>readFile(new URL('../dist/'+p,import.meta.url),'utf8');
test('practical articles render complete content with matching publication metadata and working navigation',async()=>{
 const sitemap=await read('sitemap.xml');
 for(const a of practicalArticles){
  const path='/guides/'+a.id,html=await read(path.slice(1)+'/index.html');
  const article=JSON.parse(html.match(/type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'].find(x=>x['@type']==='Article');
  assert.equal(article.headline,a.title);assert.equal(article.datePublished,a.datePublished);assert.equal(article.dateModified,a.dateModified);assert.equal(article.mainEntityOfPage,'https://aisuperpower.cc'+path);assert.deepEqual(article.citation,a.sources.map(([,url])=>url));
  assert.ok(html.includes(a.answer));assert.ok(html.includes('datetime="'+a.datePublished+'"'));assert.ok(sitemap.includes('<loc>https://aisuperpower.cc'+path+'</loc>'));assert.match(html,/property="og:type" content="article"/);
  for(const [,href]of html.matchAll(/href="(\/[^"]*|#[^"]*)"/g)){
   if(href.startsWith('#'))assert.ok(html.includes('id="'+href.slice(1)+'"'),href);
   else if(!/\.(css|svg|png|webp|ico|txt)$/.test(href))assert.ok(!renderRoute(href.replaceAll('&amp;','&'),curated).includes('Page not found'),href);
  }
  for(const [id]of a.tools){assert.ok(curated.some(t=>t.id===id));assert.ok(renderRoute('/tools/'+id,curated).includes('href="'+path+'"'));}
 }
});
test('everyday additions are discoverable with distinct publisher destinations and sourced pricing',async()=>{
 const discovery=await read('discoveries/index.html');
 const destinations=new Set(curated.map(t=>new URL(t.url).hostname.replace(/^www\./,'')+new URL(t.url).pathname.replace(/\/$/,'')));
 for(const t of everydayPicks){assert.ok(discovery.includes('href="/tools/'+t.id+'"'));assert.equal(t.tested,false);assert.ok(t.pricing_source.startsWith('https://'));assert.equal(t.pricing_checked_at,t.date);assert.ok(t.firstTry&&t.checkpoint);}
 const newUrls=everydayPicks.map(t=>new URL(t.url).hostname.replace(/^www\./,'')+new URL(t.url).pathname.replace(/\/$/,''));
 assert.equal(new Set(newUrls).size,everydayPicks.length);
 for(const url of newUrls)assert.ok(destinations.has(url));
});
