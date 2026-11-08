# Task selection paths — November 8, 2026

## Visitor outcome

The existing free playbook system now offers five task paths: meeting actions, campaign drafts, client-intake handoffs, source-backed research briefs, and short clips from owned recordings. Each path explains when three candidates may fit, the deciding check to run, a fictional practice case, and what remains untested. The last two cases are original additions; the existing three cases remain available.

The home page and directory link to the five paths. Each guide and its comparison page has one contextual inquiry route to the existing $350 USD AI Working Session with Ashley Kays. Scope, session length, timing and terms remain subject to agreement before booking or payment. The inquiry does not reserve time or collect payment. The existing free scoping call, free resources, and other service pages are unchanged.

## Referral use

The recording guide reuses the already configured Descript referral URL, https://get.descript.com/o1zqq5l1l1m4, with adjacent commission disclosure and a sponsored link. The already configured Higgsfield URL, https://higgsfield.ai?fpr=ashley-a1cd2d, remains on its existing tool page. This release does not claim new program approval or domain approval. Ordinary vendor and source links stay ordinary links. Candidate selection is based on task fit; no vendor runs, ranking, time savings, conversion rate, income or endorsement is claimed.

The research and recording source lists were checked against publisher documentation on November 8, 2026. The fictional samples are editorial exercises, not publisher output. A text-only recording exercise cannot establish transcription, caption timing, editing or export quality. Plan prices and export permissions must be checked with the publisher before a purchase.

## Measurements and privacy

`task_path_action` uses fixed action, task, candidate and path values. It measures choosing a path, reading candidate notes, following the configured referral, starting a trial, downloading a case, or asking about help. `tool_referral_click` measures the two already configured referral buttons on their matching tool pages. Events do not contain entered text, email addresses, sample inputs, trial notes, query strings, or referral URLs.

Both event handlers require the existing analytics function and honor browser DNT, GPC and the existing GA-disable flag. They do not set or grant consent. The production tag loader now stops before creating a queue or loading GA when those signals are present. Sponsor impressions and optional server-side click counts also honor privacy signals; publisher redirects still work. Existing inquiry consent and separate email opt-ins are preserved. A click is not a qualified inquiry, booking, payment or affiliate commission; those outcomes must be reconciled separately from actual records.

The comparison calculator now reports a monthly and annual equivalent for each alternative separately. It does not add competing tools into a purchase bundle. Role-kit stack calculations retain their existing behavior. Unknown prices remain unknown, and a known zero price remains valid.

## Validation

Run `npm run build` and `npm test` from `web/`. The release build produces 942 rendered pages, 445 sitemap URLs and 656 tool records in the local build environment. All 129 tests pass, including nine new task-path regressions for contextual inquiries, fictional evidence labels, exact referral reuse, bounded event payloads, browser and server privacy behavior, cost comparison and Trial Lab handoff. The existing guide-count assertion was corrected from 23 to the 25 journal guides already present in the base commit; no journal content was removed.

No checkout product, session, payment price, tax mode, account connection or runtime variable is created or changed by this release.
