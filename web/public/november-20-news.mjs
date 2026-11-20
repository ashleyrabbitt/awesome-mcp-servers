// Source dates stay in date; the new briefs were published on November 20.
// Editorial takeaways and suggested exercises are distinct from vendor claims.
export const novemberTwentyNews = [
  {
    id: 'openai-performance-factory-review-recovery', date: '2026-11-19', datePublished: '2026-11-20', dateModified: '2026-11-20',
    topic: 'Agents', publisher: 'OpenAI', art: 'agents',
    title: 'OpenAI shows how coding agents investigate slowdowns and verify the fix',
    description: 'The Performance Factory case study connects an alert, an investigation, an engineer’s review and a recovery check.',
    summary: 'OpenAI describes its internal Codex-powered Performance Factory. A performance alert starts a task; agents investigate the cause and propose a code change, an engineer decides what ships, and an agent checks performance after deployment. Separate review passes challenge diagnoses and proposed fixes.',
    takeaway: 'Our take: the useful pattern is a task that survives handoffs. Findings, evidence and the finish condition should remain available when the next person or agent picks up the work.',
    action: 'Map one recurring software problem from alert to confirmed recovery. Define the evidence for a diagnosis, the reviewer for a proposed change and the measurement that closes the task.',
    caveat: 'This is an internal engineering case study, not a newly available consumer product. OpenAI reports uneven diagnosis quality and says generating reliable fixes remains difficult.',
    sourceTitle: 'OpenAI: How OpenAI’s Performance Factory keeps ChatGPT fast',
    sourceUrl: 'https://openai.com/index/how-openai-performance-factory-keeps-chatgpt-fast/',
    next: ['/workflow-lab', 'Map the handoffs in one agent workflow']
  },
  {
    id: 'nvidia-microsoft-foundry-cloud-local-models', date: '2026-11-19', datePublished: '2026-11-20', dateModified: '2026-11-20',
    topic: 'Industry', publisher: 'NVIDIA', art: 'data',
    title: 'NVIDIA and Microsoft expand model customization across cloud and local systems',
    description: 'The Ignite announcements cover Azure infrastructure, Nemotron models in Foundry and more options for running AI near company data.',
    summary: 'NVIDIA announces expanded collaboration with Microsoft across Azure, Foundry and local infrastructure. The update includes Nemotron 3.5 model options, managed deployment of custom weights, and broader local and edge deployment plans. Azure’s Vera Rubin infrastructure is described as a preview.',
    takeaway: 'Our take: model selection now includes where the work runs. A cloud service, an on-premises system and a local device can have very different operating costs and data requirements.',
    action: 'For one document-processing workflow, list the data location, response-time target and expected volume. Compare an available managed model with a local option using the same sample documents.',
    caveat: 'The announcement mixes available features, previews and future plans. Nemotron Bolt and Transcribe are described as coming soon; customer-specific performance figures should not be treated as general forecasts.',
    sourceTitle: 'NVIDIA: Expand Accelerated Computing From Azure to Windows PCs',
    sourceUrl: 'https://blogs.nvidia.com/blog/microsoft-ignite-accelerated-computing-azure-windows-pcs/',
    next: ['/tool-trial', 'Compare deployment options on one task']
  },
  {
    id: 'google-tunix-multi-turn-agent-training', date: '2026-11-19', datePublished: '2026-11-20', dateModified: '2026-11-20',
    topic: 'Design & tech', publisher: 'Google', art: 'agents',
    title: 'Google publishes a practical example of training an agent across multiple turns',
    description: 'A Tunix and Gemma 4 tutorial shows how an agent can learn from tool results in a small, measurable environment.',
    summary: 'Google’s tutorial trains a Gemma 4 E2B agent with Tunix on a Cloud TPU. The agent plays a grid-based game by calling a tool, reading the result and choosing another move. The article includes code for the environment, tool parser, conversation agent and training loop.',
    takeaway: 'Our take: an agent needs feedback on a completed sequence, not just a plausible first answer. A small environment with a clear scoring rule makes failures easier to inspect.',
    action: 'Read the example and sketch a bounded task for your own agent. Specify the allowed tool, observations, stopping condition and held-out cases before considering any model training.',
    caveat: 'This is a developer tutorial requiring training infrastructure. Its game results do not establish performance on business workflows, and a stronger prompt or existing model may be sufficient for your task.',
    sourceTitle: 'Google: Multi-Turn Agentic Reinforcement Learning with Tunix and Gemma 4',
    sourceUrl: 'https://developers.googleblog.com/multi-turn-agentic-reinforcement-learning-with-tunix-and-gemma-4-on-google-tpus/',
    next: ['/workflow-lab', 'Define the tool, feedback and finish condition']
  },
  {
    id: 'openai-chip-design-verification-results', date: '2026-11-18', datePublished: '2026-11-20', dateModified: '2026-11-20',
    topic: 'Design & tech', publisher: 'OpenAI', art: 'review',
    title: 'AI-assisted chip design puts verification beside the performance claim',
    description: 'OpenAI reports production design improvements and separate RISC-V experiments, with different evidence behind each.',
    summary: 'OpenAI reports model-assisted changes to Jalapeño compute blocks and AMD chip designs, alongside experiments on open-source RISC-V cores. Its account describes using design tools to verify behavior and measure tradeoffs in power, performance and area.',
    takeaway: 'Our take: a better score is useful only alongside the constraints it preserves. Distinguish a simulated benchmark, a production design change and a result verified in physical silicon.',
    action: 'When reviewing an AI-generated optimization, record the original requirements, the validation method and the constraints the result still satisfies. Check whether any removed feature explains the apparent improvement.',
    caveat: 'These are the companies’ reported results. OpenAI notes that specification-based experiments could omit features and says tighter area limits and physical-synthesis timing checks would better represent production design.',
    sourceTitle: 'OpenAI: Advancing chip design with OpenAI models',
    sourceUrl: 'https://openai.com/index/advancing-chip-design-with-our-models/',
    next: ['/tool-trial', 'Record constraints alongside the result']
  },
  {
    id: 'openai-research-acceleration-task-level-evidence', date: '2026-11-18', datePublished: '2026-11-20', dateModified: '2026-11-20',
    topic: 'Industry', publisher: 'OpenAI', art: 'data',
    title: 'OpenAI’s research report shows why agent success needs a task-by-task measure',
    description: 'Internal measurements find rising coding-agent capability alongside large differences between kinds of research work.',
    summary: 'OpenAI’s research-acceleration update combines internal usage measurements, task estimates and researcher surveys. It reports that autonomous success on tasks estimated to take humans two to four hours rose from 23% in March to 46% in October, while success varied substantially by task category.',
    takeaway: 'Our take: a company-wide adoption number can hide the jobs where agents struggle. Measure accepted outputs and correction time for each workflow before projecting savings across a team.',
    action: 'Choose three recurring tasks. Record the baseline time, the agent’s result, reviewer corrections and the time to an accepted deliverable. Keep failures in the comparison.',
    caveat: 'The report describes OpenAI’s internal research environment and includes estimates and surveys. These figures are not a forecast of automation or labor savings in another organization.',
    sourceTitle: 'OpenAI: Research acceleration — The jagged frontier',
    sourceUrl: 'https://openai.com/index/research-acceleration-jagged-frontier/',
    next: ['/tool-trial', 'Measure one workflow before scaling it']
  },
  {
    id: 'chatgpt-sales-connected-customer-workflows', date: '2026-11-17', datePublished: '2026-11-20', dateModified: '2026-11-20',
    topic: 'Productivity', publisher: 'OpenAI', art: 'files',
    title: 'ChatGPT for Sales brings research, meeting preparation and CRM work together',
    description: 'A Sales plugin and more than 30 new or expanded partner plugins connect common selling tasks to existing tools.',
    summary: 'OpenAI introduced ChatGPT for Sales with seller-focused skills and partner plugins. The announcement describes account research, meeting briefs, tailored presentations, follow-up drafts and CRM updates using connected customer context.',
    takeaway: 'Our take: start with one handoff that loses context, such as turning meeting notes into a reviewed follow-up and a clear next step in the CRM.',
    action: 'Use a fictional customer and sample call notes to prepare a brief, draft a follow-up and propose a CRM update. Check names, commitments and dates before adapting the process to a real account.',
    caveat: 'Access depends on the chosen plugins, connected services and workspace configuration. Connecting a tool does not establish permission to contact a customer or change a business record.',
    sourceTitle: 'OpenAI: Introducing ChatGPT for Sales',
    sourceUrl: 'https://openai.com/index/introducing-chatgpt-for-sales/',
    next: ['/workflow-lab', 'Plan one sales handoff with clear review points']
  },
  {
    id: 'google-ai-studio-full-stack-android', date: '2026-11-17', datePublished: '2026-11-20', dateModified: '2026-11-20',
    topic: 'Design & tech', publisher: 'Google', art: 'design',
    title: 'Google AI Studio adds sign-in and persistent data to generated Android apps',
    description: 'The Android workflow now includes Firebase setup, an improved emulator and installation through a personal Google Play library.',
    summary: 'Google AI Studio’s Build agent can provision Cloud Firestore, Firebase Authentication and Firebase AI Logic for generated Kotlin Android apps. The update also adds a faster HD emulator, screenshot-guided edits and publishing to a personal Google Play library.',
    takeaway: 'Our take: a prototype becomes more useful when someone can return to it and find their data. Account separation and the experience after reopening the app deserve an early test.',
    action: 'Build a small sample tracker. Test saving an item, closing and reopening the app, signing in on another device and confirming that a second account sees only its own records.',
    caveat: 'Personal-library installation is different from a public Play Store release. Review the generated data rules, service costs and public distribution requirements before using the app with customers.',
    sourceTitle: 'Google: Build full-stack Android apps with Gemini in Google AI Studio',
    sourceUrl: 'https://developers.googleblog.com/build-full-stack-android-apps-with-gemini-in-google-ai-studio/',
    next: ['/tool-trial', 'Test a complete prototype workflow']
  },
  {
    id: 'microsoft-ignite-agent-spend-shared-work', date: '2026-11-17', datePublished: '2026-11-20', dateModified: '2026-11-20',
    topic: 'Agents', publisher: 'Microsoft', art: 'data',
    title: 'Microsoft Ignite puts shared agent work and spending visibility on the agenda',
    description: 'Copilot Workspaces and Agent 365 Business Analytics address coordination and the cost of running agents across a business.',
    summary: 'Microsoft’s Ignite keynote introduced Copilot Workspaces for people and agents working with shared context. It also announced Agent 365 Business Analytics to help organizations understand agent spending and connect usage with business outcomes.',
    takeaway: 'Our take: managing several agents requires more than a list of chat threads. A team needs to know the owner, current task, next decision and cost of each recurring workflow.',
    action: 'Inventory your active agents in a simple table: purpose, owner, connected tools, recurring tasks, spending and measurable outcome. Use it to identify duplicate work before adding another agent.',
    caveat: 'Ignite includes products at different release stages. Confirm licensing, availability and the actual data reported in your tenant before relying on a feature for operational reporting.',
    sourceTitle: 'Microsoft: Ignite 2026 — Building the frontier ecosystem',
    sourceUrl: 'https://blogs.microsoft.com/blog/2026/11/17/ignite-2026-building-the-frontier-ecosystem/',
    next: ['/agent-launch-planner', 'Define an agent’s purpose and ownership']
  }
];
