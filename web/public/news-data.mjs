// Collection curation date, not an article publication date.
// Existing November 1 publication dates are preserved from the first news release.
// New stories must record their own actual datePublished; only substantive edits change dateModified.
export const newsEdition = '2026-11-10';
export const newsTopics = ['All stories', 'Productivity', 'Agents', 'Safety', 'Industry'];
export const newsStories = [
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
