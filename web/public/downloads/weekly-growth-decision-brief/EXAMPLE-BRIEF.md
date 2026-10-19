# Weekly Growth Decision Brief — fictional example

**DRAFT FOR REVIEW · October 12–18, 2026 versus October 5–11, UTC**

**Decision this week:** investigate the paid-search conversion drop before changing the budget. Objective: increase qualified inquiries while understanding paid-search efficiency.

**Data readiness: Ready for the supplied descriptive comparison.** `sample-growth.csv` contains six mutually exclusive channel-week rows, with complete seven-day periods, one currency, and the same definition. `SAMPLE-CONTEXT.md` supplies the attribution and qualification assumptions. These inputs are fictional and have not been independently audited.

## Three observations

1. **Lead volume was flat despite more sessions.** Qualified leads stayed at 80; sessions rose from 2,000 to 2,200 (+10%). The aggregate lead rate moved from 4.00% to 3.64%, down 0.36 percentage points. Evidence: CSV rows 2–7. Confidence: high in the supplied arithmetic; cause unknown.
2. **Paid-search efficiency needs attention.** Spend rose from $1,000 to $1,250 (+25%) while qualified leads fell from 40 to 36 (−10%). Cost per qualified lead rose from $25.00 to $34.72 (+38.89%). Lead rate fell from 4.00% to 3.00% (−1.00 percentage point). Evidence: rows 2 and 5. The new landing-page variant coincided with the change, but query mix, device mix, tracking, and ordinary variation could also explain it. Confidence: high in measured values; low in a causal explanation.
3. **Email added four leads on a small base.** Leads moved from 8 to 12 on 200 sessions in each period; rate increased from 4.00% to 6.00% (+2.00 percentage points). Organic stayed at 32 leads. Evidence: rows 3–4 and 6–7. The email increase offset the paid-search decline, but 12 leads do not establish a repeatable lift or justify broad scaling.

## Next checks

| Check | Proposed owner | Effort estimate | Decision rule | Review |
|---|---|---|---|---|
| Reconcile paid-search lead events and qualification counts across both periods | TBD | 30 minutes | Resolve any coverage or definition mismatch before interpreting the comparison | TBD |
| Review the landing-page change alongside query/device mix | TBD | 60 minutes | Identify a reproducible problem or define a controlled test; timing alone does not justify a winner declaration | TBD |
| Review the twelve email inquiries for consistent qualification and a repeatable message pattern | TBD | 30 minutes | Record evidence supporting or contradicting another small test | TBD |

**What we cannot conclude:** customer acquisition cost, profitability, revenue impact, incrementality, statistical significance, or that the landing-page variant caused the decline. Do not infer these from leads alone.

## Calculation appendix

- Prior leads = 40 + 32 + 8 = 80; current = 36 + 32 + 12 = 80.
- Prior rate = 80 / 2,000 × 100 = 4.00%; current = 80 / 2,200 × 100 = 3.63636…%; difference = −0.36363… percentage points.
- Paid-search cost per lead: 1,000 / 40 = $25.00; 1,250 / 36 = $34.72222…; relative change = (34.72222… / 25 − 1) × 100 = 38.88888…%.
- Email rate: 8 / 200 × 100 = 4.00%; 12 / 200 × 100 = 6.00%. Physical CSV row 1 is the header.

**Reviewer checklist:** confirm period/definition assumptions; reproduce the paid-search calculation; keep explanations separate from facts; select the next check. Which check do you choose first?
