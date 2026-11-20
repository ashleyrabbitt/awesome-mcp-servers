# AI and tech news and jobs — November 20, 2026

## Scope and editorial method

Added eight source-linked news briefs in `web/public/november-20-news.mjs` and twelve curated job records in `web/public/jobs-data.mjs`. This document records research and data preparation; the application integration and deployment are handled separately.

News sources are the companies' own announcements or engineering articles. The `date` field retains the source publication date. These new AISuperpower briefs use November 20 for `datePublished` and `dateModified`. Commentary and suggested exercises are labeled as editorial interpretation. No product was hands-on tested for these briefs.

Job checks used public employer-controlled ATS pages with the role and application interface visible. The checked date is November 20, 2026. It does not represent a posting date, an employer guarantee that the position remains available, or an application submission. No applications were submitted. Unknown original posting dates are omitted. The retrieved postings did not consistently state employment type, so this field says `Not specified`. Salary is present only where the employer page provided a range; geography and qualifications remain attached to the range.

## News sources

| New brief | Source date | Primary source |
| --- | --- | --- |
| Performance Factory: investigation, review and recovery | November 19 | [OpenAI engineering article](https://openai.com/index/how-openai-performance-factory-keeps-chatgpt-fast/) |
| NVIDIA and Microsoft: cloud and local model deployment | November 19 | [NVIDIA announcement](https://blogs.nvidia.com/blog/microsoft-ignite-accelerated-computing-azure-windows-pcs/) |
| Multi-turn agent training with Tunix | November 19 | [Google developer tutorial](https://developers.googleblog.com/multi-turn-agentic-reinforcement-learning-with-tunix-and-gemma-4-on-google-tpus/) |
| Chip design and verification | November 18 | [OpenAI research article](https://openai.com/index/advancing-chip-design-with-our-models/) |
| Research acceleration and task-level measurement | November 18 | [OpenAI research report](https://openai.com/index/research-acceleration-jagged-frontier/) |
| ChatGPT for Sales | November 17 | [OpenAI product announcement](https://openai.com/index/introducing-chatgpt-for-sales/) |
| Full-stack Android apps in AI Studio | November 17 | [Google developer announcement](https://developers.googleblog.com/build-full-stack-android-apps-with-gemini-in-google-ai-studio/) |
| Microsoft Ignite: shared work and agent spending | November 17 | [Microsoft keynote transcript](https://blogs.microsoft.com/blog/2026/11/17/ignite-2026-building-the-frontier-ecosystem/) |

### Duplicate and freshness review

Compared source URLs and topics against `news-data.mjs` and `november-17-news.mjs`. GPT-6.2, A2UI 1.0 and the Codex sandbox explanation were already covered and were not added again. The existing Fable-in-Copilot story also made a second older Fable launch brief lower priority. Five of the new sources were published November 18–19; three missing November 17 releases were retained for their practical relevance. News ordering should continue to use the source date, not the curation date.

## Jobs checked

All records below have a direct application URL, explicit location limits, role requirements and `status: 'Open when checked'`.

| Company | Role | Location and material conditions | Employer source |
| --- | --- | --- | --- |
| Safari AI | GTM Engineering Lead | Miami; in-office; Miami candidates only | [Posting](https://job-boards.greenhouse.io/safariai/jobs/5200856007) |
| Unframe | Regional GM — Florida | Florida remote; Miami and Tampa listed | [Posting](https://job-boards.greenhouse.io/unframe/jobs/4861847101) |
| Unframe | Full Stack Software Engineer | Remote U.S. East Coast; includes Miami and Tampa | [Posting](https://job-boards.greenhouse.io/unframe/jobs/5010248101) |
| Warp | Product Designer | Remote in U.S. or Canada | [Posting](https://job-boards.greenhouse.io/warp/jobs/6237969004) |
| Gather AI | Product Designer | U.S. remote considered; Pittsburgh preferred; about 20% travel | [Posting](https://job-boards.greenhouse.io/gatherai/jobs/5176171007) |
| VIA | Principal Product Designer | U.S. remote; application asks about citizenship, clearance and work authorization | [Posting](https://job-boards.greenhouse.io/via99/jobs/4470521009) |
| Arize AI | Senior AI Product Manager, Evals & Annotations | U.S. remote | [Posting](https://job-boards.greenhouse.io/arizeai/jobs/6254817004) |
| Hone Health | Product Manager, AI Experience | U.S. remote only | [Posting](https://job-boards.greenhouse.io/honehealth/jobs/5209898008) |
| Triple Whale | Senior Product Marketing Manager, AI | U.S. remote | [Posting](https://job-boards.greenhouse.io/triplewhale/jobs/5460035008) |
| Prolific | Senior Product Marketing Manager, AI — Frontier Labs & Enterprise | U.S. remote | [Posting](https://job-boards.greenhouse.io/prolific/jobs/5033481101) |
| Syllo | Senior Software Engineer, Applied AI | U.S. remote; U.S. work-authorization questions in application | [Posting](https://job-boards.greenhouse.io/syllo/jobs/4407264009) |
| SecurityScorecard | Distinguished Software Engineer, AI | U.S., Canada and Latin America; no immigration sponsorship | [Posting](https://job-boards.greenhouse.io/securityscorecard/jobs/8324966) |

### Results deliberately excluded

- Chewy's Senior Copy Editor listing appeared in search but the direct employer page returned 410 Gone.
- Feathery's Product Marketing Manager listing appeared in search but the direct ATS page returned 404.
- Contentsquare's designer listing could not be read directly because the request returned 403; it was not counted as a verified opening.
- NextEra's current search snippets mentioned an AI strategist role, but the opened category page returned an older cached job set. No exact current role page was verified, so it was not published.
- Correlation One's AI Coach page explicitly describes proactive Expert Network recruitment for future projects. It was not presented as an immediate job opening.
- Flodesk's AI product role is available, but the application limits eligible states without exposing the selection in the retrieved text. It was not labeled as unrestricted U.S. remote.

## Data checks

- Required content fields are present in every news item and job record.
- IDs and source URLs are unique within each new collection.
- New news source URLs do not duplicate existing sources after normalizing optional `/en/` path prefixes and trailing slashes.
- Dates do not exceed the November 20 curation date; job posting dates were not inferred.
- Existing news content and publication dates were left unchanged.

The linked primary URLs provide the editorial evidence. Availability must be rechecked when refreshing the listings.
