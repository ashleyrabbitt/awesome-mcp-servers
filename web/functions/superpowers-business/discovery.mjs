const eq=encodeURIComponent;
const text=(v,min,max)=>{if(typeof v!=='string'||v.trim().length<min||v.length>max)throw Error('Check the required fields and their length.');return v.trim();};
const uuid=v=>{if(!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(v||''))throw Error('Invalid reference. Refresh and try again.');return v;};
const topicIds=['writing','research','meetings','design','video','presentations','automation','development'];
export function cleanLibrary(d){
 if(!Number.isInteger(d.version)||d.version<0)throw Error('Refresh your account before saving.');
 if(!Array.isArray(d.collections)||d.collections.length>10||!Array.isArray(d.topics)||d.topics.length>8)throw Error('Use up to ten kits and eight topics.');
 const names=new Set();const collections=d.collections.map(c=>{const name=text(c.name,1,60);if(names.has(name.toLowerCase()))throw Error('Give each kit a different name.');names.add(name.toLowerCase());if(!Array.isArray(c.ids)||c.ids.length>100||c.ids.some(id=>typeof id!=='string'||!/^[a-z0-9-]{2,120}$/.test(id)))throw Error('Use up to 100 published tools per kit.');return {name,ids:[...new Set(c.ids)]};});
 if(d.topics.some(x=>!topicIds.includes(x)))throw Error('Choose a listed topic.');return {collections,topics:[...new Set(d.topics)]};
}
export async function discoveryAction(action,d,{db,rpc,all,rate,who,admin,safeURL}){
 if(action==='explore')return rpc('discovery_public',{});
 if(!['library','saveLibrary','ask','vote','makerAnswer','growthAdmin','reviewRequest','reviewAnswer','saveDeal','reviewAvailability'].includes(action))return null;
 if(!who)throw Object.assign(Error('Sign in to save, ask or vote.'),{status:401});
 const now=new Date().toISOString();
 const published=async id=>{if(typeof id!=='string'||!/^[a-z0-9-]{2,120}$/.test(id))throw Error('Choose a published tool.');const t=(await db('superpowers_tools?id=eq.'+eq(id)+'&published=eq.true'))[0];if(!t)throw Error('Published tool not found.');return t;};
 const ids=async values=>{if(!Array.isArray(values)||values.length>8)throw Error('Choose up to eight tools.');const unique=[...new Set(values)];await Promise.all(unique.map(published));return unique;};
 const checked=()=>{if(d.reviewed!==true)throw Error('Confirm your review before publishing.');};
 const row=async(table,id)=>{const r=(await db(table+'?id=eq.'+uuid(id)))[0];if(!r)throw Error('Record not found.');return r;};
 const update=async(table,r,changes)=>{if(d.version!==r.updated_at)throw Error('This record changed. Refresh the queue before saving.');const saved=await db(table+'?id=eq.'+r.id+'&updated_at=eq.'+eq(r.updated_at),'PATCH',{...changes,updated_at:now});if(!saved?.length)throw Error('This record changed. Refresh the queue before saving.');};
 if(action==='library'){const [saved,requests,votes]=await Promise.all([db('superpowers_libraries?email=eq.'+eq(who.email)),db('superpowers_requests?email=eq.'+eq(who.email)+'&select=id,title,kind,tool_id,status,answer,created_at&order=created_at.desc&limit=100'),db('superpowers_votes?email=eq.'+eq(who.email)+'&select=request_id&limit=500')]);return {...(saved[0]||{collections:[],topics:[],version:0}),requests,votes:votes.map(x=>x.request_id)};}
 if(action==='saveLibrary'){
  await rate('library:'+who.email,60);const clean=cleanLibrary(d),wanted=[...new Set(clean.collections.flatMap(c=>c.ids))];
  if(wanted.length){const known=await db('superpowers_tools?id=in.('+wanted.join(',')+')&published=eq.true&select=id');if(known.length!==wanted.length)throw Error('One of these tools is no longer published. Reload the catalog and remove it before saving.');}
  if(d.version===0)await db('superpowers_libraries','POST',{email:who.email,...clean,version:1,updated_at:now});
  else{const saved=await db('superpowers_libraries?email=eq.'+eq(who.email)+'&version=eq.'+d.version,'PATCH',{...clean,version:d.version+1,updated_at:now});if(!saved?.length)throw Error('Your account changed on another tab or device. Refresh before saving.');}
  return {ok:true,version:d.version+1};
 }
 if(action==='ask'){
  await rate('ask:'+who.email,6);if(d.consent!==true||d.company_fax)throw Error('Confirm that this question may be published.');
  if(!['request','question'].includes(d.kind))throw Error('Choose a request type.');const tool_id=d.kind==='question'?(await published(d.tool_id)).id:null;
  const id=uuid(d.id),prior=(await db('superpowers_requests?id=eq.'+id+'&email=eq.'+eq(who.email)))[0];if(!prior)await db('superpowers_requests','POST',{id,email:who.email,kind:d.kind,tool_id,title:text(d.title,10,140),body:text(d.body,30,2000)});
  return {reference:id,status:'pending'};
 }
 if(action==='vote'){
  await rate('vote:'+who.email,60);const r=await row('superpowers_requests',d.id);if(r.status!=='published')throw Error('Only published requests can receive votes.');
  if(d.active===true)await db('superpowers_votes?on_conflict=request_id,email','POST',{request_id:r.id,email:who.email},'resolution=ignore-duplicates,return=minimal');
  else if(d.active===false)await db('superpowers_votes?request_id=eq.'+r.id+'&email=eq.'+eq(who.email),'DELETE');else throw Error('Choose a vote action.');return {ok:true};
 }
 if(action==='makerAnswer'){
  await rate('answer:'+who.email,10);const r=await row('superpowers_requests',d.request_id);if(r.status!=='published'||r.kind!=='question')throw Error('Choose a published tool question.');
  if(!(await db('superpowers_owners?tool_id=eq.'+eq(r.tool_id)+'&email=eq.'+eq(who.email))).length)throw Error('Only the verified owner of this tool can submit a maker answer.');
  const id=uuid(d.id);const prior=(await db('superpowers_answers?id=eq.'+id+'&email=eq.'+eq(who.email)))[0];if(!prior)await db('superpowers_answers','POST',{id,request_id:r.id,email:who.email,body:text(d.body,30,4000)});return {reference:id,status:'pending'};
 }
 if(!admin)throw Object.assign(Error('Administrator access required.'),{status:403});
 if(action==='growthAdmin'){
  const [requests,answers,deals,catalog]=await Promise.all([all('superpowers_requests?order=created_at.desc,id',5000),all('superpowers_answers?order=created_at.desc,id',5000),all('superpowers_deals?order=updated_at.desc,id',5000),all('superpowers_tools?published=eq.true&select=id,data,updated_at&order=id',5000)]);
  return {requests:requests.rows,answers:answers.rows,deals:deals.rows,catalog:catalog.rows,truncated:[requests,answers,deals,catalog].some(x=>x.truncated)};
 }
 if(action==='reviewRequest'){
  const r=await row('superpowers_requests',d.id);if(!['published','declined','pending'].includes(d.status))throw Error('Choose a review decision.');if(d.status==='published')checked();
  await update('superpowers_requests',r,{status:d.status,title:text(d.title,10,140),body:text(d.body,30,2000),answer:text(d.answer||'',0,4000),answer_tools:await ids(d.answer_tools||[])});return {ok:true};
 }
 if(action==='reviewAnswer'){
  const r=await row('superpowers_answers',d.id);if(!['published','declined','pending'].includes(d.status))throw Error('Choose a review decision.');
  if(d.status==='published'){checked();const q=await row('superpowers_requests',r.request_id);if(q.status!=='published'||!q.tool_id||!(await db('superpowers_owners?tool_id=eq.'+eq(q.tool_id)+'&email=eq.'+eq(r.email))).length)throw Error('Confirm the question is public and this author still owns the tool.');}
  await update('superpowers_answers',r,{body:text(d.body,30,4000),status:d.status});return {ok:true};
 }
 if(action==='saveDeal'){
  if(!['draft','published','archived'].includes(d.status)||!['affiliate','sponsored','none'].includes(d.relationship))throw Error('Choose an offer status and relationship.');checked();
  const starts=new Date(d.starts_at),ends=new Date(d.ends_at);if(!Number.isFinite(+starts)||!Number.isFinite(+ends)||+ends<=+starts)throw Error('Add a valid start and expiration date.');if(d.status==='published'&&+ends<=Date.now())throw Error('This offer has expired.');
  const deal={tool_id:(await published(d.tool_id)).id,title:text(d.title,5,140),terms:text(d.terms,30,2000),url:safeURL(text(d.url,10,1000)),source_url:safeURL(text(d.source_url,10,1000)),code:text(d.code||'',0,100),relationship:d.relationship,approval_note:text(d.approval_note,20,2000),starts_at:starts.toISOString(),ends_at:ends.toISOString(),status:d.status,checked_at:now};
  if(d.id)await update('superpowers_deals',await row('superpowers_deals',d.id),deal);else await db('superpowers_deals','POST',deal);return {ok:true};
 }
 if(action==='reviewAvailability'){
  checked();const t=await published(d.tool_id);if(d.version!==t.updated_at)throw Error('This listing changed. Refresh before saving.');
  if(!['available','uncertain','discontinued'].includes(d.availability))throw Error('Choose an availability status.');
  const source=safeURL(text(d.availability_source,10,1000)),note=text(d.availability_note,20,1000);const alternatives=(await ids(d.alternative_ids||[])).filter(id=>id!==t.id);
  const saved=await db('superpowers_tools?id=eq.'+t.id+'&updated_at=eq.'+eq(t.updated_at),'PATCH',{data:{...t.data,availability:d.availability,availability_source:source,availability_note:note,availability_checked_at:now.slice(0,10),alternative_ids:alternatives,directory_updated_at:now},updated_at:now});if(!saved?.length)throw Error('This listing changed. Refresh before saving.');return {ok:true};
 }
 return null;
}
