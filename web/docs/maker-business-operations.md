# Maker Desk and directory business

## Release state — 2026-10-15

Prepared in PR #19. This release is not deployed yet. The previous production release still serves free submission intake.

- Local build and 62 Node tests passed. An isolated PGlite/PostgreSQL integration run also passed migration execution, publishing, pricing search, reservation conflicts, payment matching/replays, reversed-before-paid events, rate limits and private-table permissions. Live integration validation is still required.
- Supabase migration attempts did not apply. The connector returned `Invalid or expired requestState`; a read-back showed only the original tools, submissions and services tables.
- Stripe created the featured price: `price_1UQsH9HwH8GUQ8qav8lk1uhs`, lookup key `aisuperpower_featured_7d_v1`, product `aisuperpower_featured_7d_v1`, $49 USD. Reuse it; do not recreate it.
- No AISuperpower payment links, webhook, Edge Function or Railway secrets have been configured by this release.
- Browser visual validation remains pending: the local Chromium download failed.

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
