// Original editorial summaries based on official product documentation, November 11, 2026.
// Newsletter redirect URLs are discovery references only; no third-party tracking is reused.
const defaults={status:'Documentation reviewed',tested:false,date:'2026-11-11',directory_updated_at:'2026-11-11',tag:'New find · November',level:'Guided setup',hosting:'Hosted web app',pricing_checked_at:'2026-11-11'};
export const novemberElevenPicks=[
 {
  id:'hostinger-managed-openclaw',name:'Managed OpenClaw by Hostinger',publisher:'Hostinger',type:'Agents',category:'Automation',roles:['Entrepreneurs','Developers','Marketers'],mark:'Ho',color:'lavender',
  url:'https://www.hostinger.com/managed-openclaw',sourceUrl:'https://www.hostinger.com/support/what-is-managed-openclaw-and-how-to-set-it-up/',
  description:'Keep an OpenClaw assistant available around the clock with hosting and updates managed by Hostinger. Connect supported messaging channels and choose how to power your agent’s AI requests.',
  best_for:'Running a personal assistant without maintaining the hosting infrastructure yourself.',firstTry:'Give your assistant one recurring research task and have it return a draft summary for review.',checkpoint:'Check the sources and connected permissions before relying on the result.',
  limitations:'A hosting subscription and AI usage are separate considerations. Supported models, channels and integrations depend on the current service.',permissions:'Connected accounts determine what the agent can read or change. Start with limited access and review actions affecting other services.',
  pricing_model:'Paid',pricing:'Paid managed hosting; AI credits or supported provider usage may add costs. Check the current plan and renewal price.',pricing_source:'https://www.hostinger.com/managed-openclaw'
 },
 {
  id:'whacka',name:'Whacka',publisher:'Whacka',type:'AI apps',category:'Development',roles:['Entrepreneurs','Product managers','Developers'],mark:'Wh',color:'butter',
  url:'https://whacka.app/',sourceUrl:'https://whacka.app/',
  description:'Describe an app and build its interface, database, sign-in and hosting in one place. Create a customer portal or internal tool, then add team access, bookings or payments as the workflow grows.',
  best_for:'Turning a focused business process into an app that customers or teammates can use.',firstTry:'Build a project-request tracker with sample records, a status field and separate user accounts.',checkpoint:'Sign in as two test users and verify that each sees only the records they should.',
  limitations:'Publishing, credits and app capabilities depend on the plan. Team accounts are user permissions, not an autonomous team operating your business.',permissions:'App prompts and data are processed by the platform. Review member roles and payment settings before launch.',
  pricing_model:'Freemium',pricing:'Free starting option with paid plans for additional capacity and features. Check current publishing and usage limits.',pricing_source:'https://whacka.app/pricing'
 },
 {
  affiliateUrl:'https://www.chatplayground.ai/?ref=ashley8r',affiliateDisclosure:'We may earn a commission if you purchase through our ChatPlayground partner link.',id:'chatplayground-ai',name:'ChatPlayground AI',publisher:'ChatPlayground',type:'AI apps',category:'Productivity',roles:['Marketers','Product managers','Developers','Entrepreneurs'],mark:'CP',color:'sage',
  url:'https://www.chatplayground.ai/',sourceUrl:'https://www.chatplayground.ai/',
  description:'Ask several AI models the same question and compare their answers in one workspace. Combine useful ideas into a refined response, then save prompts and conversations for your next task.',
  best_for:'Comparing writing, reasoning and research approaches without juggling separate AI subscriptions.',firstTry:'Give several models the same short campaign brief, compare their drafts and combine the strongest ideas.',checkpoint:'Verify factual claims against original sources, including claims repeated by several models.',
  limitations:'Simultaneous model limits depend on the plan: Pro lists four and Unlimited lists six. Agreement between models does not establish accuracy.',permissions:'Prompts and uploaded material are shared with the service and relevant model providers. Check data policies before adding private work.',
  pricing_model:'Paid',pricing:'Paid subscription; model access, simultaneous comparisons and usage limits vary by plan.',pricing_source:'https://www.chatplayground.ai/'
 },
 {
  id:'objekto',name:'Objekto',publisher:'Objekto',type:'AI apps',category:'Design',roles:['Designers','Entrepreneurs','Product managers'],mark:'Ob',color:'peach',
  url:'https://objekto.io/en',sourceUrl:'https://objekto.io/en/facts',
  description:'Shape an object from a description, sketch or reference image, then adjust its dimensions and inspect its parts in 3D. Get a manufacturing quote and assembly guide, with physical orders currently shipping to France.',
  best_for:'Exploring a custom organizer, decorative object or small product concept before ordering a print.',firstTry:'Design a desk organizer, specify its dimensions and inspect how its parts fit together.',checkpoint:'Review scale, material, assembly requirements and the full manufacturing quote before ordering.',
  limitations:'Physical delivery is currently limited to France. Manufacturing is charged separately, and some designs need separately purchased hardware.',permissions:'Uploaded sketches and reference images are processed online. Use designs and images you have permission to share.',
  pricing_model:'Freemium',pricing:'Free starter design credits; subscriptions expand design options. Physical manufacturing and delivery are separate.',pricing_source:'https://objekto.io/en/facts'
 },
 {
  id:'aisma',name:'Aisma',publisher:'Aisma',type:'AI apps',category:'Video',roles:['Marketers','Designers','Entrepreneurs'],mark:'Ai',color:'lavender',
  url:'https://aisma.ai/',sourceUrl:'https://aisma.ai/',
  description:'Change footage you have already filmed by describing the edit. Remove a distraction, replace the background or update a product while preserving the original clip’s timing, motion and audio.',
  best_for:'Making targeted visual changes to a short social, product or campaign clip.',firstTry:'Upload a short clip you own and ask to remove one background distraction.',checkpoint:'Watch the full export for changes to faces, movement, object edges and sound.',
  limitations:'Accepts MP4 or MOV clips of 2–60 seconds, up to 500 MB. Results can vary; review the credit cost before each generation.',permissions:'Video uploads are processed by the provider. Obtain permission from identifiable people before editing or publishing their likeness.',
  pricing_model:'Paid',pricing:'Paid editing credits, with the estimated cost shown before generation. Check current export and credit options.',pricing_source:'https://aisma.ai/'
 },
 {
  id:'se-visible',name:'SE Visible',publisher:'SE Ranking',type:'AI apps',category:'Marketing',roles:['Marketers','Entrepreneurs','Product managers'],mark:'SE',color:'sage',
  url:'https://visible.seranking.com/',sourceUrl:'https://visible.seranking.com/',
  description:'See when your brand appears in monitored AI answers and how it compares with competitors. Explore the prompts and cited pages behind those results to choose your next content or visibility improvement.',
  best_for:'Understanding brand mentions and citation gaps across a defined set of AI search prompts.',firstTry:'Track a small group of buyer questions for your brand and two competitors, then inspect the sources in their answers.',checkpoint:'Review the actual answers, collection dates, engines and markets before interpreting a trend.',
  limitations:'Results describe sampled prompts and supported engines. Brand mentions are different from website visits, conversions or guaranteed rankings.',permissions:'The service stores monitored brands, prompts and collected answers. Keep private customer information out of research prompts.',
  pricing_model:'Paid',trial_available:true,pricing:'Paid plans with a 10-day trial advertised. Prompt limits and API access depend on the subscription.',pricing_source:'https://visible.seranking.com/'
 }
].map(tool=>({...defaults,...tool}));
