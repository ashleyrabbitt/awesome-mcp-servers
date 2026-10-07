import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {curated} from '../public/catalog.mjs';
import {pageSEO,seoMarkup} from '../public/seo.mjs';
import {renderRoute} from '../public/views.mjs';
import {answers} from '../public/answers.mjs';
import {newsletter} from '../public/newsletter.mjs';
import {createServer} from '../server.mjs';
const read=p=>readFile(new URL('../dist/'+p,import.meta.url),'utf8');
test('rendered answers expose unique metadata, absolute canonicals and matching article data',async()=>{
 const descriptions=new Set();
 for(const a of answers){const html=await read('answers/'+a.id+'/index.html');assert.ok(html.includes(a.title));const desc=html.match(/<meta name="description" content="([^"]+)"/)[1];descriptions.add(desc);assert.match(html,/rel="canonical" href="https:\/\/[^"?]+\/answers\//);const graph=JSON.parse(html.match(/type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];assert.equal(graph.find(x=>x['@type']==='Article').headline,a.title);assert.match(html,/og:image/);}
 assert.equal(descriptions.size,answers.length);
});
test('indexing rules exclude personal states, query variants and unreviewed tools without blocking public crawling',async()=>{
 const community={...curated[0],id:'community-example',status:'Community listing'};
 for(const url of ['/saved','/hq','/shared?tools=figma','/directory?query=test','/tools/community-example','/404'])assert.equal(pageSEO(url,[...curated,community],'<h1>Example</h1>').noindex,true);
 assert.equal(pageSEO('/tools/figma',curated,renderRoute('/tools/figma',curated)).noindex,false);
 const sitemap=await read('sitemap.xml');assert.ok(sitemap.includes('/tools/recraft'));assert.ok(!sitemap.includes('/tools/catalog-'));assert.ok(!sitemap.includes('/saved'));assert.ok(!/<loc>[^<]*\?/.test(sitemap));
 const robots=await read('robots.txt');assert.ok(!robots.includes('Disallow: /saved'));assert.ok(robots.includes('Allow: /'));
});
test('structured metadata escapes script delimiters and never invents prices or ratings',()=>{
 const t={...curated[0],name:'</script><script>alert(1)</script>'};const seo=pageSEO('/tools/'+t.id,[t],'<h1>Tool</h1>');const html=seoMarkup(seo);assert.ok(!html.includes(t.name));const app=seo.structured['@graph'].find(x=>x['@type']==='SoftwareApplication');assert.ok(!app.offers&&!app.aggregateRating);
});
test('all new picks and reviewed items have static links; pending newsletter does not collect email',async()=>{
 const html=await read('reviewed/index.html');for(const t of curated)assert.ok(html.includes('href="/tools/'+t.id+'"'));
 const page=renderRoute('/newsletter',curated);if(!newsletter.enabled){assert.ok(page.includes('Signups are opening soon'));assert.ok(!page.includes('type="email"'));assert.ok(!page.includes('href="'+newsletter.shareUrl+'"'));}
});
test('HTTP normalizes duplicate paths and labels query responses for indexing',async()=>{
 const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 try{for(const suffix of ['/','/index.html']){const r=await fetch(base+'/answers/what-is-mcp'+suffix,{redirect:'manual'});assert.equal(r.status,308);assert.equal(r.headers.get('location'),'/answers/what-is-mcp');}const query=await fetch(base+'/directory?query=recraft');assert.match(query.headers.get('x-robots-tag'),/noindex/);const xml=await fetch(base+'/sitemap.xml');assert.match(xml.headers.get('content-type'),/application\/xml/);}finally{await new Promise(r=>server.close(r));}
});
