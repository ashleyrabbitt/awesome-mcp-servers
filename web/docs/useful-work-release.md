# Useful work, shared kits, and requested tool updates

This release turns discovery into a practical next step: a guided starter, three downloadable practice workflows, four role starter kits, a stack cost calculator, and five original decision guides. Three comparison kits use the same fictional inputs and explicit acceptance criteria. They link to publisher documentation and open in the existing Trial Lab; they do not claim hands-on vendor results.

Account holders can explicitly publish a snapshot of tool selections and a public description, then unpublish it. Private account details and notes are excluded. Shared snapshots and unsubscribe pages are noindex. Watching a tool never subscribes an account to email. The weekly digest requires explicit consent and includes only matching new directory listings and reviewed pricing or availability changes. Reports stay private to the reporter and editors until editors independently update a listing.

## Deployment order

1. Apply `web/db/useful-work-schema.sql` to the existing Supabase project.
2. Deploy `superpowers-business` with index.ts, business.mjs, discovery.mjs, community.mjs, and notification-topics.mjs. Retain the existing custom bridge authentication and verify_jwt=false configuration.
3. Deploy the web service. The existing production process runs a lightweight dispatcher; PostgreSQL owns due dates and delivery leases. No additional paid service is required.
4. Check live public pages, API access controls, and the admin delivery queue.

All five new tables deny direct anonymous/authenticated client access. Server actions validate session ownership and administrative privileges. Digest deliveries use a frozen payload, unique email/period key, leases, provider idempotency keys, and a conservative retry window. Unsubscribe links carry single-purpose random capabilities; they do not expose email addresses or sign-in tokens. An explicit cutoff preserves changes arriving while a digest is being prepared. Empty digests are skipped. Delivery problems appear in the admin queue.

## Validation and limits

The local build, 110 application tests, four editorial tests, and isolated PostgreSQL checks pass. The PostgreSQL checks exercise grants/RLS, source-backed event creation, atomic queueing, leases, retries, opt-out cancellation, and expired delivery holds. An owner-requested sign-in email reached the owner's inbox; no customer campaign was sent. Browser automation is unavailable in this environment, so visual and signed-in browser walkthroughs remain unverified.

Affiliate application drafts are not merchant approval. Keep normal publisher URLs until approved merchant referral links are provided. Real hands-on comparison results require actual product runs and saved evidence. The existing payment and free scoping-call links are reused; these flows do not imply a paid appointment is already booked.

## Follow-through — October 17 evening, America/New_York

Live Chrome checks confirmed guided selections, checklist persistence after reload, cost calculation (annual commitments, seats and usage), and a correctly prefilled Trial Lab with untested verdicts preserved. A 390px viewport check confirmed a single-column starter with no document overflow. The mobile account entry is now exposed in the main navigation.

The admin discovery dashboard now previews actual published listing changes and can send the weekly digest layout as an explicitly labeled one-time test to the signed-in administrator only. It does not change subscription preferences or contact customers. Retries reuse the original stored message to preserve provider idempotency even if the public change feed changes. The normal digest retains its unsubscribe links.

The browser is currently signed out. Completing sign-in is required for the remaining authenticated browser walkthrough and inbox check of the new digest test. No merchant-specific approval or referral link was found in the focused connected-mail search. The existing application drafts remain drafts. No vendor benchmark runs have been represented as completed.
