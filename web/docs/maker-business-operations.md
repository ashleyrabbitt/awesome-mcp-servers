# Maker Desk and directory business

## Release state — 2026-10-16

PR #19 is merged and live on aisuperpower.cc. Railway deployment `3428de37-b40e-41fc-8fc1-3a48f0b5ddfd` reached SUCCESS for commit `9d9473be13ff4057bd7756c53e85a2dd605b02ed`.

- All 63 Node tests pass, including the empty PostgREST insert response regression caught during live validation. The existing isolated PGlite/PostgreSQL integration suite passed migration execution, publishing, pricing search, reservation conflicts, payment matching/replays, reversed-before-paid events, rate limits and private-table permissions.
- Applied the prepared schema through the Supabase SQL Editor after the migration connector approval expired. All operational tables have RLS enabled; anonymous and ordinary authenticated roles cannot read private requests or publish listings.
- Deployed `superpowers-business` version 2 with its own bridge-key authentication. Stored the key digest and operator allowlist in private database tables; raw bridge key is in Railway only. Email capability is configured through the existing Resend service. Actual inbox delivery has not been tested.
- Live synthetic integration passed code verification, session logout, founder isolation, administrator authorization, submission publishing, ownership claims, moderated updates, approved checkout links, payment fulfillment/replay and refunds. All synthetic operational records were removed. No real charge or customer email was sent. Public browser submission produced a receipt and a private pending record, then the record was removed. Production HTTP checks passed public pages, protected account/admin APIs, cross-site write rejection, secure session cookies/logout, and signed/invalid webhook handling.
- Stripe one-time prices: featured `price_1UQsH9HwH8GUQ8qav8lk1uhs` ($49), working session `price_1UR8NZHwH8GUQ8qaQUXYiNo5` ($350), launch kit `price_1UR8NgHwH8GUQ8qae4auX4Qv` ($497). Payment Links are stored privately in `checkout_links`.
- Stripe webhook `we_1UR8O7HwH8GUQ8qaCHtyZqNr` is enabled for the four specified events. Its signing secret is configured in Railway. Do not create duplicate prices, links or endpoints.

- Pricing models for Cursor, Perplexity, ElevenLabs, Gamma and Make were checked against official publisher pricing pages and saved with sources and dates in `public/pricing-reviews.mjs` and the live catalog. The other 574 listings remain explicitly unverified. Existing newsletter acquisition uses the separate hosted MailerLite form; completed subscriptions are measured there. No affiliate partnerships or commission links have been activated by this release. Scheduling is agreed by an operator before payment, not a self-service calendar.

## Operations and pricing update — 2026-10-16

The review desk now includes queue totals, aging requests, paid services awaiting delivery, payment exceptions, and pending email acceptance. Queue totals are operational status counts, not revenue. The provider being configured or accepting a message does not establish inbox delivery. There were no transactional outbox messages or orders at this check; real inbox delivery remains untested.

- Pricing maintenance is available in `/admin`. Search by name or slug; filter unverified, due, current or all listings. The queue prioritizes unverified listings and recent outbound activity. Reviews become due after 90 days. Each save requires a publisher pricing/license source, a 10–160 character summary, explicit review confirmation and the current listing version. Sources and review dates publish immediately. A stale edit is rejected instead of overwriting another change. Approved founder pricing changes clear the prior editorial verification source/date.
- Activity reports cover the last 30 UTC calendar dates including the current partial day. They separate directory clicks, sponsored impressions/clicks, inquiries and submissions; offer and tool breakdowns use actual aggregate events. Founders can export their authorized activity; operators can also export pricing maintenance data. CSV exports omit contact data and protect against spreadsheet formulas.
- Report queries page through database response limits. Any application cap is explicitly marked as partial. Review queues include all pending items within the stated cap rather than only the latest 200 records. The payment audit and completed request history cover 30 days; unresolved requests remain visible.
- Added official pricing models for Runway, Descript, Tally, HeyGen, Granola, Napkin AI and Jasper. The catalog now has 12 sourced pricing checks and 567 unverified listings. Jasper is classified Paid because a short free trial does not establish a continuing free plan.
- Node validation: 71 tests pass, covering authorization, stale write rejection, pagination, UTC report windows, scoped exports, formula escaping, and verification invalidation. Build: 786 pages and 579 catalog tools. No new database schema, payment products, charges or customer emails are required for this release.

## Runtime and deployment order

1. Apply `web/db/business-schema.sql` to the existing Supabase project. This adds isolated operational tables, RLS, service-role-only functions and a pricing-aware public search RPC. It does not alter shared Supabase Auth settings.
2. Generate a random 32-byte bridge key. Store its SHA-256 hex digest in `superpowers_config` under key `site_key_hash`, as a JSON string. Put the raw value only in Railway's `SUPERPOWERS_BUSINESS_KEY` variable. Never commit it or put it in browser code.
3. Add the verified operator email to `superpowers_admins`. The UI cannot grant administrator rights. Other makers see only their own data.
4. Deploy `web/functions/superpowers-business/index.ts` and its relative `business.mjs` dependency as `superpowers-business`. It uses the project's existing internal `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY`. It validates the separate bridge key on every request; JWT verification can therefore be disabled for this custom-auth function. Do not expose a service-role key to Railway or the browser.
5. Check the internal `capabilities` action and validate email delivery from `noreply@waymaker.cx`. Sign-in codes are hashed in storage and expire after ten minutes; session tokens are hashed and expire after one day. The application sets an HttpOnly, Secure, SameSite=Strict cookie.
6. Create the remaining one-time Stripe prices and Payment Links in the Waymaker AI Inc account. Prices are $350 for `working-session`, $497 for `launch-kit`, and the existing $49 for `featured`. Use metadata `site=aisuperpower.cc` and `offer=<offer>` on each Payment Link and PaymentIntent. Redirect to `https://aisuperpower.cc/maker?checkout=returned` after payment. Never enable automatic tax without verified tax configuration. Do not configure recurring billing or optional quantities.
7. Store `checkout_links` in `superpowers_config` as a JSON object, keyed by offer, each containing `id` (Stripe Payment Link ID) and `url` (its HTTPS buy.stripe.com URL). Links are exposed only for approved requests and include the request UUID and prefilled email. Never publish the raw reusable links as general storefront CTAs.
8. Create a Stripe webhook for `https://aisuperpower.cc/api/stripe/webhook`, API version `2026-09-30.endive`, events `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `charge.refunded`, `charge.dispute.created`. Store its signing secret in Railway as `SUPERPOWERS_STRIPE_WEBHOOK_SECRET`. Do not overwrite unrelated webhook endpoints.
9. Validate DB permissions, code login, founder isolation, admin review, publishing, pricing search, payment replays, mismatched payments, reversed-before-paid events and placement reservations using isolated synthetic records. Do not charge a real card as a test. Clean up only the test records created by the validation.
10. Merge the PR after the live configuration is ready. Railway deploys `/web` from the existing repo. Require terminal SUCCESS and check the custom domain, form intake, Maker Desk, admin gate, tool pages and sitemaps.

## Daily operations

Sign in at `/maker` with the administrator email, then open `/admin`.

- Review submissions against official sources. Approvals publish immediately in the database. New tool pages and `/sitemap-tools.xml` are rendered from live published records without a rebuild.
- Verify ownership independently before accepting claims. Approved owners can submit changes, which still require review.
- Agree scope and timing before approving service requests. Working Sessions require a future agreed time. Featured orders require a published tool, future start and one of two slots. Conflicting reservations are rejected transactionally.
- Approved unpaid featured reservations remain held until paid or cancelled. Cancel stale unpaid requests in the dashboard to release capacity. This does not refund paid orders.
- Payment fulfillment checks signed raw-body webhooks, event/session uniqueness, paid status, currency, link, approved order, amount and customer email. Featured orders activate automatically for their reserved seven-day window after payment.
- Check the payment audit daily. Unmatched or duplicate purchases require manual reconciliation/refunds in Stripe. A mismatched or late payment does not fulfill the order. Refunds/disputes remove placements, including when reversal events arrive first.
- Workflow Setup, Team Training and newsletter requests are quote-only. Confirm custom terms and invoice them separately. Do not use the fixed-price payment flow for a custom quote.
- Mark paid service work delivered after completion. Retry failed transactional messages from the dashboard. Submission consent never becomes newsletter consent; newsletter signup continues through MailerLite.

## Reporting and support

Metrics count aggregate tool clicks, sponsored impressions/clicks, submissions and service inquiries. A daily salted network hash limits repeat events; counts are not unique people, leads or sales. Founders see their verified listings and paid promotion metrics. Review data retention/deletion requests manually across the operational tables, revoke sessions, and remove corresponding transactional outbox records. Do not delete shared Auth users.

## Recovery

Before a deployment, preserve a database backup and the current Railway deployment reference. Roll back the web deployment if needed; retain operational rows and payment audit records. Do not drop tables or rerun the initial schema blindly. Payment Links can be deactivated in Stripe if checkout needs to be paused. Keep the webhook running to process refunds and late events. A secret rotation requires coordinated updates to the database hash and Railway variable.
