import marketing from './marketing-data-connectors.mjs';
import invoice from './invoice-extraction.mjs';
import research from './research-synthesis.mjs';
import {escapeHTML as e} from '../catalog.mjs';

const base='/tool-tests';
export const studies=[marketing,invoice,research];
export const testRoutes=[base,...studies.map(t=>base+'/'+t.id)];
const link = study => base+'/'+study.id;
const tile=study=>`<article class="task-tile"><h3><a href="${link(study)}">${e(study.title)}</a></h3><p>${e(study.result)}</p></article>`;

export function testPage(path){
 if(path===base)return `<div class="wrap task-library"><header class="task-intro"><a href="/ai-tasks">Task guides</a><h1>AI tools tested on real tasks</h1><p class="lead">See what the tools returned, where a result went wrong and how it was checked. Each report includes the inputs, outputs and instructions for repeating the comparison.</p></header><section class="task-shelf"><h2>Completed comparisons</h2><p>Tests run November 22, 2026. Each score belongs to the sample and procedure in its report.</p><div class="task-tiles">${studies.map(tile).join('')}</div></section><section class="task-shelf"><h2>Earlier tests</h2><p><a data-editorial-link href="/guides/exa-vs-tinyfish-web-extraction-test">Exa and TinyFish on three live pages</a> · <a data-editorial-link href="/guides/mcp-publishing-workflow-test-report">Three read-only checks on a publishing workflow</a></p></section></div>`;
 const study=studies.find(t=>path===link(t));
 if(!study)return null;
 return `<article class="wrap task-library test-report"><header class="task-intro"><a href="${base}">All completed tests</a><h1>${e(study.title)}</h1><p class="lead">${e(study.intro)}</p><p><time datetime="2026-11-22">Tested November 22, 2026</time> · AI Superpower</p></header><section class="test-verdict"><h2>What we found</h2><p>${e(study.result)}</p></section><div class="test-body">${study.body}</div><section class="task-sample"><h2>Repeat this comparison</h2><p>Download the shared inputs, original outputs, scorecard and reproduction notes.</p><a class="button" href="/downloads/tool-tests/${study.id}.zip">Get the test files</a><p><a ${study.guide.startsWith('/guides/')?'data-editorial-link ':''}href="${study.guide}">${e(study.guideLabel)}</a></p></section></article>`;
}
