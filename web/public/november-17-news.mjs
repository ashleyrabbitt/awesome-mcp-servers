const published = {datePublished: '2026-11-17', dateModified: '2026-11-17'};

export const novemberSeventeenNews = [
  {
    ...published, id: 'google-opal-shutdown-recover-prompts', date: '2026-11-17', topic: 'Productivity', publisher: 'Google', art: 'files',
    title: 'Your Google Opal stopped running. Your prompts are still in Drive.',
    description: 'Google closed Opal and its Labs-made Gems on November 17. People who built or shared a workflow can still retrieve its instructions.',
    summary: 'Google ended its Opal experiment and the Labs-made Gems built with it. Shared app links now open Google’s FAQ. Owners can download the underlying files from the Opal folder in My Drive and read the prompts in a text editor.',
    takeaway: 'A team may still have the recipe for a workshop planner or research assistant even when its bookmarked app has stopped working. Someone needs to reconstruct the steps and replace the link colleagues use.',
    action: 'Start with the Opal your team used most recently. Recover its instructions, record any search or image step, and rerun a familiar example before sharing a replacement.',
    caveat: 'Ordinary Gems carry over to Gemini skills. An Opal with several connected steps needs to be rebuilt. Existing Drive sharing permissions on the old file still apply.',
    sourceTitle: 'Google’s Opal transition FAQ', sourceUrl: 'https://developers.google.com/opal/faq',
    next: ['/guides/recover-google-opal-workflow', 'Recover and test one Opal workflow']
  },
  {
    ...published, id: 'gpt-62-astra-sol-work-report-test', date: '2026-11-17', topic: 'Productivity', publisher: 'OpenAI', art: 'data',
    title: 'GPT-6.2 Astra and Sol arrive in ChatGPT Work and Codex',
    description: 'The model choice gets more interesting when the assignment has a deadline, a source spreadsheet and a client waiting for a usable answer.',
    summary: 'OpenAI released GPT-6.2 Astra and Sol in ChatGPT Work, Codex and the API. The release gives teams two models to try on the same assignment, across the environments in which they already prepare work or build software.',
    takeaway: 'A useful comparison is the cost of an accepted deliverable. A quick first draft can take longer overall if a reviewer has to trace every number or work out which input the model skipped.',
    action: 'Give both models the same fictional weekly sales table and reporting brief. Remove one expected input. Check the arithmetic, whether each draft identifies the missing input, and how many minutes an editor needs before signing off.',
    caveat: 'OpenAI lists Plus, Pro, Enterprise and Edu for ChatGPT Work and Codex access. Workspace settings, speed options and API rates vary. The reporting exercise is an editorial suggestion.',
    sourceTitle: 'OpenAI introduces GPT-6.2 Astra and Sol', sourceUrl: 'https://openai.com/index/introducing-gpt-6-2-astra-sol/',
    next: ['/tool-trial', 'Set up a comparison with your own task']
  },
  {
    ...published, id: 'github-copilot-mai-code-2-flash', date: '2026-11-17', topic: 'Design & tech', publisher: 'GitHub', art: 'review',
    title: 'GitHub Copilot adds MAI Code 2 and brings Flash to the free plan',
    description: 'GitHub’s new model choices give engineering teams a reason to revisit which coding tasks deserve a longer model run.',
    summary: 'GitHub added MAI Code 2 and MAI Code 2 Flash to the Copilot model picker across supported editors and other Copilot surfaces. The standard model starts at Pro. Flash is also available on Free and Student plans.',
    takeaway: 'Ask two different questions when comparing coding assistants. Can the model finish a small edit without creating more review work? Can it follow the same requirement through several files?',
    action: 'Give each model the same small change on separate copies of a sample project. Repeat with a change spanning two components. Record passing tests, unrelated edits, review time and reported usage for each run.',
    caveat: 'GitHub describes usage-based billing. Business and Enterprise admins can control model access. Check the model picker and organization policy on the account that will run the trial.',
    sourceTitle: 'GitHub’s MAI Code 2 and Flash availability announcement', sourceUrl: 'https://github.blog/changelog/2026-11-17-mai-code-2-and-mai-code-2-flash-in-github-copilot/',
    next: ['/tool-trial', 'Compare two models on a repeatable task']
  },
  {
    ...published, id: 'canadian-holiday-shoppers-ai-product-comparison', date: '2026-11-16', topic: 'Industry', publisher: 'Google Canada', art: 'data',
    title: 'Canadian holiday shoppers say product comparison is where AI can help',
    description: 'Google Canada reports that 59% of surveyed holiday shoppers plan to use AI this season. Product comparison was the most cited use.',
    summary: 'In its November 16 holiday research, Google Canada reports that 59% of Canadian holiday shoppers surveyed intend to use an AI tool. Comparing products led the listed uses, ahead of saving time and finding gift inspiration.',
    takeaway: 'A store selling two versions of the same gift can answer the question shoppers actually face. Which one fits their recipient, budget, delivery destination and return needs?',
    action: 'Pick two similar products. Ask a colleague to choose using only their product pages. Write down every missing dimension, delivery condition and return detail, then fix the item that blocked the decision.',
    caveat: 'These figures describe stated intentions in Canada. Sales, referrals and shopper behavior on any individual store need to be measured separately.',
    sourceTitle: 'Google Canada’s holiday shopping research', sourceUrl: 'https://blog.google/intl/en-ca/products/supporting-businesses/what-canadians-are-searching-on-google-this-holiday-season/',
    next: ['/guides/holiday-product-page-ai-comparison', 'Run a two-product comparison on your store']
  },
  {
    ...published, id: 'aws-emulator-test-local-before-staging', date: '2026-11-11', topic: 'Design & tech', publisher: 'Amazon Web Services', art: 'agents',
    title: 'AWS Emulator gives builders a local place to test cloud application changes',
    description: 'AWS shows how to write and read a sample record locally with familiar tools before repeating the check in a cloud environment.',
    summary: 'AWS introduced AWS Emulator for local application testing and highlighted it in its November 16 roundup. The launch walkthrough shows the CLI creating storage resources and a coding assistant writing and retrieving a DynamoDB item against a local endpoint.',
    takeaway: 'A developer can test how an app handles a missing record or a second submission while keeping those experiments off a shared AWS environment. This shortens the feedback loop for changes to application logic.',
    action: 'Point a sample application at the emulator. Create a fictional order, read it back, then repeat the submission. Write down the expected result of each step and rerun the same checks in staging.',
    caveat: 'Check the emulator’s supported services and operations for your workload. Validate permissions, service integrations and production-relevant behavior in an appropriate AWS environment before release.',
    sourceTitle: 'AWS introduces local application testing with AWS Emulator', sourceUrl: 'https://aws.amazon.com/blogs/aws/test-your-applications-against-aws-locally-with-aws-emulator/',
    next: ['/workflow-lab', 'Write down the test and its acceptance criteria']
  }
];
