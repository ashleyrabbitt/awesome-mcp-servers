export async function catalogRequest(endpoint,body,{base=process.env.SUPERPOWERS_SUPABASE_URL,key=process.env.SUPERPOWERS_SUPABASE_PUBLISHABLE_KEY,fetcher=fetch}={}){
 if(!base||!key)throw new Error('Catalog database is not configured');
 const response=await fetcher(base+'/rest/v1/'+endpoint,{method:body?'POST':'GET',headers:{apikey:key,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(8000)});
 if(!response.ok)throw new Error('Catalog database request failed');
 return response.json();
}
export function searchParameters(params){return {q:(params.get('query')||'').slice(0,300),category_filter:params.get('category')||'All',role_filter:params.get('role')||'All',type_filter:params.get('type')||'All',level_filter:params.get('level')||'All',reviewed_only:params.get('reviewed')==='true',sort_by:params.get('sort')==='az'?'az':'editorial',page_limit:Math.min(500,Math.max(12,Number(params.get('limit'))||12)),page_offset:0};}
