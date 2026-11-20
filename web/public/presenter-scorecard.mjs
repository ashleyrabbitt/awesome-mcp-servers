export const presenterPath = '/comparisons/ai-presenter-video-scorecard';

const fields = [
  ['minutes', 'Hands-on minutes', '1'],
  ['retries', 'Extra render attempts', '1'],
  ['cost', 'Retail software cost in USD', '0.01'],
  ['approved', 'Approved clips (0–3)', '1']
];

function runFields(id, label) {
  return `<fieldset class="power-panel"><legend>${label}</legend>${fields.map(([name, text, step]) =>
    `<label for="${id}-${name}">${text} <input class="field" type="number" id="${id}-${name}" name="${name}" min="0" ${name === 'approved' ? 'max="3"' : ''} step="${step}" required></label>`).join('')}
    <output aria-live="polite">Enter all four totals to see cost and time per approved clip.</output></fieldset>`;
}

export function presenterScorecard() {
  return `<article class="wrap useful-page buyer-study">
  <div class="page-head"><span class="eyebrow">AI video buyer test</span><h1>Can your AI presenter get through a client revision?</h1><p>Give two tools the same mug, the same presenter and one small change. Compare what it takes to deliver three usable clips.</p></div>
  <section class="power-panel"><h2>Run the same brief twice</h2><p>Use one fictional or permissioned presenter, a product photo you own and one destination. Make three 15-second vertical videos. Keep the reference files, script and export settings identical between tools.</p><ol><li><strong>Morning.</strong> Show coffee being poured at a kitchen counter. Close with “Take a closer look.”</li><li><strong>Detail.</strong> Show the mug’s handle and the glaze catching the light. Use the same closing line.</li><li><strong>Gift.</strong> Pair the mug with a kraft box and ribbon, then use the same close.</li><li><strong>Revision.</strong> In the detail clip only, change the close to “Explore the mug.” Preserve the presenter, product, scene and every other approved line.</li></ol><p>Open the exported files on a phone. Count a clip as approved when the presenter stays recognizable, the mug matches the reference, the closing line is correct and the file plays. A corrected clip replaces its earlier version and counts once.</p></section>
  <section class="power-panel"><h2>Compare your two runs</h2><p>Time setup, prompting, editing and review. Record queue time separately. Include failed renders in retail cost, even when complimentary credits covered them. Count every extra attempt after the first render of each requested version.</p>
  <div class="power-grid" data-presenter-calculator>${runFields('current','Current workflow')}${runFields('candidate','Candidate tool')}</div>
  <p>Example: 48 working minutes and $12 of renders for two approved clips comes to 24 minutes and $6 per approved clip. If a third clip fails, leave it out of the approved count and keep its time and cost in the totals.</p>
  <div class="flex-actions"><a class="button light" href="/downloads/presenter-run-log.csv" download data-buyer-download="presenter">Download the blank run log</a><a class="button light" href="/downloads/presenter-evaluation.md" download data-buyer-download="presenter">Download the one-page evaluation template</a></div></section>
  <section class="power-panel"><h2>Make an adoption decision</h2><p>Which tool could you use on the next paid job? Name the biggest blocker, the step you would keep and the monthly price you would pay at your actual volume. Keep the evidence with your evaluation.</p><p><a href="https://uxdesigncoach.cc/work-with-ashley/ux-review/#ai-product-evaluation" data-buyer-help="presenter">See a private buyer evaluation</a> · <a href="https://agency.waymaker.cx/shopify-creative#recurring-presenter">See the Agency’s presenter pilot</a></p></section></article>`;
}

export function updatePresenterScore(fieldset) {
  if (!fieldset) return;
  const inputs = [...fieldset.querySelectorAll('input')];
  const output = fieldset.querySelector('output');
  if (inputs.some(input => !input.validity.valid)) {
    output.textContent = 'Enter valid totals for all four fields.';
    return;
  }
  const [minutes, retries, cost, approved] = inputs.map(input => input.valueAsNumber);
  output.textContent = approved === 0
    ? `No clips approved yet. ${minutes} minutes, ${retries} extra attempts and $${cost.toFixed(2)} spent.`
    : `$${(cost / approved).toFixed(2)} and ${(minutes / approved).toFixed(1)} working minutes per approved clip · ${retries} extra attempts.`;
}
