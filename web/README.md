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

## MailerLite signup setup (pending form publication)

Dedicated group: `200636581595318233` (Superpowers by Waymaker).
Draft embedded form: `200636635056965053` (Superpowers — Power Notes).
Dashboard: https://dashboard.mailerlite.com/forms/200636635056965053/overview
Provider share URL: https://preview.mailerlite.io/forms/2626017/200636635056965053/share
Double opt-in is enabled in the returned form settings. No campaigns or welcome automations were created or sent. The connector can create forms but cannot design or publish their content, and the returned form has `has_content: false`. Consequently `public/newsletter.mjs` keeps signup disabled and the public page collects no email addresses.

Finish the form in MailerLite with title “A little inspiration for your inbox”, description “New tools to explore, practical workflows to try, and news about Superpowers training and workshops”, an email field and a “Send me Power Notes” button. Include a privacy link and clear subscription consent. Keep double opt-in enabled. Verify the public form and its correct group, then set `newsletter.enabled` to true, update newsletter metadata/privacy copy and remove `/newsletter` from the noindex set in `public/seo.mjs`. All site signup CTAs go through `/newsletter`; no private API key is exposed. A genuine consented subscription test remains required to verify email delivery end to end.


## Tool Trial Lab

`/tool-trial` provides a same-task comparison for up to three catalog tools. Visitors define the task, acceptance criteria, sample case and optional baseline, then record their own verdict, work time, review/rework time and evidence. Blank times stay unknown; zero is valid; extra effort is reported as more time. There is no automatic winner or third-party benchmark score.

The comparison page can start a fresh trial from its shortlist. Changing a candidate clears that candidate’s prior observations from the draft. Inputs remain in memory until explicitly saved to `waymaker-tool-trial-v1` in this browser. Saving replaces the single saved trial; a blank draft does not remove it. Downloads and clipboard copies include user-entered notes. No trial data is sent to an AI service or stored in Supabase. Storage failures are reported, and a blank Markdown worksheet is linked for visitors without JavaScript.

Checks cover missing versus zero values, negative time savings, bounded stored values, unknown or duplicate candidates, honest exports and escaped form content. MailerLite publication remains pending; the Trial Lab does not collect email.
