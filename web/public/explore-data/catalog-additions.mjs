import {toolPicks} from './tools.mjs';
import {technologyPicks} from './technology.mjs';

// Only new product identities get a catalog row. Existing products retain their original IDs.
const specs = [
  ['figma-make','Figma','AI apps','Design',['Designers','Product managers'],'Web app','Use a sample brief and check the generated interaction at mobile and desktop sizes.'],
  ['goblin-tools','Goblin Tools','AI apps','Productivity',['Entrepreneurs','Educators'],'Web app','Check whether the task breakdown fits the time and energy available.'],
  ['quick-draw','Google','AI apps','Creative',['Creators','Educators'],'Browser game','Compare the machine’s guesses for two people drawing the same object.'],
  ['dm-champ','DM Champ','Agents','Sales',['Salespeople','Marketers'],'Hosted app','Confirm included credits, supported messaging channels and when a conversation transfers to a person.'],
  ['dialora','Dialora','Agents','Customer support',['Entrepreneurs','Salespeople'],'Hosted app','Check call-minute allowances and the handling of incomplete booking details.'],
  ['robinreach','RobinReach','AI apps','Marketing',['Marketers','Creators'],'Web app','Check the supported networks and the number of brands and seats in the selected tier.'],
  ['notion-custom-agents','Notion','Agents','Productivity',['Product managers','Entrepreneurs'],'Notion workspace','Check which pages the agent can access and where its answers appear.'],
  ['google-developer-knowledge-mcp-server','Google','MCP servers','Documentation',['Developers'],'Remote MCP server','Verify the suggested API name and version in the linked developer reference.'],
  ['anthropic-doc-coauthoring','Anthropic','Skills','Writing',['Product managers','Entrepreneurs'],'Compatible agent client','Ask a reader unfamiliar with the proposal to explain its decision and the evidence behind it.'],
  ['anthropic-theme-factory','Anthropic','Skills','Design',['Designers','Creators'],'Compatible agent client','Check text contrast and test the theme on a dense slide as well as the cover.'],
  ['anthropic-skill-creator','Anthropic','Skills','Development',['Developers','Product managers'],'Compatible agent client','Test the skill on a new example and note where its output misses the brief.'],
  ['claude-marketing-plugin','Anthropic','Plugins','Marketing',['Marketers','Entrepreneurs'],'Claude Cowork','Check the audience, claims and requested channel before using a campaign draft.'],
  ['claude-product-management-plugin','Anthropic','Plugins','Product management',['Product managers','Designers'],'Claude Cowork','Trace each product decision back to an observation in the supplied notes.'],
  ['tripmojo','Tripmojo','Agents','Travel',['Entrepreneurs','Creators'],'Web app','Check opening hours, travel times and cancellation terms before making a reservation.'],
  ['currents','Currents','Workflow tools','Development',['Developers'],'Hosted service','Compare the diagnosis with the original test run and its recorded artifacts.'],
  ['tamekoshi','Tamekoshi','Agents','Productivity',['Entrepreneurs','Creators'],'Desktop app','Confirm what meeting audio and connected workspace information the companion can access.'],
  ['threadlore','ThreadLore','AI apps','Creative',['Creators','Designers'],'Web app','Compare the thread pattern against the original sample before preparing a loom.']
];
const picks = [...toolPicks,...technologyPicks];
const setupByType = {
  'Skills':'Read the included instructions and inspect any support files before letting the skill use project material.',
  'Plugins':'Review which integrations and workspace files the plugin can use before connecting an account.',
  'MCP servers':'Check the tools exposed by the server and keep confidential material out of documentation queries.',
  'Agents':'Review connected accounts and approve any customer-facing action or booking before it happens.',
  'Workflow tools':'Limit project access to the test results needed for the task.',
  'AI apps':'Use material you have permission to share and review the provider’s input and export settings.'
};
const audienceById = {
  'figma-make':'Designers prototyping one interaction from a short brief.',
  'goblin-tools':'Someone who needs a manageable first step for an overwhelming task.',
  'quick-draw':'Educators and families exploring how a model recognizes sketches.',
  'dm-champ':'Service teams deciding how to handle routine inbound messages.',
  'dialora':'Businesses assessing a voice assistant for appointment inquiries.',
  'robinreach':'Small marketing teams adapting a message for several social channels.',
  'notion-custom-agents':'Teams whose process documents and requests already live in Notion.',
  'google-developer-knowledge-mcp-server':'Developers looking up Google platform documentation inside a coding assistant.',
  'anthropic-doc-coauthoring':'People developing a proposal or decision document with a reviewer.',
  'anthropic-theme-factory':'Teams giving a presentation or report a consistent visual treatment.',
  'anthropic-skill-creator':'Builders turning a repeated procedure into a reusable agent skill.',
  'claude-marketing-plugin':'Marketers drafting campaigns or evaluating copy in Claude Cowork.',
  'claude-product-management-plugin':'Product teams turning research notes into a working brief.',
  'tripmojo':'Travelers planning a shared itinerary with several constraints.',
  'currents':'Developers investigating existing failures in their own test runs.',
  'tamekoshi':'People experimenting with a desktop companion for everyday work.',
  'threadlore':'Weavers exploring a draft pattern from a fabric image.'
};
export const catalogAdditions = specs.map(([id,publisher,type,category,roles,hosting,checkpoint])=>{
  const pick = picks.find(row=>row.toolId===id);
  const url = pick.vendorUrl||pick.url;
  const ph = pick.tags.includes('Product Hunt');
  return {
    id, name:pick.title, publisher, type, category, roles, hosting,
    description:pick.description, firstTry:pick.tryThis, checkpoint, limitations:checkpoint,
    best_for:audienceById[id], permissions:setupByType[type], level:['Skills','MCP servers','Plugins','Workflow tools'].includes(type)?'Guided setup':'Beginner',
    status:'Documentation reviewed', tested:false, date:'2026-11-21', directory_updated_at:'2026-11-21',
    url, sourceUrl:url, pricing_model:'Unknown', pricing:'Check current access and usage limits with the provider.',
    tag:ph?pick.sourceLabel:category, mark:pick.title.split(' ').slice(0,2).map(w=>w[0]).join(''), color:'sage',
    ...(pick.group==='marketplaces'?{discoveryUrl:pick.url}:{}),
    ...(ph?{productHuntRank:{period:'day',date:pick.date,rank:Number(pick.sourceLabel.match(/#(\d+)/)[1]),checked_at:'2026-11-21',url:pick.sourceUrl}}:{})
  };
});
