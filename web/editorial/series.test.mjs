import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {readFileSync} from 'node:fs';
import {publishedPosts,renderArticle,renderIndex,renderFeed,sitemapEntries,articlePath,seriesPath,imagePath} from './core.mjs';
import {serveEditorial,attachEditorialDiscovery,config,posts} from './server.mjs';

test('substantive refresh changes modification metadata but preserves first publication and RSS',()=>{
 const original=posts.find(p=>p.slug==='ten-ai-tools-comparison-field-guide');
 const refreshed={...original,modifiedAt:'2026-10-19',author:'Ashley Kays'};
 const html=renderArticle(config,refreshed,[refreshed]);
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'][0];
 assert.equal(schema.datePublished,'2026-10-18');
 assert.equal(schema.dateModified,'2026-10-19');
 assert.equal(schema.author.name,'Ashley Kays');
 assert.match(html,/Updated <time datetime="2026-10-19">October 19, 2026<\/time>/);
 assert.match(html,/<meta property="article:modified_time" content="2026-10-19">/);
 assert.match(sitemapEntries(config,[refreshed]),/<lastmod>2026-10-19<\/lastmod>/);
 assert.ok(renderFeed(config,[refreshed]).includes(new Date('2026-10-18').toUTCString()));
 const unmodified={...refreshed};delete unmodified.modifiedAt;
 assert.ok(!renderArticle(config,unmodified,[unmodified]).includes(' · Updated'));
});

test('release dates govern article links, related links, feeds and sitemaps',()=>{
 assert.ok(posts.length>=3);
 for(let i=0;i<posts.length;i++){
  const now=Date.parse(posts[i].publishedAt),live=publishedPosts(posts,now);
  assert.equal(live.length,posts.filter(p=>Date.parse(p.publishedAt)<=now).length);
  const index=renderIndex(config,posts,now),feed=renderFeed(config,posts,now),map=sitemapEntries(config,posts,now);
  for(const post of posts){
   const url=articlePath(config,post);
   assert.equal(index.includes('href="'+url+'"'),Date.parse(post.publishedAt)<=now);
   assert.equal(feed.includes(config.origin+url),Date.parse(post.publishedAt)<=now);
   assert.equal(map.includes(config.origin+url),Date.parse(post.publishedAt)<=now);
  }
 }
});

test('every article has a complete crawlable body, correct canonical, image and JSON-LD',()=>{
 for(const post of posts){
  const html=renderArticle(config,post,posts,Date.parse(post.publishedAt));
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.ok(html.includes('href="'+config.origin+articlePath(config,post)+'"'));
  assert.ok(html.includes(post.bodyHtml.slice(0,45)));
  assert.ok(html.includes(post.imageAlt.replace(/&/g,'&amp;')));
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema['@graph'][0].datePublished,post.publishedAt);
  assert.equal(schema['@graph'][0].headline,post.title);
  const bytes=readFileSync(new URL('./images/'+post.slug+(post.coverFormat==='svg'?'.svg':'.png'),import.meta.url));
  if(post.coverFormat==='svg'){assert.match(bytes.toString(),/<svg\b/);assert.match(bytes.toString(),/<\/svg>/);}else assert.ok(bytes.subarray(1,4).equals(Buffer.from('PNG')));
  assert.equal(schema['@graph'][0].image.url,config.origin+imagePath(post));
  assert.ok(!html.includes('/ai-practice//'));
 }
});

for(const implicit of [false,true])test('HTTP preserves native content with '+(implicit?'implicit':'explicit')+' headers while exposing only released articles',async()=>{
 if(config.launchFlag)process.env[config.launchFlag.name]=config.launchFlag.value;
 const server=createServer(async(req,res)=>{
  if(await serveEditorial(req,res))return;
  attachEditorialDiscovery(req,res);
  res.setHeader('X-Test-Native','preserved');
  if(req.url==='/sitemap.xml'){if(implicit)res.setHeader('Content-Type','application/xml');else res.writeHead(200,{'Content-Type':'application/xml'});res.end('<urlset><url><loc>'+config.origin+'/existing/</loc></url></urlset>');return;}
  if(req.url==='/native-missing'){res.writeHead(404);res.end('native not found');return;}
  const body='<!doctype html><html><head><title>Existing home</title></head><body><main><h1>Existing home</h1><p>Keep this content.</p></main><footer>Existing footer</footer></body></html>';
  const headers={'Content-Type':'text/html','Content-Length':Buffer.byteLength(body),'ETag':'old'};
  if(implicit){for(const [key,value] of Object.entries(headers))res.setHeader(key,value);}else res.writeHead(200,headers);
  if(req.method==='HEAD'){res.end();return;}
  res.write(body.slice(0,90));res.end(body.slice(90));
 });
 server.listen(0,'127.0.0.1');await once(server,'listening');const base='http://127.0.0.1:'+server.address().port;
 try{
  const home=await fetch(base+'/'),body=await home.text();assert.equal(home.status,200);assert.ok(body.includes('Keep this content.'));assert.ok(body.includes('AI in practice'));assert.ok(body.includes(publishedPosts(posts)[0].title.replace(/&/g,'&amp;')));assert.equal(home.headers.get('x-test-native'),'preserved');assert.equal(Number(home.headers.get('content-length')),Buffer.byteLength(body));assert.equal(home.headers.get('etag'),null);
  const current=await fetch(base+articlePath(config,posts[0]));assert.equal(current.status,200);assert.ok((await current.text()).includes(posts[0].quickAnswer.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')));
  const futurePost=posts.find(p=>Date.parse(p.publishedAt)>Date.now());if(futurePost){const future=await fetch(base+articlePath(config,futurePost));assert.equal(future.status,404);assert.ok(future.headers.get('x-robots-tag').includes('noindex'));}
  const head=await fetch(base+articlePath(config,posts[0]),{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
  const map=await (await fetch(base+'/sitemap.xml')).text();assert.ok(map.includes('/existing/'));assert.ok(map.includes(articlePath(config,posts[0])));for(const post of posts)assert.equal(map.includes(articlePath(config,post)),Date.parse(post.publishedAt)<=Date.now());
  for(const post of new Map(publishedPosts(posts).map(p=>[p.coverFormat||'png',p])).values()){const image=await fetch(base+imagePath(post));assert.equal(image.status,200);assert.equal(image.headers.get('content-type'),post.coverFormat==='svg'?'image/svg+xml':'image/png');}
  assert.equal((await fetch(base+'/native-missing')).status,404);
  assert.equal((await fetch(base+seriesPath(config))).status,200);
 }finally{server.close();await once(server,'close');}
});

