const DAY = 86400000;
export function reportWindow(now = new Date()) {
  const until = new Date(now).toISOString().slice(0, 10);
  const since = new Date(Date.parse(until) - 29 * DAY).toISOString().slice(0, 10);
  return {since, until};
}
export function pricingState(tool, now = new Date()) {
  const checked = tool.pricing_checked_at;
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(checked || '') && Number.isFinite(Date.parse(checked));
  if (!['Free', 'Freemium', 'Paid', 'Open source'].includes(tool.pricing_model) || !/^https:\/\//.test(tool.pricing_source || '') || !validDate || Date.parse(checked) > +new Date(now)) return 'unverified';
  return +new Date(now) - Date.parse(checked) >= 90 * DAY ? 'due' : 'current';
}
export function activitySummary(rows = []) {
  const totals = {tool_click: 0, featured_impression: 0, featured_click: 0, service_inquiry: 0, submission_received: 0};
  const tools = new Map(), inquiries = new Map();
  for (const row of rows) {
    if (!Object.hasOwn(totals, row.kind)) continue;
    const n = Number(row.count);
    if (!Number.isFinite(n) || n < 0) continue;
    totals[row.kind] += n;
    if (row.kind === 'service_inquiry') inquiries.set(row.tool_id, (inquiries.get(row.tool_id) || 0) + n);
    if (['tool_click', 'featured_impression', 'featured_click'].includes(row.kind)) {
      const item = tools.get(row.tool_id) || {id: row.tool_id, tool_click: 0, featured_impression: 0, featured_click: 0};
      item[row.kind] += n;
      tools.set(row.tool_id, item);
    }
  }
  return {totals, tools: [...tools.values()].sort((a, b) => (b.tool_click + b.featured_click) - (a.tool_click + a.featured_click) || a.id.localeCompare(b.id)), inquiries: [...inquiries].sort((a, b) => b[1] - a[1])};
}
export function pricingQueue(tools = [], {query = '', filter = 'attention', metrics = [], now = new Date()} = {}) {
  const clicks = new Map(activitySummary(metrics).tools.map(t => [t.id, t.tool_click + t.featured_click]));
  const ranks = {unverified: 0, due: 1, current: 2};
  const q = query.trim().toLowerCase();
  return tools.map(t => ({...t, review_state: pricingState(t, now), clicks: clicks.get(t.id) || 0}))
    .filter(t => (!q || [t.name, t.id, t.publisher].join(' ').toLowerCase().includes(q)) && (filter === 'all' || (filter === 'attention' ? t.review_state !== 'current' : t.review_state === filter)))
    .sort((a, b) => ranks[a.review_state] - ranks[b.review_state] || b.clicks - a.clicks || (a.editorial_order ?? 1000) - (b.editorial_order ?? 1000) || a.id.localeCompare(b.id));
}
export function operationsSummary(d, now = new Date()) {
  const submissions = (d.submissions || []).filter(s => ['pending', 'needs_info'].includes(s.status));
  const changes = (d.changes || []).filter(s => s.status === 'pending');
  const requests = (d.orders || []).filter(s => s.status === 'requested');
  const awaiting = (d.orders || []).filter(s => s.status === 'approved');
  const paid = (d.orders || []).filter(s => s.status === 'paid');
  const paymentReview = (d.orders || []).filter(s => ['payment_review', 'disputed'].includes(s.status));
  const aging = [...submissions, ...changes, ...requests].filter(s => +new Date(now) - Date.parse(s.created_at) >= 3 * DAY).length;
  return {submissions: submissions.length, changes: changes.length, requests: requests.length, awaiting: awaiting.length, paid: paid.length, paymentReview: paymentReview.length, mail: (d.mail || []).length, aging};
}
function csvCell(value) {
  let s = String(value ?? '');
  // Quoting alone does not prevent spreadsheet formula execution.
  if (/^[\s\u0000-\u001f]*[=+@-]/.test(s) || /^[\t\r\n]/.test(s)) s = "'" + s;
  return '"' + s.replaceAll('"', '""') + '"';
}
const csv = rows => '\uFEFF' + rows.map(row => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
export function activityCSV(rows, window = reportWindow(), partial = false) {
  return csv([['period_start_utc', 'period_end_utc', 'report_status', 'day_utc', 'tool_or_offer', 'event', 'event_count'], ...rows.map(r => [window.since, window.until, partial ? 'partial' : 'complete', r.day, r.tool_id, r.kind, Number(r.count)])]);
}
export function pricingCSV(tools, now = new Date()) {
  return csv([['tool_id', 'name', 'pricing_model', 'pricing_details', 'publisher_source', 'checked_date', 'review_status'], ...pricingQueue(tools, {filter: 'all', now}).map(t => [t.id, t.name, t.pricing_model || 'Unknown', t.pricing || '', t.pricing_source || '', t.pricing_checked_at || '', t.review_state])]);
}
