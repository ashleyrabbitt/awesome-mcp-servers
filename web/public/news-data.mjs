// Curated news edition. Keep announcement dates separate from our publication date.
export const newsEdition = '2026-11-01';
export const newsTopics = ['All stories', 'Productivity', 'Agents', 'Safety', 'Industry'];
export const newsStories = [
  {
    id:'gemini-slides-whole-deck-editing', date:'2026-10-30', topic:'Productivity', publisher:'Google', art:'slides',
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
    id:'openai-shared-training-preferences', date:'2026-10-30', topic:'Industry', publisher:'OpenAI', art:'web',
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
    id:'gemini-edit-files-in-chat', date:'2026-10-29', topic:'Productivity', publisher:'Google', art:'files',
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
    id:'openai-model-spec-human-agency', date:'2026-10-29', topic:'Safety', publisher:'OpenAI', art:'review',
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
    id:'gemini-sheets-cell-citations', date:'2026-10-28', topic:'Productivity', publisher:'Google', art:'data',
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
    id:'microsoft-copilot-agent-harness', date:'2026-10-28', topic:'Agents', publisher:'Microsoft', art:'agents',
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
    id:'anthropic-proposed-ipo-filing', date:'2026-10-26', topic:'Industry', publisher:'Anthropic', art:'industry',
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
    id:'agent-skills-independent-foundation', date:'2026-10-22', topic:'Agents', publisher:'Anthropic', art:'skills',
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
