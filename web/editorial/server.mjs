import {readFileSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {articlePath,seriesPath,imagePath,isPublished,renderArticle,renderIndex,renderFeed,sitemapEntries,discovery,editorialCss} from './core.mjs';
const config=JSON.parse(readFileSync(new URL('./config.json',import.meta.url),'utf8'));
const posts=JSON.parse(readFileSync(new URL('./posts.json',import.meta.url),'utf8'));
const byPath=new Map(posts.map(p=>[articlePath(config,p).replace(/\/$/,''),p]));
const byImage=new Map(posts.map(p=>[imagePath(p),p]));
const ready=()=>!config.launchFlag || process.env[config.launchFlag.name]===config.launchFlag.value;
const localPath=value=>{try{return new URL(value||'/','http://localhost').pathname;}catch{return null;}};

/** Only the new editorial routes are handled here. Existing API/commerce routes pass through. */
export async function serveEditorial(req,res){
 const path=localPath(req.url);if(!path||!['GET','HEAD'].includes(req.method))return false;
 const clean=path.replace(/\/$/,''),post=byPath.get(clean),cover=byImage.get(path);
 const isIndex=clean==='/ai-practice',isFeed=path==='/ai-practice/feed.xml',isMap=path==='/ai-practice/sitemap.xml';
 if(!post&&!cover&&!isIndex&&!isFeed&&!isMap)return false;
 const send=(status,body,type='text/html; charset=utf-8',extra={})=>{
  const headers={'Content-Type':type,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin',...extra};
  if(status===404||!ready())headers['X-Robots-Tag']='noindex, follow';
  res.writeHead(status,headers);res.end(req.method==='HEAD'?undefined:body);
 };
 if((post&&!isPublished(post))||(cover&&!isPublished(cover))){send(404,'This guide is not published yet.','text/plain; charset=utf-8');return true;}
 if(cover){try{const bytes=await readFile(new URL('./images/'+cover.slug+(cover.coverFormat === 'svg' ? '.svg' : '.png'),import.meta.url));send(200,bytes,cover.coverFormat === 'svg' ? 'image/svg+xml' : 'image/png',{'Cache-Control':'public, max-age=3600','Content-Length':bytes.length});}catch{send(404,'Image not found.','text/plain; charset=utf-8');}return true;}
 const canonical=post?articlePath(config,post):isIndex?seriesPath(config):path;
 if(path!==canonical){const url=new URL(req.url,'http://localhost');res.writeHead(308,{Location:canonical+url.search});res.end();return true;}
 if(post)send(200,renderArticle(config,post,posts));
 else if(isIndex)send(200,renderIndex(config,posts));
 else if(isFeed)send(200,renderFeed(config,posts),'application/rss+xml; charset=utf-8');
 else if(isMap)send(ready()?200:404,ready()?`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries(config,posts)}</urlset>`:'Sitemap unavailable.','application/xml; charset=utf-8');
 return true;
}

/** Add the current release to existing archive/home HTML and existing sitemaps.
 * Capture only these small text responses; images, downloads, APIs and other pages are untouched.
 * Native status and security headers are preserved. Streamed HTML and HEAD are supported.
 */
export function attachEditorialDiscovery(req,res){
 const path=localPath(req.url);if(req.method!=='GET'||!path)return;
 const normalized=path.replace(/\/$/,'')||'/';
 const listing=config.discoveryPaths.includes(normalized),sitemap=path==='/sitemap.xml',robots=path==='/robots.txt';
 if(!listing&&!sitemap&&!robots)return;
 const writeHead=res.writeHead.bind(res),write=res.write.bind(res),end=res.end.bind(res);
 const chunks=[];let pendingHead=null,bytes=0,passthrough=false;
 res.writeHead=function(status,...args){pendingHead=[status,...args];return this;};
 const flush=()=>{res.writeHead=writeHead;if(pendingHead){writeHead(...pendingHead);pendingHead=null;}for(const chunk of chunks)write(chunk);chunks.length=0;};
 res.write=function(chunk,encoding,callback){
  if(passthrough)return write(chunk,encoding,callback);
  if(typeof encoding==='function'){callback=encoding;encoding=undefined;}
  const buffer=Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk,encoding);chunks.push(buffer);bytes+=buffer.length;
  if(bytes>4*1024*1024){passthrough=true;flush();}
  if(callback)queueMicrotask(callback);return true;
 };
 res.end=function(chunk,encoding,callback){
  if(passthrough)return end(chunk,encoding,callback);
  if(typeof chunk==='function'){callback=chunk;chunk=undefined;encoding=undefined;}else if(typeof encoding==='function'){callback=encoding;encoding=undefined;}
  if(chunk!==undefined&&chunk!==null)chunks.push(Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk,encoding));
  let body=Buffer.concat(chunks),status=pendingHead?.[0]??res.statusCode;
  if(status===200){
   let text=body.toString('utf8');
   if(listing&&/<\/body>/i.test(text)){
    const section=discovery(config,posts);
    // Place outside the client-rendered main region, so existing hydration cannot erase it.
    text=text.replace(/<\/head>/i,`<style>${editorialCss}</style></head>`);
    text=/<footer\b/i.test(text)?text.replace(/<footer\b/i,section+'<footer'):text.replace(/<\/body>/i,section+'</body>');
    // Preserve normal full-page navigation when a legacy SPA router owns internal links.
    text=text.replace(/<\/body>/i,`<script>document.addEventListener('click',function(event){var a=event.target.closest&&event.target.closest('a[data-editorial-link]');if(a&&!event.defaultPrevented&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&event.button===0){event.stopImmediatePropagation();}},true);</script></body>`);
   }else if(sitemap&&ready()&&text.includes('</urlset>'))text=text.replace('</urlset>',sitemapEntries(config,posts)+'</urlset>');
   else if(robots&&ready()&&!text.includes('/ai-practice/sitemap.xml'))text+='\nSitemap: '+config.origin+'/ai-practice/sitemap.xml\n';
   body=Buffer.from(text);
  }
  // Header values supplied to writeHead otherwise override setHeader; update both forms.
  res.removeHeader('Content-Length');res.removeHeader('ETag');
  if(pendingHead){
   const last=pendingHead[pendingHead.length-1];
   if(last&&typeof last==='object'&&!Array.isArray(last)){for(const key of Object.keys(last))if(/^(content-length|etag)$/i.test(key))delete last[key];last['Content-Length']=body.length;}
   writeHead(...pendingHead);
  }else res.setHeader('Content-Length',body.length);
  // Native end() may implicitly call writeHead when the caller only used setHeader.
  res.writeHead=writeHead;
  return end(body,callback);
 };
}
export {config,posts};
