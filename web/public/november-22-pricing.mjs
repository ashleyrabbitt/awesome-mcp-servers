export const novemberPricing = {
  "devin-desktop": {
    "pricing_model": "Unknown",
    "pricing": "Cascade has been retired. Devin’s current plans cover its successor and have no applicable Cascade price.",
    "pricing_source": "https://docs.devin.ai/desktop/cascade",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "Devin Desktop routes new conversations to Devin Local. The current app cannot start a Cascade session or reopen a prior one.",
    "ai_access_source": "https://docs.devin.ai/desktop/cascade",
    "availability": "discontinued",
    "availability_checked_at": "2026-11-22",
    "availability_source": "https://docs.devin.ai/desktop/cascade",
    "availability_note": "Cognition retired the Cascade agent in Devin Desktop. Devin Desktop itself remains available and now uses Devin Local.",
    "alternative_url": "https://docs.devin.ai/desktop/devin-local/overview",
    "firstTry": "Read the legacy notice. For a new conversation in Devin Desktop, review Devin Local and check its current plan before starting.",
    "best_for": "Teams identifying the replacement for the retired Cascade agent in Devin Desktop.",
    "limitations": "Existing Cascade conversations cannot be reopened in the current desktop app.",
    "checkpoint": "Confirm whether your workflow requires a legacy Cascade conversation before migrating."
  },
  "copilot-studio": {
    "pricing_model": "Paid",
    "pricing": "Production access depends on the Microsoft license and publishing channel. Standalone Copilot Studio offers prepaid Copilot Credits or pay-as-you-go billing.",
    "pricing_source": "https://www.microsoft.com/en-us/copilot/pricing/copilot-studio",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "The individual trial lets you build an agent and try it in the test chat. Publishing requires the appropriate license.",
    "ai_access_source": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/sign-up-individual",
    "trial_available": true
  },
  "opencode": {
    "pricing_model": "Open source",
    "pricing": "MIT-licensed coding agent. Use the included selection of free models, connect a local model, or connect a provider whose own charges apply.",
    "pricing_source": "https://opencode.ai/product",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "OpenCode offers some models without an account. A provider key or eligible subscription gives access to other models under that provider’s limits.",
    "ai_access_source": "https://opencode.ai/product"
  },
  "airtable": {
    "pricing_model": "Freemium",
    "pricing": "Free and paid workspaces receive monthly AI credits. Included credits expire at month end. Additional credit packs are available.",
    "pricing_source": "https://support.airtable.com/articles/3378106230-airtable-ai-billing",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "Building apps with Omni uses no AI credits. Asking questions about base data and running field agents can consume credits. Workspace AI permissions also apply.",
    "ai_access_source": "https://support.airtable.com/articles/3378106230-airtable-ai-billing"
  },
  "amp": {
    "pricing_model": "Freemium",
    "pricing": "Hobby has no platform subscription fee. Self-hosted runners are free to use with Amp. Amp-hosted orbs are metered, and paid tiers include usage.",
    "pricing_source": "https://ampcode.com/docs/pricing",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "Hobby supports your own model key or linked subscription. Free daily inference grants vary by account. Check your balance before counting on free agent runs.",
    "ai_access_source": "https://ampcode.com/news/amp-free-is-ad-free"
  },
  "notion": {
    "pricing_model": "Freemium",
    "pricing": "Basic Notion MCP search filters are available across workspace plans. Business or Enterprise unlocks advanced search filters and date sorting.",
    "pricing_source": "https://developers.notion.com/guides/mcp/tools-search-reference",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "Connect a compatible AI assistant to your workspace. The assistant has its own access terms. Searching connected apps such as Slack also requires Business or Enterprise with Notion AI and a configured connector.",
    "ai_access_source": "https://www.notion.com/help/notion-mcp"
  },
  "github-copilot": {
    "pricing_model": "Freemium",
    "pricing": "Copilot Free includes up to 2,000 code completions per month and a limited selection of models. Paid individual plans expand completion and model access.",
    "pricing_source": "https://github.com/features/copilot/plans",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "The Free plan includes AI code completions. Pro adds unlimited completions and code review. Agent usage is subject to the plan’s model allowance.",
    "ai_access_source": "https://github.com/features/copilot/plans"
  },
  "gitleaks": {
    "pricing_model": "Open source",
    "pricing": "The local command-line scanner is MIT-licensed. Its separate GitHub Action has additional license-key requirements for organization repositories.",
    "pricing_source": "https://github.com/gitleaks/gitleaks",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "Local secret detection uses built-in rules and regular expressions. It works without an AI model, subscription or inference key.",
    "ai_access_source": "https://github.com/gitleaks/gitleaks"
  },
  "retool-ai": {
    "pricing_model": "Freemium",
    "pricing": "The Free cloud workspace allows up to five users and includes 250 pooled AI credits per month. The balance renews monthly. Paid plans increase the allowance.",
    "pricing_source": "https://retool.com/pricing",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "The free allowance covers app building and AI Actions. Credits are shared across the account, so another builder’s usage draws on the same pool.",
    "ai_access_source": "https://retool.com/pricing",
    "trial_available": true
  },
  "wispr-flow": {
    "pricing_model": "Freemium",
    "pricing": "The Free plan includes speech-to-text on desktop and mobile with a weekly allowance. Pro removes dictation limits. The app shows the allowance for your account.",
    "pricing_source": "https://wisprflow.ai/pricing",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "Free users can dictate in supported apps and use personalized names and vocabulary. Dictation limits vary between platforms.",
    "ai_access_source": "https://docs.wisprflow.ai/articles/9559327591"
  },
  "langgraph": {
    "pricing_model": "Open source",
    "pricing": "The LangGraph orchestration library is MIT-licensed. Run it on your hardware or budget separately for hosting and a model service.",
    "pricing_source": "https://github.com/langchain-ai/langgraph",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "The library supplies the workflow runtime. To reproduce the LLM quickstart, connect a supported model and supply the credentials required by its provider.",
    "ai_access_source": "https://docs.langchain.com/oss/python/langgraph/quickstart"
  },
  "context7": {
    "pricing_model": "Open source",
    "pricing": "The MCP server is MIT-licensed. The hosted documentation service has a Free plan with 1,000 API calls and public repositories. Private repositories and extra capacity are paid.",
    "pricing_source": "https://context7.com/plans",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "Connect an MCP-compatible assistant to retrieve documentation for a library. A free Context7 key raises request limits. Model access for the assistant is separate.",
    "ai_access_source": "https://github.com/upstash/context7"
  },
  "exa-mcp": {
    "pricing_model": "Open source",
    "pricing": "Exa’s MCP server is open source. Its hosted endpoint lets you try search and page fetching without a key at a limited rate.",
    "pricing_source": "https://exa.ai/docs/get-started/exa-mcp",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "A compatible assistant can use hosted search and fetch within the free limit. Exa Agent requires sign-in or an API key. Authenticated usage follows the Exa account’s terms.",
    "ai_access_source": "https://exa.ai/docs/get-started/exa-mcp"
  },
  "grafana-mcp": {
    "pricing_model": "Open source",
    "pricing": "The self-managed Grafana MCP server is Apache-2.0 licensed. Budget separately for your Grafana instance and assistant.",
    "pricing_source": "https://github.com/grafana/mcp-grafana/blob/main/LICENSE",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "The server exposes authorized Grafana data to a compatible AI client. Connect your Grafana instance with a service account token and supply your own assistant.",
    "ai_access_source": "https://github.com/grafana/mcp-grafana/blob/main/docs/sources/_index.md"
  },
  "promptfoo": {
    "pricing_model": "Open source",
    "pricing": "Community includes local or self-hosted LLM evaluations at no software charge. Enterprise pricing is quoted.",
    "pricing_source": "https://www.promptfoo.dev/pricing/",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "Free evaluation software still needs access to the model being evaluated. For example, OpenAI-backed runs use your provider account and can incur token charges.",
    "ai_access_source": "https://www.promptfoo.dev/docs/providers/openai/"
  },
  "fathom": {
    "pricing_model": "Freemium",
    "pricing": "The individual Free plan includes unlimited recordings and instant meeting summaries. Team and Business add paid collaboration and analysis features.",
    "pricing_source": "https://www.fathom.ai/pricing?plan=individuals",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "Free includes AI meeting summaries. Team adds AI-generated action items and team-wide search. Business adds automatic CRM field updates and coaching scorecards.",
    "ai_access_source": "https://www.fathom.ai/pricing?plan=individuals",
    "trial_available": true
  },
  "brave-search-mcp": {
    "pricing_model": "Open source",
    "pricing": "The MCP server is MIT-licensed and requires a Brave Search API key. Brave lists Search at $5 per 1,000 requests with $5 in monthly credits.",
    "pricing_source": "https://api-dashboard.search.brave.com/app/plans?tab=normal",
    "pricing_checked_at": "2026-11-22",
    "ai_access": "The server supplies search tools to your AI client. Use your own client and model. The connected Brave API account determines available search features and charges.",
    "ai_access_source": "https://github.com/brave/brave-search-mcp-server"
  },
  "whimsical-ai": {
    "pricing_model": "Freemium",
    "pricing": "Free workspaces include 10 AI credits to try the feature, alongside limits on board objects and document blocks. Paid editor plans add capacity.",
    "pricing_source": "https://whimsical.com/learn/billing/pricing",
    "ai_access": "The 10 credits can be used for Whimsical AI. The publisher describes them as a starter allowance and does not promise a monthly refill.",
    "ai_access_source": "https://whimsical.com/learn/billing/pricing",
    "pricing_checked_at": "2026-11-22"
  },
  "figma": {
    "pricing_model": "Freemium",
    "pricing": "Figma lists up to 20 rate-limited MCP calls per month for Starter users. Full and Dev seats on paid plans receive higher limits.",
    "pricing_source": "https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/",
    "ai_access": "Starter can supply design context to a compatible AI client. The client has its own usage terms. Actions that spend Figma AI credits use a separate allowance.",
    "ai_access_source": "https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/",
    "pricing_checked_at": "2026-11-22"
  },
  "notion-clipper": {
    "pricing_model": "Free",
    "pricing": "Install the browser extension and save pages to a Notion workspace, including a free workspace. No separate Clipper subscription is listed.",
    "pricing_source": "https://www.notion.com/web-clipper",
    "ai_access": "Clipping saves the source page. To summarize it with Notion AI, Free and Plus have trial usage. Continuing after that allowance requires Business or Enterprise.",
    "ai_access_source": "https://www.notion.com/help/complimentary-ai-responses",
    "pricing_checked_at": "2026-11-22"
  },
  "stagehand": {
    "pricing_model": "Open source",
    "pricing": "The Stagehand SDK is MIT-licensed. Browserbase hosting and hosted model calls have separate usage costs.",
    "pricing_source": "https://github.com/browserbase/stagehand",
    "ai_access": "AI actions need a model. Supply a compatible provider key or use the Browserbase Model Gateway and its billing. Installing the SDK alone provides no hosted model credits.",
    "ai_access_source": "https://github.com/browserbase/stagehand/blob/main/packages/docs/v4/configuration/models.mdx",
    "pricing_checked_at": "2026-11-22"
  },
  "chatgpt-work": {
    "pricing_model": "Paid",
    "pricing": "Work on web and mobile requires an eligible paid ChatGPT plan. Work and Codex share plan usage. Workspace settings and rollout affect availability.",
    "pricing_source": "https://learn.chatgpt.com/docs/pricing",
    "ai_access": "A free ChatGPT account alone does not establish access to Work on web or mobile. On desktop, verify that Work is included for your plan and workspace.",
    "ai_access_source": "https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex",
    "pricing_checked_at": "2026-11-22"
  },
  "bolt": {
    "pricing_model": "Freemium",
    "pricing": "The free plan includes up to 300,000 tokens per day and one million per month. Paid plans add tokens and custom domains.",
    "pricing_source": "https://bolt.new/pricing",
    "ai_access": "You can prompt Bolt to build and edit an app with the free token allowance. Bolt’s starter walkthrough uses close to a full daily allotment.",
    "ai_access_source": "https://support.bolt.new/building/quickstart",
    "pricing_checked_at": "2026-11-22"
  },
  "krea": {
    "pricing_model": "Freemium",
    "pricing": "The free plan lists 100 compute units per day. Paid plans increase capacity and expand access to tools and models.",
    "pricing_source": "https://www.krea.ai/pricing",
    "ai_access": "Free users can generate and edit images with Krea’s own model. Output volume varies with the model and operation, so 100 units does not mean 100 images.",
    "ai_access_source": "https://www.krea.ai/pricing",
    "pricing_checked_at": "2026-11-22"
  },
  "canva-ai": {
    "pricing_model": "Freemium",
    "pricing": "Canva Free includes limited Magic Design uses. Pro adds greater AI capacity and offers a trial.",
    "pricing_source": "https://www.canva.com/pricing/?countryCode=us&currency=USD",
    "ai_access": "Free accounts can try Magic Design for presentations and video. A generated design that uses Pro assets can still require a separate asset purchase or subscription.",
    "ai_access_source": "https://www.canva.com/magic-design/",
    "trial_available": true,
    "pricing_checked_at": "2026-11-22"
  },
  "docker-mcp-toolkit": {
    "pricing_model": "Freemium",
    "pricing": "The toolkit is included in Docker Desktop. Personal use and eligible small businesses can use Desktop free. Larger commercial organizations and government users need a paid subscription.",
    "pricing_source": "https://docs.docker.com/subscription-billing/desktop-license/",
    "ai_access": "The toolkit connects an AI client to MCP servers. Model access comes from the client or provider you choose. Some connected servers also require their own account or API key.",
    "ai_access_source": "https://docs.docker.com/ai/mcp-catalog-and-toolkit/",
    "pricing_checked_at": "2026-11-22"
  },
  "framer-ai": {
    "pricing_model": "Freemium",
    "pricing": "Framer has a free site plan. Workspaces with no active subscriptions receive 500 credits to try Agents. Connecting a custom domain requires a paid plan.",
    "pricing_source": "https://www.framer.com/pricing",
    "ai_access": "The free workspace allowance can power AI design work in Framer. Check the workspace balance before running another iteration.",
    "ai_access_source": "https://www.framer.com/pricing",
    "pricing_checked_at": "2026-11-22"
  },
  "lindy": {
    "pricing_model": "Paid",
    "pricing": "Lindy offers $50 in introductory credits that expire after seven days. The Team subscription starts at $29.99 per month for 3,000 monthly credits.",
    "pricing_source": "https://www.lindy.ai/pricing",
    "ai_access": "The starter credits can run real assistant work without a payment card. Ongoing use requires paid credits after the seven-day window.",
    "ai_access_source": "https://www.lindy.ai/pricing",
    "trial_available": true,
    "pricing_checked_at": "2026-11-22"
  },
  "scribe": {
    "pricing_model": "Freemium",
    "pricing": "Basic captures web workflows and shares guides by link or embed. Pro adds capture outside the browser, screenshot editing and additional export formats.",
    "pricing_source": "https://scribe.com/pricing",
    "ai_access": "The free browser extension can generate step-by-step text, titles and screenshots from a recorded web workflow. Desktop capture needs Pro.",
    "ai_access_source": "https://scribe.com/tools/screen-recorder-tool",
    "pricing_checked_at": "2026-11-22"
  },
  "power-automate": {
    "pricing_model": "Freemium",
    "pricing": "Eligible work or school accounts get a free license for standard connectors, personal cloud flows and locally attended desktop flows. Microsoft also offers a 30-day trial and paid Premium plans.",
    "pricing_source": "https://learn.microsoft.com/en-us/power-platform/admin/power-automate-licensing/types",
    "ai_access": "AI Builder processing needs available capacity in the environment. It uses eligible existing AI Builder credits first, then Copilot Credits. Standard free flow access does not supply this capacity.",
    "ai_access_source": "https://learn.microsoft.com/en-us/ai-builder/endofaibcredits",
    "trial_available": true,
    "pricing_checked_at": "2026-11-22"
  },
  "browser-use": {
    "pricing_model": "Open source",
    "pricing": "The Python agent library is MIT-licensed and can run locally. Browser Use Cloud charges separately for hosted browsers, traffic and agent model usage.",
    "pricing_source": "https://github.com/browser-use/browser-use",
    "ai_access": "Local runs require a model you provide. Cloud agent runs charge for model tokens, a 20% service fee, browser time and network traffic.",
    "ai_access_source": "https://browser-use.com/pricing",
    "pricing_checked_at": "2026-11-22"
  },
  "browse-ai": {
    "pricing_model": "Freemium",
    "pricing": "The free plan includes 50 credits per month. Paid plans increase capacity. A run’s credit cost depends on pages, rows and site requirements.",
    "pricing_source": "https://www.browse.ai/pricing",
    "ai_access": "Free users can build robots and run data extraction against the free credits. Check the estimate in the dashboard before a large run.",
    "ai_access_source": "https://help.browse.ai/en/articles/11429429-how-do-plans-and-pricing-work",
    "pricing_checked_at": "2026-11-22"
  },
  "llamaparse": {
    "pricing_model": "Freemium",
    "pricing": "The pay-as-you-go plan includes 10,000 monthly credits without a subscription. Additional credit purchases and paid plans extend capacity.",
    "pricing_source": "https://developers.llamaindex.ai/llamaparse/general/billing/",
    "ai_access": "Free credits can cover AI parsing. Agentic parsing costs more credits per page than the Fast tier, and selected features can add to the cost.",
    "ai_access_source": "https://developers.llamaindex.ai/llamaparse/general/pricing/",
    "pricing_checked_at": "2026-11-22"
  },
  "lovable": {
    "pricing_model": "Freemium",
    "pricing": "Free workspaces receive five daily build credits up to 30 used per calendar month. Paid plans add capacity. Unused daily build credits expire that day.",
    "pricing_source": "https://docs.lovable.dev/introduction/credits-and-usage",
    "ai_access": "The free credits can build and revise an app from prompts. The cost of one request depends on the work it asks Lovable to do.",
    "ai_access_source": "https://docs.lovable.dev/introduction/credits-and-usage",
    "pricing_checked_at": "2026-11-22"
  },
  "activepieces": {
    "pricing_model": "Open source",
    "pricing": "Activepieces licenses the self-hosted Community Edition under MIT and sells enterprise features. Hosting your own instance uses your infrastructure.",
    "pricing_source": "https://github.com/activepieces/activepieces",
    "ai_access": "The hosted Free plan includes agents and AI steps with 1,000 credits per month. Model choice affects the credit cost. The hosted option to use your own provider key starts on Plus.",
    "ai_access_source": "https://www.activepieces.com/pricing",
    "pricing_checked_at": "2026-11-22"
  },
  "pydantic-ai": {
    "pricing_model": "Open source",
    "pricing": "The Pydantic AI Python framework uses the MIT license. You can install it locally without buying a framework subscription.",
    "pricing_source": "https://github.com/pydantic/pydantic-ai",
    "ai_access": "Run an agent with a local model through Ollama on your hardware, or connect a hosted provider. Hosted inference uses that provider’s credentials and pricing.",
    "ai_access_source": "https://pydantic.dev/docs/ai/models/overview/",
    "pricing_checked_at": "2026-11-22"
  },
  "cloudflare-mcp": {
    "pricing_model": "Open source",
    "pricing": "Cloudflare publishes its product-specific MCP server code under Apache 2.0. The Cloudflare services accessed through a server have their own plans and limits.",
    "pricing_source": "https://github.com/cloudflare/mcp-server-cloudflare",
    "ai_access": "Use a compatible AI client. Account-specific operations require authorization for the relevant Cloudflare service. Check the service quota and the client’s model charges for your task.",
    "ai_access_source": "https://github.com/cloudflare/mcp-server-cloudflare",
    "pricing_checked_at": "2026-11-22"
  },
  "sider": {
    "pricing_model": "Freemium",
    "pricing": "Sider offers free usage credits and paid subscriptions with larger allowances. The publisher meters features individually.",
    "pricing_source": "https://sider.ai/pricing",
    "ai_access": "The free account includes limited AI requests. Sider’s help center lists separate allowances for basic requests, summaries, image creation and document chat. Check your balance before running a batch.",
    "ai_access_source": "https://sider.ai/help-center/faqs/sider-credit-issue",
    "pricing_checked_at": "2026-11-22"
  },
  "playwright": {
    "pricing_model": "Open source",
    "pricing": "Microsoft publishes Playwright MCP under Apache 2.0. Running the server locally uses your own machine.",
    "pricing_source": "https://github.com/microsoft/playwright-mcp",
    "ai_access": "The server supplies browser actions to a compatible MCP client. Bring the assistant that decides which action to take. Its subscription or model usage is separate.",
    "ai_access_source": "https://github.com/microsoft/playwright-mcp",
    "pricing_checked_at": "2026-11-22"
  },
  "n8n": {
    "pricing_model": "Freemium",
    "pricing": "The self-hosted Community Edition is available at no subscription cost under n8n’s usage terms. n8n Cloud has paid plans and a free trial.",
    "pricing_source": "https://n8n.io/pricing/",
    "ai_access": "You can run an AI workflow locally with the n8n, Ollama and database starter kit. Budget for the machine. If you switch to a hosted model, its charges depend on your provider.",
    "ai_access_source": "https://github.com/n8n-io/self-hosted-ai-starter-kit",
    "trial_available": true,
    "pricing_checked_at": "2026-11-22"
  },
  "agno": {
    "pricing_model": "Open source",
    "pricing": "The Agno framework is available under Apache 2.0. Running it yourself involves your own infrastructure costs.",
    "pricing_source": "https://github.com/agno-agi/agno",
    "ai_access": "Agno supports local Ollama inference on your hardware. The direct Ollama Cloud option requires an API key. A hosted model’s plan governs its usage.",
    "ai_access_source": "https://docs.agno.com/models/providers/local/ollama/overview",
    "pricing_checked_at": "2026-11-22"
  },
  "composio": {
    "pricing_model": "Freemium",
    "pricing": "The developer platform’s free Hobby plan includes 100,000 tool calls per month. Up to 20,000 of those calls can use Composio-managed apps. Hitting a free cap pauses usage.",
    "pricing_source": "https://composio.dev/pricing/platform",
    "ai_access": "Free usage covers tool execution for an agent. Connect the required app accounts and your agent’s model provider. The tool-call allowance measures Composio usage, and the model provider sets its own charges.",
    "ai_access_source": "https://github.com/ComposioHQ/composio",
    "pricing_checked_at": "2026-11-22"
  },
  "markitdown": {
    "pricing_model": "Open source",
    "pricing": "Microsoft releases MarkItDown under MIT. Standard document conversion can run on your machine.",
    "pricing_source": "https://github.com/microsoft/markitdown",
    "ai_access": "For optional AI image descriptions, supply an LLM client and model. Those calls use your model service or local resources. Ordinary conversion can run without those credentials.",
    "ai_access_source": "https://github.com/microsoft/markitdown",
    "pricing_checked_at": "2026-11-22"
  },
  "github": {
    "pricing_model": "Open source",
    "pricing": "The GitHub MCP server code uses the MIT license. GitHub also makes MCP access available across its account plans.",
    "pricing_source": "https://github.com/github/github-mcp-server/blob/main/LICENSE",
    "ai_access": "Free GitHub accounts can use tools for features they already have permission to use. Tools for paid features such as Copilot cloud agent require the corresponding license. AI client usage is separate.",
    "ai_access_source": "https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/copilot-for-common-tasks/use-the-github-mcp-server",
    "pricing_checked_at": "2026-11-22"
  },
  "dify": {
    "pricing_model": "Freemium",
    "pricing": "The hosted Sandbox is free and paid plans offer larger allowances. The self-hosted edition has a Dify-specific license, including restrictions on operating a multi-tenant service.",
    "pricing_source": "https://github.com/langgenius/dify/blob/main/LICENSE",
    "ai_access": "The free cloud Sandbox includes 200 credits to try supported models. Dify lists these as a credit allotment. It allows your own provider key after the credits are spent, subject to provider billing.",
    "ai_access_source": "https://dify.ai/pricing",
    "pricing_checked_at": "2026-11-22"
  },
  "supabase-mcp": {
    "pricing_model": "Open source",
    "pricing": "Supabase publishes its MCP implementation under Apache 2.0. The local development stack includes an MCP endpoint. Hosted database and infrastructure usage follow the project plan.",
    "pricing_source": "https://github.com/supabase/mcp",
    "ai_access": "Connect an MCP-compatible assistant to a local development stack or authorize access to a hosted project. The connector provides project tools. Your AI client supplies the model and its usage allowance.",
    "ai_access_source": "https://supabase.com/docs/guides/ai-tools/mcp",
    "pricing_checked_at": "2026-11-22"
  },
  "mastra": {
    "pricing_model": "Open source",
    "pricing": "Mastra’s core TypeScript framework uses Apache 2.0. Its separately licensed enterprise modules require an enterprise license for production.",
    "pricing_source": "https://github.com/mastra-ai/mastra",
    "ai_access": "Building an agent in the core framework is available without a Mastra subscription. The quickstart connects your chosen model using provider credentials. Check inference and hosting costs separately.",
    "ai_access_source": "https://mastra.ai/docs",
    "pricing_checked_at": "2026-11-22"
  },
  "zapier": {
    "pricing_model": "Freemium",
    "pricing": "Zapier MCP is included in every Zapier plan. Each MCP tool call uses two tasks from the same quota as your Zaps. The platform’s free plan has a monthly task limit.",
    "pricing_source": "https://zapier.com/mcp",
    "ai_access": "Free accounts can connect a compatible AI client and call supported actions within their task allowance. Your AI client and any paid features of the connected apps have separate terms.",
    "ai_access_source": "https://zapier.com/mcp",
    "pricing_checked_at": "2026-11-22"
  },
  "atlassian-mcp": {
    "pricing_model": "Freemium",
    "pricing": "Atlassian offers a free starting point for the MCP connection. Access depends on your Atlassian Cloud apps, permissions and the tools invoked.",
    "pricing_source": "https://www.atlassian.com/platform/mcp",
    "ai_access": "A compatible AI client connects to authorized Atlassian data. Some operations, including enriched search, consume Rovo credits. Check your workspace’s credit allowance and client charges before repeated calls.",
    "ai_access_source": "https://developer.atlassian.com/cloud/rovo-mcp/",
    "pricing_checked_at": "2026-11-22"
  },
  "claude-cowork": {
    "pricing_model": "Paid",
    "pricing": "Claude Cowork requires a paid Claude plan. Individual and organization plans have different usage allowances.",
    "pricing_source": "https://claude.com/pricing",
    "ai_access": "The free Claude chat tier does not include Cowork. Anthropic lists Cowork for paid individual plans, Team and Enterprise. Platform availability and organization settings can affect access.",
    "ai_access_source": "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork",
    "pricing_checked_at": "2026-11-22"
  }
};
