import test from 'node:test';
import assert from 'node:assert/strict';
import {promptTemplates,promptFields,buildPrompt,cleanPromptFavorites} from '../public/prompt-kit.mjs';
import {renderRoute} from '../public/views.mjs';
import {curated} from '../public/catalog.mjs';
import {isGitHubRepository,toolGuidance} from '../public/tool-guidance.mjs';

test('prompt fields are unique, replace literally, preserve gaps and append context',()=>{
 const template={prompt:'Make [task] for [audience]. Check [task].'};
 assert.deepEqual(promptFields(template),['task','audience']);
 assert.equal(buildPrompt(template,{'field-0':'  a $& draft  ',context:'  Original brief. ',constraints:'Draft only.'}),
  'Make a $& draft for [audience]. Check a $& draft.\n\nMy context:\nOriginal brief.\n\nConstraints and review requirements:\nDraft only.');
 assert.equal(buildPrompt(template,{'field-0':{},'field-1':'  '}),template.prompt);
 assert.equal(buildPrompt({prompt:'[task]'},{'field-0':'x'.repeat(3000)}).length,2500);
});

test('favorites retain known template IDs only and every template has a builder',()=>{
 assert.equal(new Set(promptTemplates.map(x=>x.id)).size,30);
 const id=promptTemplates[0].id;
 assert.deepEqual(cleanPromptFavorites([id,id,'missing',null,{}]),[id]);
 assert.deepEqual(cleanPromptFavorites({}),[]);
 assert.ok(renderRoute('/prompts?saved=true',curated,{promptSaved:[id]}).includes('1 prompts for you'));
 assert.ok(renderRoute('/prompts?saved=true&query=zzzz',curated,{promptSaved:[id]}).includes('0 prompts for you'));
 for(const m of promptTemplates){const html=renderRoute('/prompts/'+m.id,curated);assert.ok(html.includes('id="prompt-workshop"'));assert.ok(html.includes('data-copy-custom="'+m.id+'"'));}
 assert.ok(!renderRoute('/prompts/unknown',curated).includes('id="prompt-workshop"'));
});

test('prompt drafts are escaped in form fields and output, while favorites are reflected',()=>{
 const id=promptTemplates[0].id,attack='</textarea><img src=x onerror=alert(1)>';
 const html=renderRoute('/prompts/'+id,curated,{promptSaved:[id],promptDrafts:{[id]:{context:attack,'field-0':attack}}});
 assert.ok(!html.includes(attack));
 assert.ok(html.includes('&lt;/textarea&gt;'));
 assert.ok(html.includes('aria-pressed="true">Saved to favorites'));
});

test('repository discovery filters actual GitHub project URLs and explains evaluation',()=>{
 assert.ok(isGitHubRepository({url:'https://github.com/owner/project'}));
 for(const url of ['https://github.com.evil.test/owner/project','https://github.com/topics/mcp','https://github.com/owner','broken'])assert.equal(isGitHubRepository({url}),false);
 const html=renderRoute('/repositories?reviewed=true',curated);
 assert.ok(html.includes('How to evaluate a repository'));
 assert.ok(html.includes('href="/tools/github"'));
 assert.ok(!html.includes('href="/tools/adobe-firefly"'));
 const framework=toolGuidance(curated.find(t=>t.id==='crewai'));
 assert.match(framework.meaning,/developer framework/);
 const tool=curated.find(t=>t.id==='adobe-firefly');
 assert.equal(toolGuidance(tool).start,tool.firstTry);
 assert.ok(renderRoute('/tools/'+tool.id,curated).includes(tool.firstTry));
 assert.ok(renderRoute('/guides/github-repo-checklist',curated).includes('Read the license'));
 assert.ok(renderRoute('/guides/better-prompts',curated).includes('Define success'));
});
