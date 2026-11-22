// The practice inputs are fictional. Readers supply their own files when a tool needs media.
export const taskGroups = ['Business operations','Research and learning','Creative production','Development and data'];
export const tasks = [
  {
    id:'forecast-inventory',group:'Business operations',title:'Forecast inventory and plan a reorder',
    description:'Compare demand-planning tools on one SKU. Look for a reorder recommendation you can trace back to demand, lead time and stock on hand.',
    keywords:['inventory','demand forecasting','stock levels','reorder','stockouts','replenishment','retail forecast'],
    sample:'Practice SKU: green mug. Weekly sales for eight weeks: 14, 16, 15, 17, 31, 16, 14, 17. Week five included a promotion. Current stock: 38. Lead time: two weeks. Pack size: 12. No open orders.',
    steps:['Enter the sales history and mark the promotion. Ask for a baseline demand forecast.','Add stock on hand, lead time and pack size. Compare the recommendation with your own rough calculation.','Change the lead time to three weeks. Record how the suggested order changes.'],
    checks:['The forecast explains its treatment of the promotion.','The recommended order respects pack size and makes its safety-stock assumption explicit.','A planner can see and revise the inputs before placing an order.']
  },
  {
    id:'categorize-customer-feedback',group:'Business operations',title:'Turn customer feedback into product priorities',
    description:'Find recurring problems in customer comments and keep a trail from each theme to the words customers actually used.',
    keywords:['categorize feedback','customer feedback','voice of customer','customer comments','feedback analysis','cluster reviews','feature requests'],
    sample:'A: I found the report but the download button was hidden. B: My invoice exported twice. C: Where do I get a CSV? D: The dashboard is easy to read. E: We need a second billing contact. F: I can see the totals but cannot get the file.',
    steps:['Import the six comments with their letter IDs. Ask for themes and supporting quotations.','Open the evidence for the largest theme. Count unique comments and inspect ambiguous matches.','Choose one change to investigate and one follow-up question for a customer.'],
    checks:['Every theme links to a real comment ID.','Praise and unrelated billing requests have distinct labels.','The tool preserves uncertainty and lets you correct a mistaken grouping.']
  },
  {
    id:'build-a-sales-proposal',group:'Business operations',title:'Draft a sales proposal from a client brief',
    description:'Turn discovery notes into a proposal with explicit scope, exclusions and pricing a buyer can understand.',
    keywords:['sales proposal','write proposal','client proposal','proposal software','rfp','pitch a service'],
    sample:'Fictional brief: A local studio wants a booking-page review and one revised page. Fixed fee $1,200. Delivery in ten business days after receiving access. Client supplies the images. Advertising and ongoing support are outside scope.',
    steps:['Paste the brief into a blank proposal and request sections for scope, timing and price.','Inspect the draft for invented testimonials, deliverables or guarantees.','Export or preview the proposal as the buyer would see it. Try revising the fee in one place.'],
    checks:['The fee and start condition match the brief.','The image handoff and excluded work are explicit.','The buyer can find the proposed next step and the document remains editable.']
  },
  {
    id:'plan-a-social-campaign',group:'Business operations',title:'Plan a social campaign around one offer',
    description:'Compare planning and publishing tools on a week of channel-specific posts with one measurable call to action.',
    keywords:['social campaign','social media','social content calendar','schedule posts','repurpose posts','social scheduling'],
    sample:'Fictional campaign: a ceramics studio has eight seats for a Saturday workshop. Registration closes Thursday at noon. The goal is bookings. The team has one studio photo and one 15-second clip, with permission to use both.',
    steps:['Make a one-week calendar for two channels using the supplied facts and media.','Adapt the opening line and asset for each channel. Check the booking link in preview.','Keep the posts as drafts and review deadlines, image crops and the tracking plan.'],
    checks:['Every draft preserves the deadline and seat count.','Each channel has a suitable asset and a working booking call to action.','A person can review or reschedule a post before it publishes.']
  },
  {
    id:'review-research-papers',group:'Research and learning',title:'Review research papers with checkable citations',
    description:'Build an evidence table that ties claims to a study, method and passage you can inspect.',
    keywords:['ai research synthesis','research synthesis','synthesize research papers','research papers','literature review','academic research','systematic review','find citations','paper summaries'],
    sample:'Choose three open-access papers on the same learning intervention. For each, record the DOI, population, method, result and one limitation. Include one paper with a different outcome measure.',
    steps:['Choose the stage you need help with: discovering papers, screening abstracts or reading the methods. Give comparable tools the same question or source set.','Create your own evidence table with a cited passage for each included result. Mark which fields you or the tool supplied.','Open every citation and check the population, method and outcome before drawing a conclusion.'],
    checks:['Every cited study exists and matches the supplied paper.','The method and population remain linked to the right outcome.','The summary identifies at least one limit on the comparison.']
  },
  {
    id:'prepare-teaching-materials',group:'Research and learning',title:'Create a lesson and check what learners understood',
    description:'Turn a learning objective into a teachable activity, an answer key and a short assessment.',
    keywords:['teaching materials','lesson plan','lesson planning','teacher worksheets','classroom quiz','prepare lessons'],
    sample:'Plan a 35-minute lesson on reading a bar chart for learners who can count but have not interpreted axes. Use fictional counts: apples 7, peaches 4, pears 9. One learner needs a text alternative.',
    steps:['Give each tool the same objective, timing and fictional data. Request an activity and exit ticket.','Work through each question yourself and check its answer against the chart.','Adapt one activity for a learner who uses a screen reader. Check that the goal stays the same.'],
    checks:['The activities fit 35 minutes and address the stated objective.','The answer key agrees with the supplied data.','The assessment and accessible version test the same skill.']
  },
  {
    id:'make-content-accessible',group:'Research and learning',title:'Make images, audio and documents easier to access',
    description:'Choose a tool for a specific access need. Evaluate whether someone can understand and use the result.',
    keywords:['accessibility','accessible content','alt text','audio description','accessible document','captions','text to speech'],
    sample:'Create a slide announcing a workshop, a 20-second spoken introduction and a chart with three labeled bars. Use invented details. Decide whether your first deliverable is alt text, captions, narration or an accessible document.',
    steps:['Choose the format that fits your audience. For each tool supporting it, use the same sample.','Inspect reading order, proper names, timing or chart values as relevant to that format.','Try the output in its delivery context and record what a human still needs to correct.'],
    checks:['The output preserves information needed to take the next action.','Names, numbers, labels and reading sequence are accurate.','A person can edit the result and verify it in the final format.']
  },
  {
    id:'clean-up-a-podcast',group:'Creative production',title:'Clean up a podcast recording',
    description:'Compare speech cleanup, level matching and editing on the same short recording before exporting a full episode.',
    keywords:['podcast cleanup','podcast audio','background noise','voice cleanup','clean audio','podcast editing','audio restoration'],
    sample:'Record 30 seconds of your own voice with five seconds of room tone, one quiet phrase, a short pause and a repeated sentence. Use the same original file for each relevant tool.',
    steps:['Listen to the raw audio and mark the quiet phrase and repeat.','Apply a first-pass cleanup. Check noise, clipping and whether any words disappeared.','Export a short clip and listen through headphones and a phone speaker.'],
    checks:['Speech stays intelligible without metallic artifacts.','The quiet phrase and natural pause survive.','The export format and usage allowance work for the episode length.']
  },
  {
    id:'design-a-room',group:'Creative production',title:'Explore room designs from a photo',
    description:'Compare visual directions for the same room and identify which furnishing ideas will fit the measured space.',
    keywords:['interior design','room design','virtual staging','redesign room','room layout','stage a room'],
    sample:'Use a photo of a room you can share, plus its measured width and depth. Keep the window, door swing and existing desk. Request a reading corner with one chair, one lamp and a $500 furniture budget.',
    steps:['Give each tool the same room photo and list of fixed features.','Generate two directions and check each one against the original doors and windows.','Measure the chair clearance and price real items before choosing a layout.'],
    checks:['Fixed architectural features stay in the right place.','The idea allows enough real clearance to move through the room.','The concept and any verified product prices are clearly distinguished.']
  },
  {
    id:'animate-a-still-image',group:'Creative production',title:'Animate a still image into a short clip',
    description:'Check how motion, framing and visual consistency hold up when a tool animates your own source image.',
    keywords:['animate photo','image to video','animate image','photo animation','still image animation','motion from image'],
    sample:'Use an original photo of a coffee mug with a simple printed shape. Request a four-second shot with a slow push-in, gentle steam and a stationary mug. Keep a copy of the original alongside the export.',
    steps:['Set the same image and motion brief in each compatible tool.','Review the first, middle and last frames for changes to the mug or shape.','Compare the exported resolution, watermark, usage rights and retry cost.'],
    checks:['The subject and printed shape stay recognizable.','The motion follows the brief without abrupt frame jumps.','The downloadable clip meets the required format and usage terms.']
  },
  {
    id:'extract-data-from-documents',group:'Development and data',title:'Extract structured data from a document',
    description:'Compare OCR and document parsing tools on fields, tables and how they handle information that is missing.',
    keywords:['document extraction','extract data','invoice OCR','parse pdf','OCR','extract table','document parsing'],
    sample:'Make a one-page sample invoice. Number DEMO-014. Items: 2 notebooks at $6 and 3 pens at $2. Subtotal $18. Tax $1.26. Total $19.26. Leave purchase-order number blank. Export to PDF.',
    steps:['Define the target fields, including the blank purchase-order number.','Upload the same PDF and export the results as JSON or a table.','Compare the extracted values with the sample and inspect how the missing field is represented.'],
    checks:['Line items, quantities and totals are correct.','A blank field stays blank or is explicitly null.','You can trace a suspicious value to its place on the original document.']
  },
  {
    id:'evaluate-model-outputs',group:'Development and data',title:'Evaluate model outputs against a reference set',
    description:'Score competing prompts or models on fixed examples, then inspect the specific mistakes behind each score.',
    keywords:['LLM evaluation','model evaluation','evaluate model outputs','evals','prompt evaluation','reference dataset'],
    sample:'Label three fictional support tickets: “I was billed twice” = billing, “How do I reset my password?” = account, “The dashboard freezes” = bug. Add a fourth ambiguous ticket, “I cannot see my plan”, and allow review.',
    steps:['Import the examples, expected labels and escalation rule.','Run two prompt versions on the same rows and keep the configuration with each result.','Inspect every disagreement and the ambiguous ticket before accepting a higher score.'],
    checks:['The example set and prompt version can be recovered from each run.','A reviewer can inspect individual failures and correct a label.','The report shows the effect of uncertain cases on the score.']
  },
  {
    id:'prototype-a-game',group:'Development and data',title:'Prototype a playable game from a small idea',
    description:'Build a tiny playable loop and test its controls, restart behavior and sharing format.',
    keywords:['game prototype','make a game','game generator','playable game','build a game','game development'],
    sample:'Make a one-screen game where a player catches five falling stars. Use left and right controls, a visible score, a clear win state and a restart button. Use original shapes and no external accounts.',
    steps:['Give each game builder the same rules and control scheme. If you choose Ludo.ai, test its assets inside a playable scene you already have.','Play a round, win, restart and check whether the score resets.','Try the shared version on the intended device and note which edits require code.'],
    checks:['Controls work and the score changes only after a catch.','Restart clears the old score and returns to a playable state.','Another person can open the shared game with the intended access.']
  },
  {
    id:'turn-a-spreadsheet-into-a-chart',group:'Development and data',title:'Turn spreadsheet data into a clear chart',
    description:'Compare chart builders on accurate values, readable labels and an export you can put in a report.',
    keywords:['spreadsheet chart','data visualization','visualize csv','chart generator','graph a spreadsheet','animated chart'],
    sample:'Create a CSV with Month, Visits and Signups. January: 800, 40. February: 1,200, 48. March: 1,000, 60. Ask for a chart of signup rate and a one-sentence interpretation.',
    steps:['Import the same three rows and define signup rate as signups divided by visits.','Check that the tool displays 5%, 4% and 6% and selects an appropriate axis.','Export the chart and verify labels and contrast at the size you will publish.'],
    checks:['All three percentages are correct and the units are visible.','A reader can see that February had the most visits and the lowest signup rate.','The exported chart is legible without depending on color alone.']
  }
];
export const taskBase = '/ai-tasks';
export const taskRoutes = [taskBase,...tasks.map(task=>taskBase+'/'+task.id)];

export const reading = {
  'forecast-inventory':['Plan demand, supply and purchasing with Prediko','https://help.prediko.io/en/articles/12973461-plan-with-demand-to-supply-to-buy-flow'],
  'categorize-customer-feedback':['Check how Enterpret assigns feedback to themes','https://www.enterpret.com/guides/the-5-ways-to-check-whether-feedback-is-landing-in-the-right-theme'],
  'build-a-sales-proposal':['See how Qwilr personalizes proposals','https://help.qwilr.com/article/857-smart-proposal-engine-personalised-proposals-in-minutes'],
  'plan-a-social-campaign':['Plan a campaign with CoSchedule','https://coschedule.com/support/coschedule-ai/ai-assistants/build-a-campaign-with-ai-campaign-assistant'],
  'review-research-papers':['Replay a screening simulation in ASReview LAB','https://asreview.readthedocs.io/en/stable/lab/simulation_overview.html'],
  'prepare-teaching-materials':['Explore Brisk’s teaching and assessment features','https://www.briskteaching.com/faq'],
  'make-content-accessible':['Use W3C’s decision tree for image descriptions','https://www.w3.org/WAI/tutorials/images/decision-tree/'],
  'clean-up-a-podcast':['Review an edit in Cleanvoice','https://help.cleanvoice.ai/en/articles/87-can-i-review-what-was-edited-from-my-audiovideo'],
  'design-a-room':['Use the Smart Wizard in Planner 5D','https://support.planner5d.com/en/articles/16127121-how-to-use-smart-wizard'],
  'animate-a-still-image':['Make an image-to-video clip with DomoAI','https://help.domoai.app/en/articles/12958662-image-to-video'],
  'extract-data-from-documents':['Try a first extraction with Sensible','https://docs.sensible.so/docs/getting-started'],
  'evaluate-model-outputs':['Run an evaluation in LangSmith','https://docs.langchain.com/langsmith/evaluation-quickstart'],
  'prototype-a-game':['Build a first project with the GDevelop tutorials','https://wiki.gdevelop.io/gdevelop5/tutorials/'],
  'turn-a-spreadsheet-into-a-chart':['Make a chart with Infogram','https://support.infogram.com/hc/en-us/articles/14213115798684-Creating-charts-with-AI']
};
