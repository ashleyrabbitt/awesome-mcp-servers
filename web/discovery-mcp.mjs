import {tool,InputError} from './mcp-protocol.mjs';
import {workflows} from './public/content.mjs';
import {curated,searchTools} from './public/catalog.mjs';

const text={type:'string',minLength:1,maxLength:160};
const limit={type:'integer',minimum:1,maximum:25};
const byId = new Map(curated.map(t=>[t.id,t]));
function listing(t) {
  return {name:t.name,source:t.sourceUrl || t.url,details:'https://aisuperpower.cc/tools/'+t.id,
    access:t.permissions || null,pricing:t.pricing || 'Confirm with provider',review:t.status || null,
    sourceDate:t.directory_updated_at || t.date || null,tested:t.tested===true};
}
function routine(w) {
  return {id:w.id,title:w.title,role:w.role,output:w.output,
    url:'https://aisuperpower.cc/workflows/'+w.id,steps:w.steps,starterPrompt:w.prompt,
    humanReview:w.review,tools:w.tools.map(id=>byId.has(id)?listing(byId.get(id)):{name:id,review:'See workflow source'}),
    evidence:'Editorial routine. Verify permissions and run with sample inputs before relying on the output.'};
}
export const discoveryTools=[
 tool('find_workflows','Find original worked routines by task, role or desired output. Use short search terms.',
   {query:text,limit},[],({query='',limit=12})=>{
     const terms=query.toLowerCase().split(/\s+/).filter(Boolean);
     const hits=workflows.filter(w=>terms.every(t=>[w.id,w.role,w.title,w.subtitle,w.output,...w.tools,...w.steps.flat()].join(' ').toLowerCase().includes(t)));
     return {matched:hits.length,workflows:hits.slice(0,limit).map(w=>({id:w.id,title:w.title,role:w.role,output:w.output,url:'https://aisuperpower.cc/workflows/'+w.id}))};
   }),
 tool('get_workflow','Read the steps, suggested tools, original sources and human review for one routine.',{id:text},['id'],({id})=>{
   const item=workflows.find(w=>w.id===id);if(!item)throw new InputError('Choose an id returned by find_workflows.');
   return {workflow:routine(item)};
 }),
 tool('find_reviewed_tools','Search the editorial documentation-reviewed catalog. Includes sources and known permission requirements. Commercial placement does not affect this alphabetical result.',
   {query:text,role:text,limit},['query'],({query,role='All',limit=10})=>{
     const hits=searchTools(curated,{query,role,reviewed:true,sort:'az'});
     return {matched:hits.length,tools:hits.slice(0,limit).map(listing),note:'Documentation review and an end-to-end trial are separate. Recheck current pricing and access at the provider.'};
   })
];
