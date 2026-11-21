import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {explorePage, exploreRoutes} from '../public/explore-ai.mjs';
import {curated} from '../public/catalog.mjs';
import {catalogAdditions} from '../public/explore-data/catalog-additions.mjs';
import {createServer} from '../server.mjs';

test('guide collections publish discoverable pages and link to current catalog profiles',async()=>{
  const sitemap=await readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8');
  const ids=new Set(curated.map(t=>t.id));
  for(const path of exploreRoutes){
    assert.ok(sitemap.includes('<loc>https://aisuperpower.cc'+path+'</loc>'));
    const html=explorePage(path,new URLSearchParams(),new Date('2026-11-21T12:00Z'));
    assert.match(html,/<h1>/);
    for(const [,id] of html.matchAll(/href="\/tools\/([a-z0-9-]+)"/g))assert.ok(ids.has(id),id);
  }
  assert.equal(catalogAdditions.length,17);
  const popular=explorePage('/explore-ai/popular-tools');
  assert.match(popular,/August 2026/);assert.match(popular,/Similarweb monthly visits/);
  assert.match(explorePage('/explore-ai/tools-by-task'),/href="\/go\/descript"[^>]*rel="sponsored/);
  const later=explorePage('/explore-ai/events-and-conferences',new URLSearchParams(),new Date('2026-12-07T12:00Z'));
  assert.doesNotMatch(later,/DevFest Miami/);assert.match(later,/Generative AI Expo/);
});

test('a direct search renders the matching source without client JavaScript',async()=>{
  const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  try{
    const root='http://127.0.0.1:'+server.address().port;
    const response=await fetch(root+'/explore-ai?q=Farzad');
    assert.equal(response.status,200);assert.match(response.headers.get('x-robots-tag'),/noindex/);
    const html=await response.text();
    assert.match(html,/1 resource matching/);assert.match(html,/farzad.fm\/fznews\/optimus-goes-to-school-before-work/);
    const blank=await fetch(root+'/explore-ai?q=zzzz-no-match');
    assert.match(await blank.text(),/0 resources matching/);
  }finally{await new Promise(resolve=>server.close(resolve));}
});
