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
