import {dispatch, protocols} from './mcp-protocol.mjs';

export async function serveMcp(req, res, server, tools, origins) {
  const reply = (status, payload, extra={}) => {
    res.writeHead(status, {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',
      'Content-Type':'application/json; charset=utf-8',...extra});
    res.end(payload == null ? undefined : JSON.stringify(payload));
  };
  const fail=(status,message,code=-32000)=>reply(status,{jsonrpc:'2.0',id:null,error:{code,message}});
  if(req.headers.origin && !origins.includes(req.headers.origin)) return fail(403,'Unsupported origin.');
  if(req.method !== 'POST') return reply(405,null,{Allow:'POST'});
  if(!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) return fail(415,'Send JSON.');
  const version=req.headers['mcp-protocol-version'];
  if(version && !protocols.includes(version)) return fail(400,'Unsupported MCP protocol version.');
  const chunks=[];let size=0;
  try{
    for await(const chunk of req){
      size+=Buffer.byteLength(chunk);
      if(size>16384)return fail(413,'Request exceeds 16 KB.');
      chunks.push(Buffer.from(chunk));
    }
    let message;
    try { message=JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { return fail(400,'Invalid JSON.',-32700); }
    const answer=await dispatch(message,server,tools);
    return reply(answer===null ? 202 : 200,answer);
  }catch { if(!res.headersSent)fail(503,'Service temporarily unavailable.'); }
}
