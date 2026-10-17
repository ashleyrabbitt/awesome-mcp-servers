import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,cp,mkdir,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile),root=fileURLToPath(new URL('..',import.meta.url));
test('the exact Docker COPY file set builds and starts the production HTTP server',async()=>{
 const runtime=await mkdtemp(path.join(tmpdir(),'superpowers-runtime-'));let server;
 try{
  const docker=await readFile(path.join(root,'Dockerfile'),'utf8');
  for(const line of docker.split('\n').filter(l=>l.startsWith('COPY '))){const parts=line.slice(5).trim().split(/\s+/),dest=parts.pop();assert.ok(parts.every(s=>!s.startsWith('--')),'Update this package check for Docker COPY flags.');
   if(parts.length===1){await cp(path.join(root,parts[0]),path.join(runtime,dest),{recursive:true});}
   else{await mkdir(path.join(runtime,dest),{recursive:true});for(const src of parts)await cp(path.join(root,src),path.join(runtime,dest,path.basename(src)),{recursive:true});}
  }
  await run(process.execPath,['scripts/build.mjs'],{cwd:runtime});
  const {createServer}=await import(pathToFileURL(path.join(runtime,'server.mjs')).href);server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base='http://127.0.0.1:'+server.address().port;const health=await fetch(base+'/health');assert.equal(health.status,200);assert.equal((await health.json()).status,'ok');
  const search=await fetch(base+'/search');assert.equal(search.status,200);assert.match(await search.text(),/What would you like to get done/);
 }finally{if(server)await new Promise(r=>server.close(r));await rm(runtime,{recursive:true,force:true});}
});
