export async function catalogRequest(endpoint,body,{base=process.env.SUPERPOWERS_SUPABASE_URL,key=process.env.SUPERPOWERS_SUPABASE_PUBLISHABLE_KEY,fetcher=fetch}={}){
 if(!base||!key)throw new Error('Catalog database is not configured');
 const response=await fetcher(base+'/rest/v1/'+endpoint,{method:body?'POST':'GET',headers:{apikey:key,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(8000)});
 if(!response.ok)throw new Error('Catalog database request failed');
 return response.json();
}
export function searchParameters(params){return {...(params.has('pricing')?{pricing_filter:params.get('pricing')||'All'}:{}),q:(params.get('query')||'').slice(0,300),category_filter:params.get('category')||'All',role_filter:params.get('role')||'All',type_filter:params.get('type')||'All',level_filter:params.get('level')||'All',reviewed_only:params.get('reviewed')==='true',sort_by:['az','recent'].includes(params.get('sort'))?params.get('sort'):'editorial',page_limit:Math.min(500,Math.max(12,Number(params.get('limit'))||12)),page_offset:0};}

// Keyset pagination keeps every published record reachable beyond the database row cap.
export async function allPublishedTools(fields,filter='',request=catalogRequest){
 const rows=[];
 const pageSize=500;
 let after='';
 while(true){
  const cursor=after?'&id=gt.'+encodeURIComponent(after):'';
  const page=await request('superpowers_tools?select='+fields+'&published=eq.true&order=id.asc&limit='+pageSize+filter+cursor);
  rows.push(...page);
  if(page.length<pageSize)return rows;
  const next=page.at(-1).id;
  if(!next||next===after)throw new Error('Catalog pagination did not advance');
  after=next;
 }
}
