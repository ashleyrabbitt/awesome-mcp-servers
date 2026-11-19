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

## Existing GA4 properties

| Site | Existing production tag | Path filter |
| --- | --- | --- |
| AI Superpower | G-R9X4RKWE12 | Begins with /learn/lovable |
| AI Teachers | G-NBS56V6S3P | /learn/lovable-practice/ |
| AI Side Hustle | G-4N11DK5HTR | /guides/lovable-pocket-products |

These are distinct properties. Do not sum users across them and call the result unique people. Cross-site links use a consistent campaign and site source; internal links within a site stay untagged. Browser privacy signals, user choices, blockers and cross-device use can reduce measured activity.

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

The available reporting connector returned subscription_required/payment_required during this launch. No live GA4 report receipt, audience numbers, ranking improvements or conversion results are asserted. Verify report-side delivery when access is available.

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
