const requestUrl = '/work-with-us?offer=working-session#request';
const steps = [
  ['brief', 'Bring your real task.', 'Tell us what you want to accomplish, where you’re stuck and what you’ve already tried.'],
  ['connect', 'Choose a useful scope.', 'We confirm the fit, tools, session length and timing before you book or pay.'],
  ['work', 'Work through it together.', 'Use a sample from your work to practice, ask questions and improve the result with Ashley.'],
  ['review', 'Keep what works.', 'Take away the prompt or workflow outline, review checklist and next actions you develop.'],
];
const examples = [
  ['MARKETING & CONTENT', 'From a blank page<br>to a stronger first draft.', 'Bring a campaign idea, an offer or a content brief.', 'Work toward a reusable prompt and a draft you know how to review.', 'peach'],
  ['RESEARCH & DECISIONS', 'From scattered notes<br>to something you can use.', 'Bring a research question, customer feedback or a recurring report.', 'Work toward a clear structure, a useful summary and checks for accuracy.', 'lavender'],
  ['WORKFLOWS & AUTOMATION', 'From “I do this every week”<br>to a repeatable process.', 'Bring one recurring task and the steps you follow today.', 'Work toward a manageable workflow outline and a practical first test.', 'sage'],
];
export function coachingPage() {
  return `<div class="coaching-page">
    <section class="wrap intro-split editorial-intro coaching-intro" aria-labelledby="coaching-title">
      <div class="intro-copy">
        <span class="eyebrow"><i class="tiny-spark" aria-hidden="true">✳</i> PRACTICAL AI COACHING · WITH ASHLEY KAYS</span>
        <h1 id="coaching-title">Make AI useful.<br><em>For your kind<br>of work.</em></h1>
        <p>Bring the task that keeps getting stuck. Work through it with a human in your corner—and build a prompt or process you can use again.</p>
        <div class="curator-line"><span class="curator-monogram" aria-hidden="true">AK</span><span>Work one-to-one with <strong>Ashley Kays</strong><small>Product, design, marketing and hands-on AI guidance.</small></span></div>
        <div class="flex-actions"><a class="button" data-editorial-link href="${requestUrl}">Ask about a working session <span aria-hidden="true">↗</span></a><a class="text-link" href="#how-it-works">See how it works ↓</a></div>
        <p class="intro-note">$350 USD · One focused task · No charge to inquire</p>
      </div>
      <aside class="coaching-session" aria-labelledby="session-title">
        <div class="coaching-session-mast"><span>A LITTLE GUIDANCE. A USEFUL NEXT STEP.</span><span aria-hidden="true">✳</span></div>
        <div class="coaching-session-art"><img src="/assets/agent-step-work.svg" alt="" width="480" height="340" fetchpriority="high"><span>YOUR TASK + HUMAN GUIDANCE + AI</span></div>
        <div class="coaching-session-copy"><span class="eyebrow">YOUR STARTING POINT</span><h2 id="session-title">AI Working Session</h2><p class="coaching-price">$350 <span>USD · private session</span></p>
          <ul class="coaching-takeaways"><li>A focused task and a sensible tool choice</li><li>Guided practice using a real example</li><li>A reusable prompt or workflow outline</li><li>A review checklist and clear next actions</li></ul>
          <p class="coaching-scope">We agree on scope, session length and timing before booking or payment.</p>
        </div>
      </aside>
    </section>
    <div class="outcome-strip"><div class="wrap"><span><b>Start where you are.</b> Beginners welcome.</span><span><b>Bring your work.</b> Make the learning relevant.</span><span><b>Build confidence.</b> Know what to do next.</span></div></div>
    <section class="wrap section" id="how-it-works" aria-labelledby="coaching-process-title">
      <div class="section-heading"><div><span class="eyebrow">SMALL STEPS. REAL POSSIBILITIES.</span><h2 id="coaching-process-title">One task.<br>A clearer way forward.</h2></div><p>You don’t need to learn every AI tool.<br>Start with something you actually want to get done.</p></div>
      <ol class="illustrated-steps">${steps.map(([art, title, copy], i) => `<li><div class="step-art"><img src="/assets/agent-step-${art}.svg" alt="" width="480" height="340" loading="lazy"><span class="step-number" aria-hidden="true">0${i + 1}</span></div><h3>${title}</h3><p>${copy}</p></li>`).join('')}</ol>
    </section>
    <section class="tools-section"><div class="wrap section" aria-labelledby="coaching-examples-title">
      <div class="section-heading"><div><span class="eyebrow">START WITH THE WORK IN FRONT OF YOU</span><h2 id="coaching-examples-title">What’s on your “I wish I could” list?</h2><p>A few possibilities for your session. We’ll choose one manageable task together.</p></div></div>
      <div class="coaching-examples">${examples.map(([label, title, bring, result, color]) => `<article class="coaching-example ${color}"><span class="eyebrow">${label}</span><h3>${title}</h3><p><b>Bring:</b> ${bring.replace(/^Bring /, '')}</p><p><b>Build:</b> ${result.replace(/^Work toward /, '')}</p></article>`).join('')}</div>
      <p class="coaching-example-note">Not sure which task to choose? <a class="text-link" href="/opportunity-finder">Find a useful starting point ↗</a></p>
    </div></section>
    <section class="wrap section coaching-guide" aria-labelledby="coaching-guide-title">
      <div class="coaching-guide-art"><img src="/assets/training-powers.webp" alt="An illustrated scene of people learning and creating together" width="1536" height="1024" loading="lazy"><span>LEARN BY DOING. WITH A HUMAN IN YOUR CORNER.</span></div>
      <div class="coaching-guide-copy"><span class="eyebrow">MEET YOUR GUIDE</span><h2 id="coaching-guide-title">A curious mind.<br>A practical partner.</h2><p>Ashley Kays brings together product, UX, marketing and teaching experience to help you apply AI to the work that matters to you.</p><p>Ask the questions you’ve been saving. Try an approach together. Understand what makes the output useful—and what still needs your judgment.</p><a class="text-link" href="https://waymaker.cx/portfolio" target="_blank" rel="noopener">Explore Ashley’s work ↗</a><div class="coaching-fit"><b>This is a good fit if…</b><p>You want personal guidance, a chance to practice and a process you can keep using. Larger builds and ongoing implementation are scoped separately.</p></div></div>
    </section>
    <section class="wrap section coaching-faq" aria-labelledby="coaching-faq-title">
      <div><span class="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</span><h2 id="coaching-faq-title">Let’s make<br>the next step clear.</h2></div>
      <div class="coaching-questions">
        <details><summary>Do I need experience with AI?</summary><p>No. Bring your goal and your questions. We can help you choose a suitable tool and explain the steps as we work.</p></details>
        <details><summary>What will I leave with?</summary><p>The prompt or workflow outline, review checklist and next actions we develop together. We focus on one agreed task so the session has a clear purpose.</p></details>
        <details><summary>What does the $350 include?</summary><p>One private AI Working Session with Ashley: a focused task, guided practice and practical next steps. Session length, scope and timing are confirmed before payment. Tool subscriptions, larger builds, production deployment and ongoing support are separate unless agreed in writing.</p></details>
        <details><summary>What happens when I send a request?</summary><p>Your request starts a conversation. We confirm fit, availability and scope, then agree on session details before requesting payment. Sending a request does not charge you or reserve a time.</p></details>
        <details><summary>What should I prepare?</summary><p>A short description of your task, your current process and the outcome you want. For the session, use approved sample material. Keep passwords, API keys and confidential client information out of your inquiry.</p></details>
        <details><summary>Can you help my team or build a workflow for me?</summary><p>Yes. Team training and workflow implementation have their own scope and quote. <a data-editorial-link href="/work-with-us?offer=training#request">Ask about team training</a> or <a data-editorial-link href="/work-with-us?offer=workflow#request">explore workflow setup</a>.</p></details>
      </div>
    </section>
    <section class="wrap section coaching-close"><div class="agent-help"><div><span class="eyebrow">YOUR NEXT USEFUL STEP</span><h2>Bring your curiosity.<br>Let’s put it to work.</h2><p>Tell us what you’re working on and where you’re stuck. We’ll help you decide whether a $350 AI Working Session is the right starting point.</p><a class="button" data-editorial-link href="${requestUrl}">Ask about a working session ↗</a><p class="coaching-close-note">No charge to inquire. Scope and timing agreed before payment.</p></div><div class="help-note"><span aria-hidden="true">✳</span><p>One real task.<br>A useful process.<br>Something you can repeat.</p><a href="/training">Prefer to start free? Explore the courses ↗</a></div></div></section>
  </div>`;
}
