# Agent field guide and catalog expansion

Published release prepared October 31, 2026 for aisuperpower.cc.

## User-facing changes

- Added 60 distinct tools; live catalog expands from 592 to 652. Source fallback previously omitted the already-approved AirCube listing; it now preserves that record too.
- Added /agents, homepage discovery, navigation and four practical guides with exact step diagrams and example prompts.
- Clarified the existing request → approved scope → Maker Desk → Stripe payment flow. No new prices or payment behavior.
- Article links marked data-editorial-link use full navigation from the client router so server-rendered guides resolve normally.

## Evidence and validation

Publisher pages were reviewed for the new tools. Listings are marked documentation-reviewed and tested:false; pricing stays Unknown / Check provider. Examples are suggested exercises, not performance benchmarks.

Build: 905 routes, 652 tools. All 121 existing Node and editorial checks pass. Updated stale catalog expectations and a pre-existing guide count assertion (17 → 22).

Browser preview confirmed homepage discovery and /agents layout. The preview browser rejected an article navigation at its URL-policy layer; article rendering, canonical paths, images, feeds and sitemaps were covered by the HTTP/editorial checks.

Live catalog update: inserted only the 60 new IDs in superpowers_tools; no prior records overwritten, no schema changes. Query verified new rows and search.

Payment audit: active one-time Stripe prices and links for working-session ($350), launch-kit ($497) and featured ($49 / 7 days) match configured database links. Webhook enabled at /api/stripe/webhook; Railway signing-secret setting present. No real charge, inquiry, booking or email was sent. End-to-end inbox delivery and a real purchase remain untested in this release. Custom workflow and training engagements require quotes.

## Added tools and publisher evidence

| Tool | Publisher source |
| --- | --- |
| ChatGPT Work | https://learn.chatgpt.com/docs/enterprise/chatgpt-work-overview |
| Claude Cowork | https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork |
| Grok Bot | https://docs.x.ai/grok-bot/get-started |
| Manus | https://manus.im/ |
| Browser Use | https://browser-use.com/ |
| Skyvern | https://www.skyvern.com/ |
| OpenHands | https://www.openhands.dev/ |
| Cline | https://cline.bot/ |
| Roomote | https://roomote.dev/ |
| Aider | https://aider.chat/ |
| GitHub Copilot | https://github.com/features/copilot |
| Codex Cloud | https://learn.chatgpt.com/docs/cloud |
| OpenCode | https://opencode.ai/ |
| Amp | https://ampcode.com/ |
| goose | https://goose-docs.ai/ |
| Apify | https://apify.com/ |
| Browse AI | https://www.browse.ai/ |
| Octoparse | https://www.octoparse.com/ |
| ParseHub | https://www.parsehub.com/docs/ref/api/v2/ |
| Diffbot | https://www.diffbot.com/ |
| Airbyte | https://airbyte.com/ |
| Unstructured | https://unstructured.io/ |
| LlamaParse | https://www.llamaindex.ai/ |
| Haystack | https://haystack.deepset.ai/ |
| Botpress | https://botpress.com/ |
| Voiceflow | https://www.voiceflow.com/ |
| Dust | https://dust.tt/ |
| TinyFish | https://www.tinyfish.ai/ |
| OpenRouter | https://openrouter.ai/ |
| Pipedream | https://pipedream.com/ |
| Photoroom | https://www.photoroom.com/ |
| Pixelcut | https://www.pixelcut.ai/ |
| remove.bg | https://www.remove.bg/ |
| Clipdrop | https://clipdrop.co/ |
| Luma · Dream Machine | https://lumalabs.ai/learning-hub/web-quick-start |
| Pika | https://pika.art/ |
| Higgsfield | https://higgsfield.ai/ |
| Suno | https://suno.com/ |
| Auphonic | https://auphonic.com/ |
| Adobe Podcast | https://helpx.adobe.com/podcast/adobe-podcast-faq.html |
| Riverside | https://riverside.com/ |
| Kapwing | https://www.kapwing.com/ |
| Captions | https://captions.ai/ |
| Genspark | https://www.genspark.ai/ |
| SciSpace | https://scispace.com/ |
| Scite | https://scite.ai/ |
| ResearchRabbit | https://www.researchrabbit.ai/ |
| Buffer AI Assistant | https://buffer.com/ai-assistant |
| Litmaps | https://www.litmaps.com/ |
| Scholarcy | https://www.scholarcy.com/ |
| Jenni | https://jenni.ai/ |
| Paperpal | https://paperpal.com/ |
| Taskade | https://www.taskade.com/ |
| Motion | https://www.usemotion.com/ |
| Reclaim | https://reclaim.ai/ |
| ClickUp Brain | https://clickup.com/brain |
| Asana AI Studio | https://asana.com/product/ai/ai-studio |
| Superhuman Docs · formerly Coda | https://coda.io/product/ai |
| Mem | https://get.mem.ai/features/chat |
| Fotor | https://www.fotor.com/ |
