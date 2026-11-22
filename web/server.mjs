import {serveMcp} from './mcp-http.mjs';
import {discoveryTools} from './discovery-mcp.mjs';
import {renderRoute} from './public/views.mjs';
import {curated} from './public/catalog.mjs';
import {taskGuidePage} from './public/task-guides/views.mjs';
import {explorePage, exploreRoutes} from './public/explore-ai.mjs';
import {eventsPage} from './public/learning-events.mjs';
import {handleMaterial} from './material-node.mjs';
import {publishedServices} from './public/editorial-providers.mjs';
import {startDigestWorker} from './digest-worker.mjs';
import {dynamicDiscovery} from './dynamic-discovery.mjs';
import {serveEditorial,attachEditorialDiscovery} from './editorial/server.mjs';
import {businessRequest} from './business-api.mjs';
import {dynamicTool,dynamicSitemap,toolRedirect} from './dynamic-catalog.mjs';
import {submissionRequest,createLimiter} from './submission-api.mjs';
import {catalogRequest,searchParameters,allPublishedTools} from './catalog-api.mjs';
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream,existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist');
let searchCatalog;
async function bundledCatalog(){
 searchCatalog??=readFile(new URL('./public/imported.json',import.meta.url),'utf8').then(raw=>[...curated,...JSON.parse(raw)]).catch(error=>{searchCatalog=undefined;throw error;});
 return searchCatalog;
}
const materialSite = {id:'aisuperpower', name:'AI Superpower', accent:'#116849', titles:{'/downloads/tool-tests/invoice-extraction.zip':'Invoice extraction test files','/downloads/tool-tests/research-synthesis.zip':'Research synthesis test files','/downloads/tool-tests/marketing-data-connectors.zip':'Marketing data connector test files','/downloads/lovable/Lovable-Starter-Kit.zip':'Lovable starter kit'}, files:{
  has(file) {
    return file.startsWith('/downloads/') && /\.(?:pdf|zip|csv|md|txt|json)$/i.test(file) && !file.split('/').some(part=>part.startsWith('.')) && existsSync(path.join(root,file));
  }
}};
const mime={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.csv':'text/csv; charset=utf-8','.pdf':'application/pdf','.xml':'application/xml; charset=utf-8','.md':'text/markdown; charset=utf-8','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.txt':'text/plain; charset=utf-8'};
export function createServer({saveSubmission,materialCall}={}){const allowSubmission=createLimiter();return http.createServer(async(req,res)=>{
  if(req.url?.split('?')[0].replace(/\/$/,'')==='/api/mcp')return serveMcp(req,res,{name:'ai-superpower-discovery',version:'1.0.0'},discoveryTools,['https://aisuperpower.cc','https://www.aisuperpower.cc']);
  if(await handleMaterial(req,res,materialSite,materialCall))return;
  if(await serveEditorial(req,res))return;
  attachEditorialDiscovery(req,res);
 const security={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'DENY','Permissions-Policy':'camera=(), microphone=(), geolocation=()','Content-Security-Policy':"default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' mailto: https://assets.mailerlite.com https://preview.mailerlite.io"};
 if(/^\/api\/(maker\/|stripe\/webhook|promotions|digest\/unsubscribe)/.test(req.url)){const r=await businessRequest(req);res.writeHead(r.status,{...security,'Content-Type':'application/json','Cache-Control':'no-store','X-Robots-Tag':'noindex',...r.headers});res.end(req.method==='HEAD'?'':JSON.stringify(r.body));return}
 if(req.method==='POST'&&req.url==='/api/submissions'){try{const result=await submissionRequest(req,{save:saveSubmission,allow:allowSubmission});res.writeHead(result.status,{...security,'Content-Type':'application/json','Cache-Control':'no-store','X-Robots-Tag':'noindex'});res.end(JSON.stringify(result.body));}catch{res.writeHead(400,{...security,'Content-Type':'application/json'});res.end(JSON.stringify({error:'Unable to read the form. Please retry.'}));}return}
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{...security,Allow:'GET, HEAD'});res.end('Method not allowed');return}
 try{const url=new URL(req.url,'http://localhost');if(url.search||url.pathname.startsWith('/api/'))security['X-Robots-Tag']='noindex, follow';if(url.pathname==='/health'){res.writeHead(200,{...security,'Content-Type':'application/json'});res.end(req.method==='HEAD'?'':JSON.stringify({status:'ok',service:'superpowers'}));return}
 if(url.pathname==='/api/services'){try{const rows=await catalogRequest('superpowers_services?select=id,name,website,description,category,audience,location,pricing,reviewed_at&order=name.asc&limit=500');res.writeHead(200,{...security,'Content-Type':'application/json','Cache-Control':'no-store'});res.end(req.method==='HEAD'?'':JSON.stringify(publishedServices(rows)));}catch{res.writeHead(503,{...security,'Content-Type':'application/json'});res.end(JSON.stringify({error:'Service listings are temporarily unavailable'}));}return}
 if(url.pathname==='/api/catalog'||url.pathname==='/api/search'){try{const data=url.pathname==='/api/search'?await catalogRequest((url.searchParams.has('pricing')||url.searchParams.get('sort')==='recent')?'rpc/superpowers_search_v2':'rpc/superpowers_search',searchParameters(url.searchParams)):(await allPublishedTools('id,data,editorial_order')).sort((a,b)=>a.editorial_order-b.editorial_order||a.id.localeCompare(b.id));const result=url.pathname==='/api/catalog'?data.map(x=>x.data):data;res.writeHead(200,{...security,'Content-Type':'application/json','Cache-Control':'no-store'});res.end(req.method==='HEAD'?'':JSON.stringify(result));}catch{res.writeHead(503,{...security,'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({error:'Catalog search temporarily unavailable'}));}return}
 if(process.env.SUPERPOWERS_SUPABASE_URL&&(['/requests','/deals','/tool-changes'].includes(url.pathname)||/^\/community-kits\/[a-f0-9-]{36}$/.test(url.pathname))){const r=await dynamicDiscovery(url.pathname);res.writeHead(r.status,{...security,'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(req.method==='HEAD'?'':r.body);return}
 if(/^\/go\/[a-z0-9-]+$/.test(url.pathname)){const r=await toolRedirect(url.pathname.split('/')[2],req);res.writeHead(r.status,{...security,...r.headers});res.end();return}
 if(process.env.SUPERPOWERS_SUPABASE_URL&&/^\/tools\/[a-z0-9-]+$/.test(url.pathname)){const r=await dynamicTool(url.pathname);res.writeHead(r.status,{...security,'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache',...(r.status===404?{'X-Robots-Tag':'noindex'}:{})});res.end(req.method==='HEAD'?'':r.body);return}
 if(url.pathname==='/sitemap-tools.xml'){const body=await dynamicSitemap();res.writeHead(200,{...security,'Content-Type':'application/xml','Cache-Control':'public, max-age=60'});res.end(req.method==='HEAD'?'':body);return}
 let decoded;try{decoded=decodeURIComponent(url.pathname)}catch{res.writeHead(400,security);res.end('Bad request');return}
 if(decoded.includes('\0')||decoded.includes('\\')||decoded.split('/').some(s=>s==='..'||s.startsWith('.'))){res.writeHead(400,security);res.end('Bad request');return}
 let filename=path.resolve(root,'.'+decoded);if(!filename.startsWith(root+path.sep)&&filename!==root){res.writeHead(400,security);res.end('Bad request');return}
 let status=200;try{const info=await stat(filename);if(info.isDirectory())filename=path.join(filename,'index.html');await stat(filename)}catch{status=404;filename=path.join(root,'404/index.html')}
 if(status===200&&(decoded.endsWith('/index.html')||(decoded!=='/'&&decoded.endsWith('/')))){const canonicalPath=decoded.replace(/\/index\.html$/,'').replace(/\/$/,'')||'/';res.writeHead(308,{...security,Location:canonicalPath+url.search});res.end();return}
 // Render filtered searches and dated calendars for direct visits as well as client navigation.
 const timedCalendar=url.pathname==='/events'||url.pathname==='/explore-ai/events-and-conferences';
 const guideSearch=url.searchParams.has('q')&&(exploreRoutes.includes(url.pathname)||url.pathname==='/ai-tasks');
 const taskSearch=url.pathname==='/search'&&url.searchParams.has('query');
 if(status===200&&(timedCalendar||guideSearch||taskSearch)){
   const body=taskSearch?renderRoute(url.pathname+url.search,await bundledCatalog()):url.pathname==='/events'?eventsPage():url.pathname==='/ai-tasks'?taskGuidePage(url.pathname,url.searchParams):explorePage(url.pathname,url.searchParams);
   const template=await readFile(filename,'utf8');
   const html=template.replace(/(<main id="main" tabindex="-1">)[\s\S]*?(<\/main>)/,(_,start,end)=>start+body+end);
   res.writeHead(200,{...security,'Content-Type':mime['.html'],'Cache-Control':'no-cache'});
   res.end(req.method==='HEAD'?'':html);return;
 }
 const info=await stat(filename);if(status===404)security['X-Robots-Tag']='noindex, follow';res.writeHead(status,{...security,'Content-Type':mime[path.extname(filename)]||'application/octet-stream','Content-Length':info.size,'Cache-Control':/\.(html|css|mjs|json)$/.test(filename)?'no-cache':'public, max-age=3600'});if(req.method==='HEAD')res.end();else{const stream=createReadStream(filename);stream.on('error',()=>res.destroy());stream.pipe(res)}
 }catch{res.writeHead(500,{...security,'Content-Type':'text/plain'});res.end('Something went wrong. Please try again.')}
})}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT)||8080;const server=createServer();const stopDigest=process.env.SUPERPOWERS_BUSINESS_KEY?startDigestWorker():()=>{};server.listen(port,'0.0.0.0',()=>console.log(`Superpowers listening on port ${port}`));process.on('SIGTERM',()=>{stopDigest();server.close(()=>process.exit(0));})}



