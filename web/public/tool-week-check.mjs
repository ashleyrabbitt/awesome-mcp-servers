import './analytics.js';

const form = document.querySelector('#trial-week-feedback');
if (form) {
  const status = form.querySelector('[role="status"]');
  const choices = new Set(['exa', 'tinyfish', 'both', 'neither']);
  const key = 'tool-trial-week-response-v1';
  const send = (name, fields = {}) => {
    if (typeof window.gtag !== 'function') return false;
    window.gtag('event', name, { guide_id: 'ten_tool_field_guide', ...fields, transport_type: 'beacon' });
    return true;
  };
  form.hidden = false;
  let answered = false;
  try { answered = localStorage.getItem(key) === 'answered'; } catch {}
  function lockAnswer() {
    form.querySelector('fieldset').disabled = true;
    status.textContent = 'You have already shared a week-one answer from this browser.';
  }
  if (answered) lockAnswer();
  form.addEventListener('submit', event => {
    event.preventDefault();
    const choice = new FormData(form).get('kept');
    if (answered || !choices.has(choice)) return;
    if (!send('tool_trial_week_feedback', { kept_tool: choice })) {
      status.textContent = 'Feedback collection is off in this browser. You can still record your decision in the scorecard.';
      return;
    }
    answered = true;
    try { localStorage.setItem(key, 'answered'); } catch {}
    lockAnswer();
    status.textContent = 'Thank you. Your week-one choice was queued for reporting.';
  });
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href);
    if (url.origin === location.origin &&
        (url.pathname === '/downloads/ai-tool-trial-scorecard.csv' ||
         (url.pathname === '/free-material' && url.searchParams.get('file') === '/downloads/ai-tool-trial-scorecard.csv'))) {
      send('tool_trial_scorecard_click');
    }
    const provider = { 'exa.ai': 'exa', 'www.exa.ai': 'exa', 'tinyfish.ai': 'tinyfish', 'www.tinyfish.ai': 'tinyfish' }[url.hostname];
    if (provider) send('tool_trial_provider_click', { provider });
  });
}
