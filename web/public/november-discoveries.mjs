// November launches beyond the initial top 50. Order follows the November 17 snapshot.
const discoveries = [
  {
    "id": "levanto-sage2",
    "name": "Sage2",
    "type": "AI apps",
    "category": "Development",
    "roles": [
      "Developers",
      "Product managers"
    ],
    "hosting": "Model API",
    "description": "Sage2 turns speech or text arriving over time into structured fields and revises its decisions as the conversation changes. It can help an application capture a correction while a person is still speaking.",
    "firstTry": "Feed it a fictional appointment request in which the caller changes Tuesday to Thursday.",
    "checkpoint": "Verify the final date and inspect when the change first appeared in the stream.",
    "url": "https://levanto.ai/blog/introducing-sage2",
    "discoveryUrl": "https://www.producthunt.com/products/sagecraft/launches/sage2-by-levanto-labs"
  },
  {
    "id": "openmail",
    "name": "OpenMail",
    "type": "Workflow tools",
    "category": "Automation",
    "roles": [
      "Developers",
      "Entrepreneurs"
    ],
    "hosting": "API and CLI",
    "description": "Provision a separate mailbox for an agent and handle incoming messages and attachments programmatically. A team can give a workflow its own address and retain its message history.",
    "firstTry": "Send a sample invoice and a correction to a test inbox, then ask for one updated draft record.",
    "checkpoint": "Check that the attachment and correction belong to the same conversation before routing either onward.",
    "url": "https://openmail.sh/",
    "discoveryUrl": "https://www.producthunt.com/products/openmail/launches/openmail"
  },
  {
    "id": "dex-semantics",
    "name": "Dex Semantics",
    "type": "Workflow tools",
    "category": "Analytics",
    "roles": [
      "Developers",
      "Product managers"
    ],
    "hosting": "Developer repository",
    "description": "Define business metrics and data relationships so an analytics agent can reuse the same definitions across questions. This gives a reviewer a place to inspect what a term such as active customer means.",
    "firstTry": "Define active customer for a sample table, then ask for the count in two different ways.",
    "checkpoint": "Compare both answers with a hand-calculated count and inspect the filters.",
    "url": "https://github.com/exmergo/dex",
    "discoveryUrl": "https://www.producthunt.com/products/dex-by-exmergo/launches/dex-semantics"
  },
  {
    "id": "maritime-cloud",
    "name": "Maritime",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers"
    ],
    "hosting": "Hosted compute",
    "description": "Host agents on separate cloud computers with configurable models and communication channels. An application team can give each customer a distinct working environment.",
    "firstTry": "Start two demo environments and save a different test document in each.",
    "checkpoint": "Check that each agent sees only its own document after a restart.",
    "url": "https://maritime.sh/",
    "discoveryUrl": "https://www.producthunt.com/products/maritime/launches/maritime-5"
  },
  {
    "id": "tulvo",
    "name": "Tulvo",
    "type": "AI apps",
    "category": "Productivity",
    "roles": [
      "Product managers",
      "Entrepreneurs",
      "Marketers"
    ],
    "hosting": "Web workspace",
    "description": "Bring forms, records, documents and projects into a shared workspace. Tulvo’s assistant helps configure the setup as the way a team tracks work changes.",
    "firstTry": "Build a creative intake form with a project owner, due date and review status.",
    "checkpoint": "Submit a sample request and follow it from the form to the assigned person’s view.",
    "url": "https://tulvo.io/",
    "discoveryUrl": "https://www.producthunt.com/products/tulvo/launches/tulvo"
  },
  {
    "id": "openframe",
    "name": "OpenFrame",
    "type": "Workflow tools",
    "category": "IT operations",
    "roles": [
      "Developers"
    ],
    "hosting": "Endpoint management platform",
    "description": "Give an IT team device inventory, patch management and agent-assisted maintenance in a single workspace. Proposed fixes can go to an operator for review.",
    "firstTry": "Use a test device to review a proposed routine maintenance change.",
    "checkpoint": "Check the device identity, approval record and final state before extending the workflow.",
    "url": "https://www.flamingo.run/openframe",
    "discoveryUrl": "https://www.producthunt.com/products/openframe-3/launches/openframe-3"
  },
  {
    "id": "pushary-teams",
    "name": "Pushary for Teams",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers",
      "Product managers"
    ],
    "hosting": "Approval integration",
    "description": "Route an agent’s request to a named teammate and keep a record of the decision. That gives a team a traceable answer when an agent pauses for permission.",
    "firstTry": "Send a harmless staging change for approval and have the reviewer decline the first request.",
    "checkpoint": "Verify who received it, who declined and whether the change actually stayed pending.",
    "url": "https://pushary.com/teams",
    "discoveryUrl": "https://www.producthunt.com/products/pushary/launches/pushary-for-teams"
  },
  {
    "id": "clayzo",
    "name": "Clayzo",
    "type": "Workflow tools",
    "category": "Design",
    "roles": [
      "Designers",
      "Developers",
      "Creators"
    ],
    "hosting": "Animation engine",
    "description": "Use a coding assistant to create motion graphics and interactive web animations. It suits teams that want to iterate on movement alongside the interface it belongs to.",
    "firstTry": "Animate a button moving from idle to success, then request one change to its timing.",
    "checkpoint": "Review the final motion in context, including its behavior for users who prefer reduced motion.",
    "url": "https://www.clayzo.com/",
    "discoveryUrl": "https://www.producthunt.com/products/clayzo/launches/clayzo-2"
  },
  {
    "id": "inkling-2-small",
    "name": "Inkling 2 Small",
    "type": "AI apps",
    "category": "Development",
    "roles": [
      "Developers",
      "Designers"
    ],
    "hosting": "Model platform",
    "description": "Thinking Machines Lab’s model can work with visual feedback as it builds and revises software. It gives developers a way to compare an implementation with a visual target during a coding task.",
    "firstTry": "Provide an original card layout and ask for one implementation and one revision after inspecting the render.",
    "checkpoint": "Compare alignment, spacing and readability before and after the revision.",
    "url": "https://thinkingmachines.ai/news/inkling-2-small/",
    "discoveryUrl": "https://www.producthunt.com/products/tinker-2/launches/inkling-2-small"
  },
  {
    "id": "synter-canvas",
    "name": "Synter Canvas",
    "type": "Agents",
    "category": "Marketing",
    "roles": [
      "Marketers",
      "Entrepreneurs"
    ],
    "hosting": "Web platform and MCP",
    "description": "Plan and manage paid advertising across connected platforms using an AI assistant. Marketers can bring targeting, creative and campaign settings into the same working conversation.",
    "firstTry": "Prepare two draft campaigns for the same offer using a shared budget ceiling.",
    "checkpoint": "Check audience overlap, attribution windows and spend limits before enabling delivery.",
    "url": "https://synterai.com/",
    "discoveryUrl": "https://www.producthunt.com/products/synter-canvas/launches/synter-canvas-2"
  },
  {
    "id": "spacefast",
    "name": "Spacefast",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers",
      "Creators",
      "Entrepreneurs"
    ],
    "hosting": "Hosted publishing platform",
    "description": "Publish agent-created artifacts, static sites and web apps with version history and shareable destinations. It gives teams a place to show someone the actual output of a build.",
    "firstTry": "Publish a sample prototype and send its preview link to a teammate.",
    "checkpoint": "Check which version opens, who can access it and whether the previous version can be recovered.",
    "url": "https://spacefast.com/",
    "discoveryUrl": "https://www.producthunt.com/products/spacefast-by-automattic/launches/spacefast-by-automattic"
  },
  {
    "id": "trainn-mcp",
    "name": "Trainn MCP",
    "type": "MCP servers",
    "category": "Training",
    "roles": [
      "Educators",
      "Creators",
      "Product managers"
    ],
    "hosting": "Remote MCP server",
    "description": "Turn product knowledge into instructional videos, help articles or courses from a supported AI assistant. A customer education team can reuse the same workflow for different learning formats.",
    "firstTry": "Turn an approved three-step onboarding process into a short tutorial and help article.",
    "checkpoint": "Follow both outputs in a test account and flag any step that differs from the product.",
    "url": "https://trainn.co/mcp/",
    "discoveryUrl": "https://www.producthunt.com/products/trainn/launches/trainn-mcp"
  },
  {
    "id": "voyager-files",
    "name": "Voyager",
    "type": "AI apps",
    "category": "Knowledge",
    "roles": [
      "Product managers",
      "Creators",
      "Entrepreneurs"
    ],
    "hosting": "File browser",
    "description": "Work with files and agents in the same browser-style workspace. Gather the documents for a task before asking the assistant to synthesize or organize them.",
    "firstTry": "Put a brief, a decision note and an obsolete draft in a sample project folder.",
    "checkpoint": "Inspect which files the assistant used and whether it distinguished the current decision from the old draft.",
    "url": "https://voyager.fm/",
    "discoveryUrl": "https://www.producthunt.com/products/vygr/launches/voyager-9"
  },
  {
    "id": "docsalot",
    "name": "DocsAlot",
    "type": "Agents",
    "category": "Customer support",
    "roles": [
      "Product managers",
      "Entrepreneurs",
      "Developers"
    ],
    "hosting": "Hosted documentation service",
    "description": "Answer support questions in Slack or Discord using an existing knowledge base. The tool is useful when the same question repeatedly arrives in a community channel.",
    "firstTry": "Ask three questions in a test channel, including one whose answer is absent from the documentation.",
    "checkpoint": "Check the cited page and whether an unanswered question is left for a person.",
    "url": "https://docsalot.dev/",
    "discoveryUrl": "https://www.producthunt.com/products/docsalot-2/launches/docsalot-for-customer-support"
  },
  {
    "id": "orphex-mcp",
    "name": "Orphex MCP",
    "type": "MCP servers",
    "category": "Marketing",
    "roles": [
      "Marketers",
      "Developers"
    ],
    "hosting": "Remote MCP server",
    "description": "Connect advertising and marketing data to a compatible assistant. A marketer can review performance across channels and prepare changes to campaigns or bids.",
    "firstTry": "Request a seven-day report for two channels using the same conversion definition.",
    "checkpoint": "Reconcile the report with each platform and inspect write permissions before approving a change.",
    "url": "https://mcp.orphex.co/",
    "discoveryUrl": "https://www.producthunt.com/products/orphex-mcp-let-s-do-agentic-marketing/launches/orphex-mcp"
  },
  {
    "id": "cal-com",
    "name": "Cal.com",
    "type": "Workflow tools",
    "category": "Scheduling",
    "roles": [
      "Entrepreneurs",
      "Salespeople",
      "Educators"
    ],
    "hosting": "Scheduling platform",
    "description": "Publish booking and event pages so guests can find a suitable time. The v7 launch adds events, discovery and an assistant to the scheduling platform.",
    "firstTry": "Create a sample workshop with a booking window and one unavailable time slot.",
    "checkpoint": "Open the guest page in another time zone and check the confirmation and calendar entry.",
    "url": "https://cal.com/",
    "discoveryUrl": "https://www.producthunt.com/products/cal/launches/cal-com-v7"
  },
  {
    "id": "protomap",
    "name": "ProtoMap",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers"
    ],
    "hosting": "Developer context tool",
    "description": "Map relationships among gRPC services and Protobuf messages so coding assistants and engineers can trace which consumers depend on a field.",
    "firstTry": "Choose one sample message field and ask which services consume it.",
    "checkpoint": "Compare the map with the actual definitions before changing the field.",
    "url": "https://hounddog.ai/protomap/",
    "discoveryUrl": "https://www.producthunt.com/products/hounddog-ai-static-code-scanner-2/launches/protomap"
  },
  {
    "id": "greta-sh",
    "name": "Greta.sh",
    "type": "AI apps",
    "category": "Marketing",
    "roles": [
      "Marketers",
      "Entrepreneurs",
      "Developers"
    ],
    "hosting": "Hosted web builder",
    "description": "Build web apps from a brief and use Greta’s search-oriented website workflow to develop pages around customer questions. It gives a small team a starting point for reviewing its coverage.",
    "firstTry": "Draft one page for a question a real customer asked about your offer.",
    "checkpoint": "Verify every claim and check whether the page answers the question before publishing.",
    "url": "https://www.greta.sh/",
    "discoveryUrl": "https://www.producthunt.com/products/gretabyquestera/launches/self-growing-websites-by-greta-sh"
  },
  {
    "id": "display-dev",
    "name": "Display",
    "type": "Workflow tools",
    "category": "Knowledge",
    "roles": [
      "Product managers",
      "Developers",
      "Creators"
    ],
    "hosting": "Hosted document workspace",
    "description": "Publish HTML or Markdown from an agent into a shared document workspace. People can comment on the output and edit the page where the work was delivered.",
    "firstTry": "Publish a short proposal and ask a teammate to mark the one decision they need clarified.",
    "checkpoint": "Reopen the document and verify the feedback and revised version are visible to the intended people.",
    "url": "https://display.dev/",
    "discoveryUrl": "https://www.producthunt.com/products/display-dev/launches/display-1-0"
  },
  {
    "id": "clocknext",
    "name": "Clocknext",
    "type": "Workflow tools",
    "category": "Analytics",
    "roles": [
      "Product managers",
      "Entrepreneurs",
      "Developers"
    ],
    "hosting": "Billing infrastructure",
    "description": "Price AI services using credits, usage units or completed outcomes. Product teams can model how different customers consume resources before settling on a billing rule.",
    "firstTry": "Model a successful job, a failed job and a retry with fictional usage records.",
    "checkpoint": "Compare the expected invoice and margin for all three cases before activating billing.",
    "url": "https://www.clocknext.com/",
    "discoveryUrl": "https://www.producthunt.com/products/clocknext/launches/clocknext-2"
  },
  {
    "id": "wonder-dev-view",
    "name": "Wonder Dev View",
    "type": "Workflow tools",
    "category": "Design",
    "roles": [
      "Designers",
      "Developers"
    ],
    "hosting": "Design and development workspace",
    "description": "Review coding-agent sessions beside a design canvas and running app. Designers and engineers can compare proposed interface changes with the visual reference in the same workspace.",
    "firstTry": "Ask for two variations of a signup panel in separate tasks.",
    "checkpoint": "Compare the rendered versions against the brief and inspect the accepted change.",
    "url": "https://wonder.design/dev",
    "discoveryUrl": "https://www.producthunt.com/products/wonder-dev-view/launches/wonder-dev-view"
  },
  {
    "id": "skillbox-so",
    "name": "Skillbox",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers",
      "Product managers"
    ],
    "hosting": "Skill library and sync tool",
    "description": "Keep reusable agent instructions in one library and synchronize them across supported coding tools. Teams can compare changes before distributing a revised skill.",
    "firstTry": "Update one formatting instruction and inspect the diff before syncing it to two test clients.",
    "checkpoint": "Run the same sample in both clients and confirm they received the same revision.",
    "url": "https://skillbox.so/",
    "discoveryUrl": "https://www.producthunt.com/products/skillbox-5/launches/skillbox-5"
  },
  {
    "id": "videco",
    "name": "Videco",
    "type": "AI apps",
    "category": "Video",
    "roles": [
      "Marketers",
      "Creators",
      "Entrepreneurs"
    ],
    "hosting": "Hosted video studio",
    "description": "Turn a webinar or demo into short clips and supporting copy. Videco also hosts videos and offers landing pages and engagement reporting for marketing teams.",
    "firstTry": "Cut a single customer question and its answer from a recorded demo.",
    "checkpoint": "Check the clip still makes sense on its own and the landing page points to the intended next step.",
    "url": "https://www.videco.io/",
    "discoveryUrl": "https://www.producthunt.com/products/videco/launches/videco-3"
  },
  {
    "id": "talyn",
    "name": "Talyn",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers"
    ],
    "hosting": "Cloud development workspace",
    "description": "Run Claude Code or Codex in parallel cloud environments. Each task has its own branch and diff, allowing a developer to return later and review the result.",
    "firstTry": "Send two independent documentation edits to separate sessions in a sample repository.",
    "checkpoint": "Inspect both diffs for overlapping changes before accepting either.",
    "url": "https://www.talyn.dev/",
    "discoveryUrl": "https://www.producthunt.com/products/talyn/launches/talyn-2"
  },
  {
    "id": "mcp1",
    "name": "MCP1",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers"
    ],
    "hosting": "MCP gateway",
    "description": "Appwrite’s gateway gives teams one connection point for multiple MCP servers, with authentication, per-tool access rules and usage records.",
    "firstTry": "Expose one read-only tool to a test group and leave a second tool outside that group.",
    "checkpoint": "Verify which tools appear to the user and which requests appear in the log.",
    "url": "https://mcp1.com/",
    "discoveryUrl": "https://www.producthunt.com/products/appwrite/launches/mcp1"
  },
  {
    "id": "nomac",
    "name": "NoMac",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers"
    ],
    "hosting": "On-demand macOS compute",
    "description": "Give a coding agent a hosted Mac with Xcode for building and inspecting an iOS application. Teams can use an iPhone simulator without maintaining a dedicated Mac for the job.",
    "firstTry": "Build a sample screen and open it in the simulator.",
    "checkpoint": "Check the target device, build output and session shutdown before using signing credentials.",
    "url": "https://nomac.app/",
    "discoveryUrl": "https://www.producthunt.com/products/nomac/launches/nomac-2"
  },
  {
    "id": "bridge-meetings",
    "name": "Bridge",
    "type": "AI apps",
    "category": "Meetings",
    "roles": [
      "Product managers",
      "Salespeople",
      "Entrepreneurs"
    ],
    "hosting": "Meeting platform",
    "description": "Bring scheduling, video calls, preparation and meeting notes into one workspace. People and assistants can work from the same meeting context.",
    "firstTry": "Hold a short practice call with one decision and one unresolved question.",
    "checkpoint": "Verify that the recap preserves both, including who actually agreed to the decision.",
    "url": "https://meetonbridge.com/",
    "discoveryUrl": "https://www.producthunt.com/products/meetonbridge/launches/bridge-4cf97514-1b04-42a4-abb0-fd7f1eac439a"
  },
  {
    "id": "agentmash",
    "name": "agentmash",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers"
    ],
    "hosting": "Desktop app",
    "description": "Help teammates’ coding agents see which files another agent is changing. It supports coordination when several people are working in the same repository.",
    "firstTry": "Give two demo sessions tasks touching the same component.",
    "checkpoint": "See when each session learns about the overlap and how reviewers can resolve it.",
    "url": "https://agentmash.dev/",
    "discoveryUrl": "https://www.producthunt.com/products/agentmash/launches/agentmash"
  },
  {
    "id": "agent-inbox-md",
    "name": "Agent Inbox",
    "type": "Workflow tools",
    "category": "Automation",
    "roles": [
      "Developers",
      "Entrepreneurs"
    ],
    "hosting": "CLI and messaging service",
    "description": "Give an agent email, Slack and Telegram communication through one interface. A human can answer questions or approve choices through an agreed channel.",
    "firstTry": "Route one fictional approval request to a test channel and reply with a choice.",
    "checkpoint": "Check that the reply reaches the original task and no duplicate message is sent.",
    "url": "https://www.agentinbox.md/",
    "discoveryUrl": "https://www.producthunt.com/products/agent-inbox/launches/agent-inbox"
  },
  {
    "id": "harness-memory",
    "name": "Harness Memory",
    "type": "Workflow tools",
    "category": "Knowledge",
    "roles": [
      "Developers",
      "Product managers"
    ],
    "hosting": "Agent memory service",
    "description": "Store context from agent work and retrieve it in later sessions using another supported harness. A project can keep decisions available when a team changes coding tools.",
    "firstTry": "Save a fictional naming decision in one session and ask a second tool to recover it.",
    "checkpoint": "Correct the decision and check which version the next session recalls.",
    "url": "https://harnessrouter.ai/harness-memory",
    "discoveryUrl": "https://www.producthunt.com/products/epsilla/launches/harness-memory"
  },
  {
    "id": "relay-documents",
    "name": "Relay",
    "type": "Workflow tools",
    "category": "Knowledge",
    "roles": [
      "Product managers",
      "Salespeople",
      "Entrepreneurs"
    ],
    "hosting": "Document sharing service",
    "description": "Send a document with background context that the recipient’s assistant can use to answer questions. Follow-up questions can come back to the sender.",
    "firstTry": "Share a sample proposal with a clear scope and one explicit exclusion.",
    "checkpoint": "Ask about both and inspect which information the recipient and their assistant can access.",
    "url": "https://relayto.ai/",
    "discoveryUrl": "https://www.producthunt.com/products/relaytoai/launches/relay-a4746ca4-2450-4736-94c2-81a57cd9c897"
  },
  {
    "id": "openai-lifeval",
    "name": "LifeVal",
    "type": "Workflow tools",
    "category": "Research",
    "roles": [
      "Product managers",
      "Developers",
      "Educators"
    ],
    "hosting": "Published evaluation benchmark",
    "description": "OpenAI’s benchmark examines whether AI helps with practical everyday tasks. Product teams can use its task framing to design evaluations with observable outcomes.",
    "firstTry": "Choose a public example and define what a complete, accurate response must contain.",
    "checkpoint": "Check the result against the task criteria and record where a person still has to intervene.",
    "url": "https://openai.com/index/lifeval/",
    "discoveryUrl": "https://www.producthunt.com/products/openai/launches/lifeval"
  },
  {
    "id": "three-dev",
    "name": "three.dev",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers",
      "Product managers"
    ],
    "hosting": "Agent evaluation platform",
    "description": "Review AI application traffic and identify responses that fail an expected behavior. Teams can investigate mistakes that leave the software running but give a user the wrong answer.",
    "firstTry": "Use a permitted sample of support replies and label a known policy mistake.",
    "checkpoint": "Inspect whether the evaluation caught it and review falsely flagged replies.",
    "url": "https://three.dev/producthunt",
    "discoveryUrl": "https://www.producthunt.com/products/three-dev/launches/three-dev"
  },
  {
    "id": "useclick",
    "name": "Click",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers"
    ],
    "hosting": "Managed agents API",
    "description": "Build an application around managed agents with persistent sessions, tools and isolated execution environments. Developers can keep a task’s state between interactions.",
    "firstTry": "Start a sample task, pause it and ask the agent to continue in the same session.",
    "checkpoint": "Verify the resumed state and confirm a second test user cannot see its stored context.",
    "url": "https://useclick.ai/",
    "discoveryUrl": "https://www.producthunt.com/products/click-6/launches/click-8"
  },
  {
    "id": "nameshot",
    "name": "Nameshot",
    "type": "AI apps",
    "category": "Productivity",
    "roles": [
      "Designers",
      "Creators",
      "Product managers"
    ],
    "hosting": "macOS app",
    "description": "Give new screenshots descriptive filenames locally on a Mac. This can make a folder of product references easier to navigate after a research session.",
    "firstTry": "Capture three similar onboarding screens and search for them by their new filenames.",
    "checkpoint": "Check whether the names distinguish the screens and avoid exposing personal details.",
    "url": "https://nameshot.app/",
    "discoveryUrl": "https://www.producthunt.com/products/nameshot-2/launches/nameshot-2"
  },
  {
    "id": "hyperresearch",
    "name": "Hyperresearch",
    "type": "AI apps",
    "category": "Research",
    "roles": [
      "Product managers",
      "Marketers",
      "Educators"
    ],
    "hosting": "Research workspace",
    "description": "Build research reports with a saved collection of sources. Reviewers can return to the underlying documents when a claim needs a second look.",
    "firstTry": "Investigate a narrow market question and pick two claims that could affect a decision.",
    "checkpoint": "Open each citation and verify the wording, date and scope against the original.",
    "url": "https://hyperresearch.ai/",
    "discoveryUrl": "https://www.producthunt.com/products/hyperresearch/launches/hyperresearch"
  },
  {
    "id": "agentic-canvas",
    "name": "Agentic Canvas",
    "type": "AI apps",
    "category": "Design",
    "roles": [
      "Designers",
      "Product managers",
      "Creators"
    ],
    "hosting": "Browser design canvas",
    "description": "Work with Figma files, web pages, documents and slides on a canvas that supports AI-assisted editing. It helps compare source material and alternative layouts together.",
    "firstTry": "Bring in a sample slide and redesign it for a different audience.",
    "checkpoint": "Inspect text, layout and editability after exporting the revised version.",
    "url": "https://canvas.agentgrid.io/",
    "discoveryUrl": "https://www.producthunt.com/products/agentgrid-io/launches/agentic-canvas"
  },
  {
    "id": "getmagpie",
    "name": "Magpie",
    "type": "AI apps",
    "category": "Design",
    "roles": [
      "Designers",
      "Creators",
      "Marketers"
    ],
    "hosting": "Visual research library",
    "description": "Collect saved references from social platforms and the web in a searchable visual library. AI tags and visual search help a creative team retrieve an example later.",
    "firstTry": "Save references for a campaign and search for one by mood and color.",
    "checkpoint": "Check that the reference links back to its creator before using it in a production brief.",
    "url": "https://getmagpie.me/",
    "discoveryUrl": "https://www.producthunt.com/products/magpie-14/launches/magpie-14"
  },
  {
    "id": "friday-work",
    "name": "Friday Work",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers",
      "Product managers"
    ],
    "hosting": "Local agent workspace",
    "description": "Coordinate coding assistants on a shared task board. Agents can hand work to one another and check progress across supported tools.",
    "firstTry": "Split a sample feature into a small change and a separate review task.",
    "checkpoint": "Verify that the reviewer receives the correct branch and that incomplete work stays open.",
    "url": "https://www.tryfridaywork.com/",
    "discoveryUrl": "https://www.producthunt.com/products/friday-work/launches/friday-work-2"
  },
  {
    "id": "hookdeck-inspect",
    "name": "Hookdeck Inspect",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers",
      "Entrepreneurs"
    ],
    "hosting": "Hosted webhook tester",
    "description": "Inspect an incoming webhook at a test destination and compare its payload with the event your application expects. Example events help reproduce a workflow during setup.",
    "firstTry": "Send a fictional order event, then send the same event again.",
    "checkpoint": "Check the event ID and fields your downstream workflow would need to avoid duplicating the order.",
    "url": "https://inspect.hookdeck.com/",
    "discoveryUrl": "https://www.producthunt.com/products/hookdeck/launches/hookdeck-inspect"
  },
  {
    "id": "qorqbot",
    "name": "qorqbot",
    "type": "Agents",
    "category": "Automation",
    "roles": [
      "Entrepreneurs",
      "Product managers",
      "Developers"
    ],
    "hosting": "Configurable agent workspace",
    "description": "Give a personal agent a longer-running business task using a supported model connection. It can surface work that needs the owner’s attention as a project progresses.",
    "firstTry": "Provide a sample project brief with one unresolved dependency and ask for a progress update.",
    "checkpoint": "Check that the update distinguishes completed work from the decision still waiting on you.",
    "url": "https://49agents.com/qorqbot/",
    "discoveryUrl": "https://www.producthunt.com/products/qorqbot/launches/qorqbot"
  },
  {
    "id": "perit-marketplace",
    "name": "Perit Marketplace",
    "type": "Workflow tools",
    "category": "Research",
    "roles": [
      "Developers",
      "Product managers"
    ],
    "hosting": "Data and task marketplace",
    "description": "Explore datasets available for licensing and opportunities to contribute training or evaluation tasks. Listings describe the type, scale and availability of material.",
    "firstTry": "Compare two listings against a fictional evaluation brief and record the exact usage rights you need.",
    "checkpoint": "Confirm provenance, permitted uses and availability with the provider before acquiring data.",
    "url": "https://perit.ai/marketplace",
    "discoveryUrl": "https://www.producthunt.com/products/perit-marketplace/launches/perit-marketplace"
  },
  {
    "id": "cardboard-ai",
    "name": "Cardboard AI",
    "type": "AI apps",
    "category": "Video",
    "roles": [
      "Creators",
      "Marketers",
      "Designers"
    ],
    "hosting": "Web and macOS video editor",
    "description": "Describe an edit to a video assistant that can cut, caption and reframe footage. A creator can start from a folder of raw clips and revise a draft sequence.",
    "firstTry": "Cut a 20-second explanation out of a longer recording and request a vertical version.",
    "checkpoint": "Watch both exports with sound off and check the captions, crop and sequence.",
    "url": "https://www.cardboard.ai/",
    "discoveryUrl": "https://www.producthunt.com/products/cardboard-3/launches/cardboard-ai"
  },
  {
    "id": "rainbrand",
    "name": "Rainbrand",
    "type": "Workflow tools",
    "category": "Design",
    "roles": [
      "Designers",
      "Marketers",
      "Creators"
    ],
    "hosting": "Shared brand workspace",
    "description": "Make brand guidance, logos, typography and voice available to AI tools from shared context. Teams can keep assistants working from the same approved reference.",
    "firstTry": "Add a sample logo rule and a voice example, then generate a short campaign brief.",
    "checkpoint": "Check the brief against the approved version and test what happens after one rule changes.",
    "url": "https://www.rainbrand.com/",
    "discoveryUrl": "https://www.producthunt.com/products/rainbrand/launches/rainbrand"
  },
  {
    "id": "paxper",
    "name": "Paxper",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers"
    ],
    "hosting": "Cloud infrastructure workspace",
    "description": "Describe cloud infrastructure visually and inspect proposed changes before applying them to an account. A team can use the diagram to discuss what will be created or changed.",
    "firstTry": "Model a small staging environment and review the proposed change set.",
    "checkpoint": "Compare resources, region and expected ownership with the diagram before approving a deployment.",
    "url": "https://paxper.com/",
    "discoveryUrl": "https://www.producthunt.com/products/paxper/launches/paxper"
  },
  {
    "id": "outages-live",
    "name": "outages.live",
    "type": "Workflow tools",
    "category": "IT operations",
    "roles": [
      "Developers",
      "Entrepreneurs"
    ],
    "hosting": "Web feed and MCP server",
    "description": "Combine official status reports from cloud and AI providers into a feed available to people and agents. It helps teams find a vendor’s incident notice during a disruption.",
    "firstTry": "Choose a provider you depend on and compare a feed item with the original status update.",
    "checkpoint": "Check the affected service, reported time and region before attributing a local failure to the vendor.",
    "url": "https://outages.live/",
    "discoveryUrl": "https://www.producthunt.com/products/polylane/launches/outages-live"
  },
  {
    "id": "neura-hq",
    "name": "Neura HQ",
    "type": "Agents",
    "category": "Sales",
    "roles": [
      "Marketers",
      "Entrepreneurs",
      "Salespeople"
    ],
    "hosting": "Commerce platform",
    "description": "Add a conversational shopping assistant that answers product questions and helps buyers find suitable items. Consumer brands can use their catalog and voice across customer interactions.",
    "firstTry": "Ask for a gift with a strict budget, then ask about an unavailable variant.",
    "checkpoint": "Compare every recommended item, price and availability claim with the storefront.",
    "url": "https://neurahq.ai/",
    "discoveryUrl": "https://www.producthunt.com/products/neura-4/launches/neura-hq"
  },
  {
    "id": "agent-clan",
    "name": "Agent Clan",
    "type": "Workflow tools",
    "category": "Development",
    "roles": [
      "Developers",
      "Designers"
    ],
    "hosting": "Desktop app",
    "description": "Select and direct supported coding assistants with gestures or voice while working in other apps. It provides an alternate way to switch between active tasks.",
    "firstTry": "Create two sample sessions and give each a distinct, reversible instruction.",
    "checkpoint": "Confirm which session received each instruction before relying on the controls during a real change.",
    "url": "https://agentclan.app/",
    "discoveryUrl": "https://www.producthunt.com/products/agent-clan/launches/agent-clan"
  },
  {
    "id": "stitch-ai",
    "name": "Stitch.ai",
    "type": "AI apps",
    "category": "Productivity",
    "roles": [
      "Entrepreneurs",
      "Product managers",
      "Salespeople"
    ],
    "hosting": "Connected work suite",
    "description": "Work across mail, calendar, documents, tasks and notes with a shared assistant. A team can turn information from one workspace item into a draft in another.",
    "firstTry": "Use a fictional email request to prepare a meeting agenda and two follow-up tasks.",
    "checkpoint": "Verify the invitees, owners and dates before anything is shared.",
    "url": "https://stitch.ai/",
    "discoveryUrl": "https://www.producthunt.com/products/stitch-ai/launches/stitch-ai"
  },
  {
    "id": "seedream-5-5",
    "name": "Seedream 5.5",
    "type": "AI apps",
    "category": "Design",
    "roles": [
      "Designers",
      "Creators",
      "Marketers"
    ],
    "hosting": "Image model",
    "description": "ByteDance’s image model supports iterative edits to a visual while retaining surrounding details. Designers can refine a sequence of changes against the same starting asset.",
    "firstTry": "Change one product color and then adjust the background of an original reference image.",
    "checkpoint": "Compare untouched details after each edit, especially lettering, proportions and edges.",
    "url": "https://seed.bytedance.com/en/seedream5_5",
    "discoveryUrl": "https://www.producthunt.com/products/seedream-4-0/launches/seedream-5-5-by-bytedance"
  }
];
const colors = ['sage', 'lavender', 'peach', 'butter'];
export const expandedNovemberPicks = discoveries.map((tool, index) => ({
  ...tool,
  publisher: tool.name,
  level: tool.roles[0] === 'Developers' ? 'Technical setup' : 'Guided setup',
  sourceUrl: tool.url,
  status: 'Documentation reviewed',
  date: '2026-11-17',
  directory_updated_at: '2026-11-17',
  pricing: 'Check provider',
  tested: false,
  tag: 'November Product Hunt discovery',
  mark: tool.name.slice(0, 2),
  color: colors[index % colors.length],
  permissions: 'Use a sample project for your first trial. Review the product’s data and access requirements before connecting a work account.'
}));
