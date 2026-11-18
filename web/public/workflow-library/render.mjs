// Server-rendered so the guides, examples and downloads also work without JavaScript.
import catalog from './catalog.mjs';

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);

function resourceCard(item) {
  const {id, kind, name, goal, benefit, inputs, steps, endpoint, source, sourceLabel, prompt, example, check, file, downloadLabel} = item;
  const sampleLabel = kind === 'MCP server' ? 'What you should get' : 'Worked example · sample data';
  const promptLabel = kind === 'MCP server' ? 'First request' : kind === 'Skill' ? 'Try the skill' : 'First run';
  return `<article class="wl-card" id="${escape(id)}" data-wl-kind="${escape(kind)}">
    <div class="wl-label"><span>${escape(kind)}</span><span>${escape(goal)}</span></div>
    <h3>${escape(name)}</h3><p class="wl-benefit">${escape(benefit)}</p>
    <details><summary>How to use it</summary><div class="wl-guide">
      <h4>What you need</h4><p>${escape(inputs)}</p>
      ${endpoint ? `<h4>Server URL</h4><code>${escape(endpoint)}</code>` : ''}
      <h4>${kind === 'Skill' ? 'How the skill works' : 'Set up and try it'}</h4><ol>${steps.map(step => `<li>${escape(step)}</li>`).join('')}</ol>
      <h4>${promptLabel}</h4><div class="wl-sample"><p data-wl-prompt>${escape(prompt)}</p><button type="button" data-wl-copy hidden>Copy example</button></div>
      <h4>${sampleLabel}</h4><p>${escape(example)}</p>
      <h4>Check the result</h4><p>${escape(check)}</p>
      <div class="wl-actions">${file ? `<a class="wl-download" href="/workflow-assets/files/${escape(file)}" download>${escape(downloadLabel || 'Download template')}</a>` : ''}
      ${source ? `<a href="${escape(source)}">${escape(sourceLabel || 'Publisher guide')} ↗</a>` : ''}
      <a href="#${escape(id)}" aria-label="Link to ${escape(name)}">Link to this guide</a></div>
    </div></details>
  </article>`;
}

export function renderLibrary() {
  const {site, title, intro, quickTitle, quickSteps, starter, related, resources} = catalog;
  const kinds = [...new Set(resources.map(item => item.kind))];
  return `<workflow-finder class="wl wl-${escape(site)}">
    <section class="wl-hero"><div><p class="wl-kicker">${escape(catalog.category)}</p><h1>${escape(title)}</h1><p class="wl-intro">${escape(intro)}</p></div>
      <aside class="wl-start"><h2>${escape(quickTitle)}</h2><ol>${quickSteps.map(step => `<li>${escape(step)}</li>`).join('')}</ol><a href="#${escape(starter)}">Open the first guide ↓</a></aside>
    </section>
    <details class="wl-primer"><summary>${escape(catalog.primerTitle)}</summary><div>${catalog.primer.map(([label,value]) => `<p><strong>${escape(label)}.</strong> ${escape(value)}</p>`).join('')}<p><a href="https://agentskills.io/specification">Agent Skills file format ↗</a></p></div></details>
    <section class="wl-directory" aria-labelledby="wl-browse"><h2 id="wl-browse">Browse the library</h2>
      <div class="wl-controls" data-wl-controls hidden><label>Search by task or name<input type="search" data-wl-query placeholder="${escape(catalog.placeholder)}" autocomplete="off"></label>
      ${kinds.length > 1 ? `<label>Resource type<select data-wl-type><option value="">All types</option>${kinds.map(kind => `<option>${escape(kind)}</option>`).join('')}</select></label>` : ''}
      <button type="button" data-wl-reset>Clear filters</button></div>
      <p class="wl-count" data-wl-count role="status" aria-live="polite">${resources.length} resources</p>
      <div class="wl-grid">${resources.map(resourceCard).join('')}</div>
      <p data-wl-empty hidden>No matches. Try a broader task or clear the filters.</p>
    </section>
    <nav class="wl-related" aria-label="Related guides"><strong>Keep exploring</strong>${related.map(([name,url]) => `<a href="${escape(url)}">${escape(name)} →</a>`).join('')}</nav>
  </workflow-finder>`;
}
