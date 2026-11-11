const steps=[
  ['brief','One useful task','Choose one result and three checks. Keep the same brief for every tool.'],
  ['run','The same starting point','Copy the same sample into each tool. Keep the plan, settings and first result.'],
  ['review','A result you can trust','Check the work against the source. Count the fixes and the time they take.'],
  ['decide','A choice you can explain','Compare quality, total effort and cost. Save your evidence and next step.']
];
export function comparisonSteps(){return `<section class="comparison-route" aria-label="Four steps to compare AI tools"><div class="section-heading"><div><span class="eyebrow">YOUR FOUR-STEP COMPARISON</span><h2>One task. A clearer choice.</h2></div><a class="text-link" href="/workflow-demos">See a worked example ↗</a></div><ol class="comparison-steps">${steps.map(([id,title,body],i)=>`<li><img src="/assets/compare-${id}.svg" alt="" width="480" height="320" loading="lazy"><div><span class="comparison-number">0${i+1}</span><h3>${title}</h3><p>${body}</p></div></li>`).join('')}</ol></section>`;}
