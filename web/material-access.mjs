const privateHeaders = {
  'Cache-Control': 'private, no-store', 'Vary': 'Cookie', 'X-Robots-Tag': 'noindex, nofollow',
  'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"
};
const endpoint = '/free-material';
const cookieName = 'material_access_v1';
const escape = text => String(text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
async function rpc(name, data) {
  const response = await fetch('https://wealthexperiment.live/api/material-session', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:name, ...data}), signal:AbortSignal.timeout(8000)});
  if (!response.ok) throw new Error('Download service unavailable');
  return response.json();
}
function screen(site, file, ready, message) {
  const label = decodeURIComponent(file.split('?')[0].split('/').filter(Boolean).pop()).replace(/\.[a-z0-9]+$/i,'').replace(/[-_]+/g,' ');
  const title = site.titles?.[file] || label;
  const description = 'Enter your email to open this free resource. You can download other free materials on this site for the next 30 days in this browser.';
  const button = ready ? 'Download file' : 'Unlock my download';
  const content = ready ? '<p>Your file is ready.</p><a class="button" href="'+escape(file)+'">'+button+'</a>' :
    '<p>'+description+'</p><form method="post" action="'+endpoint+'"><input type="hidden" name="file" value="'+escape(file)+'"><label for="email">Email address</label><input type="email" id="email" name="email" maxlength="254" autocomplete="email" required aria-describedby="use" placeholder="you@example.com">'+
    (message?'<p role="alert">'+escape(message)+'</p>':'')+'<button class="button" type="submit">'+button+'</button><small id="use">We save your address for download access. Newsletter signup is optional and separate.</small></form>';
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(title)+' | '+escape(site.name)+'</title><style>*{box-sizing:border-box}body{margin:0;color:#192921;background:#fff;font:1.05rem/1.55 system-ui,sans-serif}header{border-bottom:1px solid #d6dfd9;padding:1rem max(6vw,1.25rem);font-weight:700}header a{color:inherit;text-decoration:none}main{max-width:35rem;margin:clamp(2rem,9vh,6rem) auto;padding:0 1.25rem}h1{font-size:clamp(1.8rem,5vw,2.7rem);line-height:1.12;overflow-wrap:anywhere}form{display:grid;gap:.7rem;margin-top:1.5rem}label{font-weight:650}input{font:inherit;padding:.8rem;border:1px solid #66766c;border-radius:.36rem;width:100%}.button{display:inline-block;width:fit-content;background:'+site.accent+';color:white;border:none;border-radius:.36rem;padding:.75rem 1.1rem;font:600 1rem/1.45 system-ui;cursor:pointer;text-decoration:none}small{color:#46554b}a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #1969ae;outline-offset:3px}[role=alert]{color:#932f23;margin:0}</style></head><body><header><a href="/">'+escape(site.name)+'</a></header><main><h1>'+escape(title)+'</h1>'+content+'</main></body></html>';
}
function localFile(raw, site) {
  if (!raw || raw.length>1400 || !raw.startsWith('/') || /[\x00-\x1f#]/.test(raw)) return null;
  try {
    const u=new URL('https://local.invalid'+raw);
    const parts=[];
    for(const part of decodeURIComponent(u.pathname).replaceAll('\\','/').split('/')){
      if(part==='..')parts.pop();
      else if(part && part!=='.')parts.push(part);
    }
    const decoded='/'+parts.join('/');
    if (/[\x00-\x1f%]/.test(decoded) || !site.files.has(decoded)) return null;
    return encodeURI(decoded).replaceAll('#','%23').replaceAll('?','%3F')+(u.searchParams.get('format')==='markdown'?'?format=markdown':'');
  } catch {return null;}
}
const limited = new Map();
function rateLimited(key) {
  const now=Date.now();
  for(const [k,v] of limited) if(v.until<=now) limited.delete(k);
  const item=limited.get(key)||{count:0,until:now+600000};
  item.count++; limited.set(key,item); return item.count>20;
}
async function formData(request) {
  if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded') || !request.body) return null;
  const reader=request.body.getReader(), decoder=new TextDecoder();
  let bytes=0, text='';
  while(true){const {value,done}=await reader.read();if(done)break;bytes+=value.length;if(bytes>4096){await reader.cancel();return null;}text+=decoder.decode(value,{stream:true});}
  return new URLSearchParams(text+decoder.decode());
}
export function materialRoute(raw,site) {
  return raw.split('?')[0].replace(/\/$/,'')===endpoint || !!localFile(raw,site);
}
export async function materialAccess(request,site,call=rpc) {
  const url=new URL(request.url), entry=url.pathname.replace(/\/$/,'')===endpoint;
  const reply=(body,status,extra={})=>new Response(request.method==='HEAD'?null:body,{status,headers:{...privateHeaders,...extra}});
  let file=localFile(entry?url.searchParams.get('file'):url.pathname+url.search,site);
  const page=(ready,error='',status=200)=>reply(screen(site,file,ready,error),status,{'Content-Type':'text/html; charset=utf-8'});
  try {
    if(request.method==='POST' && entry){
      const origin=request.headers.get('origin');
      if(request.headers.get('sec-fetch-site')==='cross-site'||(origin&&new URL(origin).host!==url.host))return reply('Please use the form on this site.',403);
      const body=await formData(request);
      if(!body)return reply('Invalid form.',400);
      file=localFile(body.get('file'),site);
      if(!file)return reply('Resource not found.',404);
      const email=(body.get('email')||'').trim().toLowerCase();
      if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return page(false,'Enter a valid email address.',422);
      if(rateLimited(site.id+':'+(request.headers.get('x-real-ip')||request.headers.get('x-forwarded-for')?.split(',').at(-1)||'local')))return page(false,'Please try again in ten minutes.',429);
      const token=await call('request_material_access',{p_site:site.id,p_email:email});
      if(typeof token!=='string'||!/^[0-9a-f]{64}$/.test(token))throw new Error('Unable to save');
      return reply(null,303,{Location:endpoint+'?file='+encodeURIComponent(file),'Set-Cookie':cookieName+'='+token+'; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000'+(url.protocol==='https:'?'; Secure':'')});
    }
    if(!file)return entry?reply('Resource not found.',404):null;
    if(!['GET','HEAD'].includes(request.method))return reply('Method not allowed.',405,{Allow:entry?'GET, HEAD, POST':'GET, HEAD'});
    const token=(request.headers.get('cookie')||'').match(/(?:^|;\s*)material_access_v1=([0-9a-f]{64})(?:;|$)/)?.[1];
    const ready=token&&await call('check_material_access',{p_site:site.id,p_token:token})===true;
    if(entry)return page(ready);
    return ready?null:reply(null,303,{Location:endpoint+'?file='+encodeURIComponent(file)});
  }catch{return file?page(false,'We couldn’t confirm access. Please try again in a moment.',503):reply('Unable to process request.',400);}
}
