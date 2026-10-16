import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {readFileSync} from 'node:fs';
import {publishedPosts,renderArticle,renderIndex,renderFeed,sitemapEntries,articlePath,seriesPath} from './core.mjs';
import {serveEditorial,attachEditorialDiscovery,config,posts} from './server.mjs';

test('release dates govern article links, related links, feeds and sitemaps',()=>{
 assert.ok(posts.length>=3);
 for(let i=0;i<posts.length;i++){
  const now=Date.parse(posts[i].publishedAt),live=publishedPosts(posts,now);
  assert.equal(live.length,i+1);
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
  assert.ok(readFileSync(new URL('./images/'+post.slug+'.png',import.meta.url)).subarray(1,4).equals(Buffer.from('PNG')));
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
  const home=await fetch(base+'/'),body=await home.text();assert.equal(home.status,200);assert.ok(body.includes('Keep this content.'));assert.ok(body.includes('AI in practice'));assert.ok(body.includes(posts[0].title.replace(/&/g,'&amp;')));assert.equal(home.headers.get('x-test-native'),'preserved');assert.equal(Number(home.headers.get('content-length')),Buffer.byteLength(body));assert.equal(home.headers.get('etag'),null);
  const current=await fetch(base+articlePath(config,posts[0]));assert.equal(current.status,200);assert.ok((await current.text()).includes(posts[0].quickAnswer.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')));
  const future=await fetch(base+articlePath(config,posts[1]));assert.equal(future.status,404);assert.ok(future.headers.get('x-robots-tag').includes('noindex'));
  const head=await fetch(base+articlePath(config,posts[0]),{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
  const map=await (await fetch(base+'/sitemap.xml')).text();assert.ok(map.includes('/existing/'));assert.ok(map.includes(articlePath(config,posts[0])));assert.ok(!map.includes(articlePath(config,posts[1])));
  const image=await fetch(base+'/assets/ai-practice/'+posts[0].slug+'.png');assert.equal(image.headers.get('content-type'),'image/png');assert.equal(image.status,200);
  assert.equal((await fetch(base+'/native-missing')).status,404);
  assert.equal((await fetch(base+seriesPath(config))).status,200);
 }finally{server.close();await once(server,'close');}
});
