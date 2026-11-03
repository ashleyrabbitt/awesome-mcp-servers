// Enable only after the MailerLite form is designed, published and its public page verified.
export const newsletter={enabled:true,name:'Power Notes',formId:'200636635056965053',groupId:'200636581595318233',shareUrl:'https://preview.mailerlite.io/forms/2626017/200636635056965053/share'};



export function newsletterForm(placement='page') {
 if (!newsletter.enabled) return '<p>Newsletter signup is temporarily unavailable. Explore our free guides while we get it ready.</p>';
 const id=placement==='home'?'home':'page';
 return `<form class="power-notes-form" action="https://assets.mailerlite.com/jsonp/2626017/forms/${newsletter.formId}/subscribe" method="post" target="_blank" rel="noopener"><label for="power-notes-${id}">Your email address</label><div class="power-notes-row"><input id="power-notes-${id}" name="fields[email]" type="email" autocomplete="email" maxlength="254" placeholder="you@example.com" required><button class="button" type="submit">Send me Power Notes ↗</button></div><label class="power-notes-consent"><input type="checkbox" name="consent" value="yes" required><span>Yes, send me occasional AI Superpower tools, practical workflows, resources, and relevant offers. I can unsubscribe anytime.</span></label><input type="hidden" name="fields[signup_source]" value="aisuperpower.cc:${id}"><input type="hidden" name="ml-submit" value="1"><input type="hidden" name="anticsrf" value="true"><p class="small-note">Only AI Superpower’s list. Opens a secure confirmation page in a new tab. Confirm your email to join. <a href="/privacy">Privacy notice</a>.</p></form>`;
}
export function newsletterSection(){return `<section class="wrap section power-notes-section" aria-labelledby="power-notes-heading"><div><span class="eyebrow">POWER NOTES · FREE EMAIL UPDATES</span><h2 id="power-notes-heading">A useful AI idea.<br>A reason to try it.</h2><p>Tools worth a look, practical workflows, and one useful next step. Occasional notes from AI Superpower, curated by Ashley Kays.</p></div><div>${newsletterForm('home')}</div></section>`;}
