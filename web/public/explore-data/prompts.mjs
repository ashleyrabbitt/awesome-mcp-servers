export const practicePrompts = [
  {
    id: 'first-offer-interviews', role: 'Entrepreneurs', title: 'Turn customer interviews into a first offer',
    description: 'Use interview evidence to choose one problem a small paid pilot could solve.',
    tryThis: 'Start with three anonymized interviews. Check every quote against the original before choosing a pilot.',
    prompt: 'Read [interview excerpts] from [audience]. Group recurring problems by the task someone was trying to finish. Quote the supporting words and show how many distinct interviews mention each problem. Draft a one-sentence offer for the best-supported problem and a small paid pilot I could propose. List the assumptions about willingness to pay and one question that could disprove each.'
  },
  {
    id: 'marketplace-deal-check', role: 'Entrepreneurs', title: 'Check whether an AI software deal fits your business',
    description: 'Compare your actual workload with the limits and renewal terms in a software listing.',
    tryThis: 'Copy two plan descriptions and your expected monthly usage. Check the arithmetic before buying.',
    prompt: 'Using only [offer and plan terms], compare the tiers for [monthly workload]. Make a table of seats, credits, usage caps, integrations, export rights, renewal terms and missing details. Calculate costs only where the inputs allow it. Show the arithmetic and tell me which single question I should ask the vendor before choosing.'
  },
  {
    id: 'design-handoff-acceptance', role: 'Designers', title: 'Turn a design handoff into acceptance checks',
    description: 'Give a developer observable checks for a design, including what happens when an interaction fails.',
    tryThis: 'Choose a checkout or signup screen. Compare the checklist with the frame and its annotations.',
    prompt: 'Use [frame description and design notes] for [user task]. Create an acceptance checklist for the developer covering the default, empty, loading, success and error states. For each, name the user action, expected feedback and keyboard behavior. Mark every inferred detail as a question for the designer.'
  },
  {
    id: 'model-trial-scorecard', role: 'Developers', title: 'Score two models on the same real task',
    description: 'Design a repeatable comparison using expected outputs, errors, cost and review time.',
    tryThis: 'Use a handful of labeled examples, including an ambiguous one. Fill the scorecard with results from your own runs.',
    prompt: 'Build a blank evaluation sheet for [task] using [sample inputs and expected outputs]. Define what counts as correct, when to abstain and which errors would block release. Include columns for model version, response time, token cost, reviewer corrections and pass or fail. Provide a scoring example labeled fictional, then leave the actual trials blank.'
  },
  {
    id: 'podcast-to-experiment', role: 'Marketers', title: 'Turn a podcast idea into a one-week experiment',
    description: 'Connect one claim from an episode to a small test you can measure in your own work.',
    tryThis: 'Paste a short excerpt with a timestamp and bring one metric you can observe this week.',
    prompt: 'From [episode notes or short excerpt], extract one claim relevant to [business problem]. Separate what the speaker observed from their prediction. Design a one-week test with an input, baseline, success metric, stop condition and an explanation of what a mixed result would mean. Include the supplied source and timestamp wherever you refer to the claim.'
  },
  {
    id: 'game-night-soundtrack', role: 'Creators', title: 'Write an original game-night soundtrack brief',
    description: 'Give a music tool a clear mood, duration and cue for each round of a game.',
    tryThis: 'Generate two versions for one round and play them under your spoken instructions to check the mix.',
    prompt: 'Create three original instrumental music briefs for [game and audience]. Each cue should last [length], with a mood, tempo range, instrumentation and a clear ending. Keep space for spoken instructions. Use musical characteristics rather than naming an artist. Finish with three things to listen for when comparing the generated clips.'
  }
];
