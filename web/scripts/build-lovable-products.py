#!/usr/bin/env python3
"""Rebuild the original Lovable pocket-product kit. No network or runtime build hook.

Requires Python 3, ReportLab and Pillow. Generated files are checked into public/.
Run: python3 web/scripts/build-lovable-products.py (from repository root).
"""
from __future__ import annotations

import csv
import html
import io
import re
import zipfile
from pathlib import Path

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Table, TableStyle

WEB = Path(__file__).resolve().parents[1]
OUT = WEB / 'public' / 'downloads' / 'lovable'
HERO = WEB / 'public' / 'assets' / 'lovable' / 'hero.webp'
HUB = 'https://aisuperpower.cc/learn/lovable'
UPDATED = '2026-11-19'
INK = colors.HexColor('#143b30')
GREEN = colors.HexColor('#186a4e')
MUTED = colors.HexColor('#486359')
LIME = colors.HexColor('#ddf38c')
CORAL = colors.HexColor('#f4ac90')
SOFT = colors.HexColor('#f1f7f2')
LINE = colors.HexColor('#cfddd5')
W, H, M = 612, 792, 44
CW = W - 2 * M

FONT_DIR = Path('/usr/share/fonts/truetype/dejavu')
if (FONT_DIR / 'DejaVuSans.ttf').exists():
    for name, filename in [('Kit', 'DejaVuSans.ttf'), ('KitBold', 'DejaVuSans-Bold.ttf'), ('KitItalic', 'DejaVuSans-Oblique.ttf')]:
        pdfmetrics.registerFont(TTFont(name, str(FONT_DIR / filename)))
    pdfmetrics.registerFontFamily('Kit', normal='Kit', bold='KitBold', italic='KitItalic', boldItalic='KitBold')
    REG, BOLD, ITALIC = 'Kit', 'KitBold', 'KitItalic'
else:
    REG, BOLD, ITALIC = 'Helvetica', 'Helvetica-Bold', 'Helvetica-Oblique'

SOURCES = {
    'L1': ('Lovable: platform overview', 'https://docs.lovable.dev/introduction/welcome'),
    'L2': ('Lovable: Plan mode', 'https://docs.lovable.dev/features/plan-mode'),
    'L3': ('Lovable: Build mode', 'https://docs.lovable.dev/features/agent-mode'),
    'L4': ('Lovable: Instructions', 'https://docs.lovable.dev/features/knowledge'),
    'L5': ('Lovable: preview toolbar', 'https://docs.lovable.dev/features/preview-toolbar'),
    'L6': ('Lovable: testing', 'https://docs.lovable.dev/features/testing'),
    'L7': ('Lovable: GitHub sync', 'https://docs.lovable.dev/integrations/github'),
    'L8': ('Lovable: publishing', 'https://docs.lovable.dev/features/publish'),
    'L9': ('Lovable: built-in backend', 'https://docs.lovable.dev/features/cloud'),
    'L10': ('Lovable: authentication', 'https://docs.lovable.dev/features/authentication'),
    'L11': ('Lovable: database access', 'https://docs.lovable.dev/features/database-access'),
    'L12': ('Lovable: secrets', 'https://docs.lovable.dev/features/secrets'),
    'L13': ('Lovable: credits and usage', 'https://docs.lovable.dev/introduction/credits-and-usage'),
    'L14': ('Lovable: SEO and AI search', 'https://docs.lovable.dev/features/seo-aeo'),
    'L15': ('Lovable: version history', 'https://docs.lovable.dev/features/projects/history'),
    'G1': ('Google: AI search guidance', 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide'),
    'G2': ('Google: AI performance report', 'https://support.google.com/webmasters/answer/16984139?hl=en'),
    'G3': ('Google: AI inclusion control', 'https://support.google.com/webmasters/answer/16908024?hl=en'),
    'B1': ('Bing: AI Performance', 'https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/'),
    'W1': ('Whop: storefront and products', 'https://whop.com/blog/whop-store-page/'),
    'W2': ('Whop: Courses app', 'https://whop.com/blog/whop-courses/'),
    'W3': ('Whop: Files app', 'https://whop.com/blog/whop-files-app/'),
    'W4': ('Whop: checkout and tracking links', 'https://whop.com/blog/create-checkout-links-whop/'),
    'W5': ('Whop: Discover application guide', 'https://whop.com/blog/sell-ai-courses-whop/'),
    'C1': ('Lovable: official Discord', 'https://lovable.dev/discord'),
    'C2': ('r/lovable: current sidebar rules', 'https://www.reddit.com/r/lovable/'),
    'C3': ('r/nocode: launch megathread', 'https://www.reddit.com/r/nocode/comments/176fe1v/product_launch_post/'),
    'C4': ('Product Hunt: promotion rules', 'https://help.producthunt.com/en/articles/17734384-5-how-to-promote-your-launch-and-what-to-avoid'),
    'C5': ('Hacker News: Show HN rules', 'https://news.ycombinator.com/showhn.html'),
    'M1': ('Monetise: public Whop store', 'https://whop.com/monetise/'),
    'M2': ('Monetise: archived Skool mention', 'https://www.monetise.com/archives/misc/v1'),
    'M3': ('Skool: Discovery requirements', 'https://help.skool.com/article/153-discovery-faqs'),
}

RESOURCE_DATA = [
    ('client-kickoff-checklist', 'Client Kickoff Checklist', 'Client work', 'Prepare the goal, scope, decision owner, materials and next steps for a client kickoff conversation.'),
    ('portfolio-case-study-outline', 'Portfolio Case Study Outline', 'Portfolio', 'Explain the problem, your contribution, evidence, decisions and outcomes of one design project.'),
    ('research-interview-planner', 'Research Interview Planner', 'Research', 'Plan neutral questions about a recent real experience and separate observations from interpretations.'),
    ('landing-page-review-sheet', 'Landing Page Review Sheet', 'Web design', 'Review one landing page for audience clarity, promise, proof, action and mobile usability.'),
    ('accessibility-spot-check', 'Accessibility Spot Check', 'Accessibility', 'Inspect keyboard use, labels, headings, contrast and error feedback, then record issues for follow-up.'),
    ('weekly-design-practice-planner', 'Weekly Design Practice Planner', 'Practice', 'Choose one design skill, plan short practice sessions, record feedback and set the next exercise.'),
]

RESOURCE_TEXT = {
    'client-kickoff-checklist': '''# Client Kickoff Checklist

**Purpose:** Turn an initial project conversation into a shared, reviewable brief.
**Topic:** Client work | **Level:** Beginner | **Format:** Editable Markdown

This is an original teaching worksheet. Use real project facts only when you have permission to record them. Blank fields are intentional.

## Before the conversation

- [ ] Name the person who approves scope and the person who gives day-to-day feedback.
- [ ] Read the existing brief and list assumptions that need confirmation.
- [ ] Ask for approved brand assets, relevant URLs and examples.
- [ ] Agree on a place for decisions and a method for handling changes.

## The shared brief

| Question | Agreed answer | Evidence or owner |
| --- | --- | --- |
| Who is the primary user? | | |
| What problem should the project solve? | | |
| What must the user be able to do? | | |
| How will success be observed? | | |
| Which deliverables are included? | | |
| What is outside the agreed scope? | | |
| What dependencies could delay work? | | |
| Who approves the final result? | | |

## Decisions and next steps

| Decision or task | Owner | Due date | Completion evidence |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |

## Closing check

- [ ] Read the agreed outcome back in plain language.
- [ ] Separate a confirmed requirement from a suggestion or assumption.
- [ ] Record unresolved questions and who will answer them.
- [ ] Confirm the next checkpoint and expected material.

**Useful result:** Another team member can explain the task, boundaries and approval process without guessing. This checklist does not replace a contract or a specialist review.
''',
    'portfolio-case-study-outline': '''# Portfolio Case Study Outline

**Purpose:** Explain one project through evidence and decisions a reader can assess.
**Topic:** Portfolio | **Level:** Beginner | **Format:** Editable Markdown

Use a real project you are allowed to discuss, or label a fictional exercise clearly. Do not invent customers, testimonials, performance metrics or your role.

## 1. The quick version

- Project title:
- The user's problem:
- My role and actual contribution:
- Team, time period and constraints:
- What changed:
- Evidence available:

## 2. Context and starting point

What was happening before the project? Describe the relevant workflow, the audience and why the problem mattered. List what was known and what was still uncertain.

## 3. Research and evidence

| Observation | Source or method | What it changed | Limitation |
| --- | --- | --- | --- |
| | | | |
| | | | |

## 4. Three decisions worth explaining

For each decision, record the alternatives, the constraint that mattered, the option chosen and the evidence used. Screenshots should illustrate the decision, not replace the explanation.

1. Decision, alternatives and reasoning:
2. Decision, alternatives and reasoning:
3. Decision, alternatives and reasoning:

## 5. Results and learning

- What was shipped, tested or proposed?
- What was measured, over which period, and against what baseline?
- Which outcomes can be attributed cautiously, and which remain unknown?
- What would you change next?

## Publish check

- [ ] Client permission and sensitive details reviewed.
- [ ] My work is distinguished from the team's work.
- [ ] Proposed designs are distinguished from shipped designs.
- [ ] Every number has a source, date and definition.
- [ ] Images have descriptive captions and readable details.

**Useful result:** A reader understands how you think, what you did and what the evidence supports.
''',
    'research-interview-planner': '''# Research Interview Planner

**Purpose:** Learn about a recent real experience without steering the participant toward your solution.
**Topic:** Research | **Level:** Beginner | **Format:** Editable Markdown

This is a planning aid for ordinary product research. Follow your organization's consent, privacy and retention practices. Obtain permission before recording. Use participant codes in shared notes.

## Learning objective

- Decision this research should inform:
- People with relevant recent experience:
- What we already know:
- What could change our view:
- What we will not ask or collect:

## Opening

Explain the purpose, approximate length, how notes will be used and that the person may skip a question or stop. Avoid pitching your idea before learning about their experience.

## Questions to adapt

1. Tell me about the last time you tried to complete [specific task].
2. What prompted you to start?
3. Walk me through what you did, from the beginning.
4. What information or tools did you use?
5. Where did the process become difficult or uncertain?
6. What did you do to work around that?
7. What happened when you finished?
8. Is there anything about that experience I have misunderstood?

Avoid asking whether they would buy your idea as a substitute for learning how they currently act. Ask about actual recent behavior before predictions.

## Notes

| Observation or exact short quote | Context | Interpretation | Follow-up question |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |

## After the conversation

- What surprised us?
- What supports or challenges our assumption?
- Which finding appears in more than one conversation?
- What remains uncertain because the sample is small?
- What is the next research or product decision?

**Useful result:** A set of grounded observations that informs a decision, with interpretations and limitations kept visible.
''',
    'landing-page-review-sheet': '''# Landing Page Review Sheet

**Purpose:** Review one page against its intended visitor and next action.
**Topic:** Web design | **Level:** Beginner | **Format:** Editable Markdown

- Page URL:
- Review date:
- Primary audience and situation:
- One intended action:
- Traffic source being considered:

## Clarity in the first screen

- [ ] The headline names a useful result in familiar language.
- [ ] A visitor can tell who the offer is for.
- [ ] The call to action explains what happens next.
- [ ] The page distinguishes a product, service, free resource and demo.

## Evidence and decision support

- [ ] Claims are supported by a demonstration, source or verifiable example.
- [ ] Prices, requirements and delivery details match the actual offer.
- [ ] Testimonials and outcomes are authentic and used with permission.
- [ ] Common practical questions are answered near the decision.

## Complete the action yourself

| Check | Expected result | Observed result | Priority |
| --- | --- | --- | --- |
| Primary button | Correct next step | | |
| Form or download | Real completion or clear error | | |
| Narrow mobile layout | Readable without sideways scrolling | | |
| Keyboard navigation | Reachable controls and visible focus | | |
| Error state | Useful explanation and recovery | | |
| Confirmation | Accurate next-step instructions | | |

## Choose one improvement

- Problem observed:
- Evidence:
- Smallest change to test:
- Metric or user behavior to watch:
- Review date:

**Useful result:** One prioritized, testable improvement. A review score is not proof that conversion will increase; evaluate the change with real use and clearly defined measures.
''',
    'accessibility-spot-check': '''# Accessibility Spot Check

**Purpose:** Find common barriers early and record specific issues for follow-up.
**Topic:** Accessibility | **Level:** Beginner | **Format:** Editable Markdown

This is a practical spot check, not a comprehensive accessibility audit or conformance certification. Use relevant standards and specialist testing for a formal assessment.

- Page or flow:
- Browser/device:
- Reviewer and date:
- Task being completed:

## Keyboard and focus

- [ ] Reach every interactive control using the keyboard.
- [ ] See which control currently has focus.
- [ ] Activate buttons and links with the expected keyboard interaction.
- [ ] Open and close dialogs without losing context or trapping focus.
- [ ] Skip repeated navigation where a skip link is provided.

## Meaning and reading

- [ ] Headings describe sections and follow a useful order.
- [ ] Form controls have persistent, associated labels.
- [ ] Links describe their destination or purpose.
- [ ] Important information is available in text.
- [ ] Informative images have useful alternatives; decorative images are treated accordingly.

## Perception and feedback

- [ ] Text remains readable when enlarged.
- [ ] Color is not the only way to understand status or selection.
- [ ] Contrast has been measured with an appropriate tool.
- [ ] Error feedback identifies the field and explains a correction.
- [ ] Dynamic status changes are available to assistive technology.
- [ ] Motion can be reduced where appropriate.

## Issue record

| Task and location | Barrier observed | Who may be affected | Proposed fix | Retest result |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |
| | | | | |

**Useful result:** Reproducible issues and retest evidence. Include manual keyboard checks and, where possible, assistive-technology testing with representative users.
''',
    'weekly-design-practice-planner': '''# Weekly Design Practice Planner

**Purpose:** Improve one design skill through small exercises and feedback.
**Topic:** Practice | **Level:** Beginner | **Format:** Editable Markdown

## Choose the skill

- Skill to practice:
- Why this matters to my work:
- Current example or baseline:
- What a better result would look like:
- Available time this week:

## Plan the sessions

| Session | Small exercise | Time budget | Output to keep | Feedback method |
| --- | --- | --- | --- | --- |
| First | | | | |
| Second | | | | |
| Third | | | | |

Example exercise: rewrite one form's labels and errors, then ask someone to complete the form without your explanation. This is an exercise suggestion, not a measured result.

## Before each session

- [ ] Pick one constraint to change.
- [ ] Keep the original version for comparison.
- [ ] Define the behavior or quality you will inspect.
- [ ] Use an example you are permitted to share.

## Evidence and reflection

| What I tried | What I observed | Feedback received | What I will keep or change |
| --- | --- | --- | --- |
| | | | |
| | | | |
| | | | |

## End-of-week decision

- One improvement I can explain:
- One unresolved difficulty:
- One question for a peer or teacher:
- My next small exercise:

**Useful result:** A visible comparison and a clear next practice choice. Completing sessions is a habit measure; it is not by itself proof of professional proficiency.
''',
}

# Every prompt below is original exercise content. They ask for reviewable behavior;
# none claims a result was produced in a signed-in Lovable project.
PROMPTS = [
('Choose the first user and task', 'Chat', 'You have a broad idea and need a smaller starting point.',
 "I want to build Resource Shelf for freelance designers who lose useful templates across bookmarks and folders. Help me choose one specific user and one task worth finishing. Ask up to three questions that would change the first version. Compare a public resource library with a private client portal in terms of complexity and the evidence needed. Recommend the smallest useful scope. Do not build, add a database, or treat your assumptions as customer research.",
 'The output names one user, one observable task and assumptions to verify.'),
('Create a one-page brief', 'Plan', 'The first task is clear but the build boundaries are not.',
 "Plan Resource Shelf as a static public library of six fictional resources. Include search across title and summary, one topic filter, detail routes, real file links and browser-local favourites. Exclude accounts, uploads, payments, AI calls and admin tools. Specify routes, fields, states and five acceptance checks. Name missing source files or URLs instead of inventing them. Explain the plan before editing any code.",
 'The plan distinguishes the first release from optional later features.'),
('Replace a vague feature with an outcome', 'Chat', 'A request such as make it better is difficult to evaluate.',
 "Help me rewrite 'make Resource Shelf easier to use' as three concrete user outcomes. For each, name the current difficulty we would need to observe, a small interface change, and a check we can perform. Do not claim the difficulty is proven. Prefer outcomes such as finding a relevant worksheet, understanding its purpose or retrieving the file over decorative changes.",
 'Each proposed improvement has an observable check and an explicit assumption.'),
('Write acceptance criteria before implementation', 'Plan', 'You want a shared definition of complete.',
 "Write acceptance criteria for the Resource Shelf journey: browse, search, filter, open details, download and save. Include empty search, uppercase input, surrounding whitespace, a conflicting filter, unknown resource ID, a missing file and unavailable browser storage. State the expected result for each case without changing the code. Separate checks that apply to the static version from optional account-based checks.",
 'The criteria include failure and recovery behavior, not only the happy path.'),
('Create stable project Instructions', 'Plan', 'You are repeating project decisions in every message.',
 "Draft concise project Instructions for Resource Shelf. Include the audience, static-first scope, six-record data contract, white-and-deep-green visual direction, accessible controls, honest download availability, local-favourites explanation and requirement to report verification limits. Keep temporary tasks and credentials out. Show the draft for review; do not change existing Instructions or remove other project guidance without identifying the change.",
 'Stable guidance is separated from the current task and contains no secrets.'),
('Inspect the current project before adding features', 'Plan', 'You are continuing a project and want to reuse what exists.',
 "Inspect the current Resource Shelf implementation before proposing changes. Identify the framework, entry points, routes, data source, shared components, styles, test commands and deployment assumptions. Report what is present versus inferred. Propose one bounded step to finish the library-to-detail journey. Preserve established architecture and unrelated behavior; do not migrate frameworks or add dependencies merely to implement six static records.",
 'The plan references the actual project and names only necessary changes.'),
('Validate the sample data contract', 'Plan', 'The CSV needs to become reliable application data.',
 "Review the supplied Resource-Shelf-Sample-Data.csv. Require unique stable id values and these columns: id, title, topic, summary, format, level, download_url, updated_date. Identify empty required fields, malformed dates, duplicate IDs and unsupported file URLs. Keep each record's original meaning. Propose a small validation function and explain which fields may be blank. Do not invent working files or replace authored records with unrelated examples.",
 'Six records remain traceable to their source, with explicit validation results.'),
('Build the first library', 'Build', 'The brief and six sample records are ready.',
 "Build Resource Shelf's public library using the supplied six records. Show title, summary, topic, format and level. Add a clear page heading and labels for search and topic controls. Use stable IDs for resource identity. Keep the page readable on desktop and narrow screens. Preserve the agreed static-first scope. After implementation, list what changed and verify that all six cards render with the correct data.",
 'Every displayed card matches its source record; no unrequested backend exists.'),
('Implement precise search', 'Build', 'Search behavior needs a defined contract.',
 "Implement case-insensitive Resource Shelf search across title and summary. Trim surrounding whitespace. Search must combine with the currently selected topic and saved-only filter. Show the correct result count. An empty search should restore all records allowed by the other filters. Verify portfolio, PORTFOLIO, a padded portfolio query, a no-match query and a reset. Do not search hidden fields or change the sample dataset.",
 'Each named query has a checked, explainable result.'),
('Combine filters and offer recovery', 'Build', 'Topic filters and search work separately but need to cooperate.',
 "Use these topics from the dataset: Client work, Portfolio, Research, Web design, Accessibility and Practice, plus All topics. Combine the topic choice with search and saved-only state using AND logic. When nothing matches, explain that no resources match and provide Clear filters. Reset search, topic and saved-only together. Preserve keyboard operation and verify that the count and displayed cards always agree.",
 'A conflicting query and topic yields an honest empty state that can be reset.'),
('Make detail routes dependable', 'Build', 'Cards need real destinations and direct navigation.',
 "Create a resource detail route keyed by stable ID. Show the matching title, summary, topic, format, level, updated date and download availability. Include return navigation. Direct navigation and refresh must work on the published hosting setup. Handle unknown IDs with a useful not-found state. Verify every supplied ID and one invalid ID. Do not silently show the first resource for an unknown route.",
 'Valid routes and an invalid route behave correctly after direct navigation.'),
('Add safe browser-local favourites', 'Build', 'You want saved items without accounts.',
 "Add local favourites using a versioned storage key and stable resource IDs. Label them Saved in this browser. Validate stored JSON and ignore stale or unknown IDs. Handle blocked, full or unavailable storage without crashing; explain when a save cannot persist. Do not call this cloud sync. Verify save, refresh, remove, refresh, invalid stored data and an old ID no longer in the dataset.",
 'Persistence works where supported, and failure remains understandable.'),
('Finish the saved-only experience', 'Build', 'Local saves exist but the saved list is incomplete.',
 "Add a saved-only control that works with Resource Shelf search and topic filters. A newly saved item should appear immediately when eligible. Removing the last saved item should reveal a helpful empty state. Use a pressed state and text that distinguish Save from Saved. Keep focus stable when a card disappears. Verify an empty saved list, one saved item, conflicting filters and removal of the last visible item.",
 'Saved state remains understandable to keyboard and screen-reader users.'),
('Wire real files without false success', 'Build', 'The interface has download controls that need real delivery.',
 "Use only the real download_url values from the approved Resource Shelf manifest. Do not generate guessed URLs or success notifications for missing files. Verify that every file opens, has meaningful content and matches the resource title. For a blank or unavailable URL, show a clear unavailable state and a route back to the library. Report any link you could not verify and distinguish a download click from completed reading.",
 'All available file controls point to actual matching assets.'),
('Render imported text as text', 'Build', 'CSV or user-supplied values might contain markup-like strings.',
 "Review how Resource Shelf renders title, summary and topic fields. Treat imported values as text, not executable HTML. Test a synthetic value containing angle brackets and a script-like string; it should display safely without executing. Validate links against the intended URL policy before rendering them. Do not add an HTML sanitizer unless the product actually needs user-authored rich text. Explain the boundary being enforced.",
 'The synthetic test cannot execute markup or bypass the intended link policy.'),
('Improve the narrow-screen layout', 'Build', 'The desktop view is clear but mobile needs attention.',
 "Refine Resource Shelf at narrow widths. Stack controls in reading order, allow long titles to wrap, preserve visible labels and keep action targets comfortable. Avoid horizontal page overflow. Inspect at 390, 768 and 1440 pixels and with enlarged text. Keep the desktop design consistent. Verify the library, an empty result, details and saved list. Report the widths and states actually inspected.",
 'The complete task works at the inspected widths without clipping or sideways scrolling.'),
('Check keyboard and focus behavior', 'Build', 'You need evidence that the main task works without a pointer.',
 "Audit and fix keyboard access for search, filters, resource links, favourite controls and any detail dialog. Keep a logical focus order and visible focus. If a dialog is used, give it an accessible name, suitable focus handling, Escape dismissal and focus return. Do not replace semantic controls with clickable divs. Test the complete journey by keyboard and record any remaining limitation.",
 'A keyboard user can reach, activate and recover from each important state.'),
('Improve labels, contrast and error feedback', 'Build', 'Controls are visible but their meaning is unclear.',
 "Review Resource Shelf's labels, selected states, text contrast and error feedback. Keep labels visible after typing. Do not rely only on color to show saved state or selection. Measure relevant contrast with a suitable method and report what was measured. Make dynamic result counts and errors available to assistive technology without excessive announcements. Preserve the visual identity and list any issue that still needs specialist review.",
 'Changes have evidence; the result is described as a check, not a compliance certificate.'),
('Make loading and empty states honest', 'Plan', 'You are adding a data-loading path or finding incomplete states.',
 "Map Resource Shelf states before implementing a new loading path: first load, successful result, zero records, zero filtered results, failed request, retry, unavailable file and unknown route. For each, write the message, available action and the condition that triggers it. Distinguish no data from an error. Keep static pages simple; do not add artificial loading delays to content already available locally.",
 'Each state has a trigger, truthful message and useful recovery action.'),
('Diagnose a reproducible bug', 'Plan', 'A specific behavior differs from the brief.',
 "Investigate this Resource Shelf defect before editing: action = [exact steps]; expected = [observable result]; actual = [observed result]; environment = [preview or published URL, browser and width]; evidence = [redacted error or screenshot]. Reproduce the issue, identify the smallest likely cause and explain a focused fix. Do not redesign unrelated screens. If you cannot reproduce it, say what evidence is missing rather than claiming it is fixed.",
 'The diagnosis distinguishes observations from hypotheses.'),
('Write a meaningful regression check', 'Build', 'A defect is fixed and could return.',
 "Add the smallest useful regression test for the confirmed defect: [behavior]. Exercise the public behavior rather than asserting the current implementation structure. Cover the failing input and one normal input. Use the project's existing test tooling. Run the relevant check and report the command and result. Do not add a new test framework or expand into unrelated features without a concrete reason.",
 'The check would fail if the original defect returned.'),
('Recover without assuming a database rollback', 'Plan', 'A recent change broke a previously working version.',
 "Identify the last working Resource Shelf version and the change that introduced the problem. Explain recovery options using the project's version history and repository. Separate code, deployment configuration, database schema and stored data. A code restore must not be assumed to undo a database migration. Propose a reversible recovery and list any data or configuration that needs a separate backup or restoration step.",
 'The recovery plan names the boundaries and preserves needed data.'),
('Tighten one design system', 'Build', 'The page has accumulated inconsistent styles.',
 "Consolidate Resource Shelf's existing design into a small consistent system: heading scale, body text, spacing, borders, buttons and focus treatment. Preserve white backgrounds and deep green emphasis. Reuse current components and fix only inconsistencies that affect the main task. Compare long titles, empty states and the detail page after changes. Do not introduce decorative animation or unrelated sections.",
 'The interface is more consistent without changing the product scope.'),
('Decide whether a backend is justified', 'Plan', 'A new requirement may need shared data.',
 "Evaluate whether Resource Shelf now needs a backend for [specific requirement]. Compare keeping six static records with using the already connected backend, Lovable's built-in backend or an external Supabase project. Identify who owns billing, what data moves, access rules, migration steps and reversibility. Do not enable a service yet. Keep public browsing open and avoid claiming the two backend options can be swapped with one click.",
 'A named user benefit justifies each added service and its costs.'),
('Add optional accounts without closing public resources', 'Plan', 'People need favourites across devices.',
 "Plan optional sign-in for cross-device Resource Shelf favourites. Public resources and downloads stay accessible without an account. Define sign-in, sign-out, recovery and failure states. Specify what happens to existing browser-local saves when a person signs in; do not silently upload them. Model saved-resource records separately from public resource records and explain duplicate-save prevention before implementing.",
 'Account behavior and the local-to-account transition are explicit.'),
('Prove owner isolation and admin permissions', 'Build', 'The optional account version has private saved lists.',
 "Enforce owner-only access for saved-resource records and separate authorized-admin access for catalogue edits. Do not trust a browser-supplied owner ID. Review row-level security policies and server functions, including privileged requests that bypass RLS. Use two synthetic accounts to test read, create and delete isolation through direct requests. Confirm an ordinary user cannot edit the catalogue. Keep public published resources readable without sign-in.",
 'Two-account and direct-request evidence supports the intended permission rules.'),
('Keep a paid API behind a trusted boundary', 'Plan', 'You are considering an optional integration.',
 "Plan an optional integration for [specific user benefit]. Identify exactly what data would leave the app, where permission is explained, which credential is private and which server function uses it. Keep secrets out of browser code, prompts, logs and screenshots. Require appropriate authentication, authorization, input validation, rate controls, timeout handling and useful errors. Explain usage costs and failure cases before enabling the integration.",
 'The plan describes permission, secret handling, cost and failure behavior.'),
('Migrate only the approved practice records', 'Plan', 'You are moving from static resources to a database.',
 "Prepare a migration for the six approved Resource Shelf records. Keep stable IDs and real file URLs. Show schema, access rules, validation and a dry-run preview before applying it. Make the import idempotent so rerunning it does not create duplicates. Explain backup and rollback boundaries. Use only synthetic teaching data and verify public browsing after migration before enabling account favourites.",
 'The migration has a reviewable preview and preserves record identity.'),
('Check code portability and handoff', 'Plan', 'A collaborator needs to maintain the project.',
 "Review Resource Shelf's connected repository and handoff instructions. Document the framework, dependency installation, build command, environment variable names, hosting assumptions and which services remain external. Never include secret values. Verify an independent build if the environment allows it; otherwise label it unverified. Explain Git sync permissions and repository identity before changing connections, names or ownership.",
 'The handoff distinguishes code ownership from running external services.'),
('Prepare the actual published page', 'Build', 'The static app has passed its core checks.',
 "Prepare Resource Shelf for publication with accurate title, description, canonical URL, social image and crawlable internal links. Use visible content to determine any structured data; do not invent ratings or endorsements. Check the actual hosting path for direct detail routes, assets and downloads. Publish only through the agreed workflow, then open the resulting URL and repeat the core task. Report observed results and remaining checks.",
 'The published URL, rather than only the preview, has verification evidence.'),
('Measure useful actions without worksheet text', 'Plan', 'You want to understand use without collecting private input.',
 "Plan measurement for Resource Shelf using the site's existing analytics and privacy controls. Track fixed events for resource views, successful prompt copies, brief exports and download clicks with allowlisted resource IDs. Never include search text, worksheet answers, email addresses or raw URLs containing personal information. Avoid duplicate pageview configuration. Explain that a click is not completed reading and self-marked completion is not proof of proficiency.",
 'The event contract has fixed identifiers and separate definitions for each metric.'),
('Design a small distribution experiment', 'Chat', 'The kit is usable and you need a learning plan for traffic.',
 "Design a 14-day distribution experiment for the free Resource Shelf learning kit. Choose two channels based on audience fit and current posting rules. Propose a useful native contribution, a tagged external link, a time budget and a decision rule. Separate site visits, useful-action clicks, free joins and paid outcomes. Label forecasts as hypotheses. Draft the posts for review; do not send messages, publish, buy traffic or claim a marketplace listing guarantees discovery.",
 'The experiment has measurable observations and a decision, with no invented results.'),
]


def text_normalize(value: str) -> str:
    return value.replace('\u2013', '-').replace('\u2014', '-').replace('\u2011', '-').replace('\u00a0', ' ')


def write_text(name: str, content: str):
    path = OUT / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text_normalize(content).strip() + '\n', encoding='utf-8')


def write_csv(name: str, headers, rows):
    stream = io.StringIO(newline='')
    writer = csv.writer(stream, lineterminator='\n')
    writer.writerow(headers)
    writer.writerows(rows)
    write_text(name, stream.getvalue())


def build_markdown_and_csv():
    OUT.mkdir(parents=True, exist_ok=True)
    for resource_id, title, topic, summary in RESOURCE_DATA:
        text = RESOURCE_TEXT[resource_id]
        text += f'\n---\nOriginal AI Superpower teaching resource. Updated {UPDATED}.\nLearn and adapt: {HUB}\nReuse notes: ../START-HERE.md\n'
        write_text(f'resources/{resource_id}.md', text)

    resource_rows = [[rid, title, topic, summary, 'Markdown worksheet', 'Beginner',
                      f'https://aisuperpower.cc/downloads/lovable/resources/{rid}.md', UPDATED]
                     for rid, title, topic, summary in RESOURCE_DATA]
    write_csv('Resource-Shelf-Sample-Data.csv',
              ['id', 'title', 'topic', 'summary', 'format', 'level', 'download_url', 'updated_date'], resource_rows)

    pack = ['# Lovable Prompt Pack', '', '## 32 focused requests for one useful app', '',
            f'Original AI Superpower prompts | Reviewed {UPDATED} | Companion: {HUB}', '',
            'Use one prompt at a time in the appropriate mode. Replace bracketed fields with your own non-sensitive context. Read the plan, inspect the result and keep evidence of your checks. These are authored exercise prompts, not claims that every prompt has been executed in a signed-in Lovable workspace.', '',
            'Current terminology: Chat discusses decisions; Plan prepares a reviewable approach; Build implements changes. Older tutorials may call Build Agent mode and Instructions Knowledge. Workspace credits and connected-service usage depend on your current account; inspect costs before enabling features.', '',
            'Resource Shelf begins as six public resources with search, topic filters, details, real file links and browser-local favourites. Prompts 24-28 are optional extensions after the static version works.', '',
            '## Index', '']
    for i, (title, mode, when, prompt, check) in enumerate(PROMPTS, 1):
        pack.append(f'{i}. {title} ({mode})')
    for i, (title, mode, when, prompt, check) in enumerate(PROMPTS, 1):
        pack.extend(['', f'## {i:02d}. {title}', '', f'**Mode:** {mode}  ', f'**Use when:** {when}', '',
                     '```text', prompt, '```', '', f'**Check before continuing:** {check}'])
    pack.extend(['', '## Sources and reuse', '',
                 'The prompts are original practice material. Platform terminology and boundaries are informed by the official links in SOURCE-REGISTER.md. For reuse, see START-HERE.md. No account credentials, personal data or real client files are included.', ''])
    write_text('Lovable-Prompt-Pack.md', '\n'.join(pack))

    write_text('Lovable-App-Brief.md', f'''# One-page Lovable App Brief

**Project:** ____________________  **Owner:** ____________________  **Date:** ____________________

## Person, problem and result

- Primary user and context:
- Recurring problem, with evidence we actually have:
- One task the first version helps them finish:
- Observable success:

## Smallest complete journey

Start: ____________________  Action: ____________________  Result: ____________________

- Screens or routes:
- Required data fields and their source:
- Empty, invalid and failure states:
- Actual files or integrations needed:

## Boundaries

- Included in this version:
- Deliberately excluded:
- Public, private, browser-local or shared data:
- Account/service owner and usage budget:
- Visual direction and accessibility requirements:

## Five acceptance checks

1. Normal task:
2. Empty or invalid input:
3. Direct route and refresh:
4. Keyboard and narrow screen:
5. Data, file or permission boundary:

## Completion record

Published or preview URL: ____________________  Version: ____________________

Evidence kept: ____________________  Remaining issue: ____________________

Decision: share / improve first / stop  |  One next experiment: ____________________

**Resource Shelf example:** Six public worksheets; search and topic filters; details and real downloads; favourites saved in this browser. No accounts, uploads, payments or external AI calls in the first version.

Original AI Superpower worksheet | {HUB} | {UPDATED}
''')

    cases = [
        ('Static', 'Library', 'Load the six approved records', 'Open the library', 'All six distinct titles render with correct topic and summary', 'High'),
        ('Static', 'Search', 'All topics; saved-only off', 'Search portfolio', 'Only Portfolio Case Study Outline matches', 'High'),
        ('Static', 'Search case', 'All topics; saved-only off', 'Search PORTFOLIO', 'Same result as lowercase portfolio', 'Medium'),
        ('Static', 'Search whitespace', 'All topics; saved-only off', 'Search two spaces then portfolio then two spaces', 'Whitespace is trimmed; portfolio outline still matches', 'Medium'),
        ('Static', 'Summary search', 'All topics; saved-only off', 'Search neutral', 'Research Interview Planner matches through its summary', 'Medium'),
        ('Static', 'Topic filter', 'Search empty; saved-only off', 'Select Accessibility', 'Only Accessibility Spot Check appears; count is 1', 'High'),
        ('Static', 'Combined filters', 'Saved-only off', 'Search portfolio; select Research', 'No match; count 0; useful reset control', 'High'),
        ('Static', 'Reset', 'Search and topic conflict; saved-only on', 'Activate Clear filters', 'Search clears; All topics selected; saved-only off; six records visible', 'High'),
        ('Static', 'Known detail', 'Known resource exists', 'Open client-kickoff-checklist details directly; refresh', 'Correct details and real download remain accessible', 'High'),
        ('Static', 'Unknown detail', 'Use a synthetic nonexistent ID', 'Open an invalid detail URL', 'Helpful not-found state; no unrelated resource shown', 'High'),
        ('Static', 'Downloads', 'All six files deployed', 'Open each resource file', 'File exists; title and content match the chosen resource', 'High'),
        ('Static', 'Missing download', 'Use an isolated fixture with blank download_url', 'Inspect that resource', 'Unavailable state; no false success or guessed URL', 'High'),
        ('Static', 'Save persistence', 'Storage available', 'Save kickoff checklist; refresh; open saved-only', 'Saved item persists in same browser with clear local label', 'High'),
        ('Static', 'Remove persistence', 'One saved item', 'Remove item; refresh; open saved-only', 'Item remains removed; helpful empty saved-list state', 'High'),
        ('Static', 'Unavailable storage', 'Block browser storage in test context', 'Save or remove a resource', 'No crash; limitation is communicated honestly', 'High'),
        ('Static', 'Stale saved data', 'Storage fixture includes unknown ID or invalid JSON', 'Load saved view', 'Unknown IDs ignored or recovered safely; no crash', 'Medium'),
        ('Static', 'Keyboard', 'No pointer', 'Complete search, filter, details, save and download by keyboard', 'Logical focus order; visible focus; operable controls', 'High'),
        ('Static', 'Mobile and text', '390px width; then enlarged text', 'Use controls, long title and details', 'Readable content; no clipped controls or horizontal page overflow', 'High'),
        ('Static', 'Safe text rendering', 'Isolated synthetic record contains script-like text', 'Render title and summary', 'Text displays inertly; no script executes', 'High'),
        ('Static', 'Privacy and events', 'Analytics configured; inspect debug events', 'Use search, worksheet and download; repeat with privacy opt-out', 'No user text in custom events; privacy controls respected', 'High'),
        ('Optional account', 'Signed-out public access', 'Backend extension enabled', 'Sign out; browse resources and download', 'Public resources remain accessible as specified', 'High'),
        ('Optional account', 'Owner isolation', 'Synthetic accounts A and B; A saved record exists', 'As B request A saved-record ID directly', 'No read/delete access to A private record', 'Critical'),
        ('Optional account', 'Catalogue permissions', 'Ordinary non-admin account', 'Attempt direct resource create/update/delete request', 'Unauthorized operation rejected by trusted enforcement', 'Critical'),
        ('Optional account', 'Duplicate favourites', 'Signed-in owner', 'Repeat or concurrently submit same save', 'No duplicate saved-resource link is created', 'High'),
        ('Optional integration', 'Secret boundary', 'Integration uses a private credential', 'Inspect client bundle and network response without exposing key', 'No privileged secret is present; server verifies permission', 'Critical'),
        ('Published', 'Release smoke test', 'Actual live URL and clean browser context', 'Repeat search, detail refresh, save and six downloads', 'Published behavior matches expected release, not only preview', 'High'),
    ]
    test_rows = [[f'TC-{i:02}', scope, feature, precondition, steps, expected, priority, '', '', '', '', '']
                 for i, (scope, feature, precondition, steps, expected, priority) in enumerate(cases, 1)]
    write_csv('Lovable-Test-Matrix.csv', ['test_id', 'scope', 'feature', 'precondition', 'steps', 'expected_result',
              'priority', 'observed_result', 'status', 'evidence_url', 'tested_by', 'tested_at'], test_rows)

    tracker_headers = ['period_start', 'period_end', 'channel', 'placement_url', 'utm_source', 'utm_medium',
                       'utm_campaign', 'utm_content', 'landing_url', 'metric_name', 'metric_value', 'metric_unit',
                       'report_source', 'segment', 'limitations', 'decision', 'next_action']
    write_csv('Lovable-Launch-Tracker.csv', tracker_headers, [[''] * len(tracker_headers) for _ in range(20)])

    register = ['# Source register', '', f'Reviewed {UPDATED}. Primary sources for platform facts; original exercises are our own recommendations.', '',
                'Interfaces, pricing, permissions and posting rules can change. Recheck the relevant page before acting. The current 2026 Google AI guidance is used instead of treating older reporting descriptions as complete.', '']
    for code, (label, url) in SOURCES.items():
        register.append(f'- **{code} - {label}:** {url}')
    register.extend(['', '## Evidence boundaries', '',
                     '- Resource Shelf and its six resource records are authored teaching examples. The browser demo is not evidence of a signed-in build inside Lovable.',
                     '- Suggested timings, exercises, prompts and channel priorities are planning recommendations, not measured outcomes.',
                     '- Monetise has a public Whop presence. Its archived page mentions Skool. We have not verified a current private-course list of recommended posting platforms.',
                     '- No rankings, AI citations, traffic, earnings, customer results or certifications are guaranteed or invented.', ''])
    write_text('SOURCE-REGISTER.md', '\n'.join(register))

    write_text('START-HERE.md', f'''# Your free Lovable starter kit

**Start with one useful app. Keep the evidence of what works.**

By Ashley Kays / AI Superpower. Version {UPDATED}. Independent educational material; not an official Lovable course or an endorsement by Lovable, Whop or another platform.

Complete lessons: {HUB}
Try the authored teaching demo and app brief builder: {HUB}/toolkit
Distribution field guide: {HUB}/distribution

## A practical first pass

1. Read the workbook's first three sections and fill the one-page app brief.
2. Inspect the six-row Resource Shelf CSV and open its actual Markdown worksheets.
3. Choose one focused prompt, review the plan and build one complete static flow.
4. Test search, filters, details, real downloads and local favourites. Record actual results in the test matrix.
5. Work through the launch checklist. Add accounts, shared data or integrations only when a real requirement justifies them.
6. Choose two relevant distribution placements. Record views, useful actions and limitations separately.

## Files and their purpose

| File | Use it for |
| --- | --- |
| Lovable-Starter-Workbook.pdf | A 15-page project sequence, worked brief, exercises and decision record |
| Lovable-Prompt-Pack.md | 32 focused original prompts with a mode, use case and completion check |
| Lovable-App-Brief.md | An editable one-page project brief |
| Lovable-Launch-Checklist.pdf | Three printable pages of product, data, deployment and measurement checks |
| Lovable-Test-Matrix.csv | 26 meaningful test cases; observed result and status remain blank |
| Resource-Shelf-Sample-Data.csv | Six fictional records with real downloadable worksheet links |
| Lovable-Launch-Tracker.csv | Blank measurement rows; no sample performance or invented results |
| resources/ | Six original usable Markdown worksheets referenced by the sample data |
| DISTRIBUTION-PLAN.md | A bounded channel test and verified posting constraints |
| WHOP-LISTING-DRAFT.md | Ready-to-adapt product copy and a free-delivery setup checklist; not published |
| SOURCE-REGISTER.md | Official source URLs and verification boundaries |

The ZIP contains the complete collection above. PDFs are printable; Markdown and CSV files are editable. The PDFs do not contain fillable form fields. Use the editable companions or annotate/print the workbook.

## The teaching project

Resource Shelf helps a freelance designer find, save and download a relevant resource. Version one has six public records, title/summary search, one topic filter, detail routes, actual file links and favourites stored in the current browser. It has no account, database, payments, private client documents or external AI calls. Optional later lessons add backend storage and permissions deliberately.

The sample records are fictional; the attached worksheets are real original learning assets. No confidential client material is included. The website demo is authored example code, not a recording or proof that a project was built in a signed-in Lovable workspace. Run the exercises in your own project and keep your own verification evidence.

## Use the test matrix honestly

Run each applicable case and fill observed_result, status, evidence_url, tested_by and tested_at. Suggested statuses: Pass, Fail, Blocked, Not run or Not applicable. Mark optional account/integration cases Not applicable for the static first version. Keep screenshots or notes without credentials or personal data. Expected results are targets; blank observed results are not passes.

## Use the tracker without mixing measures

Use one metric per row, with its reporting period, source and unit. Suitable metric names include search_impressions, search_clicks, google_ai_impressions, bing_ai_citations, page_views, sessions, engaged_sessions, lesson_views, prompt_copies, brief_exports, kit_download_clicks, whop_free_joins, qualified_inquiries, paid_orders, collected_revenue, hours_spent and cost. Use a currency unit for money, and do not add unlike units together.

A download click is not proof that the file was read. A free join is not revenue. A completion checkbox is self-reported. Citation reports cover specific supported AI surfaces, not every assistant. An empty reporting cell means unknown, not zero. Record consent, blocking, attribution and sample-size limitations when relevant. A campaign tag helps identify a placement; it does not create traffic.

The tutorial hub uses fixed events such as lovable_lesson_view, lovable_prompt_copy, lovable_brief_export, lovable_kit_download and lovable_lesson_complete. Your own project should reuse its established analytics and privacy controls and avoid duplicate pageview configuration. Do not send worksheet answers, search queries, email addresses or raw personal inputs as custom event values.

## Reuse permission

You may use, copy and adapt the original prompts, worksheets, sample data and checklists for your personal work, teaching and client projects. Attribution in an adapted client deliverable is appreciated but not required. If you redistribute this free kit unchanged, retain the AI Superpower credit, the link to {HUB}, these reuse notes and the source register. Do not imply that Lovable or another named platform endorses you or the kit.

Third-party platform names, marks, documentation and services remain subject to their owners' rights and terms. The cover is an AI-generated illustrative scene made with Higgsfield; it is not a screenshot, a real event photograph or evidence of a customer result.

## Account and cost notes

These downloads are free and do not require an email address. Lovable and any connected services have separate account requirements, plan limits and usage costs. Current terminology includes Chat, Plan, Build and Instructions; older material may use Agent mode or Knowledge. Review shared workspace credits and usage before starting a paid or high-usage feature. Never put secret values into prompts, screenshots, public source code or this worksheet collection.

## Keep the kit current

Official references and current links are in SOURCE-REGISTER.md. Check the live tutorial hub for revisions. If an interface label or source changes, record the date and update your own working copy. Corrections: https://aisuperpower.cc/contact
''')

    build_distribution_notes()


def build_distribution_notes():
    write_text('DISTRIBUTION-PLAN.md', f'''# Lovable kit: a focused distribution experiment

Prepared {UPDATED}. This is a plan and draft material, not a record of published posts or measured results.

## The offer and destination

The free AI Superpower learning hub helps someone plan, build, check, publish and measure a small Resource Shelf app. Keep the complete lessons open on the web. Offer the same files through a Whop free product if its delivery/community features fit the audience.

- Hub: {HUB}
- Free kit: {HUB}#free-kit
- Example external link: {HUB}?utm_source=linkedin&utm_medium=social&utm_campaign=lovable-launch&utm_content=first-build-checklist#free-kit

Use different source and creative labels for different placements. Do not add campaign tags to routine links within the same site.

## Choose two first channels

1. **An owned audience channel:** a native LinkedIn lesson or a real YouTube screen recording. Show one task, one problem found and the check that confirmed a fix. Link the matching lesson. Generated visuals can introduce the story; product instructions should show the real interface or be labelled as conceptual examples.
2. **A relevant builder community:** contribute a genuine Lovable-built app in the official Discord showcase channel when the current channel rules permit it, or use r/nocode's permitted product-launch thread. Be clear about your connection and answer questions.

Whop is a delivery/discovery experiment alongside those channels. A listing by itself does not establish traffic. Product Hunt becomes more useful when the toolkit has a working product or interactive tool to try. Skool adds ongoing community work; choose it only when you can support an active learning experience.

## Verified Monetise distinctions

- **Whop:** Monetise has a public store at https://whop.com/monetise/.
- **Skool:** an archived first-party Monetise page mentions building a community inside Skool: https://www.monetise.com/archives/misc/v1. This is historical evidence, not proof of a current private-course recommendation.
- We have not verified first-party Monetise recommendations for Reddit, Pinterest, Gumroad, Payhip or Product Hunt. Those are independent options to evaluate, not established claims about the paid course.

## Posting rules to check before publishing

| Destination | Appropriate contribution | Current constraint |
| --- | --- | --- |
| Lovable Discord | A genuine build and one focused feedback question | Official page points to #lovable-built-showcase; read the channel rules first |
| r/lovable | Relevant native educational help in its designated threads | Reviewed sidebar restricts advertising/services/referrals, places prompting education in the pinned megathread and allows only .lovable.app links; do not post the AI Superpower promotion there |
| r/nocode launch megathread | Transparent maker introduction and useful walkthrough | Verify the pinned thread is open and current rules permit your link |
| Product Hunt | A usable tool with honest screenshots and a clear problem solved | Ask for feedback, not upvotes; no vote incentives, bought engagement or spam |
| Show HN | A substantive original tool people can try | Blogposts, newsletters, lists and signup pages do not qualify for Show HN |
| Skool | A supported learning community | Discovery has activity and presentation requirements; do not assume immediate placement |

Source links: see C1-C5 and M1-M3 in SOURCE-REGISTER.md. Rules change; the live community takes precedence over this snapshot.

## Fourteen days of learning

- **Days 1-2:** verify all downloads, published routes, mobile experience and event collection. Prepare a free storefront if chosen; test actual access.
- **Days 3-5:** publish one useful native lesson and one permitted community contribution through an authorized account. Give each a distinct tagged link.
- **Days 6-9:** answer real learner questions. Improve the section where people become stuck. Avoid mass cross-posting identical copy.
- **Days 10-14:** compare engaged sessions, useful-action clicks, questions and effort. Record continue, change or pause decisions. Small samples are directional evidence, not stable conversion forecasts.

## Measurement contract

Keep Search Console search impressions/clicks, Google AI impressions, Bing AI citations, site views/sessions, useful-action events, Whop free joins and paid outcomes distinct. Use the blank Launch Tracker. For a rate, record numerator, denominator and period consistently. Do not call click counts unique people or free joins sales.

## Draft post to adapt

> A useful first Lovable app starts with a smaller brief.
>
> Our free learning hub walks through Resource Shelf: six sample resources, search, topic filters, details, real downloads and local favourites. Then it covers testing, publishing and measurement.
>
> The free kit includes a workbook, 32 focused prompts, an app brief, a test matrix and a launch tracker. The demo is an authored teaching example; the lessons help you build your own project in Lovable.
>
> Which part is hardest in your first build: choosing the scope, fixing the behavior or deciding it is ready to share?
>
> Lessons and kit: {HUB}

Adapt this to the platform and actual delivered result. It is not a published post. Do not claim customer outcomes, platform endorsement or test results that you do not have.
''')

    write_text('WHOP-LISTING-DRAFT.md', f'''# Whop listing draft: Lovable First Useful App Kit

**Status:** Prepared copy and setup checklist. Not a claim that a Whop product has been created, approved or listed.
**Publisher:** AI Superpower
**Price:** Free, with no timed paid trial attached to this offer
**Suggested product name:** Lovable First Useful App Kit
**Suggested headline:** Plan, build and check one useful web app with guided lessons and reusable tools.

## Product description

Build your first useful Lovable app with a clear plan and checks you can explain.

This free kit follows Resource Shelf, a small public resource library with search, topic filters, detail pages, real downloads and favourites saved in the browser. Start with the static version, then use the optional lessons when you need accounts, shared data or integrations.

Inside the kit:

- A 15-page starter workbook with a worked brief, exercises and a launch decision record.
- 32 focused prompts for planning, building, debugging, permissions and measurement.
- An editable app brief and a three-page launch checklist.
- A 26-case test matrix with blank result fields.
- Six fictional sample records backed by six real editable worksheets.
- A blank launch tracker and a practical distribution plan.

The complete tutorial is also available at {HUB}. Work at your own pace and keep a copy of the files. This is independent AI Superpower material, not an official Lovable course. The example is authored teaching content; follow the instructions in your own project and record what you verify.

## Suggested FAQs

**Do I need coding experience?** The first exercise uses plain-language briefs and a small static app. The later lessons explain the technical decisions you will need to review as your project grows.

**Is it free?** This kit is free. Lovable and any connected services have their own plans, credit limits and usage charges.

**What do I receive?** Two PDFs, editable Markdown resources, three CSV files, six example worksheets and supporting setup/source notes. The ZIP contains the complete collection.

**Is live support included?** This is a self-guided resource. Do not describe live support, coaching, certificates or a live cohort as included unless they have separately been arranged and added.

**Can I use it for clients?** Yes, you may adapt the original material for personal, teaching and client projects. Retain attribution and reuse notes when redistributing the unchanged kit. Read START-HERE.md for the full terms.

**Will it make my app rank or earn money?** The kit helps you make and evaluate a useful result. Rankings, citations, traffic and revenue depend on the project and real demand; none is promised.

## Gallery to prepare

1. Kit cover with the real files listed.
2. A readable sample of the app brief and launch checklist.
3. An actual screenshot of the Resource Shelf teaching demo, labelled as an authored example.
4. A short real build demonstration when one has been recorded. Do not present the Higgsfield illustration as product-interface footage.

## Free delivery setup

1. Choose the correct existing business dashboard or create the intended store.
2. Open Products, create the product and choose Free pricing. Fill the title, headline, description, logo and gallery.
3. Add Files and Courses if needed. Grant this free product access to the intended apps.
4. Upload the ZIP and individual documents. Create a Start here lesson that explains the first project and links to the open tutorial.
5. Make intended worksheets downloadable and verify file names, content and mobile access.
6. Inspect the current Discover status and requirement tracker. Complete or apply through the action shown; do not assume approval.
7. Create the free checkout link in Dashboard > Checkout links. Verify pricing and check that the offer does not turn into a paid trial or unintended recurring plan.
8. Test the join, course access and file downloads as a new member. Record actual results.
9. Create a separate tracking link per placement and record clicks/free joins separately from paid outcomes.

Public Whop guides differ on automatic listing versus an Apply step. Follow the current dashboard and verify the returned state. See source references W1-W5 for storefront, Courses, Files, tracking and Discover guidance.

## Publication record to complete

- Business/store URL:
- Product URL:
- Free checkout URL:
- Discover status:
- Access test date and result:
- Tracking-link register:
- Owner responsible for updates:
''')


class PDF:
    def __init__(self, filename, title, total, kind):
        self.path = OUT / filename
        self.c = canvas.Canvas(str(self.path), pagesize=(W, H), pageCompression=1, invariant=1)
        self.c.setTitle(title)
        self.c.setAuthor('Ashley Kays / AI Superpower')
        self.c.setSubject('Independent Lovable practice material with original exercises and reusable worksheets')
        self.total, self.kind, self.number = total, kind, 0
        self.lowest = H

    def paragraph(self, text, y, x=M, width=CW, size=10.3, leading=15, bold=False, color=INK, gap=8):
        style = ParagraphStyle('p', fontName=BOLD if bold else REG, fontSize=size, leading=leading,
                               textColor=color, alignment=TA_LEFT, spaceAfter=0, allowWidows=0, allowOrphans=0)
        p = Paragraph(text_normalize(text), style)
        _, height = p.wrap(width, H)
        p.drawOn(self.c, x, y-height)
        self.lowest = min(self.lowest, y-height)
        if y-height < 55:
            raise ValueError(f'Content overflows {self.path.name} page {self.number}: y={y-height:.1f} text={text[:70]}')
        return y-height-gap

    def page(self, kicker, title, subtitle=''):
        if self.number:
            self.c.showPage()
        self.number += 1
        self.lowest = H
        self.c.setFillColor(INK)
        self.c.setFont(BOLD, 9)
        self.c.drawString(M, 757, 'AI SUPERPOWER')
        self.c.setFont(REG, 8.5)
        self.c.drawRightString(W-M, 757, self.kind.upper())
        self.c.setStrokeColor(LINE)
        self.c.line(M, 742, W-M, 742)
        self.c.setFont(REG, 8)
        self.c.setFillColor(MUTED)
        self.c.drawString(M, 28, 'aisuperpower.cc/learn/lovable')
        self.c.linkURL(HUB, (M, 24, 240, 37), relative=0)
        self.c.drawRightString(W-M, 28, f'{self.number:02d} / {self.total:02d}')
        y = self.paragraph(kicker.upper(), 720, size=8.8, leading=12, bold=True, color=GREEN, gap=9)
        y = self.paragraph(title, y, size=27, leading=32, bold=True, gap=12)
        if subtitle:
            y = self.paragraph(subtitle, y, size=11.1, leading=16, color=MUTED, gap=18)
        return y

    def heading(self, text, y):
        return self.paragraph(text, y, size=13.3, leading=18, bold=True, gap=8)

    def bullet(self, text, y, check=False, size=10.3):
        self.c.setStrokeColor(GREEN)
        self.c.setFillColor(GREEN)
        if check:
            self.c.rect(M, y-11, 8, 8, stroke=1, fill=0)
        else:
            self.c.circle(M+3, y-7, 2.2, stroke=0, fill=1)
        return self.paragraph(text, y, x=M+17, width=CW-17, size=size, leading=14.5, gap=7)

    def box(self, title, text, y, fill=SOFT, width=CW, x=M):
        p = Paragraph(text_normalize(text), ParagraphStyle('box', fontName=REG, fontSize=10.1, leading=14.7, textColor=INK))
        _, ph = p.wrap(width-28, H)
        h = ph + 51
        self.c.setFillColor(fill)
        self.c.roundRect(x, y-h, width, h, 9, stroke=0, fill=1)
        yy = self.paragraph(title, y-14, x=x+14, width=width-28, size=10.8, leading=15, bold=True, gap=9)
        self.paragraph(text, yy, x=x+14, width=width-28, size=10.1, leading=14.7, gap=0)
        return y-h-14

    def notes(self, title, y, lines=3, width=CW, x=M):
        h = 30 + lines * 21
        self.c.setStrokeColor(LINE)
        self.c.setFillColor(colors.white)
        self.c.roundRect(x, y-h, width, h, 8, stroke=1, fill=1)
        self.paragraph(title, y-12, x=x+13, width=width-26, size=10, leading=14, bold=True, gap=0)
        for i in range(lines):
            yy = y - 35 - i*21
            self.c.line(x+13, yy, x+width-13, yy)
        if y-h < 60:
            raise ValueError(f'Notes overflow page {self.number}')
        return y-h-14

    def table(self, headers, rows, y, widths, size=9.3):
        style = ParagraphStyle('cell', fontName=REG, fontSize=size, leading=size+3.7, textColor=INK)
        headstyle = ParagraphStyle('headcell', parent=style, fontName=BOLD)
        values = [[Paragraph(html.escape(text_normalize(str(t))), headstyle) for t in headers]]
        values += [[Paragraph(html.escape(text_normalize(str(t))), style) for t in row] for row in rows]
        table = Table(values, colWidths=widths, hAlign='LEFT')
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), SOFT),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#fbfcfa')]),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LINEBELOW', (0, 0), (-1, 0), .8, GREEN),
            ('LINEBELOW', (0, 1), (-1, -1), .4, LINE),
            ('LEFTPADDING', (0, 0), (-1, -1), 9),
            ('RIGHTPADDING', (0, 0), (-1, -1), 9),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ]))
        _, height = table.wrap(CW, H)
        if y-height < 60:
            raise ValueError(f'Table overflow page {self.number}: {height:.1f} at {y:.1f}')
        table.drawOn(self.c, M, y-height)
        self.lowest = min(self.lowest, y-height)
        return y-height-15

    def references(self, ids, y=57):
        labels = []
        for code in ids:
            label, url = SOURCES[code]
            labels.append(f'<link href="{html.escape(url, quote=True)}" color="#486359">{code}: {html.escape(label.split(": ", 1)[-1])}</link>')
        reference = Paragraph('References: ' + ' | '.join(labels), ParagraphStyle('reference', fontName=REG, fontSize=7.5, leading=9, textColor=MUTED))
        _, height = reference.wrap(CW, 30)
        reference.drawOn(self.c, M, y-height)

    def finish(self):
        if self.number != self.total:
            raise ValueError(f'{self.path.name}: expected {self.total} pages, created {self.number}')
        self.c.save()


def build_workbook():
    p = PDF('Lovable-Starter-Workbook.pdf', 'Lovable Starter Workbook | AI Superpower', 15, 'Starter workbook')
    y = p.page('Free learning studio', 'Build one useful app.<br/>Keep what you learn.',
               'A practical Lovable workbook for Resource Shelf: a small library of six useful resources.')
    if HERO.exists():
        # Preserve source dimensions while embedding a compact print-quality JPEG.
        cover_jpeg = io.BytesIO()
        with Image.open(HERO) as cover:
            cover.convert('RGB').save(cover_jpeg, format='JPEG', quality=90, optimize=True)
        cover_jpeg.seek(0)
        img = ImageReader(cover_jpeg)
        iw, ih = img.getSize()
        height = CW * ih / iw
        p.c.drawImage(img, M, y-height, width=CW, height=height, mask='auto')
        y -= height + 8
        y = p.paragraph('Illustrative creative scene made with Higgsfield. Not product-interface footage.', y, size=8.1, leading=11, color=MUTED, gap=16)
    y = p.box('Your first complete result', 'A visitor can find a relevant worksheet, inspect its details, download the real file and save it in this browser. Start with public sample content. Add accounts and shared data only when the project needs them.', y, fill=LIME)
    y = p.paragraph('<b>Inside:</b> a worked brief, a six-record data model, focused build exercises, test evidence, a launch decision and a measurement plan.', y, size=10.5, leading=15)
    y = p.paragraph('By Ashley Kays / AI Superpower<br/>Independent learning material | November 19, 2026', y, size=9.2, leading=13, color=MUTED)

    y = p.page('Start with the result', 'A small app. A complete journey.', 'Use this sequence alongside the free tutorial hub. The exercises are original practice recommendations; your results come from what you build and verify.')
    y = p.table(['Stage', 'Make', 'Evidence to keep'], [
        ('Brief', 'One person, one task, clear boundaries', 'One-page brief and acceptance checks'),
        ('Build', 'Library, search, filter, details, files, local saves', 'A complete path you can demonstrate'),
        ('Test', 'Happy path and important failure states', 'Expected/observed results and retest notes'),
        ('Publish', 'The actual hosted URL and its files', 'Signed-out release check and recovery plan'),
        ('Learn', 'A small distribution and measurement test', 'Dated observations and a next decision'),
    ], y, [65, 228, 231])
    y = p.heading('Before you open the builder', y)
    for t in ['Open the six Markdown worksheets and inspect their CSV records.',
              'Prepare fictional practice data and decide what is deliberately excluded.',
              'Check your workspace credits, current plan and any connected-service costs.',
              'Keep a folder for the brief, screenshots, test records and release notes.']:
        y = p.bullet(t, y, check=True)
    y = p.box('A useful boundary', 'This workbook does not establish that the example was built in a signed-in Lovable account. The teaching demo shows intended behavior. Run the exercises in your own workspace and record what actually happened.', y)
    p.references(['L1', 'L13'])

    y = p.page('Scope the first release', 'Write a brief you can test.', 'The starter example is filled in below. Use Lovable-App-Brief.md to make an editable copy for your own idea.')
    y = p.table(['Decision', 'Resource Shelf example'], [
        ('Audience', 'A freelance designer who wants useful templates in one place.'),
        ('Core job', 'Find, inspect and download a relevant resource; optionally save it.'),
        ('First screens', 'Public library, resource details and saved-only view.'),
        ('Data', 'Six public fictional resource records and local saved IDs.'),
        ('Included', 'Title/summary search, topic filter, result count, reset and real file links.'),
        ('Excluded', 'Accounts, uploads, payments, private client documents and external AI calls.'),
    ], y, [104, 420])
    y = p.heading('Five checks that define the result', y)
    for t in ['Searching portfolio finds its outline; uppercase and padding behave the same.',
              'Selecting Research shows the interview planner; conflicting filters can be reset.',
              'A known detail route opens directly; an unknown ID has a useful not-found state.',
              'Each available download opens the correct real worksheet.',
              'Saved items survive refresh where storage works, with the local-only boundary explained.']:
        y = p.bullet(t, y, size=9.8)
    y = p.notes('My one user, one task and clearest success check', y, lines=2)
    p.references(['L2'])

    y = p.page('Prepare the content', 'Six records. Real files.', 'Inspect the data before asking the builder to render it. A good dataset makes the desired behavior concrete.')
    y = p.table(['Resource', 'Topic', 'Useful outcome'], [
        (title, topic, summary) for _, title, topic, summary in RESOURCE_DATA
    ], y, [166, 88, 270], size=8.9)
    y = p.heading('Keep a simple data contract', y)
    y = p.paragraph('<b>id</b> stays stable when a title changes. <b>title</b> and <b>summary</b> are searched. <b>topic</b> supports filtering. <b>format</b> and <b>level</b> help a visitor choose. <b>download_url</b> must point to an actual file. <b>updated_date</b> records the content revision.', y)
    y = p.box('Try a controlled variation', 'In a copy of the data, make one title longer and one download URL blank. The layout should wrap the title and explain that the file is unavailable. Restore the approved manifest before publishing.', y, fill=LIME)
    y = p.notes('Which field or state exposed an assumption in my design?', y, lines=2)

    y = p.page('Work deliberately', 'Use the mode that fits the task.', 'Current documentation distinguishes Chat, Plan and Build. Older material may call Build “Agent mode” and Instructions “Knowledge”.')
    y = p.table(['Mode', 'Use it for', 'A useful request'], [
        ('Chat', 'Explore a decision', 'Does this first version need accounts? Explain the tradeoff.'),
        ('Plan', 'Review the approach before changes', 'Describe search, filtering, states and checks. Do not implement yet.'),
        ('Build', 'Implement an agreed change', 'Build the approved search behavior and verify the named cases.'),
    ], y, [57, 180, 287])
    y = p.heading('Put stable decisions in Instructions', y)
    y = p.box('A starting instruction to adapt', 'Resource Shelf is a public learning library for freelance designers. Version one uses six approved records, real files and browser-local favourites. Preserve the static-first scope, white-and-green design, semantic controls and clear empty/error states. Never invent file availability, customer results or verification. Ask about a material ambiguity and report what was actually tested.', y)
    y = p.paragraph('Keep credentials and temporary tasks out of persistent Instructions. Review generated changes against the brief; an instruction is guidance, not proof that every result follows it.', y)
    y = p.notes('One project rule I want to keep stable', y, lines=2)
    p.references(['L2', 'L3', 'L4'])

    y = p.page('Build the first useful slice', 'Make the whole task work.', 'A complete slice connects the controls, the content and the outcome. Check the result before asking for the next feature.')
    for title, text in [
        ('Library', 'Render the six approved records with readable titles, summaries and topics.'),
        ('Search and filter', 'Match title and summary without case sensitivity. Trim padding. Combine search and topic using AND logic.'),
        ('Details', 'Use stable IDs for routes. Direct visits and refresh must show the correct record.'),
        ('Download', 'Use the real manifest URL. Missing files get an unavailable state, not a guessed link.'),
    ]:
        y = p.heading(title, y)
        y = p.paragraph(text, y, gap=11)
    y = p.box('Focused build request', 'Implement search across title and summary, an accurate result count and Clear filters. Keep the six-record dataset. Verify portfolio, PORTFOLIO, a padded query, a no-match query, a conflicting topic and reset. Preserve the existing design and report the cases actually checked.', y, fill=LIME)
    y = p.notes('What did I observe in the first complete journey?', y, lines=3)
    p.references(['L3', 'L6'])

    y = p.page('Finish the useful details', 'Make saving and delivery honest.', 'The first saved list belongs to this browser. It is not an account, a backup or cross-device sync.')
    y = p.table(['Situation', 'Expected behavior'], [
        ('Save and refresh', 'The same stable resource ID remains saved when local storage is available.'),
        ('Remove and refresh', 'The removed ID stays removed; an empty saved list explains what to do.'),
        ('Blocked or invalid storage', 'The app stays usable and explains any persistence limitation.'),
        ('Old saved ID', 'Ignore missing resources safely rather than crashing or opening another item.'),
        ('Real download', 'The file opens and matches its title, format and description.'),
        ('Missing download', 'Show an honest unavailable state and a useful return action.'),
    ], y, [151, 373])
    y = p.heading('Inspect the whole file experience', y)
    for t in ['Open every worksheet, not just the ZIP archive.', 'Check the download control with a keyboard and on a narrow screen.',
              'Keep a copy of the manifest that belongs to the published release.', 'Measure a download click as a click; do not label it completed learning.']:
        y = p.bullet(t, y, check=True)
    y = p.notes('File or persistence issue / fix / result after repeating the check', y, lines=2)
    p.references(['L6'])

    y = p.page('Improve the experience', 'Design for the real states.', 'The default screen is one state. Good practice includes long text, empty results, keyboard use and a small viewport.')
    y = p.table(['Review area', 'What to try', 'What to record'], [
        ('Reading', 'Long title, enlarged text, short and long summaries', 'Clipping, hierarchy and whether the purpose stays clear'),
        ('Keyboard', 'Search, filter, details, save, download and return', 'Focus visibility, order, activation and any trap'),
        ('Meaning', 'Labels, saved state, result counts and errors', 'Whether words explain state without relying only on color'),
        ('Responsive layout', '390px, 768px and 1440px; inspect all important states', 'Widths and states actually checked; overflow or hidden controls'),
    ], y, [100, 222, 202])
    y = p.box('Give targeted visual feedback', 'Name the element and the user task: “Keep the topic label visible, let the selected topic wrap, and stack the controls at narrow widths.” Use the current preview toolbar to target changes. Check current usage allowances; do not assume every visual action is free.', y)
    y = p.paragraph('Use Accessibility Spot Check as an early review aid. It does not establish full standards conformance. Record manual checks, measured contrast and the need for any specialist review separately.', y)
    y = p.notes('The highest-impact usability issue I found', y, lines=3)
    p.references(['L5', 'L6', 'L13'])

    y = p.page('Debug with evidence', 'A defect needs a repeatable story.', 'The test matrix contains 26 proposed cases. Its observed-result and status columns are intentionally blank.')
    y = p.table(['Case', 'Expected result', 'Observed result'], [
        ('Search portfolio', 'Only the portfolio outline appears', 'Record after running'),
        ('Portfolio + Research', 'Zero results, count 0 and useful reset', 'Record after running'),
        ('Unknown resource ID', 'Not-found state, no unrelated content', 'Record after running'),
        ('Save, then refresh', 'Saved item persists where storage works', 'Record after running'),
    ], y, [146, 232, 146])
    y = p.heading('A useful defect report', y)
    y = p.box('Copy this structure', '<b>Environment:</b> preview or published URL, browser and width.<br/><b>Action:</b> the exact steps and input.<br/><b>Expected:</b> the behavior in the brief.<br/><b>Observed:</b> what happened, including a redacted error.<br/><b>Evidence:</b> screenshot, console detail or test output.<br/><b>Retest:</b> repeat the same case after the smallest relevant fix.', y, fill=LIME)
    y = p.paragraph('Use existing test tools for a confirmed regression risk. Keep a known working code version. A code restore is not a database rollback; schema, stored data and configuration may need separate recovery.', y)
    y = p.notes('One failed check and the evidence that changed my diagnosis', y, lines=2)
    p.references(['L6', 'L15'])

    y = p.page('Optional extension', 'Add shared data deliberately.', 'Move beyond the static version only for a clear benefit, such as account-based favourites across devices or controlled catalogue editing.')
    y = p.table(['Data or action', 'Intended access'], [
        ('Published resource records', 'Public read; approved administrators manage changes.'),
        ('Account saved-resource links', 'Only the signed-in owner can read, create or delete their saved links.'),
        ('Private provider credentials', 'Trusted server work only; never shipped in browser code or screenshots.'),
    ], y, [198, 326])
    y = p.paragraph('Lovable offers a built-in backend; an external Supabase project is another option. Record the connected service, billing owner and migration plan. Do not assume the options are interchangeable with a one-click move.', y)
    y = p.heading('Permission evidence to keep', y)
    for t in ['With synthetic accounts A and B, test that B cannot read or delete A’s saved record through a direct request.',
              'Test that an ordinary user cannot change the public catalogue.',
              'Verify ownership in database rules and privileged server functions, not just hidden controls.',
              'Keep public browsing open and explain any proposed upload of local saves.']:
        y = p.bullet(t, y, check=True, size=9.9)
    y = p.box('Pause before a paid integration', 'Name the user benefit, data sent, permission, cost, private credential location, server checks, timeout and failure behavior. Use the secure secret mechanism; never paste privileged keys into an ordinary prompt or public file.', y)
    p.references(['L9', 'L10', 'L11', 'L12'])

    y = p.page('Publish and hand over', 'Verify the URL people will use.', 'A working preview is useful; a tested release requires checking the actual published site and its files.')
    for t in ['Keep a known working version and record the release identifier.',
              'Document the repository, installation/build commands and environment variable names without secret values.',
              'Use the intended publishing workflow and inspect its security findings.',
              'Open the returned live URL in a signed-out context and repeat the main task.',
              'Directly open a detail URL, refresh it, and inspect a missing route.',
              'Check all six worksheet downloads and the complete ZIP.',
              'Record domain, hosting, service billing and maintenance ownership.',
              'Write recovery steps for code and any separate data/configuration changes.']:
        y = p.bullet(t, y, check=True)
    y = p.box('Code portability is a separate check', 'Git sync makes code available in the connected workflow; running the app elsewhere still depends on its framework, build, environment and external services. If an independent build was not executed, label it unverified.', y, fill=LIME)
    y = p.notes('Release URL / version / owner / remaining launch issue', y, lines=4)
    p.references(['L7', 'L8', 'L15'])

    y = p.page('Search and AI visibility', 'Make the content useful and reachable.', 'SEO, answer visibility and a good learning experience share practical foundations: accessible pages, original detail and trustworthy evidence.')
    y = p.table(['Page element', 'Resource Shelf starting point'], [
        ('Title', 'Resource Shelf: practical worksheets for freelance designers'),
        ('Description', 'Find and download project, portfolio, research and review worksheets.'),
        ('Main content', 'Clear titles, real descriptions, working file links and meaningful topic pages.'),
        ('Identity', 'Accurate author/publisher, revision date and transparent teaching-example label.'),
        ('Technical checks', 'Canonical URL, crawl access, direct-route behavior, internal links and sitemap.'),
        ('Rich media', 'Helpful visuals with descriptions; transcripts for actual instructional video.'),
    ], y, [114, 410])
    y = p.paragraph('Use structured data only when it matches visible content. Do not invent reviews or add schema as a promise of search treatment. Google’s current guidance does not require special AI markup or llms.txt for visibility in its AI search features.', y)
    y = p.box('Measure the right surface', 'Search Console can report search performance and supported generative-AI impressions. Check the site’s AI inclusion setting and indexing status. Bing AI Performance reports citations across supported experiences. Neither report is a count of all AI-driven site visits.', y, fill=LIME)
    y = p.notes('The search question my page answers, with a specific useful example', y, lines=2)
    p.references(['L14', 'G1', 'G2', 'G3'])

    y = p.page('Distribution and measurement', 'Run a small learning experiment.', 'Choose two channels where the audience has a reason to use the resource. A listing is an asset; traffic is an observed result.')
    y = p.table(['What you learn', 'Measure', 'Do not confuse it with'], [
        ('Did people see it?', 'Search/AI impressions or supported citation reports', 'Visits to your site'),
        ('Did they arrive?', 'Page views, users, sessions and source', 'Unique people inferred from view counts'),
        ('Did they use it?', 'Lesson views, prompt copies, exports, download clicks', 'Completed reading or proven skill'),
        ('Did business follow?', 'Qualified inquiries, paid orders and collected revenue', 'Free joins or promised earnings'),
    ], y, [127, 220, 177], size=8.8)
    y = p.heading('A first two-week test', y)
    for t in ['Days 1-2: test delivery, privacy controls and fixed analytics events.',
              'Days 3-5: share one useful native lesson and one permitted community contribution.',
              'Days 6-9: answer real questions and improve the confusing step.',
              'Days 10-14: compare useful actions and effort; continue, change or pause.']:
        y = p.bullet(t, y, size=9.8)
    y = p.box('Whop is an optional delivery channel', 'Create a Free product, attach the intended Files/Courses access, complete the storefront and inspect Discover requirements. Test a fresh member’s access. Keep tracking links separate by placement. The bonus listing draft is prepared copy, not a live product.', y)
    y = p.paragraph('Use the blank Launch Tracker: one metric per row, with period, unit, report source and limitations. Leave unknown values blank. Full channel rules and Monetise evidence distinctions are in DISTRIBUTION-PLAN.md.', y, size=9.8, leading=14)
    p.references(['W1', 'G2', 'B1'])

    y = p.page('Your release decision', 'Keep a record worth revisiting.', 'Fill this after testing. A remaining gap is useful information; it should not become a hidden assumption.')
    y = p.notes('Project / user / one useful task', y, lines=2)
    y = p.notes('Published or preview URL / release version / review date', y, lines=2)
    y = p.table(['Area', 'Evidence or remaining issue', 'Status'], [
        ('Main task and files', '', ''), ('Keyboard and mobile', '', ''),
        ('Data or permission boundary', '', ''), ('Published routes and recovery', '', ''),
        ('Measurement and ownership', '', ''),
    ], y, [162, 265, 97])
    y = p.notes('Decision: share / improve first / stop. Why?', y, lines=2)
    y = p.notes('One next experiment / owner / review date', y, lines=2)

    y = p.page('Keep learning', 'Sources, files and reuse.', 'Platform facts link to primary documentation. Exercises, prompts and sample worksheets are original AI Superpower material.')
    codes = ['L1','L2','L3','L4','L5','L6','L7','L8','L9','L10','L11','L12','L13','L14','L15','G1','G2','G3','B1','W1']
    top = y
    for col in range(2):
        yy = top
        for code in codes[col*10:(col+1)*10]:
            label, url = SOURCES[code]
            yy = p.paragraph(f'<b>{code}</b> <link href="{html.escape(url, quote=True)}" color="#186a4e">{html.escape(label)}</link>',
                             yy, x=M+col*272, width=252, size=9.2, leading=13.5, gap=8)
        y = min(y, yy)
    y -= 6
    y = p.box('Make these resources yours', 'Use and adapt the original prompts, worksheets and sample data for personal, teaching and client projects. If you redistribute the unchanged free kit, keep AI Superpower’s credit, the tutorial link, START-HERE.md and the source register. Do not imply endorsement by Lovable or another platform.', y, fill=LIME)
    y = p.paragraph('The kit includes editable Markdown, CSV data and tests, six actual sample worksheets, a launch checklist and distribution notes. Full exact source URLs, current-version notes and evidence boundaries are in SOURCE-REGISTER.md.', y)
    y = p.paragraph(f'<b>Continue:</b> <link href="{HUB}" color="#186a4e">{HUB}</link><br/><b>Practice session:</b> <link href="https://aiteachers.cc/learn/lovable-practice/" color="#186a4e">aiteachers.cc/learn/lovable-practice/</link>', y, size=10, leading=15)
    p.finish()


def build_checklist():
    p = PDF('Lovable-Launch-Checklist.pdf', 'Lovable Launch Checklist | AI Superpower', 3, 'Launch checklist')
    y = p.page('Release check 1 of 3', 'The product does its job.', 'Use this before sharing the static Resource Shelf. Check the actual behavior; leave unchecked items visible.')
    y = p.notes('Project / release URL / version / reviewer / date', y, lines=2)
    y = p.heading('Core journey and delivery', y)
    for t in ['The audience, purpose and primary action are clear on the first screen.',
              'All six approved records match the source CSV and have stable unique IDs.',
              'Search handles case and whitespace; topic and saved-only filters combine correctly.',
              'Result counts match the visible cards; zero results offer a working reset.',
              'Each detail route opens directly and after refresh; unknown IDs have a useful response.',
              'Every advertised worksheet and the ZIP open and contain the matching material.',
              'Missing or unavailable files are labelled honestly; no fabricated success appears.']:
        y = p.bullet(t, y, check=True, size=9.7)
    y = p.heading('Usability and local state', y)
    for t in ['The complete task works by keyboard with visible focus and meaningful labels.',
              'Narrow layouts and enlarged text remain readable without clipped controls.',
              'Saved items persist where supported; blocked or invalid storage does not crash the app.',
              'The interface clearly says that local favourites belong to this browser.']:
        y = p.bullet(t, y, check=True, size=9.7)
    y = p.notes('Highest-priority issue / owner / evidence / retest result', y, lines=2)

    y = p.page('Release check 2 of 3', 'Data, access and recovery are clear.', 'Mark account or integration items Not applicable for the static first version. Do not add infrastructure just to complete a checklist.')
    y = p.heading('Optional accounts, backend or integrations', y)
    for t in ['The service, data location, billing owner and expected usage are documented.',
              'Public resource browsing remains open if that is the agreed behavior.',
              'Two synthetic accounts prove owner isolation for private saved records, including direct requests.',
              'Ordinary users cannot edit the catalogue through direct database or server requests.',
              'Ownership is checked on the trusted side; hidden controls are not the only protection.',
              'Privileged secrets stay out of browser code, prompts, screenshots, downloads and logs.',
              'Any external data transfer is intentional; permission and error behavior are clear.',
              'Rate controls, validation, timeouts and provider failures are checked for paid/private calls.']:
        y = p.bullet(t, y, check=True, size=9.7)
    y = p.heading('Release and recovery', y)
    for t in ['A known working version, deployment identifier and maintainer are recorded.',
              'The build/handoff lists environment variable names without exposing values.',
              'Code recovery is separated from database, file-storage and configuration recovery.',
              'The published URL is tested in a fresh signed-out context; preview-only checks are labelled.']:
        y = p.bullet(t, y, check=True, size=9.7)
    y = p.notes('Not-applicable items / remaining data issue / recovery owner', y, lines=3)
    p.references(['L9','L11','L12','L15'])

    y = p.page('Release check 3 of 3', 'People can find it. You can learn.', 'Visibility, engagement and business results have different meanings. Set up the measures before interpreting them.')
    y = p.heading('Search, sharing and attribution', y)
    for t in ['Title, description, canonical and share image describe the actual page.',
              'Important content is readable HTML with useful internal links and real file destinations.',
              'Crawl/index settings and sitemap match intended public access.',
              'Structured data matches visible content; no invented ratings or endorsements appear.',
              'Claims, source links, author/publisher and revision dates are accurate.',
              'Each external placement uses a consistent source/campaign/creative label.',
              'Community rules were checked for the actual destination before posting.']:
        y = p.bullet(t, y, check=True, size=9.7)
    y = p.heading('Measurement and handoff', y)
    for t in ['Pageviews are not configured twice; analytics respects existing privacy controls.',
              'Custom events use fixed identifiers and do not include worksheet text or personal inputs.',
              'Search impressions, AI citations, visits, download clicks, free joins and revenue stay separate.',
              'The owner knows the first review date, decision rule and remaining measurement limits.']:
        y = p.bullet(t, y, check=True, size=9.7)
    y = p.notes('Decision: share / improve first / stop. Unresolved blockers and owner', y, lines=2)
    y = p.notes('First experiment / review date / evidence that will change the next step', y, lines=2)
    p.references(['G1','G2','B1'])
    p.finish()


def build_zip():
    output = OUT / 'Lovable-Starter-Kit.zip'
    files = sorted(path for path in OUT.rglob('*') if path.is_file() and path != output)
    with zipfile.ZipFile(output, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path in files:
            info = zipfile.ZipInfo(path.relative_to(OUT).as_posix(), date_time=(2026, 11, 19, 12, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, path.read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    return len(files)


def main():
    build_markdown_and_csv()
    build_workbook()
    build_checklist()
    count = build_zip()
    print(f'Built {count} kit files + ZIP in {OUT}')
    print('Workbook: 15 pages; launch checklist: 3 pages; focused prompts: 32; test cases: 26; resource worksheets: 6.')


if __name__ == '__main__':
    main()
