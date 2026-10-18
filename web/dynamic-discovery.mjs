import {readFile} from 'node:fs/promises';
import {businessCall} from './business-api.mjs';
import {catalogRequest} from './catalog-api.mjs';
import {renderRoute} from './public/views.mjs';
import {pageSEO,seoMarkup} from './public/seo.mjs';
import {escapeHTML as e} from './public/catalog.mjs';
const template=readFile(new URL('./public/index.html',import.meta.url),'utf8');
export async function dynamicDiscovery(route,{call=businessCall,catalog=catalogRequest}={}){
 try{
  const stateKey=route.startsWith('/community-kits/')?'publicKit':route==='/tool-changes'?'changes':'explore';
  const [result,rows]=await Promise.all([call(stateKey==='publicKit'?'publicKit':stateKey==='changes'?'toolChanges':'explore',stateKey==='publicKit'?{id:route.split('/')[2]}:{}),catalog('superpowers_tools?select=data&order=editorial_order.asc&limit=1000')]);
  const items=rows.map(x=>x.data),content=renderRoute(route,items,{[stateKey]:stateKey==='changes'?result.changes:result}),seo=pageSEO(route,items,content);
  return {status:200,body:(await template).replace('<!--APP-->',content).replace(/<title>.*?<\/title>/,'<title>'+e(seo.title)+'</title>').replace(/<meta name="description"[^>]+>/,'<meta name="description" content="'+e(seo.description)+'">'+seoMarkup(seo))};
 }catch(err){if(err.status===404)return {status:404,body:'<h1>This kit is not published</h1><p><a href="/role-kits">Explore starter kits</a></p>'};return {status:503,body:'<h1>Live updates are temporarily unavailable</h1><p>Please retry shortly. <a href="/search">Find a tool by task</a></p>'};}
}
