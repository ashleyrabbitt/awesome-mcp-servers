import {Readable} from 'node:stream';
import {materialRoute,materialAccess} from './material-access.mjs';
export async function handleMaterial(req,res,site,call){
  const raw=req.url||'/';
  if(!materialRoute(raw,site))return false;
  try{
    const local=/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(req.headers.host||'');
    const base=(local?'http://':'https://')+(req.headers.host||site.id);
    const request=new Request(new URL(raw.replace(/^\/+/, '/'),base),{method:req.method,headers:req.headers,...(req.method==='POST'?{body:Readable.toWeb(req),duplex:'half'}:{})});
    const result=await materialAccess(request,site,call);
    if(result){
      res.writeHead(result.status,Object.fromEntries(result.headers));
      res.end(result.body?Buffer.from(await result.arrayBuffer()):undefined);
      return true;
    }
    // Keep the site's original fulfillment, entitlement checks and MIME handling.
    const original=res.writeHead;
    res.writeHead=function(status,reason,headers){
      const h={...(typeof reason==='string'?headers:reason)};
      for(const key of Object.keys(h))if(['cache-control','vary'].includes(key.toLowerCase()))delete h[key];
      h['Cache-Control']='private, no-store';h.Vary='Cookie';
      if(status===200||status===206){
        const filename=decodeURIComponent(new URL(request.url).pathname.split('/').pop()).replace(/[^a-z0-9_.-]/gi,'_');
        if(!/\.(html?|svg)$/i.test(filename)&&!Object.keys(h).some(k=>k.toLowerCase()==='content-disposition'))h['Content-Disposition']='attachment; filename="'+filename+'"';
      }
      return typeof reason==='string'?original.call(this,status,reason,h):original.call(this,status,h);
    };
    return false;
  }catch{res.writeHead(400,{'Cache-Control':'no-store'});res.end('Invalid request.');return true;}
}
