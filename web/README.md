# Superpowers by Waymaker

A first edition of the AI discovery and learning site: editorial shopping-style browsing, 500 source-attributed tool listings, 12 original workflows, 6 lessons, four training paths, workshop inquiries, coaching, comparisons, saved stacks and a simulated inspector.

## Run

Node 22 or newer; no npm dependencies.

```sh
npm run build
npm test
npm start
```

Open the local server on port 8080 (or set PORT). `build` produces 137 HTML pages in `dist`, with client-side navigation layered over rendered content. Search and favorites run in the browser. Saved stacks can be exported as JSON.

## Deploy to Railway

Use this repository and the implementation branch. Set the service root directory to `/web`. Use the included Dockerfile. Health endpoint: `/health`. The service reads Railway's `PORT` value. No credentials, API keys or environment variables are needed for this edition. Configure a custom domain after the brand/domain is confirmed.

## Content and evidence

- `public/catalog.mjs`: 13 original editorial summaries, based on publisher documentation read October 6, 2026. This is **not** live compatibility testing or security auditing.
- `public/imported.json`: 87 source-reported entries from the existing catalog. These are **not independently reviewed**. Every entry links to its original source and publisher repository.
- `public/content.mjs`: 12 learning routines, 6 guides. Routines are suggested methods, not tested end-to-end integrations.
- `public/views.mjs`: page composition, learning paths, inquiries and plain-language policies.
- `public/catalog-license.txt`: source catalog MIT license; preserve this and attribution when redistributing.
- `public/assets/hero.webp`: original AI-generated editorial artwork.

To refresh community imports: copy a current upstream `README.md` to `web/scripts/source-readme.md`, run `python web/scripts/import_catalog.py`, review the diff, update the import date and rebuild. The source README is not needed in deployment. Importing content never executes a server or installs a listed package.

## Behavior and boundaries

- Real search/filtering, comparisons (up to three), quick views, local saved stacks, export and deterministic two-question recommendations.
- Workshop and coaching forms open an email draft to info@waymaker.cx. They do not automatically send, book, subscribe or collect payments. No live workshop dates or pricing are asserted.
- The inspector is explicitly a browser-local simulation. It accepts no endpoint URL or credential and makes no external MCP call.
- No user accounts, database, background synchronization, automated security scanning or authenticated admin CMS in this edition.
- No analytics pixels, paid placements or affiliate tracking links. Google Fonts is an external font dependency.

## Next implementation phase

Add a database-backed editorial queue and authenticated administration; provenance-aware import jobs; account-based stacks; an actual workshop schedule and approved booking/payment integration. Build the remote inspector as an isolated service with SSRF controls, tenant isolation, OAuth handling, secret redaction, explicit action approvals, limits and independent security review. Do not enable arbitrary local server execution in the web process.

## Validation

`npm test` checks provenance, data integrity, intersecting filters, workflow references, rendering/escaping, server headers, 404s, methods and source-file exposure. Browser acceptance checks should cover responsive layout, keyboard operation, search, saving, comparison, finder, inquiry drafting and the demo.

## Artwork brief

Built-in image generation: premium beauty-campaign-style still life with a burgundy glass arch, lilac cube, silver sphere, cream pedestal and laptop on a sunlit peach backdrop. No text, logos or people. Asset stored at `web/public/assets/hero.webp`.

Expansion: 30 mission collections and 20 guided power stacks at /missions and /stacks. Community entries are source-reported, not independently verified. Run `python3 scripts/expand_catalog.py PATH TOTAL` against a supplied MIT catalog snapshot to add entries with stable IDs and duplicate URL checks. The offline review queue is scripts/catalog-review-queue.json; it is not exposed by the web server. No listed server code is run by imports. Category filters cover all imported categories. Sitemap covers rendered public pages; update its origin before changing domains.



## October 7 catalog and search visibility update

567 listings: 81 documentation-reviewed picks and 486 unverified community entries. The latest expansion adds 23 new tools and upgrades the existing Browserbase MCP entry without changing its URL. `/discoveries` introduces 48 recent picks; `/reviewed` links every reviewed listing in static HTML; `/answers` contains nine original answer-led guides. There are 10 themed collections, 34 customizable prompts, six workflow how-tos and 10 downloadable worksheets. Publisher URLs, review dates, first tasks and permissions are recorded with each new listing. Discovery directories are linked as independent references, without copied reviews or endorsement claims.

Build output includes canonical URLs, individual descriptions, social preview metadata and JSON-LD describing real visible entities. Public pages are pre-rendered. Personal pages, query results and unreviewed tool pages are noindex; noindex pages remain crawlable so the directive can be read. Sitemaps include editorial pages and reviewed tools. Duplicate index.html and trailing slash URLs redirect. `/support` canonicals to `/coaching`.

Missions, guided stacks and prompts have distinct titles and descriptions. A build test checks uniqueness across all 250 sitemap URLs. Collections and the Power Map have distinct content; answer articles use the article social type. The build renders 742 routes.

The canonical origin defaults to the current Railway domain. When the custom domain is attached and verified, set `SITE_URL` at build time (Docker build argument), rebuild, check canonical/sitemap URLs and configure redirects from the old hostname. Search Console ownership, sitemap submission, actual index coverage and real-user Core Web Vitals have not been verified. These foundations cannot guarantee rankings or citations by AI systems.

## MailerLite signup

Group: `200636581595318233` (Superpowers by Waymaker).
Embedded form: `200636635056965053` (Superpowers — Power Notes).
Dashboard: https://dashboard.mailerlite.com/forms/200636635056965053/overview
Public form: https://preview.mailerlite.io/forms/2626017/200636635056965053/share

The form was designed and saved in the MailerLite dashboard on October 7, 2026. Its public share page renders the email field, “Send me Power Notes” button, subscription consent and privacy link. The API confirms `has_content: true`, the correct group and double opt-in enabled. Its `active` field remains false; this embedded form's dashboard offers no activation toggle, and the shared form is publicly available. No real subscription or email-delivery test has been performed.

`public/newsletter.mjs` enables the hosted signup link. All signup CTAs go through `/newsletter`; there is no MailerLite API key or tracking script on the website. No campaigns or welcome automations were created or sent. An actual consented subscription test is still needed to verify confirmation-email delivery end to end.

## Tool Trial Lab

`/tool-trial` provides a same-task comparison for up to three catalog tools. Visitors define the task, acceptance criteria, sample case and optional baseline, then record their own verdict, work time, review/rework time and evidence. Blank times stay unknown; zero is valid; extra effort is reported as more time. There is no automatic winner or third-party benchmark score.

The comparison page can start a fresh trial from its shortlist. Changing a candidate clears that candidate’s prior observations from the draft. Inputs remain in memory until explicitly saved to `waymaker-tool-trial-v1` in this browser. Saving replaces the single saved trial; a blank draft does not remove it. Downloads and clipboard copies include user-entered notes. No trial data is sent to an AI service or stored in Supabase. Storage failures are reported, and a blank Markdown worksheet is linked for visitors without JavaScript.

Checks cover missing versus zero values, negative time savings, bounded stored values, unknown or duplicate candidates, honest exports and escaped form content. The Trial Lab does not collect email.


## Directory submissions and service listings

- `/submit`: tool, MCP, agent, plugin, connector, security, repository and resource suggestions.
- `/submit?kind=service`: professional services across nine specialties.
- `/services`: category cards, keyword/category filtering and accepted public service records.
- `POST /api/submissions`: validated JSON intake, 16 KB body cap, honeypot, same-site browser check, 5 submissions per contact email/hour and 100/hour per server process. Rate counters reset on deployment and are not distributed; add edge-level rate limiting/CAPTCHA before a large promotional launch. Direct database insertion is also possible with the publishable key, subject to database constraints and insert-only RLS. The key is not delivered by this website to the client.
- `GET /api/services`: only published public fields. Private contact data is held in a separate submissions table.

Database schema is recorded in `db/submissions-schema.sql` and applied via remote migration `superpowers_directory_submissions`. Clients can only insert pending records, cannot set editorial status or review notes, and cannot select submissions or publish services. Retry IDs use UUID v4; repeated inserts return the same receipt without changing the stored entry. A successful browser receipt follows confirmed database insertion. No submission data goes to MailerLite. No automated review emails are sent.

### Review a submission

Use the authenticated Supabase Table Editor for project `ihojffjglwrughdsskfz`, table `superpowers_submissions`, filtered to `status = pending` and ordered by `created_at`. Check the official link, duplicate listings, relevance, description and claimed expertise; record findings in `review_notes`. Set `needs_info` or `declined` when appropriate. This version intentionally uses Supabase's protected editor as the review queue; there is no public admin route or automatic approval.

For an accepted service, review/edit the public fields and copy only name, website, description, category, audience, location and pricing into `superpowers_services`, with `submission_id` pointing to the reviewed entry. Set `published = true` when ready. Then mark the submission `accepted`. The services directory shows the new record on its next load. Never copy contact_name, contact_email or review_notes into a public description. Set `published = false` to unlist. Readers cannot access unpublished rows or the submission reference.

For an accepted tool, normalize it to the existing `superpowers_tools.data` schema and add it to both the database catalog and the tracked catalog source so the detail page is generated on the next deploy. Use `Community listing`, `tested: false` unless an actual documented review justifies another label. Mark the intake accepted only after the detail page is live. Submission alone never updates tool review status.

Requests for corrections/removal go to info@waymaker.cx with the receipt reference. Public users cannot edit listings in this release. Do not promise a response time or automatic publication. Review pending entries regularly through Supabase.
