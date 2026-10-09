import {powerCollections} from '../public/spotlight.mjs';
import {answers} from '../public/answers.mjs';
import {pageSEO,seoMarkup} from '../public/seo.mjs';
import {siteOrigin} from '../public/site-config.mjs';
import {howTos,resourceKits,resourceMarkdown} from '../public/resource-kit.mjs';
import {promptTemplates} from '../public/prompt-kit.mjs';
import {readFile,writeFile,mkdir,cp,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {curated,escapeHTML as e} from '../public/catalog.mjs';
import {workflows,guides} from '../public/content.mjs';
import {missions} from '../public/discovery.mjs';
import {renderRoute} from '../public/views.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const items=[...curated,...JSON.parse(await readFile(path.join(root,'public/imported.json'),'utf8'))];
const template=await readFile(path.join(root,'public/index.html'),'utf8');
const routes=['/working-session','/workshops/campaign','/kits','/kits/campaign','/kits/customer-research','/kits/automation','/opportunity-finder','/field-guide','/services','/tool-trial','/discoveries','/reviewed','/answers','/newsletter',...answers.map(a=>'/answers/'+a.id),'/workflow-lab','/time-savings','/resources',...howTos.map(h=>'/how-to/'+h.id),...resourceKits.map(r=>'/resources/'+r.id),...promptTemplates.map(p=>'/prompts/'+p.id),'/repositories','/power-map','/collections',...powerCollections.map(c=>'/collections/'+c.id),'/planner','/prompts','/hq','/shared','/missions','/stacks',...missions.map(m=>'/missions/'+m.id),...missions.filter(m=>m.steps).map(m=>'/stacks/'+m.id),'/','/directory','/saved','/finder','/compare','/workflows','/learn','/training','/workshops','/coaching','/security','/inspector','/contact','/submit','/support','/privacy','/terms','/disclosure','/credits',...items.map(x=>'/tools/'+x.id),...workflows.map(x=>'/workflows/'+x.id),...guides.map(x=>'/guides/'+x.id)];
await rm(path.join(root,'dist'),{recursive:true,force:true});await cp(path.join(root,'public'),path.join(root,'dist'),{recursive:true});
const origin=process.env.SITE_URL?new URL(process.env.SITE_URL).origin:siteOrigin;
if(!origin.startsWith('https://'))throw new Error('SITE_URL must use HTTPS');
await writeFile(path.join(root,'dist/site-config.mjs'),`export const siteOrigin=${JSON.stringify(origin)};\n`);
const indexable=[];
for(const route of [...routes,'/404']){
 const content=renderRoute(route,items,{saved:[],compare:[]});
 const seo=pageSEO(route,items,content,origin);
 if(!seo.noindex&&route!=='/support')indexable.push(route);
 const html=template.replace('<!--APP-->',content).replace(/<title>.*?<\/title>/,`<title>${e(seo.title)}</title>`).replace(/<meta name="description"[^>]+>/,`<meta name="description" content="${e(seo.description)}">${seoMarkup(seo)}`);
 const folder=path.join(root,'dist',route);await mkdir(folder,{recursive:true});await writeFile(path.join(folder,'index.html'),html);
}
await mkdir(path.join(root,'dist/downloads'),{recursive:true});
for(const r of resourceKits)await writeFile(path.join(root,'dist/downloads',r.id+'.md'),resourceMarkdown(r));
await writeFile(path.join(root,'dist/routes.json'),JSON.stringify(routes));
await writeFile(path.join(root,'dist/sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+indexable.map(r=>'<url><loc>'+origin+r+'</loc></url>').join('')+'</urlset>');
await writeFile(path.join(root,'dist/robots.txt'),'User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+origin+'/sitemap.xml\n');
console.log(`Built ${routes.length} rendered pages, ${indexable.length} sitemap URLs and ${items.length} tools.`);

