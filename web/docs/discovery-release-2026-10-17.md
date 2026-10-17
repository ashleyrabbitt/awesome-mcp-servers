# Discovery and retention release — October 17, 2026

## Visitor experience

- `/search`: task vocabulary and explained editorial shortlists, with catalog-name fallback and links to practical learning. This is transparent rule-based matching, not an LLM recommendation or performance ranking.
- `/alternatives`: six substantive guides covering ChatGPT, Canva, Otter, Make, Descript and Gamma, linked to publisher evidence and a same-task evaluation.
- `/updates`: directory review/update dates and a qualifying popularity list. Popularity uses non-sponsored outbound events from the last 30 UTC calendar days, with at least ten events on three days. No result is shown before the threshold is met.
- `/account`: existing email-code authentication, private named kits, explicit cross-device save/open, followed topics and an in-site updates feed. It does not upload drafts or subscribe users to email. Power Notes remains a separate opt-in.
- `/requests` and tool-profile Q&A: signed-in requests and votes, private contact data, editorial moderation and verified-owner answers. Requests and approved answers render server-side for public discovery.
- `/free-tools`: existing useful utilities and learning resources in one place.
- `/media-kit`: actual service prices, placement limits, reporting definitions and audience verification before a quote.
- `/deals`: only approved, published offers in their active date range. Empty until real offers are entered; no invented codes, affiliate relationships or audience claims.
- Tool profiles: task fit, limitations, demo/screenshot links, evidence-based availability and alternatives. Unchecked availability remains explicitly unverified.
- Pricing: paid trials are distinguishable from permanent free plans. Beautiful.ai and Chatbase trial flags are based on their official pricing pages checked October 17.

## Operations

Existing `/admin` links to `/admin/discovery`. Administrators can moderate questions and maker answers, maintain offer eligibility/approval evidence/start/end dates, and publish sourced availability reviews with optimistic conflict checks. A failed HTTP check alone is not discontinuation evidence. Maker Desk accepts best-fit and limitation text as reviewed listing updates.

Apply `db/discovery-schema.sql` before deploying the `superpowers-business` function and web server. The function keeps its existing custom bridge authentication and session validation; `verify_jwt:false` is intentional. New private tables have RLS enabled and all public/anon/authenticated direct grants revoked. Public output is an explicit projection through a service-role-only RPC; no email, individual vote, session, or private approval evidence is exposed.

No additional secrets or paid providers are required. Existing sign-in mail uses Resend. Domain readiness is known; actual inbox arrival and cross-device email sign-in still require an operator's inbox check. No customer email or charge was triggered during this release.

## Validation

- App build: 817 routes, 321 indexable static URLs (dynamic editorial routes remain separate).
- 94 application tests, including 15 new discovery/access-control tests.
- Four editorial tests; fixed a pre-existing calendar-sensitive test that assumed the second scheduled article was always unpublished.
- Isolated PostgreSQL verification: RLS/grants, public field projection, pending content, unique votes, active/expired/future offer windows, popularity thresholds, trial filters and account conflict handling.
- Production read-back confirms the five new tables deny direct anonymous/authenticated reads. Security advisor notices for these private tables are informational “RLS enabled, no policy”; deny-by-default is intentional because all access uses the authenticated bridge.
- Visual preview exercised natural-language search and corrected generic-name matching. Production health and public routes must be checked after Railway reaches SUCCESS.

## Commercial dependencies

Approved merchant referral URLs, offer permission and exact terms are still required before publishing affiliate deals. Popularity needs genuine qualifying traffic. Topic following is an in-site feed; personalized email delivery is not scheduled. Free basic listings, courses and resources remain available.
