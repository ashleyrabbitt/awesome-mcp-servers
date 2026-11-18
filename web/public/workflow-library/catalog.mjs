// Reader-facing resources. Each first run includes a concrete check.
export default {
  "site": "asp",
  "title": "Find the right MCP or agent skill",
  "category": "MCP & skill library",
  "intro": "Choose a connection by the job it can do. Try it on one real task, check the result and keep the instructions for next time.",
  "quickTitle": "Compare two tools on one task",
  "quickSteps": [
    "Find candidates with Product Hunt.",
    "Check a feature against its original source.",
    "Use the comparison skill to record your decision."
  ],
  "starter": "product-hunt",
  "placeholder": "Try compare, research or design",
  "related": [
    [
      "AI tools directory",
      "/directory"
    ],
    [
      "Agent guides",
      "/agents"
    ],
    [
      "Workflow demos",
      "/workflow-demos"
    ]
  ],
  "primerTitle": "How do MCP servers and skills work?",
  "primer": [
    [
      "Connect an MCP server",
      "Model Context Protocol (MCP) lets an assistant call tools in another service. The listings here were chosen for publisher documentation and a first task with a checkable result. Open the publisher guide, connect in a compatible assistant, and try the request with your own account."
    ],
    [
      "Use a skill",
      "Download its ZIP. In a client that accepts skill ZIPs, import it using the client’s skills settings. For a folder-based client, extract the named folder into its documented skills directory. In an ordinary chat, paste the instructions from SKILL.md, then the sample request."
    ]
  ],
  "resources": [
    {
      "id": "product-hunt",
      "name": "Product Hunt MCP",
      "kind": "MCP server",
      "goal": "Compare new tools",
      "benefit": "Build a shortlist from recent launches and the questions people ask about them.",
      "inputs": "Product Hunt account and a client that supports remote MCP with OAuth.",
      "steps": [
        "Add the server in your assistant’s MCP settings. Choose OAuth and approve access on Product Hunt.",
        "Start a new conversation with the connection enabled. Run the first request below."
      ],
      "endpoint": "https://mcp.producthunt.com/mcp",
      "source": "https://www.producthunt.com/mcp/install",
      "sourceLabel": "Publisher setup guide",
      "prompt": "Find three recently launched meeting-note tools. Return the launch date, Product Hunt link and one question from the discussion if available.",
      "example": "A dated shortlist with a launch link per product and a separate column for unanswered questions.",
      "check": "Open the launch links. Keep a maker’s claim separate from a user’s reported experience."
    },
    {
      "id": "exa",
      "name": "Exa MCP",
      "kind": "MCP server",
      "goal": "Research a claim",
      "benefit": "Find the original announcement behind a tool feature before putting it in a comparison.",
      "inputs": "A remote MCP client. Exa offers a free starting tier with usage limits.",
      "steps": [
        "Add the HTTPS server to your client and confirm that web search is available. Start with a single, narrow query.",
        "Start a new conversation with the connection enabled. Run the first request below."
      ],
      "endpoint": "https://mcp.exa.ai/mcp",
      "source": "https://exa.ai/mcp",
      "sourceLabel": "Publisher setup guide",
      "prompt": "Find the publisher’s instructions for exporting notes from two meeting assistants. Return a source link, supported format and any stated plan limit for each.",
      "example": "Two source-backed rows you can use in a buyer’s guide.",
      "check": "Open both sources. Record “unspecified” if a plan limit is absent."
    },
    {
      "id": "notion",
      "name": "Notion MCP",
      "kind": "MCP server",
      "goal": "Find team knowledge",
      "benefit": "Turn scattered evaluation notes into a comparison with links back to the original tests.",
      "inputs": "A Notion account with access to the pages you want to find.",
      "steps": [
        "Choose Notion in your assistant’s connectors or add its remote server using Streamable HTTP. Sign in and select the intended workspace.",
        "Start a new conversation with the connection enabled. Run the first request below."
      ],
      "endpoint": "https://mcp.notion.com/mcp",
      "source": "https://developers.notion.com/guides/mcp/get-started-with-mcp",
      "sourceLabel": "Publisher setup guide",
      "prompt": "Find the last three tool trials in my Notion workspace. Show tool, task, observed result and source page. Flag any missing result.",
      "example": "A trial log where each finding links back to a team note.",
      "check": "Spot-check one cited finding against its original page."
    },
    {
      "id": "canva",
      "name": "Canva MCP",
      "kind": "MCP server",
      "goal": "Create a visual",
      "benefit": "Give reviewers a draft layout they can open and edit after choosing a tool.",
      "inputs": "A Canva account and a supported assistant. Core design tools are available on all plans. Brand kits and resizing require Pro or above.",
      "steps": [
        "Choose the official Canva connection in your assistant and sign in to the Canva account that owns your design assets.",
        "Start a new conversation with the connection enabled. Run the first request below."
      ],
      "endpoint": "",
      "source": "https://www.canva.com/help/mcp-agent-setup/",
      "sourceLabel": "Publisher setup guide",
      "prompt": "Create a one-page comparison graphic with three columns labeled cost, setup and output quality. Leave all scores blank for my team to fill in.",
      "example": "An editable design with clear fields for three comparison criteria.",
      "check": "Open the design and confirm that the headings are editable and the empty scores are visible."
    },
    {
      "id": "github",
      "name": "GitHub MCP",
      "kind": "MCP server",
      "goal": "Triage work",
      "benefit": "Group actual repository issues into a review queue with a link for every item.",
      "inputs": "A supported MCP client and GitHub access to the repository. Organization approval may apply.",
      "steps": [
        "Add the remote server following GitHub’s guide and sign in. For this trial, configure the X-MCP-Readonly header as true in a client that supports custom headers.",
        "Start a new conversation with the connection enabled. Run the first request below."
      ],
      "endpoint": "https://api.githubcopilot.com/mcp/",
      "source": "https://github.com/github/github-mcp-server/blob/main/docs/remote-server.md",
      "sourceLabel": "Publisher setup guide",
      "prompt": "Read up to ten open issues in my selected repository. Group by user task and return issue links plus the owner if assigned. Make no changes.",
      "example": "An issue shortlist that a maintainer can check in the repository.",
      "check": "Open one issue and check its state and assignee. Leave impact unknown when the report omits it."
    },
    {
      "id": "tool-comparison",
      "name": "Compare AI tools on one real task",
      "goal": "Compare tools",
      "benefit": "Compare tools on the same input and make missing evidence visible before committing to one.",
      "inputs": "Two or three tools, one representative input, official feature and pricing links, must-have constraints, original outputs and your scoring rubric.",
      "steps": [
        "Write one representative task, one common input and the exact result needed. Set required capabilities and a small scoring rubric before reading vendor claims.",
        "Record what each publisher documents, including plan restrictions and the date checked. Label missing details unknown.",
        "Run the same input when access is available. Keep the prompt, raw output and observed errors. Mark unavailable trials untested and keep vendor claims separate from observations.",
        "Score each observed output against the rubric. Cite one specific example supporting each score and recommend a next action conditional on unresolved requirements."
      ],
      "prompt": "Compare fictional tools A and B for extracting action items. Three checks: action, owner and deadline. Input: 'Maya will send the brief Friday.' A returned 'send brief / Maya / Friday'; B returned 'send brief / team / Friday'. Both plans and pricing are unknown.",
      "example": "A passed 3/3 checks on the example. B passed 2/3 and replaced Maya with 'team.' Trial A on five more notes, including one without a due date. Pricing and plan requirements still need a publisher check.",
      "check": "Scores refer to identical test inputs, the recommendation cites at least one observable result and any untested feature or price is labeled.",
      "kind": "Skill",
      "file": "tool-comparison.zip",
      "downloadLabel": "Download skill (.zip)"
    },
    {
      "id": "connector-trial",
      "name": "Run a first MCP connector trial",
      "goal": "Test a connection",
      "benefit": "Establish what works in your own account before depending on a connector for a recurring task.",
      "inputs": "Publisher's setup guide, supported client, intended account or workspace, one known non-sensitive test record and the value you expect to retrieve.",
      "steps": [
        "Use the publisher's current connection method and sign in through its authorization flow. Record the client and account label, available permissions and the time of the trial. Keep credentials out of the report.",
        "Choose one known record with a distinctive title and a reference value. Ask for a read-only lookup that returns the title, value and source link or identifier.",
        "Compare the result with the record in the source application. If the lookup fails, check the selected account, resource permissions and client connection before changing the prompt.",
        "Classify the result as passed, partial or failed. State exactly what was demonstrated, the mismatch if any, and the next smallest check."
      ],
      "prompt": "Test a Notion connector on my sample page 'Connector Trial 42'. I entered the line 'Owner: Sam'. Retrieve that page, report the owner and link to it. Leave the source page unchanged. If you lack access, say which step failed.",
      "example": "Passed if the returned page link opens the expected record and the owner matches Sam. If the title is found but the owner cannot be read, record partial and verify page access in the connected account.",
      "check": "A pass requires both the expected value and a verifiable source identifier. No account password, token or content from unrelated records appears in the report.",
      "kind": "Skill",
      "file": "connector-trial.zip",
      "downloadLabel": "Download skill (.zip)"
    },
    {
      "id": "workflow-handoff",
      "name": "Package a repeatable AI workflow",
      "goal": "Hand off a workflow",
      "benefit": "Capture the inputs, tools, review point and recovery steps that a prompt alone would leave out.",
      "inputs": "Workflow objective, trigger, owner, tools and permissions, example input and output, acceptance criteria, review point and known failure modes.",
      "steps": [
        "Specify the trigger, owner, required inputs and intended destination. Include a fabricated test input when real records contain private details.",
        "Write numbered actions with the expected intermediate output. Identify the step that requires human review before sending, publishing or updating a shared record.",
        "Describe what to do with missing fields, duplicate inputs, unavailable tools and partial completion. Keep a completion record so a retry cannot duplicate an external action.",
        "Write a dry-run acceptance test with expected output. Ask a teammate to run it using only the handoff, and record the first point where they needed extra context."
      ],
      "prompt": "Create a handoff for turning an approved webinar transcript into an email draft. Trigger: transcript marked final. Required: title and registration URL for the next session. Editor reviews the draft. Example has title 'AI for Local Shops' but no URL. Sending is outside this workflow.",
      "example": "Create one draft keyed to the transcript ID. With the next-session URL missing, mark it 'needs URL' and assign it to the editor. A retry updates the existing draft. Acceptance: the transcript supports every claim and the editor can see the unresolved link.",
      "check": "A second person can complete the dry run, locate the review point and recover from a missing input or repeat run without creating a duplicate.",
      "kind": "Skill",
      "file": "workflow-handoff.zip",
      "downloadLabel": "Download skill (.zip)"
    }
  ]
};
