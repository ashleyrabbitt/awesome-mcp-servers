import {outboundDestination} from './public/tool-links.mjs';
import {applySiteShell} from './public/site-shell.mjs';
import {readFile} from 'node:fs/promises';
import {catalogRequest} from './catalog-api.mjs';
import {businessCall,visitorHash,requestMeasurementAllowed} from './business-api.mjs';
import {renderRoute} from './public/views.mjs';
import {pageSEO,seoMarkup} from './public/seo.mjs';
import {escapeHTML as e} from './public/catalog.mjs';
const template=readFile(new URL('./public/index.html',import.meta.url),'utf8').then(applySiteShell);
async function tool(id){return (await catalogRequest('superpowers_tools?id=eq.'+encodeURIComponent(id)+'&select=data&limit=1'))[0]?.data;}
export async function dynamicTool(route){try{const t=await tool(route.split('/')[2]),content=renderRoute(t?route:'/404',t?[t]:[],{}),seo=pageSEO(t?route:'/404',t?[t]:[],content);return {status:t?200:404,body:(await template).replace('<!--APP-->',content).replace(/<title>.*?<\/title>/,'<title>'+e(seo.title)+'</title>').replace(/<meta name="description"[^>]+>/,'<meta name="description" content="'+e(seo.description)+'">'+seoMarkup(seo))};}catch{return {status:503,body:'<h1>Tool details are temporarily unavailable</h1><p>Please retry shortly. <a href="/directory">Explore the directory</a></p>'};}}
export async function dynamicSitemap(){const rows=await catalogRequest('superpowers_tools?select=id,updated_at&data->>status=eq.Documentation%20reviewed&limit=10000');return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+rows.map(r=>'<url><loc>https://aisuperpower.cc/tools/'+e(r.id)+'</loc><lastmod>'+e(r.updated_at)+'</lastmod></url>').join('')+'</urlset>';}
export async function toolRedirect(id,req,{lookup=tool,track=businessCall}={}){try{const t=await lookup(id);if(!t)return {status:404};const featured=new URL(req.url,'https://aisuperpower.cc').searchParams.get('featured')==='1';const u=new URL(featured?t.url:outboundDestination(id,t.url));if(!['http:','https:'].includes(u.protocol))return {status:404};if(req.method==='GET'&&requestMeasurementAllowed(req))await track('track',{tool_id:id,kind:featured?'featured_click':'tool_click',visitor:visitorHash(req)}).catch(()=>{});return {status:302,headers:{Location:u.href,'Cache-Control':'no-store'}};}catch{return {status:503};}}
