# Lovable Prompt Pack

## 32 focused requests for one useful app

Original AI Superpower prompts | Reviewed 2026-11-19 | Companion: https://aisuperpower.cc/learn/lovable

Use one prompt at a time in the appropriate mode. Replace bracketed fields with your own non-sensitive context. Read the plan, inspect the result and keep evidence of your checks. These are authored exercise prompts, not claims that every prompt has been executed in a signed-in Lovable workspace.

Current terminology: Chat discusses decisions; Plan prepares a reviewable approach; Build implements changes. Older tutorials may call Build Agent mode and Instructions Knowledge. Workspace credits and connected-service usage depend on your current account; inspect costs before enabling features.

Resource Shelf begins as six public resources with search, topic filters, details, real file links and browser-local favourites. Prompts 24-28 are optional extensions after the static version works.

## Index

1. Choose the first user and task (Chat)
2. Create a one-page brief (Plan)
3. Replace a vague feature with an outcome (Chat)
4. Write acceptance criteria before implementation (Plan)
5. Create stable project Instructions (Plan)
6. Inspect the current project before adding features (Plan)
7. Validate the sample data contract (Plan)
8. Build the first library (Build)
9. Implement precise search (Build)
10. Combine filters and offer recovery (Build)
11. Make detail routes dependable (Build)
12. Add safe browser-local favourites (Build)
13. Finish the saved-only experience (Build)
14. Wire real files without false success (Build)
15. Render imported text as text (Build)
16. Improve the narrow-screen layout (Build)
17. Check keyboard and focus behavior (Build)
18. Improve labels, contrast and error feedback (Build)
19. Make loading and empty states honest (Plan)
20. Diagnose a reproducible bug (Plan)
21. Write a meaningful regression check (Build)
22. Recover without assuming a database rollback (Plan)
23. Tighten one design system (Build)
24. Decide whether a backend is justified (Plan)
25. Add optional accounts without closing public resources (Plan)
26. Prove owner isolation and admin permissions (Build)
27. Keep a paid API behind a trusted boundary (Plan)
28. Migrate only the approved practice records (Plan)
29. Check code portability and handoff (Plan)
30. Prepare the actual published page (Build)
31. Measure useful actions without worksheet text (Plan)
32. Design a small distribution experiment (Chat)

## 01. Choose the first user and task

**Mode:** Chat  
**Use when:** You have a broad idea and need a smaller starting point.

```text
I want to build Resource Shelf for freelance designers who lose useful templates across bookmarks and folders. Help me choose one specific user and one task worth finishing. Ask up to three questions that would change the first version. Compare a public resource library with a private client portal in terms of complexity and the evidence needed. Recommend the smallest useful scope. Do not build, add a database, or treat your assumptions as customer research.
```

**Check before continuing:** The output names one user, one observable task and assumptions to verify.

## 02. Create a one-page brief

**Mode:** Plan  
**Use when:** The first task is clear but the build boundaries are not.

```text
Plan Resource Shelf as a static public library of six fictional resources. Include search across title and summary, one topic filter, detail routes, real file links and browser-local favourites. Exclude accounts, uploads, payments, AI calls and admin tools. Specify routes, fields, states and five acceptance checks. Name missing source files or URLs instead of inventing them. Explain the plan before editing any code.
```

**Check before continuing:** The plan distinguishes the first release from optional later features.

## 03. Replace a vague feature with an outcome

**Mode:** Chat  
**Use when:** A request such as make it better is difficult to evaluate.

```text
Help me rewrite 'make Resource Shelf easier to use' as three concrete user outcomes. For each, name the current difficulty we would need to observe, a small interface change, and a check we can perform. Do not claim the difficulty is proven. Prefer outcomes such as finding a relevant worksheet, understanding its purpose or retrieving the file over decorative changes.
```

**Check before continuing:** Each proposed improvement has an observable check and an explicit assumption.

## 04. Write acceptance criteria before implementation

**Mode:** Plan  
**Use when:** You want a shared definition of complete.

```text
Write acceptance criteria for the Resource Shelf journey: browse, search, filter, open details, download and save. Include empty search, uppercase input, surrounding whitespace, a conflicting filter, unknown resource ID, a missing file and unavailable browser storage. State the expected result for each case without changing the code. Separate checks that apply to the static version from optional account-based checks.
```

**Check before continuing:** The criteria include failure and recovery behavior, not only the happy path.

## 05. Create stable project Instructions

**Mode:** Plan  
**Use when:** You are repeating project decisions in every message.

```text
Draft concise project Instructions for Resource Shelf. Include the audience, static-first scope, six-record data contract, white-and-deep-green visual direction, accessible controls, honest download availability, local-favourites explanation and requirement to report verification limits. Keep temporary tasks and credentials out. Show the draft for review; do not change existing Instructions or remove other project guidance without identifying the change.
```

**Check before continuing:** Stable guidance is separated from the current task and contains no secrets.

## 06. Inspect the current project before adding features

**Mode:** Plan  
**Use when:** You are continuing a project and want to reuse what exists.

```text
Inspect the current Resource Shelf implementation before proposing changes. Identify the framework, entry points, routes, data source, shared components, styles, test commands and deployment assumptions. Report what is present versus inferred. Propose one bounded step to finish the library-to-detail journey. Preserve established architecture and unrelated behavior; do not migrate frameworks or add dependencies merely to implement six static records.
```

**Check before continuing:** The plan references the actual project and names only necessary changes.

## 07. Validate the sample data contract

**Mode:** Plan  
**Use when:** The CSV needs to become reliable application data.

```text
Review the supplied Resource-Shelf-Sample-Data.csv. Require unique stable id values and these columns: id, title, topic, summary, format, level, download_url, updated_date. Identify empty required fields, malformed dates, duplicate IDs and unsupported file URLs. Keep each record's original meaning. Propose a small validation function and explain which fields may be blank. Do not invent working files or replace authored records with unrelated examples.
```

**Check before continuing:** Six records remain traceable to their source, with explicit validation results.

## 08. Build the first library

**Mode:** Build  
**Use when:** The brief and six sample records are ready.

```text
Build Resource Shelf's public library using the supplied six records. Show title, summary, topic, format and level. Add a clear page heading and labels for search and topic controls. Use stable IDs for resource identity. Keep the page readable on desktop and narrow screens. Preserve the agreed static-first scope. After implementation, list what changed and verify that all six cards render with the correct data.
```

**Check before continuing:** Every displayed card matches its source record; no unrequested backend exists.

## 09. Implement precise search

**Mode:** Build  
**Use when:** Search behavior needs a defined contract.

```text
Implement case-insensitive Resource Shelf search across title and summary. Trim surrounding whitespace. Search must combine with the currently selected topic and saved-only filter. Show the correct result count. An empty search should restore all records allowed by the other filters. Verify portfolio, PORTFOLIO, a padded portfolio query, a no-match query and a reset. Do not search hidden fields or change the sample dataset.
```

**Check before continuing:** Each named query has a checked, explainable result.

## 10. Combine filters and offer recovery

**Mode:** Build  
**Use when:** Topic filters and search work separately but need to cooperate.

```text
Use these topics from the dataset: Client work, Portfolio, Research, Web design, Accessibility and Practice, plus All topics. Combine the topic choice with search and saved-only state using AND logic. When nothing matches, explain that no resources match and provide Clear filters. Reset search, topic and saved-only together. Preserve keyboard operation and verify that the count and displayed cards always agree.
```

**Check before continuing:** A conflicting query and topic yields an honest empty state that can be reset.

## 11. Make detail routes dependable

**Mode:** Build  
**Use when:** Cards need real destinations and direct navigation.

```text
Create a resource detail route keyed by stable ID. Show the matching title, summary, topic, format, level, updated date and download availability. Include return navigation. Direct navigation and refresh must work on the published hosting setup. Handle unknown IDs with a useful not-found state. Verify every supplied ID and one invalid ID. Do not silently show the first resource for an unknown route.
```

**Check before continuing:** Valid routes and an invalid route behave correctly after direct navigation.

## 12. Add safe browser-local favourites

**Mode:** Build  
**Use when:** You want saved items without accounts.

```text
Add local favourites using a versioned storage key and stable resource IDs. Label them Saved in this browser. Validate stored JSON and ignore stale or unknown IDs. Handle blocked, full or unavailable storage without crashing; explain when a save cannot persist. Do not call this cloud sync. Verify save, refresh, remove, refresh, invalid stored data and an old ID no longer in the dataset.
```

**Check before continuing:** Persistence works where supported, and failure remains understandable.

## 13. Finish the saved-only experience

**Mode:** Build  
**Use when:** Local saves exist but the saved list is incomplete.

```text
Add a saved-only control that works with Resource Shelf search and topic filters. A newly saved item should appear immediately when eligible. Removing the last saved item should reveal a helpful empty state. Use a pressed state and text that distinguish Save from Saved. Keep focus stable when a card disappears. Verify an empty saved list, one saved item, conflicting filters and removal of the last visible item.
```

**Check before continuing:** Saved state remains understandable to keyboard and screen-reader users.

## 14. Wire real files without false success

**Mode:** Build  
**Use when:** The interface has download controls that need real delivery.

```text
Use only the real download_url values from the approved Resource Shelf manifest. Do not generate guessed URLs or success notifications for missing files. Verify that every file opens, has meaningful content and matches the resource title. For a blank or unavailable URL, show a clear unavailable state and a route back to the library. Report any link you could not verify and distinguish a download click from completed reading.
```

**Check before continuing:** All available file controls point to actual matching assets.

## 15. Render imported text as text

**Mode:** Build  
**Use when:** CSV or user-supplied values might contain markup-like strings.

```text
Review how Resource Shelf renders title, summary and topic fields. Treat imported values as text, not executable HTML. Test a synthetic value containing angle brackets and a script-like string; it should display safely without executing. Validate links against the intended URL policy before rendering them. Do not add an HTML sanitizer unless the product actually needs user-authored rich text. Explain the boundary being enforced.
```

**Check before continuing:** The synthetic test cannot execute markup or bypass the intended link policy.

## 16. Improve the narrow-screen layout

**Mode:** Build  
**Use when:** The desktop view is clear but mobile needs attention.

```text
Refine Resource Shelf at narrow widths. Stack controls in reading order, allow long titles to wrap, preserve visible labels and keep action targets comfortable. Avoid horizontal page overflow. Inspect at 390, 768 and 1440 pixels and with enlarged text. Keep the desktop design consistent. Verify the library, an empty result, details and saved list. Report the widths and states actually inspected.
```

**Check before continuing:** The complete task works at the inspected widths without clipping or sideways scrolling.

## 17. Check keyboard and focus behavior

**Mode:** Build  
**Use when:** You need evidence that the main task works without a pointer.

```text
Audit and fix keyboard access for search, filters, resource links, favourite controls and any detail dialog. Keep a logical focus order and visible focus. If a dialog is used, give it an accessible name, suitable focus handling, Escape dismissal and focus return. Do not replace semantic controls with clickable divs. Test the complete journey by keyboard and record any remaining limitation.
```

**Check before continuing:** A keyboard user can reach, activate and recover from each important state.

## 18. Improve labels, contrast and error feedback

**Mode:** Build  
**Use when:** Controls are visible but their meaning is unclear.

```text
Review Resource Shelf's labels, selected states, text contrast and error feedback. Keep labels visible after typing. Do not rely only on color to show saved state or selection. Measure relevant contrast with a suitable method and report what was measured. Make dynamic result counts and errors available to assistive technology without excessive announcements. Preserve the visual identity and list any issue that still needs specialist review.
```

**Check before continuing:** Changes have evidence; the result is described as a check, not a compliance certificate.

## 19. Make loading and empty states honest

**Mode:** Plan  
**Use when:** You are adding a data-loading path or finding incomplete states.

```text
Map Resource Shelf states before implementing a new loading path: first load, successful result, zero records, zero filtered results, failed request, retry, unavailable file and unknown route. For each, write the message, available action and the condition that triggers it. Distinguish no data from an error. Keep static pages simple; do not add artificial loading delays to content already available locally.
```

**Check before continuing:** Each state has a trigger, truthful message and useful recovery action.

## 20. Diagnose a reproducible bug

**Mode:** Plan  
**Use when:** A specific behavior differs from the brief.

```text
Investigate this Resource Shelf defect before editing: action = [exact steps]; expected = [observable result]; actual = [observed result]; environment = [preview or published URL, browser and width]; evidence = [redacted error or screenshot]. Reproduce the issue, identify the smallest likely cause and explain a focused fix. Do not redesign unrelated screens. If you cannot reproduce it, say what evidence is missing rather than claiming it is fixed.
```

**Check before continuing:** The diagnosis distinguishes observations from hypotheses.

## 21. Write a meaningful regression check

**Mode:** Build  
**Use when:** A defect is fixed and could return.

```text
Add the smallest useful regression test for the confirmed defect: [behavior]. Exercise the public behavior rather than asserting the current implementation structure. Cover the failing input and one normal input. Use the project's existing test tooling. Run the relevant check and report the command and result. Do not add a new test framework or expand into unrelated features without a concrete reason.
```

**Check before continuing:** The check would fail if the original defect returned.

## 22. Recover without assuming a database rollback

**Mode:** Plan  
**Use when:** A recent change broke a previously working version.

```text
Identify the last working Resource Shelf version and the change that introduced the problem. Explain recovery options using the project's version history and repository. Separate code, deployment configuration, database schema and stored data. A code restore must not be assumed to undo a database migration. Propose a reversible recovery and list any data or configuration that needs a separate backup or restoration step.
```

**Check before continuing:** The recovery plan names the boundaries and preserves needed data.

## 23. Tighten one design system

**Mode:** Build  
**Use when:** The page has accumulated inconsistent styles.

```text
Consolidate Resource Shelf's existing design into a small consistent system: heading scale, body text, spacing, borders, buttons and focus treatment. Preserve white backgrounds and deep green emphasis. Reuse current components and fix only inconsistencies that affect the main task. Compare long titles, empty states and the detail page after changes. Do not introduce decorative animation or unrelated sections.
```

**Check before continuing:** The interface is more consistent without changing the product scope.

## 24. Decide whether a backend is justified

**Mode:** Plan  
**Use when:** A new requirement may need shared data.

```text
Evaluate whether Resource Shelf now needs a backend for [specific requirement]. Compare keeping six static records with using the already connected backend, Lovable's built-in backend or an external Supabase project. Identify who owns billing, what data moves, access rules, migration steps and reversibility. Do not enable a service yet. Keep public browsing open and avoid claiming the two backend options can be swapped with one click.
```

**Check before continuing:** A named user benefit justifies each added service and its costs.

## 25. Add optional accounts without closing public resources

**Mode:** Plan  
**Use when:** People need favourites across devices.

```text
Plan optional sign-in for cross-device Resource Shelf favourites. Public resources and downloads stay accessible without an account. Define sign-in, sign-out, recovery and failure states. Specify what happens to existing browser-local saves when a person signs in; do not silently upload them. Model saved-resource records separately from public resource records and explain duplicate-save prevention before implementing.
```

**Check before continuing:** Account behavior and the local-to-account transition are explicit.

## 26. Prove owner isolation and admin permissions

**Mode:** Build  
**Use when:** The optional account version has private saved lists.

```text
Enforce owner-only access for saved-resource records and separate authorized-admin access for catalogue edits. Do not trust a browser-supplied owner ID. Review row-level security policies and server functions, including privileged requests that bypass RLS. Use two synthetic accounts to test read, create and delete isolation through direct requests. Confirm an ordinary user cannot edit the catalogue. Keep public published resources readable without sign-in.
```

**Check before continuing:** Two-account and direct-request evidence supports the intended permission rules.

## 27. Keep a paid API behind a trusted boundary

**Mode:** Plan  
**Use when:** You are considering an optional integration.

```text
Plan an optional integration for [specific user benefit]. Identify exactly what data would leave the app, where permission is explained, which credential is private and which server function uses it. Keep secrets out of browser code, prompts, logs and screenshots. Require appropriate authentication, authorization, input validation, rate controls, timeout handling and useful errors. Explain usage costs and failure cases before enabling the integration.
```

**Check before continuing:** The plan describes permission, secret handling, cost and failure behavior.

## 28. Migrate only the approved practice records

**Mode:** Plan  
**Use when:** You are moving from static resources to a database.

```text
Prepare a migration for the six approved Resource Shelf records. Keep stable IDs and real file URLs. Show schema, access rules, validation and a dry-run preview before applying it. Make the import idempotent so rerunning it does not create duplicates. Explain backup and rollback boundaries. Use only synthetic teaching data and verify public browsing after migration before enabling account favourites.
```

**Check before continuing:** The migration has a reviewable preview and preserves record identity.

## 29. Check code portability and handoff

**Mode:** Plan  
**Use when:** A collaborator needs to maintain the project.

```text
Review Resource Shelf's connected repository and handoff instructions. Document the framework, dependency installation, build command, environment variable names, hosting assumptions and which services remain external. Never include secret values. Verify an independent build if the environment allows it; otherwise label it unverified. Explain Git sync permissions and repository identity before changing connections, names or ownership.
```

**Check before continuing:** The handoff distinguishes code ownership from running external services.

## 30. Prepare the actual published page

**Mode:** Build  
**Use when:** The static app has passed its core checks.

```text
Prepare Resource Shelf for publication with accurate title, description, canonical URL, social image and crawlable internal links. Use visible content to determine any structured data; do not invent ratings or endorsements. Check the actual hosting path for direct detail routes, assets and downloads. Publish only through the agreed workflow, then open the resulting URL and repeat the core task. Report observed results and remaining checks.
```

**Check before continuing:** The published URL, rather than only the preview, has verification evidence.

## 31. Measure useful actions without worksheet text

**Mode:** Plan  
**Use when:** You want to understand use without collecting private input.

```text
Plan measurement for Resource Shelf using the site's existing analytics and privacy controls. Track fixed events for resource views, successful prompt copies, brief exports and download clicks with allowlisted resource IDs. Never include search text, worksheet answers, email addresses or raw URLs containing personal information. Avoid duplicate pageview configuration. Explain that a click is not completed reading and self-marked completion is not proof of proficiency.
```

**Check before continuing:** The event contract has fixed identifiers and separate definitions for each metric.

## 32. Design a small distribution experiment

**Mode:** Chat  
**Use when:** The kit is usable and you need a learning plan for traffic.

```text
Design a 14-day distribution experiment for the free Resource Shelf learning kit. Choose two channels based on audience fit and current posting rules. Propose a useful native contribution, a tagged external link, a time budget and a decision rule. Separate site visits, useful-action clicks, free joins and paid outcomes. Label forecasts as hypotheses. Draft the posts for review; do not send messages, publish, buy traffic or claim a marketplace listing guarantees discovery.
```

**Check before continuing:** The experiment has measurable observations and a decision, with no invented results.

## Sources and reuse

The prompts are original practice material. Platform terminology and boundaries are informed by the official links in SOURCE-REGISTER.md. For reuse, see START-HERE.md. No account credentials, personal data or real client files are included.
