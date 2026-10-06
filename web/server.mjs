import {catalogRequest,searchParameters} from './catalog-api.mjs';
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.txt':'text/plain; charset=utf-8'};
export function createServer(){return http.createServer(async(req,res)=>{
 const security={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'DENY','Permissions-Policy':'camera=(), microphone=(), geolocation=()','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' mailto:"};
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{...security,Allow:'GET, HEAD'});res.end('Method not allowed');return}
 try{const url=new URL(req.url,'http://localhost');if(url.pathname==='/health'){res.writeHead(200,{...security,'Content-Type':'application/json'});res.end(req.method==='HEAD'?'':JSON.stringify({status:'ok',service:'superpowers'}));return}
 if(url.pathname==='/api/catalog'||url.pathname==='/api/search'){try{const data=url.pathname==='/api/search'?await catalogRequest('rpc/superpowers_search',searchParameters(url.searchParams)):await catalogRequest('superpowers_tools?select=data&order=editorial_order.asc&limit=1000');const result=url.pathname==='/api/catalog'?data.map(x=>x.data):data;res.writeHead(200,{...security,'Content-Type':'application/json','Cache-Control':'no-store'});res.end(req.method==='HEAD'?'':JSON.stringify(result));}catch{res.writeHead(503,{...security,'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({error:'Catalog search temporarily unavailable'}));}return}
 let decoded;try{decoded=decodeURIComponent(url.pathname)}catch{res.writeHead(400,security);res.end('Bad request');return}
 if(decoded.includes('\0')||decoded.includes('\\')||decoded.split('/').some(s=>s==='..'||s.startsWith('.'))){res.writeHead(400,security);res.end('Bad request');return}
 let filename=path.resolve(root,'.'+decoded);if(!filename.startsWith(root+path.sep)&&filename!==root){res.writeHead(400,security);res.end('Bad request');return}
 let status=200;try{const info=await stat(filename);if(info.isDirectory())filename=path.join(filename,'index.html');await stat(filename)}catch{status=404;filename=path.join(root,'404/index.html')}
 const info=await stat(filename);res.writeHead(status,{...security,'Content-Type':mime[path.extname(filename)]||'application/octet-stream','Content-Length':info.size,'Cache-Control':/\.(html|css|mjs|json)$/.test(filename)?'no-cache':'public, max-age=3600'});if(req.method==='HEAD')res.end();else{const stream=createReadStream(filename);stream.on('error',()=>res.destroy());stream.pipe(res)}
 }catch{res.writeHead(500,{...security,'Content-Type':'text/plain'});res.end('Something went wrong. Please try again.')}
})}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT)||8080;const server=createServer();server.listen(port,'0.0.0.0',()=>console.log(`Superpowers listening on port ${port}`));process.on('SIGTERM',()=>server.close(()=>process.exit(0)))}
