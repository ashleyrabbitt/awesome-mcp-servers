// Collection curation date, not an article publication date.
// Existing November 1 publication dates are preserved from the first news release.
// New stories must record their own actual datePublished; only substantive edits change dateModified.
export const newsEdition = '2026-11-13';
export const newsTopics = ['All stories', 'Productivity', 'Agents', 'Safety', 'Design & tech', 'Industry'];
export const newsStories = [
{
  "id": "chatgpt-wallet-agent-purchase-approval",
  "date": "2026-11-13",
  "datePublished": "2026-11-13",
  "dateModified": "2026-11-13",
  "topic": "Agents",
  "publisher": "OpenAI",
  "art": "wallet",
  "title": "ChatGPT Wallet: design the approval step before the purchase",
  "description": "User-approved agent payments make checkout design a practical concern for product teams and entrepreneurs.",
  "summary": "OpenAI introduced ChatGPT Wallet on November 13. Its initial availability is through dots for US ChatGPT Pro subscribers. Before a purchase, the user reviews the items, total and selected card, then completes a security check. Payment tokens substitute for the underlying card details.",
  "takeaway": "For a merchant or product team, the useful question is where the buyer reviews the final commitment. A clear cart and approval record are as important as helping an agent find the product.",
  "action": "Map one checkout from selected items to the final amount, approval and confirmation. Test an out-of-stock item and a changed total. Identify where a person must make a fresh decision.",
  "caveat": "Availability is limited initially. Do not assume unattended or pre-authorized spending is included in this launch. Follow the current product documentation before changing a payment flow.",
  "sourceTitle": "Introducing ChatGPT Wallet",
  "sourceUrl": "https://openai.com/index/introducing-chatgpt-wallet/",
  "next": [
    "/agent-launch-planner",
    "Plan an agent with explicit approval boundaries"
  ]
},
{
  "id": "figma-3d-transforms-motion-work-sample",
  "date": "2026-11-12",
  "datePublished": "2026-11-13",
  "dateModified": "2026-11-13",
  "topic": "Design & tech",
  "publisher": "Figma",
  "art": "design",
  "title": "Figma’s 3D transforms open beta gives flat ideas more room",
  "description": "Designers and marketers can explore perspective and motion while keeping the work on the canvas.",
  "summary": "Figma announced 3D transforms in open beta on November 12. Its Brand Studio walkthrough combines editable design elements, the Figma agent, motion and other creative tools to build a launch video.",
  "takeaway": "A small, editable concept can be a useful work sample. The creative judgment is in the hierarchy, movement and clarity of the message—not simply in applying an effect.",
  "action": "Take one campaign card you own. Create a flat version and a version with restrained perspective. Keep the words readable, compare both at phone size, and document why you chose one. Use reduced-motion requirements when planning an interactive implementation.",
  "caveat": "3D transforms are in open beta. Check current access and export options. The linked article is Figma’s own production example, not an independent performance test.",
  "sourceTitle": "How 3D transforms and Figma’s agent brought a launch video to life",
  "sourceUrl": "https://www.figma.com/blog/how-3d-transforms-and-figmas-agent-brought-a-launch-video-to-life/",
  "next": [
    "/work-sample-builder",
    "Document your design decisions in a work sample"
  ]
},
{
  "id": "multi-user-agents-shared-decision-mamubench",
  "date": "2026-11-11",
  "datePublished": "2026-11-13",
  "dateModified": "2026-11-13",
  "topic": "Agents",
  "publisher": "Anthropic research",
  "art": "coordination",
  "title": "More agents need a shared decision rule, not just more instructions",
  "description": "A new study explores coordination failures when separate agents act for people with different goals.",
  "summary": "Anthropic researchers studied four simulated settings in which agents represented individual users sharing resources. Group outcomes were worse with separate agents than with one agent serving everyone in those settings. Three environments are being released as MAMUBench.",
  "takeaway": "Before adding another agent to a shared process, define who owns the group decision, which constraints everyone follows and how conflicting requests are resolved.",
  "action": "Try a small simulated purchase or scheduling task with a shared budget and conflicting priorities. Name a decision owner, require agents to read incoming messages, and inspect whether the final result respects the group’s constraints.",
  "caveat": "These are findings from simulated environments. They do not establish that every multi-agent system is less effective. Coordination improvements varied by setting.",
  "sourceTitle": "Worse together: multi-user, multi-agent coordination",
  "sourceUrl": "https://alignment.anthropic.com/2026/worse-together/",
  "next": [
    "/agent-launch-planner",
    "Write an agent pilot with shared constraints"
  ]
},
{
  id:'claude-meetings-beta-participant-permission', date:'2026-11-12', datePublished:'2026-11-13', dateModified:'2026-11-13', topic:'Productivity', publisher:'Anthropic', art:'review',
  title:'Claude Meetings beta: agree on transcription before inviting the assistant',
  description:'Google Meet support is rolling out to eligible Team and Enterprise accounts, with important guest and access boundaries.',
  summary:'Anthropic announced Claude Meetings on November 12. The assistant joins as a visible participant, answers questions and creates shared artifacts. The beta starts with Google Meet on eligible Team and Enterprise plans. It retains transcripts, summaries and screen descriptions—not audio.',
  takeaway:'Our take: a visible assistant is not a substitute for participant agreement. Decide who may read the resulting material before a meeting, not after a sensitive detail enters the transcript.',
  action:'For a fictional internal call, write down the permitted inputs, attendees, artifact viewers and reviewer. Repeat for a client call. If agreement or access is unclear, use approved written notes instead; keep sending and connected-tool actions outside the exercise.',
  caveat:'External guests are excluded by default unless an admin allows them. Organization invitees can access the meeting page. Some configurations, including ZDR, HIPAA-ready and customer-managed encryption keys, are ineligible during beta. Verify current settings; we have not tested the product.',
  sourceTitle:'Anthropic: Introducing Claude Meetings — November 12, 2026',
  sourceUrl:'https://claude.com/resources/articles/claude-meetings',
  next:['/tool-trial','Write a permission-aware trial plan']
},
{
  id:'claude-managed-agents-self-hosted-control-plane', date:'2026-11-12', datePublished:'2026-11-13', dateModified:'2026-11-13', topic:'Agents', publisher:'Anthropic', art:'agents',
  title:'Self-hosted Claude Managed Agents moves the control plane, not necessarily the model',
  description:'A private beta lets teams operate agent infrastructure themselves; model requests still have a separately chosen destination.',
  summary:'Anthropic introduced self-hosted Managed Agents on November 12 in private beta. Beyond the earlier sandbox option, teams can operate the harness, workers, database, credentials and session history in their own cloud or on-premises. Model requests go to a selected provider or gateway.',
  takeaway:'Our take: hosting the agent infrastructure yourself does not mean model inference is local. Review the actual request path and operational responsibilities before describing a deployment as private.',
  action:'Draw one proposed workflow with its input store, agent server, sandbox, model endpoint and logs. Identify what crosses each boundary, who can stop the run and how secrets stay separate. Use synthetic data; do not deploy simply to try the architecture.',
  caveat:'Access is private beta through an Anthropic account team. Network limits, credential isolation and audit records are documented design features, not an independent security assessment. Self-hosting also leaves an operator responsible for running the service.',
  sourceTitle:'Anthropic: Operate Claude Managed Agents inside your security perimeter — November 12, 2026',
  sourceUrl:'https://claude.com/resources/articles/self-hosted-claude-managed-agents',
  next:['/tool-trial','Define an architecture review before a trial']
},
{
  id:'claude-manufacturing-plugin-review-before-release', date:'2026-11-12', datePublished:'2026-11-13', dateModified:'2026-11-13', topic:'Industry', publisher:'Anthropic', art:'skills',
  title:'Claude for Manufacturing brings drafts to the reviewer—not to the machine',
  description:'The new manufacturing plugin connects business records to quoting and reporting workflows while retaining human release decisions.',
  summary:'Anthropic launched Claude for Manufacturing on November 12 with 17 skills and connectors for Autodesk Fusion, Infor, Microsoft 365 and Oracle NetSuite. It supports draft quotes, quality reports and supplier requests on Team and Enterprise plans. It does not operate equipment.',
  takeaway:'Our take: the useful starting point is a reviewable business artifact with traceable inputs, not autonomous production. A plausible quote still needs someone responsible for checking scope and releasing it.',
  action:'On paper, define a fictional quote-review task: required inputs, missing-information flags, source for each cost and a named approval role. Reject a draft that invents a missing quantity. Keep customer records, purchasing and equipment disconnected from this first exercise.',
  caveat:'Connector access and existing system permissions determine what is available. The manufacturing Infor connector retrieves records; a separate Infor plugin can make approved changes. Do not confuse the two. Capabilities are vendor-reported, not results of our testing.',
  sourceTitle:'Anthropic: Introducing Claude for Manufacturing — November 12, 2026',
  sourceUrl:'https://claude.com/resources/articles/claude-for-manufacturing',
  next:['/tool-trial','Specify a reviewable draft task']
},
{
  id:'gemini-hydrogen-everyday-agent-workflows', date:'2026-11-12', datePublished:'2026-11-12', dateModified:'2026-11-12', topic:'Agents', publisher:'Google', art:'agents',
  title:'Gemini Hydrogen brings a faster execution option to everyday agent work',
  description:'Google’s new model and Antigravity Orchestrator separate rapid task execution from deeper reasoning, with access varying by product.',
  summary:'Google introduced Gemini 4 Hydrogen on November 12 for coding, tool use and everyday work. It is rolling out across the Gemini API, AI Studio, Gemini for business, the Gemini app and Search. Google also introduced Antigravity Orchestrator, which switches between models such as Carbon and Hydrogen within a session.',
  takeaway:'Our take: test the whole job, not just the speed of the first answer. A faster worker model is useful only if the finished output meets the same review standard and mistakes do not consume the time saved.',
  action:'Use a nonsensitive sample task with a known answer. Run it with your current model and Hydrogen, then record elapsed time, corrections and whether each requirement passed. Keep publishing, purchases and account changes outside the trial.',
  caveat:'Google’s efficiency and safety figures are provider evaluations, not results from our own testing. Antigravity access requires a paid Google AI Pro or Ultra subscription; Sheets eligibility also varies. Confirm availability and permissions in the product you use.',
  sourceTitle:'Google: Introducing Gemini 4 Hydrogen',
  sourceUrl:'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/',
  next:['/tool-trial','Plan a same-task comparison']
},
{
  id:'gemini-eyewear-preorders-privacy-check', date:'2026-11-12', datePublished:'2026-11-12', dateModified:'2026-11-12', topic:'Productivity', publisher:'Google', art:'review',
  title:'Gemini eyewear preorders open: check the workflow and privacy boundaries first',
  description:'Google announces a December 10 retail launch for partner glasses with hands-free assistance; preorders are not evidence of everyday reliability.',
  summary:'Google announced preorders for Intelligent Eyewear made with Gentle Monster, Warby Parker and Samsung. The glasses offer Gemini assistance, spoken navigation, translation and camera-based help. Google lists December 10 for in-store and online purchase, with demonstrations at selected locations.',
  takeaway:'Our take: hands-free assistance could help with a specific everyday task, but a useful demo needs to establish what is captured, what reaches a connected app and which actions need confirmation. Do not equate a product launch with a tested accessibility or productivity outcome.',
  action:'Before considering a purchase, write a three-question demo card: Can it complete my task? What phone, account and connection does it require? How do I stop capture and review permissions? Use nonsensitive material and respect other people’s privacy.',
  caveat:'Availability differs by collection and region. Google describes camera-visual privacy protections and a recording indicator; these are company statements, not an independent privacy audit. Check the exact frame, phone compatibility and current terms before ordering.',
  sourceTitle:'Google: Intelligent Eyewear collections and preorders',
  sourceUrl:'https://blog.google/innovation-and-ai/technology/xr-ar/google-intelligent-eyewear-collections-pre-order/',
  next:['/tool-trial','Define what a useful trial must prove']
},
{
  "id": "google-a2ui-1-stable-agent-interfaces",
  "date": "2026-11-11",
  "datePublished": "2026-11-11",
  "dateModified": "2026-11-11",
  "topic": "Agents",
  "publisher": "Google",
  "art": "skills",
  "title": "A2UI 1.0 gives agents an interface beyond the chat box",
  "description": "Google’s stable interface protocol supports interactive views, but platform versions still differ.",
  "summary": "Google released A2UI 1.0 on November 11. Agents describe an interface and the host app renders it with registered components. The release adds bidirectional function calls, accessibility support and metadata extensions. Web, Flutter and SwiftUI renderers are available; Jetpack Compose remains on 0.9.1, with 1.0 planned.",
  "takeaway": "Our take: a review card can make an agent’s proposed action easier to inspect than a long reply. The useful test is whether people understand and correct the proposal before anything happens—not whether the screen looks impressive.",
  "action": "Sketch one synthetic approval card with the proposed action, missing information and a cancel option. Check whether a colleague can explain the consequence and change a mistake. Keep real bookings, messages and payments disconnected during the trial.",
  "caveat": "This is a developer framework, not a finished assistant. Google says Gemini’s current renderer supports 0.9.1, so check the actual host and renderer before adopting 1.0 features. Accessibility support is not proof that a particular interface passes an accessibility review.",
  "sourceTitle": "Google Developers Blog: A2UI 1.0",
  "sourceUrl": "https://developers.googleblog.com/en/a2ui-10-build-delightful-fast-reliable-agentic-experiences/",
  "next": [
    "/tool-trial",
    "Define the interface test"
  ]
},
{
  "id": "gemini-decisions-api-bounded-choice-review",
  "date": "2026-11-11",
  "datePublished": "2026-11-11",
  "dateModified": "2026-11-11",
  "topic": "Productivity",
  "publisher": "Google",
  "art": "review",
  "title": "Gemini’s Decisions API targets bounded choices, not open-ended answers",
  "description": "A new endpoint scores predefined options and rubrics; teams still need to test the mistakes that matter.",
  "summary": "Google introduced the Gemini Decisions API on November 11, powered by Gemini Decision 1. Through Google AI Studio, developers can submit multimodal input with yes/no questions, multiple-choice options or ordered rubrics. Google says one request can contain up to 1,000 independent questions and returns probabilities and confidence scores.",
  "takeaway": "Our take: this could help route a request or flag an item for review when the options are already defined. A confidence score is a model output, not proof that a decision is correct or permission to take a consequential action.",
  "action": "Write a small set of fictional requests, label the expected category and include ambiguous examples. Define an abstain-and-review path before testing. Count wrong confident answers separately from uncertain answers, and compare the complete review effort with your existing method.",
  "caveat": "Google’s speed, cost and calibration comparisons are provider claims, not our test results. Integration availability varies, and Google Cloud support is described as forthcoming. Check current access and billing before running a test; do not use this brief as approval to upload sensitive data or automate decisions about people.",
  "sourceTitle": "Google: Gemini Decisions API",
  "sourceUrl": "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/",
  "next": [
    "/tool-trial",
    "Plan a bounded comparison"
  ]
},
{
  "id": "databricks-genie-grok-bot-governed-context",
  "date": "2026-11-11",
  "datePublished": "2026-11-11",
  "dateModified": "2026-11-11",
  "topic": "Agents",
  "publisher": "Databricks",
  "art": "data",
  "title": "Databricks connects Genie context to Grok Bot and other assistants",
  "description": "The new plugins bring governed business definitions and cited answers into existing agent workflows.",
  "summary": "Databricks announced Genie plugins on November 11 for ChatGPT, Claude, Microsoft Copilot Cowork and Grok Bot. According to Databricks, Genie uses its ontology to interpret business terms, queries data the user is allowed to access and returns answers with citations. Other agents can connect through its MCP server; interactive visualizations depend on MCP Apps support.",
  "takeaway": "Our take: agreed definitions matter more than a fluent campaign summary. A team should know what counts as a qualified opportunity before asking an agent to compare campaigns. Connecting data does not validate the metric or authorize spending.",
  "action": "If your team already uses Databricks, ask the data owner to compare one approved, non-sensitive metric question with a known report. Record the definition, time window, filters, answer and citation. Keep the first evaluation read-only; route discrepancies to a person before any operational use.",
  "caveat": "The announcement’s growth-campaign examples are vendor scenarios, not independently verified results or a promise about every Grok Bot account. Workspace configuration, permissions and client support still matter. A data connection is not authorization to launch campaigns, contact customers or change budgets.",
  "sourceTitle": "Databricks: Bring your business context to ChatGPT, Claude, Microsoft Copilot Cowork and Grok Bot",
  "sourceUrl": "https://www.databricks.com/blog/bring-your-business-context-chatgpt-claude-microsoft-copilot-cowork-and-grok-bot",
  "next": [
    "/tool-trial",
    "Record a read-only evaluation"
  ]
},
{
  "id": "claude-sheets-whiteboards-data-practical-guide",
  "date": "2026-11-10",
  "datePublished": "2026-11-11",
  "dateModified": "2026-11-11",
  "topic": "Productivity",
  "publisher": "Anthropic",
  "art": "files",
  "title": "Claude’s new office tools: build a useful Sheet, board and review",
  "description": "What Sheets, Whiteboards, Data and interactive connectors actually add—and a small project you can try.",
  "summary": "Claude is moving from a place where you ask for an answer toward a place where you and your team work on the answer together. A spreadsheet you can edit and a board you can rearrange are more useful than a confident paragraph when the work involves changing assumptions. Start by testing one simple project rather than moving every workflow at once.",
  "takeaway": "This is a planning budget, not an event result. It excludes taxes, payment fees and any unlisted costs. The useful board has three questions: what is confirmed, what could change and who checks each item? If attendance falls, the fixed room cost is spread across fewer people.",
  "action": "Choose a budget with three line items and a clear review question.",
  "caveat": "Feature and plan availability vary; check your account and the linked official documentation.",
  "sourceTitle": "Anthropic: Sheets, Whiteboards and Data",
  "sourceUrl": "https://claude.com/resources/articles/sheets-whiteboards-data",
  "next": [
    "https://aisuperpower.cc/tool-trial",
    "Plan a focused tool trial"
  ],
  "bodyHtml": "<div class=\"claude-office-guide\"><style>.claude-office-guide img{max-width:100%;height:auto;display:block}.claude-office-guide figure{margin:30px 0}.claude-office-guide figcaption{font-size:14px;line-height:1.5;margin-top:8px}.claude-office-guide pre{white-space:pre-wrap;overflow-wrap:anywhere;padding:22px;border:1px solid #b9c5c7;border-radius:8px;background:#f5f6f3;color:#202c31;font-size:15px;line-height:1.65}.claude-office-guide table{border-collapse:collapse;width:100%;font-size:16px}.claude-office-guide th,.claude-office-guide td{padding:12px;border-bottom:1px solid #b9c5c7;text-align:left;vertical-align:top}.claude-office-guide .co-note{padding:22px;border-left:4px solid #547564;background:#f5f6f3;color:#202c31}.claude-office-guide li{margin:.6em 0}</style><p>Claude is moving from a place where you ask for an answer toward a place where you and your team work on the answer together. A spreadsheet you can edit and a board you can rearrange are more useful than a confident paragraph when the work involves changing assumptions. Start by testing one simple project rather than moving every workflow at once.</p><section><h2>What Anthropic announced</h2><p>On November 10, 2026, Anthropic introduced <strong>Claude Sheets and Whiteboards in beta</strong> and made <strong>Claude Data</strong>, formerly Dashboards, generally available on paid plans. Sheets supports editable formulas and Excel/CSV export; Whiteboards supports shared visual planning. Data works with connected data sources and adds visual stories, including narrated videos. Certified queries and live sharing remain beta features.</p><p>Interactive connectors are also expanding to full app views where supported, including Adobe and Atlassian. Availability depends on rollout and organizational settings. Claude Meetings is described as coming soon in the overview; the Whiteboards help page documents Google Meet beta support on Team and Enterprise. Check your account before planning around it; Zoom and Microsoft Teams are not supported in that documented beta.</p></section><section><h2>Before you start</h2><p>Open Claude and confirm that your paid account has the Sheets and Whiteboards templates in Artifacts. Team plans enable them by default; an Enterprise owner must enable them. If a template is missing, check your plan and organization settings before following this exercise. No live meeting or connected business account is required for the sample below.</p><p>Start a chat, paste the labeled sample data and ask for a Sheet. In a separate request, ask for a Whiteboard using the reviewed findings. Copy the relevant context explicitly: the Whiteboards help page says connected-app context is not currently available to the board. These are suggested prompts, not a transcript of a hands-on test in Claude.</p></section><section><h2>Your four-step workflow</h2><figure><img src=\"/assets/claude-office/claude-sheets-whiteboards-data-practical-guide-steps.svg\" alt=\"Pick one output; Ask for a Sheet; Build a Whiteboard; Check and export\" width=\"1200\" height=\"1020\" loading=\"lazy\"><figcaption>Original step-by-step guide. The numbered steps are also written below.</figcaption></figure><ol><li><strong>Pick one output.</strong> Choose a budget with three line items and a clear review question.</li><li><strong>Ask for a Sheet.</strong> Paste the sample data and request formulas, a totals row and separate assumptions.</li><li><strong>Build a Whiteboard.</strong> Organize the budget assumptions into Confirmed, Unconfirmed and Owner actions.</li><li><strong>Check and export.</strong> Recalculate the total yourself, then export the spreadsheet and save the review decision.</li></ol></section><section><h2>Worked example: Can we turn an event budget into a clear go/no-go discussion?</h2><p class=\"co-note\"><strong>Fictional practice example.</strong> These inputs and expected outputs demonstrate the method. They are not client results, portfolio metrics or evidence that this task was run in Claude.</p><div class=\"co-table\" style=\"overflow-x:auto\"><table><thead><tr><th scope=\"col\">Item</th><th scope=\"col\">Quantity</th><th scope=\"col\">Unit cost USD</th></tr></thead><tbody><tr><td>Room</td><td>1</td><td>180</td></tr><tr><td>Materials</td><td>12</td><td>8</td></tr><tr><td>Refreshments</td><td>12</td><td>6</td></tr></tbody></table></div><h3>Paste this prompt into Claude</h3><pre>Create a Claude Sheet using only the following SYNTHETIC PRACTICE DATA. Do not connect accounts or invent missing values. Keep raw inputs separate from calculations. Include visible formulas and an Assumptions tab. The decision is: Can we turn an event budget into a clear go/no-go discussion?\n\nItem,Quantity,Unit cost USD\nRoom,1,180\nMaterials,12,8\nRefreshments,12,6\n\nUse these formulas, with the header in row 1:\nD2 = B2*C2  → line cost; fill down through D4\nD5 = SUM(D2:D4)  → total planned cost\nD6 = D5/12  → planned cost per attendee\n\nExplain the calculation and flag missing inputs. Keep zero denominators blank and identify why the result is unavailable. Do not claim these are real business results.</pre><h3>Check the expected result</h3><p><strong>The sample budget totals $348: $180 + $96 + $72. At 12 attendees, the planned cost is $29 per attendee.</strong></p><p>This is a planning budget, not an event result. It excludes taxes, payment fees and any unlisted costs. The useful board has three questions: what is confirmed, what could change and who checks each item? If attendance falls, the fixed room cost is spread across fewer people.</p><h3>Turn the reviewed result into a board</h3><pre>Create a Whiteboard for this reviewed sample. Make four sections: Evidence, Assumptions, Open questions, and Next action. Evidence: The sample budget totals $348: $180 + $96 + $72. At 12 attendees, the planned cost is $29 per attendee. Interpretation to review: This is a planning budget, not an event result. It excludes taxes, payment fees and any unlisted costs. The useful board has three questions: what is confirmed, what could change and who checks each item? If attendance falls, the fixed room cost is spread across fewer people. Add one owner and review-date placeholder; do not invent names or commitments. Keep the sample labeled fictional. Do not send messages or change connected apps.</pre></section><section><h2>Make the handoff useful</h2><p>Use Sheets when a lightweight shared spreadsheet is enough. Keep an existing complex workbook in its original application until you have checked the features and export. Use Data when you have a permitted data connection and need a repeatable view; it is a separate capability from simply uploading a CSV to a chat.</p><p>Before sharing, check one ordinary row, one missing value and one zero-denominator case. Confirm that totals use the intended rows. Open the exported Excel file and inspect formulas and formatting; a CSV export does not preserve a workbook’s tabs and presentation. Share only the reviewed version with the intended people.</p><p>If you later use Claude Data, inspect the data source, metric definition and refresh time. Ask for the uncertainty to appear in any data story. If Meetings is available to your team, follow your organization’s participant-notice and recording practices; otherwise use notes you are permitted to share. The worksheet exercise works without a meeting assistant.</p></section><section><h2>Try it on one real task</h2><p>Replace the sample with data you are authorized to use, keep the same review question and record what needed correction. A useful first result is a checked artifact and a decision someone can act on.</p><p><a href=\"https://aisuperpower.cc/tool-trial\">Plan a focused tool trial →</a></p></section><section><h2>Official sources</h2><p>Feature information checked November 11, 2026. Examples, prompts and interpretation are original editorial guidance.</p><ul><li><a href=\"https://claude.com/resources/articles/sheets-whiteboards-data\">Anthropic: Sheets, Whiteboards and Data — November 10, 2026</a></li><li><a href=\"https://support.claude.com/en/articles/18324300-get-started-with-claude-sheets\">Claude Help: getting started with Sheets</a></li><li><a href=\"https://support.claude.com/en/articles/18324319-get-started-with-claude-whiteboards\">Claude Help: Whiteboards, including Meetings availability and limitations</a></li><li><a href=\"https://claude.com/resources/articles/interactive-connectors-full-tool\">Anthropic: interactive connectors and full apps</a></li><li><a href=\"https://claude.com/resources/articles/more-ways-to-work-with-claude-sheets-whiteboards-and-interactive-connectors\">Anthropic: the wider workplace announcement</a></li></ul></section></div>",
  "image": "/assets/claude-office/claude-office-team.webp",
  "imageAlt": "AI-generated editorial scene of colleagues reviewing a spreadsheet and a planning whiteboard.",
  "imageCaption": "AI-generated editorial illustration; not an Anthropic screenshot or a photograph of a real client session.",
  "minutes": 7
},
{
  "id": "openai-business-hub-and-business-agents",
  "date": "2026-11-10",
  "datePublished": "2026-11-11",
  "dateModified": "2026-11-11",
  "topic": "Agents",
  "publisher": "OpenAI",
  "art": "agents",
  "title": "Businesses get agents in ChatGPT: what changes for buyers and business owners",
  "description": "Understand business profiles, branded agents, sponsored placements, and the practical checks to make before trusting a product answer.",
  "summary": "OpenAI introduced Businesses in ChatGPT in beta on November 10. When a business appears in an answer, users can open its profile. If that business has published a Business Agent, they can choose a separate chat about its products or services. The important habit is noticing when you have moved from ChatGPT's answer into a conversation representing the seller. OpenAI says business-agent conversations are labeled and separate from ChatGPT's independent answers. Businesses can also sponsor their agents, with sponsored placements identified. A branded agent can help explain a product, but its role is to represent that business. Use it for detailed questions about fit, inclusions, policies, and the product page supporting an answer.",
  "takeaway": "First write your own requirements: budget, use case, must-have features, and deal breakers. Ask ChatGPT to compare the available options with sources. Then ask each relevant business agent the same specific fit questions. Finally, verify the important details on the seller's website. Independent comparison and a seller's explanation can both be useful; neither replaces checking a consequential claim. For buyers, identify who is speaking and check the source. For owners, make your information accurate and your next step clear. A new agent is most valuable when it helps someone understand whether an offer fits their needs.",
  "action": "Ask “Which of your options would you rule out for my use case, and why?” Follow with “What is not included?” and “Where can I verify that policy?” If an answer avoids a limitation, return to the written product information. Keep private information out of a general product question when it is not needed. Eligible owners can claim a profile in Business Hub and keep business details current. Shopify merchants have a store connection path. Agent access has separate eligibility requirements and currently starts with eligible U.S. ecommerce and online service businesses. Prepare an approved FAQ and test the answers before publishing. The present agent experience explains offerings and links to the website; purchases and bookings happen there.",
  "caveat": "OpenAI says businesses receive aggregate insights rather than users' ChatGPT or Business Agent conversations. A business should therefore avoid promising personalized follow-up based on an assumed transcript. Customers should still review the data implications of any separate form or action they choose on the business's website.",
  "sourceTitle": "OpenAI: Introducing Businesses in ChatGPT",
  "sourceUrl": "https://openai.com/index/introducing-businesses-chatgpt/",
  "next": [
    "/tool-trial",
    "Compare answers with a small test"
  ]
},
{
  "id": "gemini-carbon-copilot-model-choice",
  "date": "2026-11-10",
  "datePublished": "2026-11-10",
  "dateModified": "2026-11-10",
  "topic": "Agents",
  "publisher": "GitHub",
  "art": "agents",
  "title": "Gemini 4 Carbon arrives in GitHub Copilot",
  "description": "Developers get another option for difficult coding tasks, with gradual rollout and usage-based billing.",
  "summary": "GitHub announced Gemini 4 Carbon in Copilot on November 10. The rollout covers Pro+, Max, Business and Enterprise plans across supported editors, the CLI, coding agent and other Copilot surfaces. GitHub bills the model at provider list pricing under usage-based billing. Organization administrators can manage access through model policies.",
  "takeaway": "Our take: a new model is most useful when it solves a task your current setup struggles with. Keep the repository, issue and acceptance checks constant so your comparison answers a practical question.",
  "action": "Choose one reproducible bug or difficult refactor. Save the original input, run the same task with your current model and Carbon where available, and compare the reviewed diff, test results, corrections and usage.",
  "caveat": "Availability is gradual and depends on your plan and organization policy. Check the current model picker and pricing before a long run. A coding capability claim does not replace code review.",
  "sourceTitle": "GitHub Changelog: Gemini 4 Carbon in GitHub Copilot",
  "sourceUrl": "https://github.blog/changelog/2026-11-10-gemini-4-carbon-in-github-copilot/",
  "next": [
    "/guides/ai-superpower-for-developers",
    "Try the developer workflow"
  ]
},
{
  "id": "multimodal-knowledge-agent-benchmark-files",
  "date": "2026-11-10",
  "datePublished": "2026-11-10",
  "dateModified": "2026-11-10",
  "topic": "Productivity",
  "publisher": "Google",
  "art": "files",
  "title": "A new benchmark asks agents to work across complex files",
  "description": "MKA evaluates visual knowledge work and highlights why the finished document matters as much as the answer.",
  "summary": "Google and Artificial Analysis introduced the Multimodal Knowledge Agent benchmark on November 10. It evaluates work involving visually complex files using a shared agent setup. The private evaluation has 200 tasks; ten separate public tasks are available for people to inspect and try. The evaluation checks deliverables, including rendered pages and spreadsheet formulas.",
  "takeaway": "Our take: this points toward a better way to judge an AI assistant at work. Inspect the file you will actually use: its layout, calculations, source fidelity and completeness. A convincing chat summary can still accompany a broken spreadsheet.",
  "action": "Pick a document or spreadsheet task you already understand. Define the checks before starting, then open the resulting file and verify them. Record the time spent fixing the output in your tool trial.",
  "caveat": "Google is both a model developer and an announcement source. Its model comparisons are attributed reporting, not AI Superpower test results. A benchmark result does not establish performance on your files or task.",
  "sourceTitle": "Google: Introducing the Multimodal Knowledge Agent benchmark",
  "sourceUrl": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/multimodal-knowledge-agent-benchmark/",
  "next": [
    "/tool-trial",
    "Compare finished work in the Tool Trial Lab"
  ]
},
{
  id: 'gemini-carbon-wider-access-review-boundaries',
  date: '2026-11-10', datePublished: '2026-11-10', dateModified: '2026-11-10',
  topic: 'Agents', publisher: 'Google', art: 'agents',
  title: 'Gemini 4 Carbon widens access beyond its initial security rollout',
  description: 'Paid API access and an Ultra rollout bring Carbon to more users; deeper reasoning still needs a bounded test.',
  summary: 'Google announced wider availability of Gemini 4 Carbon on November 10, following its earlier limited cybersecurity rollout. Paying developers and enterprises can access it through the API, while Google AI Ultra subscribers are receiving it in Antigravity, the Gemini app and AI Mode in Search. Google positions Carbon for demanding, extended tasks and says Argon remains suitable for most coding and knowledge work.',
  takeaway: 'Our take: wider access is a reason to evaluate a difficult task, not replace a working setup. A model that spends longer checking an answer may also consume more tokens. Judge the reviewed result and total effort, not a launch leaderboard alone.',
  action: 'Choose one non-sensitive task with a known answer or acceptance checklist. Record your current workflow, then compare correctness, corrections, elapsed time and usage. Stop if the extra effort does not solve the original problem; keep human approval for consequential actions.',
  caveat: 'Access depends on the paid product and rollout. Google’s performance, safety and cost comparisons are provider claims, not independent AI Superpower tests. Research access has eligibility and capacity limits; expanded availability does not guarantee access for every account or make security review unnecessary.',
  sourceTitle: 'Google: Gemini 4 Carbon is now available',
  sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/',
  next: ['/tool-trial', 'Write a bounded tool trial']
},
{
  id: 'claude-fable-copilot-retention-review',
  date: '2026-11-09', datePublished: '2026-11-10', dateModified: '2026-11-10',
  topic: 'Agents', publisher: 'GitHub', art: 'review',
  title: 'Fable 5.2 reaches Copilot with a data-retention decision for teams',
  description: 'The model’s rollout includes an off-by-default organizational policy and a limited enterprise exemption.',
  summary: 'GitHub announced Claude Fable 5.2 in Copilot on November 9 for Pro+, Max, Business and Enterprise plans, with gradual rollout. Business and Enterprise administrators must enable its model policy, which is off by default. GitHub says prompts and outputs are retained by Anthropic for safety classifiers by default, but not used for model training.',
  takeaway: 'Our take: model availability and permission to use client material are separate decisions. A coding capability claim does not settle a team’s confidentiality obligations. Review the data path before choosing the model for a real project.',
  action: 'Before enabling it, ask the responsible administrator to document permitted data, the applicable retention terms and who can approve use. If evaluation is allowed, begin with a public or synthetic repository and an explicit review checklist—not confidential customer code.',
  caveat: 'Usage-based billing applies. Certain approved enterprises can receive zero-data-retention access through year-end while Enterprise Frontier Safeguards rolls out; it is not automatic or universal. GitHub directs eligibility questions to the account team, not Support. Approval still requires an administrator to enable the model. Early performance comparisons are provider reporting, not our tests.',
  sourceTitle: 'GitHub Changelog: Claude Fable 5.2 in GitHub Copilot',
  sourceUrl: 'https://github.blog/changelog/2026-11-09-claude-fable-5-2-in-github-copilot/',
  next: ['/tool-trial', 'Define the evaluation boundary']
},
{
  id: 'github-actions-log-secret-scanning-preview',
  date: '2026-11-09', datePublished: '2026-11-10', dateModified: '2026-11-10',
  topic: 'Safety', publisher: 'GitHub', art: 'review',
  title: 'GitHub adds workflow-log secret scanning—with no preview notifications',
  description: 'An enterprise preview scans future completed Actions runs, but teams must inspect its alert list themselves.',
  summary: 'GitHub’s November 9 public preview extends secret scanning to Actions workflow logs. After a run finishes, supported provider-pattern matches appear in the repository’s secret-scanning alerts with a log link. Alerts remain available after the logs are deleted. The feature is disabled by default.',
  takeaway: 'Our take: AI-assisted development still needs ordinary credential hygiene. This adds a detection layer for build and automation output, but an alert nobody reviews cannot protect a workflow. It is not proof that a repository is free of exposed secrets.',
  action: 'Ask the security owner to check eligibility and the current policy read-only. Before any approved enablement, assign an alert-review owner and response process. Never paste a real secret into a workflow to test detection; use only an organization-approved non-secret fixture.',
  caveat: 'The preview requires GitHub Enterprise Cloud with Secret Protection or Advanced Security and applies to eligible repositories with secret scanning enabled. Only runs completed after enablement are scanned; old logs are not backfilled. Generic, custom, AI-detected and already-masked secrets are excluded. Preview alerts do not send notifications, so direct review of the alert list is essential.',
  sourceTitle: 'GitHub Changelog: Secret scanning detects secrets in GitHub Actions workflow logs',
  sourceUrl: 'https://github.blog/changelog/2026-11-09-secret-scanning-detects-secrets-in-github-actions-workflow-logs/',
  next: ['/tool-trial', 'Record a safe evaluation plan']
},
{
  id: 'google-maps-ai-studio-prototype-production-boundary',
  date: '2026-11-09', datePublished: '2026-11-09', dateModified: '2026-11-09',
  topic: 'Productivity', publisher: 'Google', art: 'skills',
  title: 'Google Maps arrives in AI Studio, with a prototype-to-production boundary',
  description: 'Map-based previews can start without a credit card; production still requires paid Cloud billing.',
  summary: 'Google announced on November 9 that Maps Platform can be enabled inside AI Studio. Builders describe a location-based idea, connect Maps and inspect an interactive preview without leaving that workspace. Google says existing Cloud projects can also be linked.',
  takeaway: 'Our take: this reduces setup friction for a location-based prototype, not the work of validating places, accessibility or opening hours. A convincing map is not a verified itinerary.',
  action: 'Use one familiar public location as a small test. Compare the preview with the official venue page, note incorrect details and define who will maintain the information before sharing it with customers.',
  caveat: 'The no-card trial has daily quotas that reset every 24 hours. Production requires a paid Cloud billing account. Check applicable quotas and costs before enabling billing; no production deployment or purchase is needed to review the announcement.',
  sourceTitle: 'Google: Developers can now build with Google Maps Platform in AI Studio',
  sourceUrl: 'https://blog.google/innovation-and-ai/technology/developers-tools/build-google-maps-platform-ai-studio/',
  next: ['/tool-trial', 'Define one useful test']
},
{
  id: 'google-tpu-8tx-8i-max-agent-workloads',
  date: '2026-11-09', datePublished: '2026-11-09', dateModified: '2026-11-09',
  topic: 'Industry', publisher: 'Google', art: 'data',
  title: 'Google expands TPU systems for confidential and long-context AI work',
  description: 'TPU 8tx targets confidential inference; TPU 8i Max targets memory-heavy workloads.',
  summary: 'Google announced TPU 8tx and TPU 8i Max on November 9. The company describes 8tx as a system for confidential inference and sensitive model work, and 8i Max as a higher-density configuration for large contexts. These are new system configurations within its eighth-generation TPU family.',
  takeaway: 'Our take: agent infrastructure is becoming more specialized. Security boundaries and memory needs can matter as much as headline model speed, but this does not imply a small business needs new infrastructure.',
  action: 'If you already operate a substantial AI workload, document its actual constraint: data handling, memory, latency or cost. Compare a representative workload and total operating effort before considering a migration.',
  caveat: 'Performance and confidentiality statements here are Google claims, not independent tests by AI Superpower. The announcement is not evidence of universal account availability or a price quote; confirm regional access, commercial terms and security requirements with the provider.',
  sourceTitle: 'Google: Our newest TPUs, 8tx and 8i Max',
  sourceUrl: 'https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/',
  next: ['/tool-trial', 'Measure the workflow before changing tools']
},
{
  "id": "copilot-impact-dashboard-chat-agent-usage",
  "date": "2026-11-06",
  "datePublished": "2026-11-08",
  "dateModified": "2026-11-08",
  "topic": "Productivity",
  "publisher": "GitHub",
  "art": "data",
  "title": "Copilot dashboard now counts chat and VS Code agent usage",
  "description": "Enterprise and organization reports add two feature-engagement signals, with important counting and access limits.",
  "summary": "GitHub announced on November 6 that its Copilot impact dashboard and 28-day usage reports now include Copilot Chat and the VS Code Agents window. The dashboard also renames the “Passive users” cohort to “Chat-first users.” GitHub says the underlying adoption-phase assignments and cohort sizes do not change.",
  "takeaway": "This adds visibility, not proof of productivity or return on investment. A person is counted as engaged after using a feature on at least two days in a 28-day window, and the same person can appear under more than one feature.",
  "action": "If your organization already uses Copilot usage metrics, record the current definitions before comparing periods. Pair the feature-engagement view with one local workflow measure—such as reviewed pull-request cycle time—and state that the two are not automatically causal.",
  "caveat": "The data is limited to enterprise and organization 28-day reports, requires the Copilot usage-metrics policy and appropriate permissions, and does not retroactively add the new features to older reports. Chat activity includes agent-mode usage captured by the same metrics.",
  "sourceTitle": "GitHub Changelog: Copilot impact dashboard adds chat and VS Code agent usage",
  "sourceUrl": "https://github.blog/changelog/2026-11-06-copilot-impact-dashboard-adds-chat-and-vs-code-agent-usage/",
  "next": [
    "/tool-trial",
    "Define one local measure"
  ]
},
{
  "id": "copilot-code-review-api-settings-attribution",
  "date": "2026-11-06",
  "datePublished": "2026-11-08",
  "dateModified": "2026-11-08",
  "topic": "Agents",
  "publisher": "GitHub",
  "art": "review",
  "title": "Copilot code review adds API settings and clearer attribution",
  "description": "Administrators can manage review settings through APIs and inspect reported skills, MCP servers and instructions behind comments.",
  "summary": "GitHub announced on November 6 that Copilot code review settings can now be read and managed through REST and GraphQL APIs from enterprise policy to repository configuration. New attribution fields can identify Copilot reviews, review effort and the skills, MCP servers or custom instructions Copilot reports as sources for a comment.",
  "takeaway": "The useful change is auditable configuration and provenance. It can help a team distinguish which review policy and customization produced a comment, but it does not make the finding correct or replace a qualified human reviewer.",
  "action": "Choose one non-critical repository and export its current review settings before changing anything. Run a small reviewed pull-request sample, retain human approval, and record false positives, missed issues and correction time by review configuration.",
  "caveat": "Availability depends on an eligible Copilot plan, role and token permissions. Enterprise-managed settings cannot be overridden below that level. GitHub Apps and fine-grained personal access tokens do not support the enterprise and organization settings endpoints described in the announcement.",
  "sourceTitle": "GitHub Changelog: Copilot code review API management and review overview updates",
  "sourceUrl": "https://github.blog/changelog/2026-11-06-copilot-code-review-api-management-and-review-overview-updates/",
  "next": [
    "/guides/agents-get-real-work-done",
    "Plan a bounded review pilot"
  ]
},
{
  "id": "biobasicsbench-wet-lab-agent-benchmark",
  "date": "2026-11-06",
  "datePublished": "2026-11-07",
  "dateModified": "2026-11-07",
  "topic": "Agents",
  "publisher": "OpenAI",
  "art": "review",
  "title": "BioBasicsBench tests agents against messy wet-lab evidence",
  "description": "A 100-task benchmark asks AI agents to interpret raw experimental data, catch errors and decline unsupported conclusions.",
  "summary": "OpenAI and Ligo introduced BioBasicsBench on November 6. Its 100 routine wet-lab tasks use raw evidence such as gel images, colony plates, microscopy and instrument readouts. OpenAI reports stronger results from newer models, while the benchmark still shows substantial room for improvement.",
  "takeaway": "The useful signal is not a model leaderboard alone. The benchmark makes ambiguity, control checks and unsupported conclusions part of the task—exactly the failure modes a scientific assistant must surface before its output can be trusted.",
  "action": "If you evaluate an AI-assisted scientific workflow, add a small review set with failed experiments, ambiguous evidence and missing controls. Require the system to say when the evidence cannot support a conclusion, and keep a qualified human reviewer responsible for the decision.",
  "caveat": "These are provider-run benchmark results, not evidence that a model can independently operate a laboratory or make treatment decisions. The tasks and aggregate results do not replace local validation, biosafety review or expert judgment.",
  "sourceTitle": "OpenAI publication: Measuring how AI agents handle everyday wet-lab science",
  "sourceUrl": "https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science/",
  "next": [
    "/guides/agents-get-real-work-done",
    "Define a bounded agent review"
  ]
},
{
  "id": "openai-hacktron-integration-security",
  "date": "2026-11-06",
  "datePublished": "2026-11-06",
  "dateModified": "2026-11-06",
  "topic": "Safety",
  "publisher": "OpenAI",
  "art": "review",
  "title": "OpenAI and Hacktron put connected-service security under review",
  "description": "A new security partnership focuses on the boundaries between OpenAI systems and third-party services.",
  "summary": "OpenAI announced a partnership with Hacktron on November 6. Its engineers and Hacktron researchers will jointly choose priority tests, emphasizing interactions with outside services. OpenAI is also expanding the researchers’ frontier-model access through Daybreak Red.",
  "takeaway": "For teams connecting AI to business tools, the important lesson is the boundary between systems: a safe-looking individual tool does not establish that a connected workflow is safe. This partnership is a testing commitment, not proof that every integration is secure.",
  "action": "Choose one workflow you own. List its connected services, data passed between them, permissions and human approval points. Review that map with your security owner before expanding access.",
  "caveat": "The announcement describes a specific partnership, not unrestricted public model access or permission to test other organizations’ systems. Security testing still requires explicit authorization and scope.",
  "sourceTitle": "OpenAI announcement: partnering with Hacktron",
  "sourceUrl": "https://openai.com/index/partnering-with-hacktron/",
  "next": [
    "/security",
    "Review the AI safety field notes"
  ]
},
{
  "id": "chatgpt-dots-admin-preview-deadline",
  "date": "2026-11-04",
  "datePublished": "2026-11-06",
  "dateModified": "2026-11-06",
  "topic": "Agents",
  "publisher": "OpenAI",
  "art": "agents",
  "title": "Dots rollout gives workspace admins a November 18 decision",
  "description": "Eligible Enterprise, Edu and Healthcare workspaces have an admin preview before default availability.",
  "summary": "OpenAI’s November 4 release notes say personal dots can continue tasks between conversations. Eligible Enterprise, Edu and Healthcare workspaces have an admin preview until November 18, 2026. Owners and admins can enable access or opt out before default availability that day, and control which members can use dots.",
  "takeaway": "The useful first step is a rollout decision, not a company-wide experiment. A continuing task needs an owner, a clear stopping condition and a known set of connections.",
  "action": "Before November 18, have the workspace administrator record the access decision. If a pilot is approved, use one low-risk task, define its allowed connections and test the pause-and-review procedure before expanding.",
  "caveat": "Eligibility varies; UAE data or inference residency workspaces are excluded. Admins can inspect connections and pause or resume dots. Do not assume that workspace coverage extends to every connected third-party service.",
  "sourceTitle": "OpenAI release notes: Dots for Enterprise, Edu and Healthcare",
  "sourceUrl": "https://openai.com/products/release-notes/?category=chatgpt",
  "next": [
    "/guides/agents-get-real-work-done",
    "Define a bounded agent task"
  ]
},
{
  "id": "classroom-guided-learning-assignments",
  "date": "2026-11-04",
  "datePublished": "2026-11-06",
  "dateModified": "2026-11-06",
  "topic": "Productivity",
  "publisher": "Google",
  "art": "review",
  "title": "Classroom adds Guided Learning to individual assignments",
  "description": "Teachers can attach source-informed AI support and review students’ conversations in Classroom.",
  "summary": "Google’s November 4 announcement introduces Guided Learning activities attached to Classroom assignments. Teachers can choose course sources as context. The student experience stays in Guided Learning mode within the activity tab; teachers can view conversation transcripts and AI-generated summaries.",
  "takeaway": "This creates a practical way to review how a learner approaches a question, rather than judging only the final answer. The summaries are AI output, not an independent assessment of understanding.",
  "action": "If your school approves the feature, pilot one existing practice question with teacher-selected material. Review the resulting hints and transcript yourself, and ask students to explain the reasoning in their own words.",
  "caveat": "Rollout started November 3 and may take longer than 15 days. Education Fundamentals, Standard and Plus are listed; Gemini must be enabled for the relevant users. Follow school privacy and student-use rules before assigning an activity.",
  "sourceTitle": "Google Workspace announcement: Guided Learning in Classroom",
  "sourceUrl": "https://workspaceupdates.googleblog.com/2026/11/educators-can-now-add-guided-learning-to-assignments-in-Google-Classroom-to-help-students-get-extra-support.html?m=1",
  "next": [
    "/training",
    "Explore practical AI learning"
  ]
},
  {
    id:'gemini-slides-whole-deck-editing', date:'2026-10-30', datePublished:'2026-11-01', dateModified:'2026-11-01', topic:'Productivity', publisher:'Google', art:'slides',
    title:'One prompt, a whole presentation refresh',
    description:'Gemini in Google Slides can now make changes across a deck, with editable slides and a change summary to review.',
    summary:'Google is rolling out multi-slide editing in Gemini for Slides. A single request can revise content, align visual styles or use another presentation as a reference. Changes land in native slides; the side panel summarizes the edits, and undo and version history remain available.',
    takeaway:'This is useful for the unglamorous last mile: making a deck consistent after the story is already there. Start with a specific edit so you can judge the result quickly.',
    action:'Try a copy of a short deck. Ask Gemini to standardize title styles while preserving all wording. Compare every slide before sharing.',
    caveat:'English only at launch. Rollout began October 29 and may take longer than 15 days. Eligible paid Workspace and Google AI plans are listed in the announcement.',
    sourceTitle:'Edit entire presentations with Gemini in Google Slides',
    sourceUrl:'https://workspaceupdates.googleblog.com/2026/10/edit-entire-presentations-with-gemini-in-Google-Slides.html?m=1',
    next:['/guides/agents-get-real-work-done','Give an agent a clear brief']
  },
  {
    id:'openai-shared-training-preferences', date:'2026-10-30', datePublished:'2026-11-01', dateModified:'2026-11-01', topic:'Industry', publisher:'OpenAI', art:'web',
    title:'Website owners get a simpler way to state AI training preferences',
    description:'OpenAI plans to honor a shared robots.txt signal, reducing the need to maintain separate preferences for each participating provider.',
    summary:'OpenAI says it will support a common robots.txt signal for expressing preferences about foundational AI training. The voluntary effort would let website operators communicate one preference to multiple participating providers. OpenAI plans implementation in the coming months; its existing crawler controls remain in place.',
    takeaway:'For people who publish original work, simpler controls could reduce maintenance. The announcement is a commitment to implement a shared signal, rather than confirmation that the new control is already active.',
    action:'Ask whoever manages your website to review your existing crawler settings and watch for implementation instructions before changing them.',
    caveat:'This is a voluntary signal for participating providers. It is not a universal technical block on content use.',
    sourceTitle:'Making it easier for websites to express AI training preferences',
    sourceUrl:'https://openai.com/index/helping-websites-express-ai-training-preferences/',
    next:['/security','Read the AI safety field notes']
  },
  {
    id:'gemini-edit-files-in-chat', date:'2026-10-29', datePublished:'2026-11-01', dateModified:'2026-11-01', topic:'Productivity', publisher:'Google', art:'files',
    title:'Gemini brings file creation and editing into the conversation',
    description:'Preview and refine documents, spreadsheets and presentations in Gemini before moving them into your everyday tools.',
    summary:'Google has added in-chat file previews and editing to Gemini. You can make direct edits or ask Gemini to refine a file, then export or open supported outputs in Google apps. PDFs work on web and mobile; other supported formats, including documents, spreadsheets and slide decks, are available on the web.',
    takeaway:'A useful workflow is becoming shorter: explain the result, inspect a real draft, make changes and take the file with you. The preview is a good place to catch missing sections before exporting.',
    action:'Use fictional project details to create a simple tracker. Check its columns, dates and any formulas, then open the result in Sheets.',
    caveat:'Google says this is available to users with Gemini access. Supported editing and export options differ by file type and device.',
    sourceTitle:'Create, preview, and edit files directly in the Gemini app',
    sourceUrl:'https://workspaceupdates.googleblog.com/2026/10/create-preview-and-edit-files-directly-in-the-Gemini-app.html?m=1',
    next:['/resources','Find a useful starting template']
  },
  {
    id:'openai-model-spec-human-agency', date:'2026-10-29', datePublished:'2026-11-01', dateModified:'2026-11-01', topic:'Safety', publisher:'OpenAI', art:'review',
    title:'OpenAI updates its blueprint for how AI should behave',
    description:'The revised Model Spec puts human intent, transparency and agency at the center of guidance for increasingly capable models.',
    summary:'OpenAI has reorganized its public Model Spec around five values: faithfulness to human intent, harm minimization, honesty and transparency, human agency, and care. The revision adds guidance about context, oversight and side effects while retiring much of the detailed style guidance.',
    takeaway:'As agents take on more work, judging their output means looking beyond a polished answer. Did they respect your goal, explain important assumptions and leave consequential decisions visible to you?',
    action:'Add a line to your next agent brief: “Tell me which assumptions affect the result and flag any action that would change something outside this task.”',
    caveat:'The Model Spec describes intended behavior. OpenAI explicitly says its models do not yet fully reflect it.',
    sourceTitle:'An updated Model Spec for more capable and beneficial AI',
    sourceUrl:'https://openai.com/index/updated-model-spec/',
    next:['/guides/chatgpt-work-web-tasks','Plan a web task with clear checkpoints']
  },
  {
    id:'gemini-sheets-cell-citations', date:'2026-10-28', datePublished:'2026-11-01', dateModified:'2026-11-01', topic:'Productivity', publisher:'Google', art:'data',
    title:'AI-filled spreadsheet cells now show their web sources',
    description:'Google Sheets adds cell-level citations to Fill with Gemini and expands requests to as many as 3,000 cells.',
    summary:'Google is adding source links inside individual cells generated with the AI function in Sheets on the web. The update also expands capacity to 3,000 cells per request, making larger categorization, summarization and data tasks possible.',
    takeaway:'A source next to the answer makes review less cumbersome. It still needs a human check: a citation can be real while the value, interpretation or date is wrong.',
    action:'Start with ten rows of a research table. Open the cited pages and compare the exact claims, then decide whether a larger batch is worth running.',
    caveat:'Rollout began October 20 and can take up to 15 days. Access requires an eligible Workspace, Google AI or education plan with Gemini in Sheets enabled.',
    sourceTitle:'Fill with Gemini now provides cell-level citations for web sources and supports larger requests',
    sourceUrl:'https://workspaceupdates.googleblog.com/2026/10/fill-with-gemini-now-provides-cell-level-citations-for-web-sources-and-supports-larger-requests.html',
    next:['/guides/chatgpt-work-web-tasks','Build a workflow for collecting web data']
  },
  {
    id:'microsoft-copilot-agent-harness', date:'2026-10-28', datePublished:'2026-11-01', dateModified:'2026-11-01', topic:'Agents', publisher:'Microsoft', art:'agents',
    title:'Microsoft opens up the system behind its Copilot agents',
    description:'The Copilot harness is coming through Microsoft Foundry, giving builders a shared foundation for agents that use different models.',
    summary:'Microsoft is making its GitHub-developed Copilot harness available through Foundry. A harness supplies the instructions, context, tools, execution environment and controls around a model. Builders can use an SDK or a managed cloud service, with support for MCP, agent skills and plugins.',
    takeaway:'Picking a model is only one part of building a useful agent. The surrounding system determines how it finds context, uses tools and carries a task through to completion.',
    action:'Before choosing an agent platform, map one real workflow. Compare tool access, approval controls, logs, total cost and the quality of the finished result.',
    caveat:'This is infrastructure for developers and teams. A shared harness does not make every workflow reliable without testing.',
    sourceTitle:'Introducing the Microsoft Copilot harness',
    sourceUrl:'https://blogs.microsoft.com/blog/2026/10/28/introducing-the-microsoft-copilot-harness-unlocking-the-potential-of-truly-multi-model-agentic-work/',
    next:['/agents','See what you can delegate to an agent']
  },
  {
    id:'anthropic-proposed-ipo-filing', date:'2026-10-26', datePublished:'2026-11-01', dateModified:'2026-11-01', topic:'Industry', publisher:'Anthropic', art:'industry',
    title:'Anthropic files for a proposed public offering',
    description:'The company behind Claude has filed an S-1, with the share count and proposed price range still undetermined in its announcement.',
    summary:'Anthropic announced that it filed a registration statement with the SEC for a proposed initial public offering. It intends to list on the Nasdaq Global Select Market under ANT. Its announcement says the registration statement is not yet effective and does not specify the number of shares or price range.',
    takeaway:'This is a company milestone to follow, not a new Claude feature. For everyday users, the useful questions remain product availability, service quality and whether the tool fits the work.',
    action:'Keep product evaluation separate from company headlines. Compare Claude and another tool on the same small task using your own criteria.',
    caveat:'The announcement describes a proposed offering, not a completed IPO or shares already available to buy.',
    sourceTitle:'Anthropic files S-1 with the SEC for proposed initial public offering',
    sourceUrl:'https://www.anthropic.com/news/s1-sec',
    next:['/tool-trial','Run your own tool comparison']
  },
  {
    id:'agent-skills-independent-foundation', date:'2026-10-22', datePublished:'2026-11-01', dateModified:'2026-11-01', topic:'Agents', publisher:'Anthropic', art:'skills',
    title:'Agent Skills moves to an independent foundation',
    description:'Anthropic is donating the open standard for reusable agent instructions to the Agentic AI Foundation.',
    summary:'Anthropic is donating Agent Skills to the Agentic AI Foundation under the Linux Foundation. A skill packages task instructions in a SKILL.md file, alongside optional scripts and references. The donation includes the name, logo, GitHub organization and domain, with maintainers from multiple companies.',
    takeaway:'Your best workflow can become something you reuse instead of explaining from scratch. An open format also offers a path to carrying instructions between tools that support it.',
    action:'Write down one repeatable task: required inputs, steps, the output format and a review checklist. Test those instructions in your current agent before packaging them as a skill.',
    caveat:'Compatibility and permissions differ by platform. Inspect downloaded skills and any scripts before giving them access to your files or accounts.',
    sourceTitle:'Donating Agent Skills to the Agentic AI Foundation',
    sourceUrl:'https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation',
    next:['/guides/agents-get-real-work-done','Start with a repeatable agent workflow']
  }
];


// Newly reviewed briefs. Source announcement dates remain distinct from publication.
newsStories.push(...[
  {
    "id": "genie-4-interactive-worlds",
    "date": "2026-10-27",
    "datePublished": "2026-11-02",
    "dateModified": "2026-11-02",
    "topic": "Industry",
    "publisher": "Google DeepMind",
    "art": "web",
    "title": "Genie 4 brings sound and live direction to simulated worlds",
    "description": "Google’s new world-model research combines interactive scenes with native audio, with access beginning through a limited tester rollout.",
    "summary": "Google announced Genie 4, a world model for interactive simulation. People can steer a generated scene with natural-language directions, while the model produces audio alongside the visuals. Google says a limited group of trusted testers has begun receiving access; broader routes are planned through Project Genie and early-access developer partners.",
    "takeaway": "Our take: this is a development to watch for creative prototyping and simulation. A convincing generated environment still needs a defined purpose and a way to evaluate whether its behavior is useful for that purpose.",
    "action": "Write a short simulation brief: the situation, what a person should be able to change, and three behaviors you would need to verify. Use that brief to assess demos before planning a production dependency.",
    "caveat": "The announcement describes a limited rollout. Planned availability is not the same as access in your account today, and a research demo is not evidence of reliability for a specific real-world task.",
    "sourceTitle": "Google: introducing Genie 4",
    "sourceUrl": "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-genie-4/",
    "next": [
      "/resources",
      "Start with a clear project brief"
    ]
  },
  {
    "id": "gpt-61-terra-visual-work",
    "date": "2026-10-26",
    "datePublished": "2026-11-02",
    "dateModified": "2026-11-02",
    "topic": "Agents",
    "publisher": "OpenAI",
    "art": "agents",
    "title": "GPT-6.1 Terra connects visual reasoning with computer tasks",
    "description": "OpenAI’s October 26 release adds a model aimed at visual understanding, computer use, and everyday professional writing.",
    "summary": "OpenAI introduced GPT-6.1 Terra for visual reasoning, computer use, and writing. It is available through the API and in ChatGPT Work and Codex. OpenAI reports improvements over its earlier Terra model in its evaluations; those vendor results do not establish performance on your own workflow.",
    "takeaway": "Our take: evaluate the complete task, including the time spent checking and correcting the result. A model that can interpret a screen is most useful when the desired action and the stopping condition are equally clear.",
    "action": "Choose a reversible task with nonsensitive material, such as reviewing a sample presentation for cropped text. Define the checks first, inspect every proposed change, and compare the result with your current process.",
    "caveat": "Work and Codex availability does not mean the model is available in Chat. Workspace controls and browser or computer access requirements still apply. Check the release notes and your account before designing a workflow around it.",
    "sourceTitle": "OpenAI: GPT-6.1 Terra release notes, October 26, 2026",
    "sourceUrl": "https://help.openai.com/en/articles/9624314-model-release-notes",
    "next": [
      "/guides/agents-get-real-work-done",
      "Give an agent a clear brief"
    ]
  },
  {
    "id": "claude-nonprofits-workflow-plugin",
    "date": "2026-10-26",
    "datePublished": "2026-11-02",
    "dateModified": "2026-11-02",
    "topic": "Productivity",
    "publisher": "Anthropic",
    "art": "skills",
    "title": "Claude’s nonprofit plugin packages recurring operational work",
    "description": "A new plugin brings reusable skills and connectors to verified nonprofits, with workflows spanning fundraising and small-team operations.",
    "summary": "Anthropic released a Claude for Nonprofits plugin developed with nonprofit organizations. It packages skills and connectors for work such as fundraising, marketing, and hiring, alongside organization context and policy setup. Anthropic also describes a planned Taproot partnership to extend implementation support; that partnership is a separate initiative.",
    "takeaway": "Our take: the useful shift is from repeating a long briefing to maintaining a reviewed workflow. Nonprofits can start with one recurring draft and keep mission, source requirements, and approval rules attached to the work.",
    "action": "Choose a public, nonsensitive task such as drafting a volunteer-event brief from approved details. Define the required facts and reviewer, then compare the plugin’s output with your organization’s existing standard.",
    "caveat": "Check nonprofit verification, plan eligibility, and connector permissions before use. A planned support partnership does not establish that a consulting placement is available to your organization today.",
    "sourceTitle": "Anthropic: expanding Claude for Nonprofits",
    "sourceUrl": "https://claude.com/fr/resources/articles/expanding-claude-for-nonprofits",
    "next": [
      "/resources",
      "Find a starting template"
    ]
  }
]);
// Daily news desk — November 3, 2026. Source dates remain separate from publication.
newsStories.push(...[
  {
    id:'openai-physical-engineering-workflows', date:'2026-11-03', datePublished:'2026-11-03', dateModified:'2026-11-03', topic:'Industry', publisher:'OpenAI', art:'agents',
    title:'OpenAI shows where AI-assisted hardware design still needs engineers',
    description:'A new engineering update covers CAD, drawings, simulation and prototype work—and documents manufacturing constraints the models still missed.',
    summary:'OpenAI described research and internal workflows using Codex, ChatGPT and Astra for mechanical and electrical design, manufacturing drawings, simulation setup and cross-discipline coordination. In one device project, two people produced a design in under a week and a manufacturer built prototypes, but OpenAI says several review rounds were still needed because Astra did not consistently account for production limits, tolerances or assembly details.',
    takeaway:'Our take: the useful signal is not “AI designs hardware by itself.” It is that bounded drafting and analysis steps may move faster when qualified engineers keep requirements, manufacturability and safety decisions in the review loop.',
    action:'Choose one reversible engineering artifact, such as a synthetic drawing-check checklist. Define the dimensions, constraints and reviewer before using an AI tool, then record every correction required before the artifact could inform real work.',
    caveat:'This announcement reports OpenAI research, internal use and selected collaborations. It is not general evidence that an unreviewed model output is safe, manufacturable or suitable for a specific product, and the collaboration invitation is not access to a finished self-serve product.',
    sourceTitle:'OpenAI: Accelerating engineering for the physical world',
    sourceUrl:'https://openai.com/index/accelerating-engineering-for-the-physical-world/',
    next:['/tool-trial','Plan a same-task tool trial']
  },
  {
    id:'openai-lifeval-everyday-agent-evaluation', date:'2026-11-02', datePublished:'2026-11-03', dateModified:'2026-11-03', topic:'Agents', publisher:'OpenAI', art:'data',
    title:'LifeVal tests whether AI can finish everyday tasks, not just answer questions',
    description:'OpenAI’s new evaluation covers caregiving, education, household administration, shopping, finances and public services.',
    summary:'OpenAI introduced LifeVal, an evaluation for practical, multi-step tasks people want help completing. The company says it began with time-use datasets and a demographically representative survey of 3,995 respondents, then built tasks across caregiving, health, education, household administration, personal finance, shopping and government services.',
    takeaway:'Our take: this is a better evaluation direction than judging an assistant by a polished first answer alone. For a real workflow, success also depends on current sources, permissions, correct actions, the time spent reviewing and whether the person affected stays in control.',
    action:'Pick one low-stakes household task and write a five-line evaluation: desired result, sources to check, actions allowed, decisions reserved for you and a stopping condition. Test the complete workflow rather than the opening response.',
    caveat:'LifeVal is an OpenAI-created benchmark and the reported examples are company evaluation results, not guarantees for your account or situation. Do not delegate medical, financial, legal, childcare or government-service decisions without appropriate human review and current official information.',
    sourceTitle:'OpenAI: LifeVal',
    sourceUrl:'https://openai.com/index/lifeval/',
    next:['/workflow-lab','Map the human decisions in a workflow']
  },
  {
    id:'github-copilot-jetbrains-air', date:'2026-11-03', datePublished:'2026-11-03', dateModified:'2026-11-03', topic:'Agents', publisher:'GitHub', art:'skills',
    title:'GitHub Copilot can now run coding tasks inside JetBrains Air',
    description:'The integration supports parallel local sessions and isolated cloud tasks, with separate plan and administrator requirements.',
    summary:'GitHub announced Copilot support in JetBrains Air through the Agent Client Protocol. Developers can select Copilot in Air, run parallel sessions, use project and IDE context, and review changes alongside code. Local tasks use the Air plugin; cloud tasks run in fresh virtual machines and require an Air Teams-enabled business organization, a Copilot subscription and administrator enablement.',
    takeaway:'Our take: the benefit is a reviewable place for parallel agent work, not permission to merge more code without checking it. Teams should decide which repositories, commands, secrets and spending paths a cloud task may reach before delegating work.',
    action:'Start locally on a test repository. Ask for one small change, inspect the diff, run the project’s own checks and note what context or permissions were actually required before considering a cloud task.',
    caveat:'Availability differs for local and cloud work. GitHub says Air governance analytics do not include Copilot usage, Air administrators cannot set Copilot spending limits inside Air, and individual tasks cannot choose between a personal and organization plan.',
    sourceTitle:'GitHub: Copilot is now available in JetBrains Air',
    sourceUrl:'https://github.blog/changelog/2026-11-03-github-copilot-is-now-available-in-jetbrains-air/',
    next:['/guides/agents-get-real-work-done','Give an agent a bounded coding brief']
  }
]);

// Daily news desk — November 4, 2026. Source dates remain separate from publication.
newsStories.push(...[
  {
    id:'openai-pierre-codex-source-control', date:'2026-11-04', datePublished:'2026-11-04', dateModified:'2026-11-04', topic:'Industry', publisher:'OpenAI', art:'skills',
    title:'OpenAI’s Pierre deal points Codex toward source-control infrastructure',
    description:'OpenAI plans to acquire the maker of Code Storage and the open-source Trees and Diffs libraries already used in Codex.',
    summary:'OpenAI announced an agreement to acquire Pierre Computer Company, the company behind Code Storage and several open-source developer tools. OpenAI says Codex already uses Pierre’s Trees and Diffs libraries for file navigation and change review. After closing, OpenAI plans to bring Code Storage capabilities into Codex while keeping Pierre’s open-source projects open source.',
    takeaway:'Our take: coding agents are pushing product competition beyond code generation and into the systems used to store, review and ship changes. Teams still need explicit branch, review, test and deployment rules; an acquisition announcement does not replace those controls.',
    action:'Map one agent-assisted code change from branch creation through review and deployment. Write down who approves the diff, which checks must pass and where a person can stop the release.',
    caveat:'The transaction has not closed and remains subject to customary conditions and regulatory approval. OpenAI describes an ambition for future Codex capabilities, not a complete product migration available today. Code Storage customers can continue using the service while the companies remain separate.',
    sourceTitle:'OpenAI: OpenAI to acquire Pierre Computer Company, Inc.',
    sourceUrl:'https://openai.com/index/openai-to-acquire-pierre/',
    next:['/guides/agents-get-real-work-done','Give a coding agent a bounded brief']
  },
  {
    id:'openai-daybreak-red-govcloud', date:'2026-11-04', datePublished:'2026-11-04', dateModified:'2026-11-04', topic:'Safety', publisher:'OpenAI', art:'review',
    title:'Daybreak Red reaches approved AWS GovCloud customers',
    description:'GPT-5.6 Cyber is now available through Amazon Bedrock in AWS GovCloud (US-East) for approved government security teams.',
    summary:'OpenAI announced that approved Daybreak Red customers can access GPT-5.6 Cyber through Amazon Bedrock in AWS GovCloud (US-East). The service is intended for authorized vulnerability research, exploit validation and security testing. OpenAI says qualified practitioners should review findings and fixes before implementation, and that inference data is not used to train models.',
    takeaway:'Our take: the important change is deployment inside a government cloud environment with identity, monitoring and access controls—not permission to automate consequential security decisions. Skilled defenders, authorization and controlled testing remain part of the workflow.',
    action:'For an authorized security workflow, document the target scope, evidence required, human reviewer and rollback plan before testing any model-assisted finding. Keep the first exercise inside a controlled environment.',
    caveat:'Access requires both OpenAI Daybreak Red approval and AWS provisioning; approval alone does not enable the model. This is for qualified, authorized security work, and the provider announcement is not evidence that a generated finding or mitigation is correct.',
    sourceTitle:'OpenAI: Daybreak Red is now available in AWS GovCloud (US-East)',
    sourceUrl:'https://openai.com/index/daybreak-red-aws-govcloud/',
    next:['/security','Review practical AI security guidance']
  }
]);

// Daily news desk — November 5, 2026. Source dates remain separate from publication.
newsStories.push(...[
  {
    id:'openai-gpt-6-cyber', date:'2026-11-05', datePublished:'2026-11-05', dateModified:'2026-11-05', topic:'Safety', publisher:'OpenAI', art:'review',
    title:'GPT-6 Cyber raises the stakes for authorized security testing',
    description:'OpenAI’s new cyber model can find, validate and help patch vulnerabilities, with access limited to approved security workflows.',
    summary:'OpenAI introduced GPT-6 Cyber for authorized vulnerability research and security testing. The company reports stronger benchmark results and better scope adherence than GPT-5.6 Cyber, and says the model contributed to work on Linux and Firefox vulnerabilities. Those figures are OpenAI evaluations and project results, not a guarantee for another codebase.',
    takeaway:'Our take: stronger security agents make written scope, isolated environments and qualified review more important, not less. A convincing exploit or patch is evidence to inspect—not permission to touch an unapproved system or ship a fix without testing.',
    action:'For an authorized test, write down the exact repository or environment, allowed techniques, stopping conditions, evidence required and the person who will review any finding or patch before work begins.',
    caveat:'GPT-6 Cyber is classified Critical for cybersecurity under OpenAI’s Preparedness Framework. Access is controlled through Daybreak programs and is intended for verified, authorized defenders; availability and approval differ by workflow. OpenAI’s benchmark and customer claims have not been independently reproduced here.',
    sourceTitle:'OpenAI: GPT-6 Cyber — advancing the frontier of aligned cybersecurity agents',
    sourceUrl:'https://openai.com/index/introducing-gpt-6-cyber/',
    next:['/security','Review practical AI security guidance']
  },
  {
    id:'openai-images-2-6', date:'2026-11-04', datePublished:'2026-11-05', dateModified:'2026-11-05', topic:'Productivity', publisher:'OpenAI', art:'images',
    title:'Images 2.6 adds GIFs, faster drafts and more precise edits',
    description:'OpenAI’s new image release adds motion, SVG export and edit controls across ChatGPT, Codex and the API.',
    summary:'OpenAI released Images 2.6 with faster generation, GIF creation and better consistency across editing rounds. ChatGPT and Codex users can access the model across subscription tiers, while developers can use GPT-Image-2.6 Flare and Sunburst in the API. API additions include image markup, SVG export and a complexity control.',
    takeaway:'Our take: the practical gain is a shorter review loop for campaign graphics, product concepts and reusable characters. Faster generation does not remove the need to check text, brand details, product accuracy, disclosure requirements and usage rights.',
    action:'Use a low-risk brand asset as a test. Create one still and one short loop, then compare subject consistency, readable details, file size and the time needed for human correction before choosing a production workflow.',
    caveat:'OpenAI says Images 2.6 is available globally in ChatGPT and Codex and that Flare and Sunburst are available in the API. Speed and quality claims are provider-reported; API pricing and output controls should be checked in the current developer documentation.',
    sourceTitle:'OpenAI: Introducing Images 2.6',
    sourceUrl:'https://openai.com/index/introducing-images-2-6/',
    next:['/resources','Find a useful creative starting point']
  }
]);

newsStories.sort((a,b)=>b.date.localeCompare(a.date));

