import {workSampleMetric} from '../public/work-sample-client.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {curated,searchTools} from '../public/catalog.mjs';
import {directoryStudio,directoryCard,activeDirectoryFilters} from '../public/directory-studio.mjs';
import {cleanSample,sampleExample,sampleMarkdown,sampleReady,workRoutes} from '../public/work-income.mjs';
import {learningEvents,upcomingEvents,eventsPage,learningRoutes} from '../public/learning-events.mjs';
import {renderRoute} from '../public/views.mjs';
import {pageSEO} from '../public/seo.mjs';
import {newsStories} from '../public/news-data.mjs';

test('directory intersections, saved tools and remote result counts remain usable',()=>{
 const filtered=searchTools(curated,{role:'Designers',type:'AI apps'}),html=directoryStudio(curated,{role:'Designers',type:'AI apps'});
 assert.ok(filtered.length);assert.match(html,new RegExp(`${filtered.length} tools`));
 for(const t of filtered.slice(0,12))assert.ok(html.includes(`/tools/${t.id}`));
 assert.deepEqual(activeDirectoryFilters({query:'video',role:'All',reviewed:false,type:'AI apps'}),[{key:'query',label:'video'},{key:'type',label:'AI apps'}]);
 assert.ok(html.includes('data-remove-filter="role"'));assert.ok(html.indexOf('id="directory-search"')<html.indexOf('directory-products'));
 const saved=directoryStudio(curated,{savedOnly:true,saved:[curated[0].id]});assert.match(saved,/1 tool/);assert.ok(!saved.includes(`/tools/${curated[1].id}`));
 const remote=directoryStudio(curated,{searchRows:[curated[0]],searchTotal:204});assert.match(remote,/204 tools/);
 assert.match(directoryStudio(curated,{query:'no-such-tool-abc123'}),/No tools match every filter/);
 assert.match(directoryCard({...curated[0],name:'<script>x</script>',description:'<img onerror=x>',pricing:'Long pricing paragraph',pricing_model:'Freemium'}),/&lt;script&gt;/);
 assert.ok(!directoryCard({...curated[0],pricing:'Long pricing paragraph',pricing_model:'Freemium'}).includes('Long pricing paragraph'));
});

test('sample exports preserve project type, judgment and observed evidence without invented results',()=>{
 assert.equal(sampleReady({}),false);assert.equal(sampleReady(sampleExample),true);
 const clean=cleanSample({kind:'Paid expert',workflow:'missing',title:' x '.repeat(3000),output:123});assert.equal(clean.kind,'Practice sample');assert.equal(clean.title.length,2500);assert.equal(clean.output,'');
 const example=sampleMarkdown(sampleExample);assert.match(example,/Practice sample/);assert.match(example,/No time saving/);assert.match(example,/invented deadline/);
 const blank=sampleMarkdown({kind:'Client project'});assert.match(blank,/Client project/);assert.match(blank,/Add your own evidence/);assert.ok(!blank.includes('30%'));
});

test('events expire into the archive while dates, official sources and learning remain available',()=>{
 assert.equal(upcomingEvents(new Date('2026-11-14T12:00:00Z')).length,4);
 const later=upcomingEvents(new Date('2026-11-21T12:00:00Z'));assert.equal(later.length,2);assert.ok(later.every(x=>x.start==='2026-11-30'));
 assert.equal(upcomingEvents(new Date('2026-12-05T12:00:00Z')).length,0);
 const archive=eventsPage(new Date('2026-12-05T12:00:00Z'));assert.match(archive,/Past events/);assert.match(archive,/No dated picks remain/);
 for(const event of learningEvents){assert.ok(event.url.startsWith('https:'));assert.ok(Date.parse(event.expires));assert.ok(event.output.length>30);}
});

test('new routes are rendered, discoverable and use descriptive metadata',async()=>{
 const routes=JSON.parse(await readFile(new URL('../dist/routes.json',import.meta.url),'utf8'));
 const sitemap=await readFile(new URL('../dist/sitemap.xml',import.meta.url),'utf8');
 for(const route of [...workRoutes,...learningRoutes]){assert.ok(routes.includes(route));assert.ok(sitemap.includes(route));const html=renderRoute(route,curated);assert.match(html,/<h1>/);assert.equal(pageSEO(route,curated,html).noindex,false);assert.ok(pageSEO(route,curated,html).description.length>80);}
 const news=renderRoute('/news?topic=Design%20%26%20tech',curated);assert.match(news,/Figma’s 3D transforms/);assert.ok(!news.includes('ChatGPT Wallet: design'));
 for(const id of ['chatgpt-wallet-agent-purchase-approval','figma-3d-transforms-motion-work-sample','multi-user-agents-shared-decision-mamubench']){assert.ok(newsStories.some(s=>s.id===id));assert.match(renderRoute('/news/'+id,curated),/GO TO THE ORIGINAL/);}
});

test('work sample measurement contains only fixed actions and a public page path',()=>{
 assert.equal(workSampleMetric('private client notes'),null);
 assert.deepEqual(workSampleMetric('download_md'),{name:'work_sample_action',params:{action:'download_md',page_path:'/work-sample-builder'}});
});
