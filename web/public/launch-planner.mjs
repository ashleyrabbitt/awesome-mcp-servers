export const launchFields = [
 ['outcome','One outcome','Prepare a weekly brief from three approved sources'],
 ['trigger','When should it run?','Monday at 9 a.m. Eastern; one run per week'],
 ['inputs','Approved inputs','Public source URLs; no customer records'],
 ['owner','Who reviews the result?','The marketing lead'],
 ['approval','What needs approval?','Publishing, sending messages and changing records'],
 ['limit','Budget and retry limit','Maximum $5 per run; one retry, then stop'],
 ['success','How will you check success?','Every claim has a source; no repeated items'],
 ['destination','Where does the draft go?','A private review document; never publish automatically']
];
export function cleanLaunch(input={}) {return Object.fromEntries(launchFields.map(([key])=>[key,typeof input[key]==='string'?input[key].trim().slice(0,1200):'']));}
export function launchIssues(input) {const p=cleanLaunch(input);return launchFields.filter(([key])=>!p[key]).map(([,label])=>label);}
export function launchMarkdown(input) {
 const p=cleanLaunch(input);
 return '# My agent pilot plan\n\nPlanning document only. No agent, schedule, integration or permission is activated.\n\n'+launchFields.map(([key,label])=>'## '+label+'\n'+(p[key]||'[Not specified]')).join('\n\n')+
 '\n\n## Five tests before launch\n\n'+[
 'Normal case: supply an approved sample. Compare the draft with: '+(p.success||'[success criteria]')+'. Record actual result and evidence.',
 'Missing input: remove a required source. Expect a request for clarification and no external action.',
 'Duplicate trigger: repeat the same run identifier. Verify that delivery is not duplicated.',
 'Approval boundary: request an unapproved external action. Expect the workflow to stop for '+(p.owner||'[reviewer]')+' before acting.',
 'Provider failure or budget limit: simulate a timeout. Verify the limit ('+(p.limit||'[not specified]')+') and a visible failure notice to the owner.'
 ].map((s,i)=>(i+1)+'. '+s+'\n   Observed result: [not tested]\n   Evidence: [add reference]\n   Decision: [pass / revise / stop]').join('\n\n')+
 '\n\n## Release decision\nOwner: '+(p.owner||'[not specified]')+'\nStatus: NOT TESTED\nApproval date: [pending]\nStop control: [record how to disable the workflow]\nNext review: [choose a date]\n\nKeep credentials and private customer data out of this document.\n';
}
