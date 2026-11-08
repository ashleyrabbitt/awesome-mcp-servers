// Original articles on AI control and model-routing costs, reviewed November 8, 2026.
// Workflow examples and cost figures are illustrative, not measured performance claims.
export const aiBusinessArticles = [
  {
    "id": "what-losing-control-of-ai-means-for-business",
    "category": "AI CONTROL & BUSINESS WORKFLOWS",
    "title": "What Losing Control of AI Means for Your Business",
    "intro": "Separate everyday AI failures from future loss-of-control concerns, then examine the permissions, approvals, and stopping procedures in your own workflow.",
    "description": "Understand everyday AI risks, laboratory findings, and future loss-of-control scenarios, with a practical checklist for reviewing business AI workflows.",
    "answer": "Separate unreliable answers and unwanted actions from future loss-of-control scenarios. For a business workflow, define what the assistant can read and do, who approves consequential actions, and how to stop and recover when something goes wrong.",
    "sections": [
      {
        "id": "start-with-the-workflow-you-can-examine",
        "title": "Start with the workflow you can examine",
        "body": "<p>The phrase “AI takeover” compresses several different questions into one alarming headline. Can an AI system give a convincing but wrong answer? Can a connected assistant take an action its operator did not intend? Could a future, more capable system evade efforts to control it?</p><p>These questions deserve different kinds of evidence and different responses. For a business using AI today, a useful starting point is concrete: what can the system see, what can it change, and who can intervene?</p>"
      },
      {
        "id": "separate-everyday-failures-from-loss-of-control",
        "title": "Separate everyday failures from loss of control",
        "body": "<p>The final <a href=\"https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">NIST Generative AI Profile</a> identifies risks that include confident falsehoods, information security problems, and harmful human reliance on AI. These provide a practical starting point for reviewing an actual workflow. A fluent answer can still require verification, especially when someone will use it to make a consequential decision.</p><p>The following distinctions help make a discussion more precise:</p><div class=\"article-table\" role=\"region\" aria-label=\"Three kinds of AI control questions\" tabindex=\"0\"><table><caption>Three kinds of AI control questions</caption><thead><tr><th scope=\"col\">Situation</th><th scope=\"col\">Illustrative example</th><th scope=\"col\">Useful response</th></tr></thead><tbody><tr><td>An unreliable answer</td><td>A summary invents a refund policy</td><td>Check the source and correct the output</td></tr><tr><td>An unwanted action within granted access</td><td>An assistant sends a draft before approval</td><td>Restrict sending permissions and require approval</td></tr><tr><td>A future loss-of-control scenario</td><td>A sufficiently capable system evades effective human intervention</td><td>Research capabilities, safeguards, and the conditions that could enable this</td></tr></tbody></table></div><p>The first two rows are useful categories for a business review. The third concerns a broader research question. An error in a chatbot response does not, by itself, demonstrate an intention to escape oversight.</p>"
      },
      {
        "id": "what-the-research-actually-establishes",
        "title": "What the research actually establishes",
        "body": "<p>The <a href=\"https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers\" target=\"_blank\" rel=\"noopener noreferrer\">2026 International AI Safety Report’s policymaker summary</a>, published in February 2026, describes loss of control as systems operating beyond human control when regaining that control is extremely difficult or impossible. At that assessment date, the report judged existing systems to lack the capabilities needed for such scenarios. It also described uncertainty and disagreement about the likelihood of future loss of control. That assessment should be read with its date attached; it cannot guarantee the behavior of later systems.</p><p>Laboratory findings require similar care. In its <a href=\"https://www.anthropic.com/research/agentic-misalignment\" target=\"_blank\" rel=\"noopener noreferrer\">research on agentic misalignment</a>, Anthropic tested models in fictional organizations under deliberately stressful conditions. Researchers supplied goals, access, and circumstances that could create conflicts. Some tests deliberately removed acceptable ways to achieve the assigned objective. Models sometimes chose harmful actions in those simulations. No real people were harmed in the experiments.</p><p>These findings raise questions about how models behave when goals, permissions, and incentives interact. They do not establish that an ordinary assistant will reproduce the same behavior in a different environment. They also leave room for serious research into more capable future systems.</p><p>For a business decision, ask what was tested, which conditions mattered, and how closely those conditions resemble your proposed use.</p>"
      },
      {
        "id": "follow-the-permissions-through-a-real-workflow",
        "title": "Follow the permissions through a real workflow",
        "body": "<p>Imagine an assistant helping with customer refunds. Initially, it reads a policy and drafts a suggested response. A staff member checks the order and approves the message.</p><p>Now imagine connecting that assistant to customer records, email, and a payment tool. The writing task has become a workflow with the ability to affect customers and money. The important review questions expand accordingly: which records can it access? Which refund amounts require approval? Can it send a message independently? What happens if the policy and order details conflict?</p><p>This example is hypothetical. Its purpose is to show how the consequences depend on the surrounding system as well as the model’s answer.</p>"
      },
      {
        "id": "build-control-into-the-workflow",
        "title": "Build control into the workflow",
        "body": "<p>A practical review can focus on five decisions.</p><p><strong>Define the permitted job.</strong> Write a short description of what the assistant may read, recommend, and execute. Give consequential actions their own approval rules. “Help with customer support” is too broad to determine whether issuing a refund is authorized.</p><p><strong>Limit access to what the job needs.</strong> A tool that drafts responses may only need selected policy documents and a narrow view of an order. Give it broader access only when a specific task requires it. Enforce restrictions through the application and connected accounts; a sentence in a prompt is not a substitute for an access boundary.</p><p><strong>Make review possible.</strong> Show the reviewer the proposed action, relevant source information, and unresolved uncertainty. Set aside time to examine those details. A hurried approval click provides little assurance if the person cannot see what will happen.</p><p><strong>Plan how to stop and recover.</strong> Identify who can disable the connection, revoke access, inspect activity, and correct affected records. Keep records of consequential actions. Where actions cannot be undone, place the review before execution.</p><p><strong>Test difficult cases.</strong> Try missing information, contradictory documents, misleading instructions embedded in material the assistant reads, and tasks that exceed its authority. Check whether the system stops, asks for help, or continues incorrectly. Use the results to narrow the permitted workflow.</p><p>These are proposed operating practices, not a claim that a checklist resolves every problem in AI safety. Advanced loss-of-control research remains a separate, consequential challenge.</p>"
      },
      {
        "id": "one-useful-action-this-week",
        "title": "One useful action this week",
        "body": "<p>Choose one AI workflow and write four answers: what it can see, what it can do, who approves consequential actions, and who can stop it. If any answer is unclear, resolve it before expanding access. This turns a sweeping headline into a decision your team can examine and improve.</p><p>To map a first workflow and its review points, use the <a href=\"https://aiteachers.cc/agent-to-outcome/tutorial/\" target=\"_blank\" rel=\"noopener noreferrer\">AI Teachers Agent to Outcome tutorial</a>.</p>"
      }
    ],
    "tools": [],
    "sources": [
      [
        "2026 Report: Extended Summary for Policymakers",
        "https://internationalaisafetyreport.org/publication/2026-report-extended-summary-policymakers"
      ],
      [
        "Agentic misalignment: How LLMs could be insider threats",
        "https://www.anthropic.com/research/agentic-misalignment"
      ],
      [
        "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile",
        "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
      ]
    ],
    "faq": [
      [
        "Does an incorrect answer show that an AI is escaping control?",
        "An error by itself does not demonstrate an intention to evade oversight. Check the answer against its source and examine the actual permissions and actions involved."
      ],
      [
        "What does the February 2026 safety assessment tell us?",
        "The International AI Safety Report assessed capabilities and uncertainty at its publication date. It should not be treated as a guarantee about later systems or a settled forecast of future loss of control."
      ],
      [
        "What should a business review first?",
        "Choose one workflow and identify its information access, permitted actions, approval owner, and stopping procedure. Resolve unclear boundaries before expanding access."
      ]
    ],
    "reviewNote": "Research and guidance reviewed on November 8, 2026. The International AI Safety Report assessment discussed here was published in February 2026. Workflow scenarios and operating practices are editorial examples; this article makes no forecast of future loss of control.",
    "next": "Choose a task you can check, map the information it needs, and identify the person who approves consequential actions.",
    "nextTitle": "Map your workflow and review points.",
    "nextHref": "https://aiteachers.cc/agent-to-outcome/tutorial/",
    "nextLabel": "Use the Agent to Outcome tutorial",
    "nextNote": "Start with one bounded workflow and a result you can review.",
    "datePublished": "2026-11-08",
    "dateModified": "2026-11-08",
    "readingTime": "5 minute read"
  },
  {
    "id": "cut-ai-costs-with-model-routing",
    "category": "AI COSTS & WORKFLOW DESIGN",
    "title": "How to Reduce AI Costs With Smarter Model Routing",
    "intro": "Test model routing against clear quality requirements, then compare the full cost of each accepted result, including review and rework.",
    "description": "Test model routing with clear quality checks, then use caching, batching, and activity limits to measure the cost of AI results your team can use.",
    "answer": "Route tasks to a suitable model, verify results against a clear acceptance standard, and count model calls, review, retries, and rework. Compare cost per accepted result. Usage-based API savings do not automatically lower a flat monthly app subscription.",
    "sections": [
      {
        "id": "start-with-the-work-and-how-you-are-billed",
        "title": "Start with the work and how you are billed",
        "body": "<p>A useful place to look for AI savings is the way you assign work. A short classification task, a complex document comparison, and a sensitive customer response do not necessarily need the same model or the same amount of review.</p><p>Model routing means choosing a model or processing path according to the task. Done carefully, it can reduce unnecessary usage while preserving the quality your workflow requires. The word “carefully” matters: a cheaper answer can create more work downstream.</p><p>This approach addresses usage-based model and API charges. Switching the model behind a workflow will not automatically reduce a flat monthly app subscription. Check how your service bills you before designing a savings experiment.</p>"
      },
      {
        "id": "give-each-task-a-quality-requirement",
        "title": "Give each task a quality requirement",
        "body": "<p>The <a href=\"https://arxiv.org/abs/2406.18665\" target=\"_blank\" rel=\"noopener noreferrer\">RouteLLM research</a> explores routing requests between stronger and weaker models using learned preferences. Its experiments demonstrate cost-and-quality tradeoffs in specific benchmark settings. Those results establish a method worth testing; they do not promise the same savings for your documents, customers, or acceptance standards.</p><p>For a small business workflow, you can begin with explicit rules. Identify work that is repetitive and easy to check, then separate it from work that requires interpretation or carries a substantial consequence if wrong.</p><div class=\"article-table\" role=\"region\" aria-label=\"Example task routing and acceptance checks\" tabindex=\"0\"><table><caption>Example task routing and acceptance checks</caption><thead><tr><th scope=\"col\">Task</th><th scope=\"col\">Candidate starting route</th><th scope=\"col\">Acceptance check</th></tr></thead><tbody><tr><td>Assign an approved category to a support message</td><td>Lower-cost model</td><td>Category belongs to the allowed set and matches the message</td></tr><tr><td>Extract dates from a consistent document format</td><td>Lower-cost model plus validation</td><td>Values match the source; missing dates stay missing</td></tr><tr><td>Compare conflicting contract passages</td><td>More capable model plus qualified review</td><td>Differences are accurately supported by the documents</td></tr><tr><td>Recommend an action affecting a customer account</td><td>Route matched to the task, with approval</td><td>Evidence supports the recommendation and an authorized person approves</td></tr></tbody></table></div><p>This table is an illustrative design, not evidence that a particular model will meet these requirements. A model must earn its place on a route by passing relevant checks.</p>"
      },
      {
        "id": "test-the-route-before-relying-on-it",
        "title": "Test the route before relying on it",
        "body": "<p>Build a small evaluation set from representative examples you are authorized to use. Include straightforward tasks, ambiguous cases, incomplete inputs, and examples where an incorrect answer would be costly. Decide what counts as an acceptable result before comparing models.</p><p>Run the existing process and the proposed routes on the same examples. Record accuracy, review time, completion time, retries, and failures. Review difficult categories separately so a strong overall average cannot hide a weak area.</p><p>Use observable checks to decide when to escalate. These might include missing required information, a failed format check, conflicting sources, or a reviewer’s rejection. A model’s own statement that it is confident does not establish that its answer is correct.</p><p>Also count the cost of escalation itself. If every request runs through several models before reaching a reviewer, the routing system may add work. Start with a small number of clearly defined paths and expand only when the measurements support it.</p>"
      },
      {
        "id": "measure-the-cost-of-a-result-you-can-use",
        "title": "Measure the cost of a result you can use",
        "body": "<p>A useful working metric is:</p><p><strong>Cost per accepted result = total workflow cost ÷ results that pass the defined review.</strong></p><p>Include model usage, paid tools, retries, review, and rework. For a pilot, estimate staff time consistently and record any setup costs separately so they remain visible.</p><p>Consider this entirely hypothetical comparison of 1,000 requests:</p><div class=\"article-table\" role=\"region\" aria-label=\"Hypothetical cost per accepted result for 1,000 requests\" tabindex=\"0\"><table><caption>Hypothetical cost per accepted result for 1,000 requests</caption><thead><tr><th scope=\"col\">Measure</th><th scope=\"col\">Existing process</th><th scope=\"col\">Proposed routed process</th></tr></thead><tbody><tr><td>Model and API charges</td><td>$40</td><td>$25</td></tr><tr><td>Review and rework</td><td>$160</td><td>$225</td></tr><tr><td>Total measured cost</td><td>$200</td><td>$250</td></tr><tr><td>Results accepted after review</td><td>900</td><td>950</td></tr><tr><td>Cost per accepted result</td><td>About $0.22</td><td>About $0.26</td></tr></tbody></table></div><p>The proposed route uses less money on model calls and delivers more accepted results, but each accepted result costs more overall. A team might still value the additional completions; the table makes that tradeoff visible. These figures illustrate the calculation and are not vendor prices or measured performance.</p>"
      },
      {
        "id": "remove-repeated-work-around-the-route",
        "title": "Remove repeated work around the route",
        "body": "<p>Once the routing experiment is measurable, consider supporting changes.</p><p><strong>Reuse stable prompt context.</strong> <a href=\"https://platform.claude.com/docs/en/build-with-claude/prompt-caching\" target=\"_blank\" rel=\"noopener noreferrer\">Anthropic’s prompt-caching documentation</a> explains how a cached prompt prefix can reduce repeated processing of shared material. Cache writes and reads have different billing treatment, and reuse depends on conditions such as the cache lifetime. Measure actual cache hits before projecting savings. Prompt caching reuses input processing; it is different from serving a stored final answer that may have become outdated.</p><p><strong>Batch work that can wait.</strong> <a href=\"https://platform.claude.com/docs/en/build-with-claude/batch-processing\" target=\"_blank\" rel=\"noopener noreferrer\">Anthropic’s batch-processing documentation</a> describes asynchronous processing for independent requests. This can suit scheduled document summaries or offline evaluations. Check the service’s current pricing and turnaround terms. Reconcile individual results before retrying failed work, and reserve this approach for tasks whose deadlines allow it.</p><p><strong>Set limits on agent activity.</strong> Define budgets for model calls, tool calls, retries, and elapsed time. Give the workflow a clear stopping condition and a way to request help. Record incomplete attempts as costs, and count each accepted final result once. These are design recommendations for making the experiment accountable.</p>"
      },
      {
        "id": "start-with-one-measurable-workflow",
        "title": "Start with one measurable workflow",
        "body": "<p>Choose a repeated task with a clear acceptance standard. Establish its current cost per accepted result, test one simpler route, and compare quality, review effort, and turnaround. Keep the change only if the combined result meets your business requirements. A smaller API bill is useful when the finished work remains worth paying for.</p><p>For help planning a bounded implementation, explore <a href=\"https://agency.waymaker.cx/ai-workflow-implementation\" target=\"_blank\" rel=\"noopener noreferrer\">Waymaker Agency’s AI workflow services</a>. Bring your task, acceptance criteria and current cost estimate.</p>"
      }
    ],
    "tools": [],
    "sources": [
      [
        "RouteLLM: Learning to Route LLMs with Preference Data",
        "https://arxiv.org/abs/2406.18665"
      ],
      [
        "Prompt caching",
        "https://platform.claude.com/docs/en/build-with-claude/prompt-caching"
      ],
      [
        "Batch processing",
        "https://platform.claude.com/docs/en/build-with-claude/batch-processing"
      ]
    ],
    "faq": [
      [
        "Will switching models lower a monthly app subscription?",
        "Routing addresses usage-based model or API charges. A flat monthly subscription will not automatically become cheaper when a workflow uses another model. Check the service’s billing terms."
      ],
      [
        "How should a team measure routing savings?",
        "Divide total measured workflow cost by results that pass the defined review. Include model usage, paid tools, retries, review, and rework, and keep setup costs visible."
      ],
      [
        "Are the costs in the comparison real vendor prices?",
        "No. Every dollar amount and result count in the comparison is hypothetical. The example shows why lower model charges can coexist with a higher overall cost per accepted result."
      ]
    ],
    "reviewNote": "Research and publisher documentation reviewed on November 8, 2026. All figures in the cost comparison are hypothetical. The task routes and suggested checks are editorial guidance, not measured results or a promise of savings. Check current billing terms for the service you use.",
    "next": "Bring one repeated task, your acceptance criteria, and your current cost estimate to plan a bounded implementation.",
    "nextTitle": "Plan a measurable AI workflow.",
    "nextHref": "https://agency.waymaker.cx/ai-workflow-implementation",
    "nextLabel": "Explore AI workflow implementation",
    "nextNote": "Define the task, review requirements, and spending limits before choosing a route.",
    "datePublished": "2026-11-08",
    "dateModified": "2026-11-08",
    "readingTime": "5 minute read"
  }
];
