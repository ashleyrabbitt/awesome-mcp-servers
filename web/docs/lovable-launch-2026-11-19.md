# Lovable learning launch: implementation and measurement

Reviewed November 19, 2026. Independent AI Superpower material by Ashley Kays.

## Public destinations

- Main course: https://aisuperpower.cc/learn/lovable
- Free kit: https://aisuperpower.cc/learn/lovable#free-kit
- Brief builder, Resource Shelf demo and campaign links: https://aisuperpower.cc/learn/lovable/toolkit
- Distribution and measurement: https://aisuperpower.cc/learn/lovable/distribution
- AI Teachers companion: https://aiteachers.cc/learn/lovable-practice/
- AI Side Hustle companion: https://aisidehustle.cc/guides/lovable-pocket-products

These are intended production destinations. Deployment and live checks must be recorded separately; a source commit alone does not prove publication.

## Contents and editorial boundaries

The main site has 16 individual lessons plus hub, toolkit and distribution pages. Each lesson includes a direct answer, original explanation, focused prompt, checkpoints and official sources. Resource Shelf is an authored teaching example with six fictional resources. It is not evidence of a build inside Lovable. The Higgsfield-generated hero is labelled as an illustration. No customer outcomes, traffic, earnings, endorsements, or certifications are implied.

AI Teachers offers a separate 90-minute practice session. AI Side Hustle covers a small client-resource product and demand/usefulness validation. Keep these distinct editorial treatments; do not syndicate the full main course to every domain.

The free public downloads live under `/downloads/lovable/`. The product generator is `web/scripts/build-lovable-products.py`. When updating a PDF, regenerate the ZIP too. Check every download and worksheet path after deployment.

## Existing production GA4 measurement tags

| Site | Existing production tag | Path filter |
| --- | --- | --- |
| AI Superpower | G-R9X4RKWE12 | Begins with /learn/lovable |
| AI Teachers | G-NBS56V6S3P | /learn/lovable-practice/ |
| AI Side Hustle | G-4N11DK5HTR | /guides/lovable-pocket-products |

These sites use distinct measurement tags. Confirm their property/stream association in GA4 before reporting across properties. Do not sum users across sites and call the result unique people. Cross-site links use a consistent campaign and site source; internal links within a site stay untagged. Browser privacy signals, user choices, blockers and cross-device use can reduce measured activity.

## AI Superpower custom events

| Event | Meaning |
| --- | --- |
| lovable_hub_view | Main course hub became the active page |
| lovable_lesson_view | A particular lesson became the active page |
| lovable_toolkit_view | The toolkit became the active page |
| lovable_distribution_view | The distribution guide became the active page |
| lovable_prompt_copy | Clipboard API accepted a copy of a prompt, brief or draft |
| lovable_brief_export | The browser prepared the editable brief download |
| lovable_kit_download | Click on a fixed kit, resource or worksheet download |
| lovable_lesson_complete | Reader checked their own lesson completion box |
| lovable_demo_action | Fixed demo filter, save, detail or reset action |
| lovable_campaign_link_copy | Clipboard API accepted a generated campaign link |

Custom parameters are only `course_id=lovable-foundations` and an allowlisted `content_id`. They never include brief input text, search queries, names, emails, generated prompts, or arbitrary URLs. A file-click event does not prove a completed transfer or use of a file. Self-reported completion is not proficiency. GA4 standard page_view remains the source for pageview reporting.

The client suppresses custom collection outside production hosts and when the existing privacy guard applies. Browser-local progress/favourites fall back to memory when storage fails. Brief fields stay in the current page. Both forms are disabled in the static HTML until submit interception is installed, so a JavaScript failure cannot send their text via a default GET request.

## Reporting workflow

1. In each GA4 property, open Pages and screens and use the exact path filter above. Compare Views, Active users and engagement separately.
2. For campaign acquisition, use Traffic acquisition with session source/medium and session campaign `lovable-launch`. Keep a source/creative ledger from the downloadable tracker.
3. For useful actions, inspect the fixed events. Register `course_id` and `content_id` as event-scoped custom dimensions when needed for long-term reporting; use only editorial IDs. This registration was not performed by this code change.
4. Use a session segment containing the chosen action to calculate useful-action rate: tutorial sessions with one or more chosen actions divided by tutorial sessions. Do not divide the sum of every event by pageviews.
5. Check Search Console indexing and search page/query performance separately from GA4. Google's Generative AI report reports impressions from supported Google surfaces, not all AI assistants. Bing AI Performance reports supported citation activity, not website visits.
6. For Whop, compare tracking-link activity, free joins and available course/file use. A free join is not sales revenue.
7. Record source, date range, metric definition and caveats in the tracker. Leave unobserved values blank.

The first reporting connector returned subscription_required/payment_required. A separate Supermetrics GA4 connection was authenticated and two uncached reports for November 19, 2026, restricted to Lovable paths, completed with no rows. An empty report is not a verified zero-event count and does not confirm event receipt. Recent data may still be incomplete.

Account lookup found exact-name properties for AI Teachers (556486263) and AI Side Hustle (555757987). A property labelled aisuperpowers.cc (558211017, plural) is only a candidate for singular aisuperpower.cc: the query returned no hostname/stream rows, and no measurement-ID mapping was exposed. Do not assume that association. The existing Supermetrics trial reports an expiry of November 20; no subscription or configuration was changed.

Client behavior and deployed event wiring were verified. Report-side receipt, audience totals, ranking improvements and conversion results remain unverified. Subsequent counts may include synthetic launch QA visits, copies and downloads; separate those from evidence of audience demand.

## Distribution status and next steps

The distribution page and kit include ready-to-adapt copy and a 14-day test. They do not indicate that posts or a Whop storefront have been published. Start with a Free Whop product, verify included app access, test a new member's delivery, and inspect the current Discover requirements. Keep a later paid service separately priced.

Monetise currently has a public Whop storefront. Its archived public landing page mentions Skool. Other platform recommendations are our independent recommendations, not claims about current private Monetise lessons. r/lovable rules currently limit project links to .lovable.app and restrict promotion, so do not post the AI Superpower promotional link there.

## Primary references

- https://docs.lovable.dev/
- https://docs.lovable.dev/introduction/credits-and-usage
- https://docs.lovable.dev/features/analytics
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://support.google.com/webmasters/answer/16984139?hl=en
- https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/
- https://whop.com/monetise/
- https://www.monetise.com/archives/misc/v1
- https://whop.com/blog/whop-store-page/
- https://whop.com/blog/whop-courses/
- https://www.reddit.com/r/lovable/

## Release verification

- AI Superpower source launch: 38bdbb880c5a4bb016ec35031e42acccf6109578. Scoped CSS follow-up: 7f67ffb60eea2e6bd89ae8a3e9fbb7136588285d, successful production deployment c8b980fe-6c3a-4f32-b1a3-c675f690ce03.
- All 19 new production routes returned HTTP 200 with matching canonical, visible H1, indexable metadata and sitemap entries. All 18 download files matched the source bytes.
- Browser verification covered lesson navigation, prompt/brief copying, self-reported progress, brief creation/export, whitespace-insensitive resource search, combined filters/empty/reset states, local saves/details, real worksheet/ZIP downloads and generated/copyable campaign links. The article-header/global-sticky-header collision was fixed and rechecked in production.
- AI Teachers companion: source commit 41a36f0fb8176b73b7d407ce860f4d82bc5a3eac, successful deployment 5b805ad4-236d-48ea-bf57-4226b4ab8314. Guide, copy button and practice check display verified live.
- AI Side Hustle companion: Waymaker PR 1830, merged commit 837a17f64872d9cbc52aaba2c5abd13b90a57c57, successful deployment db18f2a2-5062-4f0c-bef8-2ca4e6dae66d. Article, download, discovery links, metadata and tracking script verified; live reading layout and copy button checked.
- Workbook: 15 pages. Checklist: 3 pages. Both rendered and visually checked throughout. Kit: 17 individual content files plus ZIP, 32 prompts, 26 proposed test cases, six actual worksheets, 20 blank tracking rows. ZIP integrity and exact-file matching passed.
- WebsiteTraffic additions were deferred after an observed HTTP 503. No outage repair, unrelated branch merge, Whop listing publication or social posting was performed.
