import {readFile} from 'node:fs/promises';
import {businessCall} from './business-api.mjs';
import {catalogRequest} from './catalog-api.mjs';
import {renderRoute} from './public/views.mjs';
import {pageSEO,seoMarkup} from './public/seo.mjs';
import {escapeHTML as e} from './public/catalog.mjs';
const template=readFile(new URL('./public/index.html',import.meta.url),'utf8');
export async function dynamicDiscovery(route,{call=businessCall,catalog=catalogRequest}={}){
 try{
  const [explore,rows]=await Promise.all([call('explore'),catalog('superpowers_tools?select=data&order=editorial_order.asc&limit=1000')]);
  const items=rows.map(x=>x.data),content=renderRoute(route,items,{explore}),seo=pageSEO(route,items,content);
  return {status:200,body:(await template).replace('<!--APP-->',content).replace(/<title>.*?<\/title>/,'<title>'+e(seo.title)+'</title>').replace(/<meta name="description"[^>]+>/,'<meta name="description" content="'+e(seo.description)+'">'+seoMarkup(seo))};
 }catch{return {status:503,body:'<h1>Live updates are temporarily unavailable</h1><p>Please retry shortly. <a href="/search">Find a tool by task</a></p>'};}
}
