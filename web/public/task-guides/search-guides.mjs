import {escapeHTML as e} from '../catalog.mjs';

// Each search intent points to the established page visitors already find.
export const searchGuides=[
 {id:'marketing-data-connectors',group:'Business operations',title:'Compare marketing data connectors for a report',
  path:'/guides/windsor-ai-and-data-connectors',keywords:['windsor ai','windsor connector','windsor.ai alternatives','migrate from windsor.ai','marketing data connector','marketing reporting'],
  description:'Check whether a connector can reproduce a marketing number before moving a dashboard.',
  products:[['Windsor.ai','https://windsor.ai/documentation/','Compare supported marketing sources and destinations for an existing dashboard.'],['Supermetrics','https://docs.supermetrics.com/','Check that the connector, source and reporting entitlement are available in your plan.']],
  sample:'A fictional report has Monday at 100 impressions and 5 clicks, and Tuesday at 900 impressions and 9 clicks. Give both connectors the same source, dates, timezone and filters.',
  example:'The combined result should be 14 clicks from 1,000 impressions, or 1.4% CTR. Averaging the two daily percentages gives 3%. If totals disagree, inspect the query, date boundaries and aggregation before changing vendors.',
  planCheck:{
   checked:'November 23, 2026', url:'https://windsor.ai/pricing/',
   scope:'Count platforms and accounts separately. A report pulling one GA4 property and one Google Ads account needs two data sources and two accounts. A Google Sheets destination does not add a third source.',
   terms:'Windsor lists a 30-day trial with a 30-day history limit. Its ongoing free tier allows one source and one account. Basic lists three sources and 75 accounts at $23 per month on monthly billing or $19 per month on annual billing.',
   decision:'For two consecutive 28-day windows, request the earliest day before migrating the dashboard. A 30-day history window cannot cover all 56 days. Record the earliest returned date, row count, destination and refresh frequency alongside your CTR result.'
  },
  test:'marketing-data-connectors'},
 {id:'shopify-mcp-use-cases',group:'Business operations',title:'Choose a Shopify MCP for a shopping or merchant task',
  path:'/guides/shopify-ai-mcp-practical-guide',keywords:['shopify mcp','shopify mcp server','shopify mcp connector','shopify storefront catalog'],
  description:'Choose the right Shopify connection for a shopper, merchant or developer and check the answer against a product record.',
  products:[['Shop MCP','https://shopify.dev/docs/agents/shop-mcp','Product discovery for a shopper-facing experience.'],['Sidekick','https://help.shopify.com/en/manual/ai-powered-tools/sidekick','Help a merchant work with their authorized Shopify admin context.'],['Shopify AI Toolkit','https://shopify.dev/docs/api/ai-toolkit','Look up Shopify development context while building an integration.']],
  sample:'Fictional catalog: a blue mug is $16 and in stock. A red mug is $12 and sold out. A shopper asks for a mug under $15 that can ship now.',
  example:'Neither mug meets both conditions. A correct answer can offer to relax the budget or availability requirement. Choosing the $12 red mug would satisfy price while failing the shopper’s shipping requirement.'},
 {id:'upwork-mcp-job-search',group:'Business operations',title:'Use Upwork MCP to shortlist freelance projects',
  path:'/guides/upwork-mcp-freelance-workflow',keywords:['upwork mcp','upwork mcp server','freelance job search','freelance proposal'],
  description:'Screen opportunities against a clear service definition, then prepare evidence for the best fit.',
  products:[['Upwork MCP','https://www.upwork.com/ai/mcp','Retrieve marketplace information through an authorized connection.'],['Upwork','https://www.upwork.com/','Verify the original posting, budget and client requirements before deciding to apply.']],
  sample:'Fictional service: a two-day UX audit for $600–$900, delivering a findings report. Project A wants an audit for $750. Project B wants a fully coded redesign for $800. Project C asks for a free speculative audit.',
  example:'Shortlist A because its budget, scope and deliverable fit. B needs a scope conversation. C requires a decision about unpaid work. An appropriate draft for A asks what booking step is underperforming and offers one relevant work sample. Submission remains a separate decision.'},
 {id:'functional-prototype',group:'Development and data',title:'Create and test a functional prototype',
  path:'/how-to/prototype-with-ai',keywords:['functional prototype creation','realistic functional prototype','fast functional prototype','multi-functional prototype','clickable prototype'],
  description:'Build one interaction, then test success, error and recovery with the same input.',
  products:[['Figma Make','/tools/figma-make','Start with the interaction in a design workflow.'],['Lovable','/tools/lovable','Turn a brief into an editable app prototype.'],['v0','/tools/v0','Work on the interface and implementation together.']],
  sample:'Prototype a workshop booking with six available seats. A visitor requests two seats, then tries seven, then edits the request to one. Use mock data.',
  example:'Two seats produce a confirmation. Seven shows a capacity error without creating a booking. Editing the request to one clears the error and the one-seat confirmation matches the final input. A screenshot of the first screen proves only one of the three checks.'},
 {id:'real-task-tool-reviews',group:'Research and learning',title:'Compare AI tools using real tasks and actual outputs',
  path:'/guides/ten-ai-tools-comparison-field-guide',keywords:['what review sites compare ai tools using real tasks','ai tools tested on real tasks','real task ai tool reviews','comparegen.ai alternatives','compare tools'],
  description:'Inspect the inputs, observed mistakes and correction work behind a published comparison.',
  products:[['Exa','https://exa.ai/','Look at the extract returned from the supplied pages.'],['TinyFish','https://www.tinyfish.ai/','Compare the browser-agent output against the same pages.']],
  sample:'A public service page offers three focused fixes for $497. Ask each tool for the price, scope and source.',
  example:'In the published extraction run, Exa returned an older $997 offer and one improvement. TinyFish recovered the $497 offer and its scope. A separate package heading was lost. Verify both price and scope before reusing the answer.',
  test:'all'}
];
export function searchGuideEvidence(guide){
 const url=guide.test==='all'?'/tool-tests':'/tool-tests/'+guide.test;
 const plan=guide.planCheck;
 const pricing=plan ? `<h3>Will this plan cover your report?</h3><p>${e(plan.scope)}</p><p>${e(plan.terms)} <a href="${e(plan.url)}">Windsor.ai pricing and limits, checked ${e(plan.checked)}</a>.</p><p>${e(plan.decision)}</p>` : '';
 return `<section class="task-reference" id="practice-example"><h2>Try this task</h2><p>${e(guide.sample)}</p><h3>Worked example</h3><p>${e(guide.example)}</p>${pricing}<h3>Why these products are featured</h3><p>AI Superpower editorial selection · November 22, 2026</p><ul>${guide.products.map(([name,href,reason])=>`<li><a href="${e(href)}">${e(name)}</a> — ${e(reason)}</li>`).join('')}</ul>${guide.test?`<p><a href="${url}">See the completed ${guide.test==='all'?'tool tests':'connector comparison'}</a></p>`:''}</section>`;
}
