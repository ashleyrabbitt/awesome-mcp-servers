export const rolePaths = [
  {
    "slug": "designers",
    "role": "Designers",
    "name": "The creative superpower",
    "result": "Turn research into a prototype people can respond to.",
    "project": "A clearer onboarding screen",
    "deliverable": "Three evidence-led design directions, one prototype brief and a usability test plan.",
    "color": "peach",
    "tools": [
      [
        "figma",
        "Figma MCP"
      ],
      [
        "claude",
        "Claude"
      ]
    ],
    "input": "Five anonymized research notes, a screenshot of the current screen, your design constraints and the action a visitor needs to take.",
    "steps": [
      [
        "Find the friction",
        "Ask AI to group observations by the moment users get stuck. Keep participant IDs beside each observation. Separate what someone said from your interpretation. One frustrated quote is a clue, not proof that every customer has the same problem."
      ],
      [
        "Explore meaningful alternatives",
        "Request three approaches that solve the same problem differently: fewer fields, progressive disclosure or clearer expectations. Ask for a tradeoff and the evidence behind each. Choose on usefulness and feasibility before polishing colors."
      ],
      [
        "Make one direction tangible",
        "Create a single-screen prototype with realistic content, empty and error states. Give your assistant the existing components and spacing rules. Figma MCP can supply design context; check the current setup and seat requirements in its documentation."
      ],
      [
        "Learn from a task",
        "Write a neutral task such as “Start a trial for your team.” Observe whether a participant understands the next action without coaching. Record completion, hesitation and questions. Use those observations to revise one decision."
      ]
    ],
    "sample": "Research notes: P1 asks whether a credit card is required. P2 stops at the company-size field. P3 cannot find the back button. The trial does not require a card. Company size is optional.",
    "expected": "A useful direction explains the no-card trial, marks company size optional and keeps a visible back action. It does not invent a conversion lift or claim all users dislike the form.",
    "prompt": "Act as a product design partner. Using only these research notes, identify three friction points with participant IDs. Propose three alternative onboarding approaches and a tradeoff for each. Recommend one direction, label assumptions, and draft the screen content, empty/error states and a neutral usability task. Preserve our existing design system. Do not invent research or performance results.",
    "metric": "Record how much time you spend synthesizing, designing and correcting the work. In usability sessions, record whether people can finish the task and where they hesitate.",
    "source": [
      "Figma MCP documentation",
      "https://developers.figma.com/docs/figma-mcp-server/"
    ]
  },
  {
    "slug": "developers",
    "role": "Developers",
    "name": "The builder superpower",
    "result": "Move from a reproducible issue to a reviewable fix.",
    "project": "A small bug fix with evidence",
    "deliverable": "A focused code change, a regression check and a concise explanation for the reviewer.",
    "color": "sage",
    "tools": [
      [
        "github",
        "GitHub MCP"
      ],
      [
        "context7",
        "Context7"
      ]
    ],
    "input": "A reproducible issue, expected and actual behavior, the relevant files, project conventions and the commands used to verify a change.",
    "steps": [
      [
        "Reproduce before editing",
        "Give the agent a concrete input and the incorrect output. Ask it to trace the relevant code and explain the likely cause. If it cannot reproduce the failure, resolve the missing setup before accepting a speculative fix."
      ],
      [
        "Define the smallest change",
        "Agree which behavior must change and which interfaces must stay compatible. Ask the agent to name the files it expects to touch and why. A small patch is easier to inspect, debug and roll back."
      ],
      [
        "Build a useful check",
        "Add a test that fails on the original bug and passes after the fix. Cover an adjacent edge case where the same assumption could fail. Ask for the command and actual output, rather than accepting “tests pass” without evidence."
      ],
      [
        "Review the diff",
        "Read every changed file, including dependency and configuration changes. Check the behavior in the running interface when the task affects users. Keep repository review and deployment practices in place."
      ]
    ],
    "sample": "A list filter treats the string \"0\" as an empty value, hiding a valid zero-price item. Expected: an empty string clears the filter; the string \"0\" searches for zero.",
    "expected": "A regression check covers both inputs separately. The patch fixes the empty-value check without converting every value through a truthiness shortcut.",
    "prompt": "Investigate this reproducible bug in the supplied repository context. First explain the cause and propose a minimal change. Implement it using project conventions. Add a regression check that fails before the fix and covers the adjacent edge case. Report changed files, commands actually run, results and remaining uncertainty. Do not deploy.",
    "metric": "Track time to a reviewed fix, number of review corrections and whether the regression check catches the original failure.",
    "source": [
      "GitHub Copilot best practices",
      "https://docs.github.com/en/copilot/get-started/best-practices"
    ]
  },
  {
    "slug": "product-managers",
    "role": "Product managers",
    "name": "The clarity superpower",
    "result": "Turn scattered feedback into a decision your team can explain.",
    "project": "An evidence-backed opportunity brief",
    "deliverable": "A feedback map, a prioritized hypothesis and a small experiment with a decision rule.",
    "color": "lavender",
    "tools": [
      [
        "notion",
        "Notion MCP"
      ],
      [
        "claude",
        "Claude"
      ]
    ],
    "input": "A small set of permitted customer notes with source IDs, the customer segment, the business goal and known delivery constraints.",
    "steps": [
      [
        "Keep the evidence attached",
        "Label every note with a source ID and date. Ask AI to organize observations into themes without combining distinct customers into invented counts. Keep direct quotes separate from paraphrases."
      ],
      [
        "Look for the underlying job",
        "Translate feature requests into the outcome the customer wants. “Export to a spreadsheet” might mean sharing with a manager or reconciling records. List the questions needed to distinguish those needs."
      ],
      [
        "Choose a hypothesis",
        "Compare a few opportunities using reach evidence, customer impact, confidence and effort. Unknown reach remains unknown. Explain the tradeoff in words; a precise-looking score should not hide missing evidence."
      ],
      [
        "Design a small decision",
        "Specify the audience, change, observed behavior and a go/no-go rule before running the experiment. Identify the owner and review date. Use a prototype or concierge test when it can answer the question before a full build."
      ]
    ],
    "sample": "C1 and C2 want a weekly export for their managers. C3 wants an export to reconcile billing. The current goal is making weekly team reporting easier. Engineering capacity is one week.",
    "expected": "The brief separates reporting from billing reconciliation. It proposes testing a weekly summary with C1 and C2 and labels the tiny sample. It does not describe three customers as one validated segment.",
    "prompt": "Organize these customer notes into opportunities. For each, include source IDs, customer job, evidence, uncertainty and a follow-up question. Recommend one hypothesis for our stated goal and capacity. Draft a small test with an owner, observable behavior, decision rule and review date. Do not invent counts, quotes, market size or validation.",
    "metric": "Measure time to a reviewable brief and how many recommendations can be traced to source evidence. After the test, record the observed behavior and the decision it informed.",
    "source": [
      "Anthropic: workflow and agent patterns",
      "https://www.anthropic.com/research/building-effective-agents"
    ]
  },
  {
    "slug": "marketers",
    "role": "Marketers",
    "name": "The growth superpower",
    "result": "Turn one strong offer into a campaign with a clear next step.",
    "project": "A campaign brief and three coordinated drafts",
    "deliverable": "One offer brief, an email, a social post, a landing-page introduction and a measurement plan.",
    "color": "butter",
    "tools": [
      [
        "chatgpt",
        "ChatGPT"
      ],
      [
        "canva-ai",
        "Canva Magic Design"
      ]
    ],
    "input": "An approved offer, audience research, brand examples, accurate pricing and logistics, and a real destination for the call to action.",
    "steps": [
      [
        "Clarify the buying problem",
        "Write who the offer helps, the costly problem they want solved and what they receive. Ask AI to identify ambiguity before writing persuasive copy. Supply actual proof rather than asking it to manufacture testimonials."
      ],
      [
        "Develop three angles",
        "Explore a problem-led message, an outcome-led message and a process-led message. Explain what each assumes about audience awareness. Choose one main promise so the email, post and page tell a consistent story."
      ],
      [
        "Create a connected set",
        "Draft an email, social post and landing introduction from the same approved facts. Adapt the opening and length to the channel. Keep the offer, price and destination consistent across all three."
      ],
      [
        "Check the whole conversion path",
        "Read every claim against the source brief. Open the CTA, test the form with permitted test data and check the mobile page. Decide which action matters: a qualified inquiry, booking or purchase. Publish only after the actual destination works."
      ]
    ],
    "sample": "Offer: a 60-minute spreadsheet working session for independent consultants. Deliverable: one cleaned monthly reporting template. Price: $150. The booking URL and available dates still need to be supplied.",
    "expected": "The copy can explain the session and template. It must leave dates and booking destination unresolved rather than inventing urgency, earnings or a link.",
    "prompt": "Create a campaign for the approved offer below. First list missing facts that would block publication. Then propose three message angles and recommend one. Draft a 120-word email, a 60-word social post and a landing-page headline plus introduction. Use only supplied claims, preserve price and logistics, and point each draft toward the same confirmed action.",
    "metric": "Track qualified inquiries or bookings by campaign link, alongside the number of visitors reaching the page. Include copy review and revision time when judging AI usefulness.",
    "source": [
      "Anthropic: workflow and agent patterns",
      "https://www.anthropic.com/research/building-effective-agents"
    ]
  },
  {
    "slug": "salespeople",
    "role": "Salespeople",
    "name": "The conversation superpower",
    "result": "Arrive prepared. Listen better. Follow up with purpose.",
    "project": "A call brief and a relevant follow-up",
    "deliverable": "A source-linked account brief, five discovery questions and a follow-up draft grounded in the call.",
    "color": "peach",
    "tools": [
      [
        "perplexity",
        "Perplexity"
      ],
      [
        "claude",
        "Claude"
      ]
    ],
    "input": "The prospect’s public company page, a permitted CRM summary, your approved offer and notes from the actual conversation.",
    "steps": [
      [
        "Prepare around a reason to talk",
        "Ask AI to extract the company’s stated priorities from public sources. Keep source links and dates. Frame a possible fit as a hypothesis, not a fact about the buyer’s budget or intent."
      ],
      [
        "Write questions that reveal fit",
        "Develop open questions about the current process, its consequences, the desired outcome and how a decision will be made. Avoid questions that merely steer the prospect toward your preferred answer."
      ],
      [
        "Capture the commitments",
        "After the call, separate buyer statements, your interpretation and agreed next steps. Record owners and dates only when they were actually discussed. Mark gaps for clarification."
      ],
      [
        "Draft a useful follow-up",
        "Summarize the problem in the buyer’s language. Connect the agreed next action to their goal and include the resource you promised. Review recipient, facts and links before sending. Keep follow-up timing tied to the conversation."
      ]
    ],
    "sample": "Call notes: The team spends Friday compiling reports. Jordan wants to see a sample dashboard. You agreed to send a sample; no budget, implementation date or next meeting was agreed.",
    "expected": "The follow-up thanks Jordan, confirms the reporting problem and shares the sample. It does not claim a budget approval or say “see you Tuesday.”",
    "prompt": "Create a concise follow-up using only these call notes and our approved offer. Include the buyer’s stated problem, commitments with owners, and one useful next action. List missing dates or details separately. Do not invent familiarity, budget, urgency, agreement or results. Produce a draft for my review; do not send it.",
    "metric": "Record preparation and review time, factual corrections, and whether the buyer takes the agreed next step. Separate reply volume from qualified progress.",
    "source": [
      "Anthropic: workflow and agent patterns",
      "https://www.anthropic.com/research/building-effective-agents"
    ]
  },
  {
    "slug": "entrepreneurs",
    "role": "Entrepreneurs",
    "name": "The momentum superpower",
    "result": "Turn a business idea into a useful offer you can put in front of buyers.",
    "project": "A first-offer experiment",
    "deliverable": "A focused buyer problem, a one-page offer, a sample deliverable and a plan for five buyer conversations.",
    "color": "sage",
    "tools": [
      [
        "chatgpt",
        "ChatGPT"
      ],
      [
        "n8n",
        "n8n"
      ]
    ],
    "input": "A buyer group you can reach, notes about a recurring problem, your skills and available time, and examples of how that work is handled today.",
    "steps": [
      [
        "Start with a real recurring job",
        "Choose a task someone already spends time or money completing. Gather concrete examples from public discussions and conversations you are allowed to use. Ask AI to organize the evidence and separate repeated observations from your own assumptions."
      ],
      [
        "Shape a small offer",
        "Define one deliverable, who it serves, the inputs you need and what is outside scope. Keep the first version small enough to deliver personally. AI can help draft the offer; only buyer behavior can establish whether it is wanted."
      ],
      [
        "Build a sample people can judge",
        "Create a useful sample using public or practice material. Show the problem, the output and the next action. Ask a prospective buyer what they would change and how they solve the task now. Do not present a practice sample as a customer result."
      ],
      [
        "Run a bounded selling experiment",
        "Identify five reachable buyers and draft individual invitations to discuss their process. Track conversations, objections, requests and paid commitments separately. Review what you learned before buying more software or automating outreach."
      ]
    ],
    "sample": "Possible buyer: independent consultants who compile monthly client reports. Offer idea: organize their approved spreadsheet into a reporting template. Unknowns: how often they need it, which inputs vary and what they would pay.",
    "expected": "A useful experiment asks consultants to show their current reporting process and react to a sample. It does not turn the idea into an income forecast without buyer evidence.",
    "prompt": "Help me shape a small offer for this buyer and recurring task. Separate evidence from assumptions. Draft the deliverable, scope, required inputs, sample outline and five discovery questions. Suggest one affordable way to test demand with people I can reach. Do not invent demand, testimonials, pricing evidence or revenue forecasts.",
    "metric": "Track conversations that reveal a concrete problem, sample requests, paid pilots and delivery effort. Count revenue only when payment occurs.",
    "source": [
      "Anthropic: workflow and agent patterns",
      "https://www.anthropic.com/research/building-effective-agents"
    ]
  }
];
