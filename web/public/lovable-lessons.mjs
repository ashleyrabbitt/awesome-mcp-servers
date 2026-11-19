// Original independent teaching content. Reviewed against official documentation on 2026-11-19.
// Resource Shelf is an authored practice example; these lessons do not claim execution in a signed-in Lovable account.
export const lovableLessons = [
  {
    "id": "getting-started",
    "title": "Lovable tutorial for beginners: plan a useful first app",
    "description": "Define the audience, scope, and acceptance criteria for Resource Shelf, a small resource library for freelance designers.",
    "stage": "Start",
    "minutes": 25,
    "answer": "Start with one useful job and a small set of screens. In this authored example, Resource Shelf helps a freelance designer find, save, and download a relevant resource. The first version uses six fictional records and browser-local favourites; accounts and shared data come later.",
    "sections": [
      {
        "title": "Choose the smallest complete result",
        "html": "<p>Open a blank document before opening a build tool. Write who will use the app, what they are trying to finish, and what currently gets in their way. Our user is a freelance designer who has useful templates scattered across bookmarks and folders. The first useful result is finding a suitable template and opening its real download.</p><p>Keep the first release narrow: a library, a resource detail page, search, topic filters, and a saved list. Exclude payments, public submissions, chat, automated recommendations, and user accounts. Those additions create new requirements without making this first task easier to evaluate.</p>"
      },
      {
        "title": "Create six realistic practice records",
        "html": "<p>Use these fictional entries: Client Kickoff Checklist, Portfolio Case Study Outline, Research Interview Planner, Landing Page Review Sheet, Accessibility Spot Check, and Weekly Design Practice Planner. Assign each a topic, short description, file format, level, and stable ID. Mark the collection as teaching data.</p><p>Write an honest summary for each item. For example, the kickoff checklist helps someone prepare a project conversation; it does not guarantee a successful client relationship. A realistic dataset helps expose long titles, different categories, and missing fields while the design is still easy to change.</p>"
      },
      {
        "title": "Turn the idea into a one-page brief",
        "html": "<p>Describe the main journey: open the library, search or filter, inspect a resource, download it, and optionally save it. List the screens and their empty states. Define the visual direction in concrete terms: white background, deep green accent, readable typography, labelled controls, and generous spacing.</p><p>Add acceptance criteria before building. Searching for portfolio should find its outline. Selecting Research should show the relevant planner. A saved item should remain saved after a refresh in the same browser. A missing file must show a useful unavailable state instead of a false success message.</p>"
      },
      {
        "title": "Open the project with a reviewable request",
        "html": "<p>Start a new Lovable project and provide the brief. Ask for a plan before implementing anything that would add accounts, paid integrations, or a database. Review the proposed routes and component structure against the brief. Remove features that do not support the main journey.</p><p>If the initial proposal feels generic, improve the audience, sample content, and success criteria rather than adding a longer list of adjectives. You are ready for the next lesson when another person can explain what Resource Shelf does and you can name the checks that would prove its first version works.</p>"
      }
    ],
    "prompt": "Plan a small web app called Resource Shelf for freelance designers. It has six fictional learning resources, a searchable library, topic filters, resource detail pages, real file links, and favourites stored in this browser. No accounts, payments, uploads, or AI features in version one. Use white, deep green, clear labels, and readable typography. Show the routes, data fields, empty states, and acceptance checks before building. Identify any missing file URLs instead of inventing working downloads.",
    "checkpoint": [
      "A brief names one audience and one core job.",
      "The scope excludes accounts and paid integrations for the first version.",
      "You have six sample records and observable acceptance criteria."
    ],
    "sources": [
      {
        "title": "Welcome to Lovable",
        "url": "https://docs.lovable.dev/introduction/welcome"
      },
      {
        "title": "Prompting best practices",
        "url": "https://docs.lovable.dev/prompting/prompting-one"
      },
      {
        "title": "Plan a change in Plan mode",
        "url": "https://docs.lovable.dev/features/plan-mode"
      }
    ]
  },
  {
    "id": "plan-chat-build",
    "title": "Chat, Plan, and Build: choose the right Lovable mode",
    "description": "Decide when to explore, when to review an implementation plan, and when to let Lovable change the app.",
    "stage": "Start",
    "minutes": 20,
    "answer": "Use Chat to discuss a decision, Plan to investigate and approve a structured approach, and Build to implement an agreed change. Current Lovable documentation calls the execution mode Build; older tutorials may call it Agent mode. A clear task and a clear completion check matter in every mode.",
    "sections": [
      {
        "title": "Match the mode to your uncertainty",
        "html": "<p>There are two different questions in a new project: what should the product do, and how should it be implemented? Use Chat for the first question when you are still exploring. For Resource Shelf, discuss whether users need multiple filters or whether one topic filter is enough.</p><p>Use Plan when you want Lovable to investigate the existing project and describe how a change will work before editing code. A new data model or an authentication feature deserves this review. Use Build when the behavior is sufficiently clear to implement and verify.</p>"
      },
      {
        "title": "Review a plan as a product owner",
        "html": "<p>Ask the plan to name the pages, data, states, and dependencies affected by a change. For search, it should specify which fields are searched, whether matching ignores case, how search combines with the topic filter, and what appears when nothing matches.</p><p>Read the proposal against your acceptance criteria. If it adds a backend to search six static records, ask why that is necessary. If it omits an empty state or reset control, add those requirements before approval. Approving a smaller coherent plan makes the result easier to inspect.</p>"
      },
      {
        "title": "Build one complete slice",
        "html": "<p>For this lesson, implement only the library and detail-page navigation. Build mode can inspect the project, modify files, and verify behavior. Review its summary and file changes, then use the preview yourself. Confirm that the visible result matches the requested behavior rather than relying only on the completion message.</p><p>A complete slice includes its important states. A resource detail route should show the right record, provide a route back to the library, and handle an unknown resource ID. Do not postpone every error state until the end of the course.</p>"
      },
      {
        "title": "Recover from a mode mismatch",
        "html": "<p>If you only wanted a discussion and code changed, inspect the change before continuing and use version history when appropriate. If a Plan discussion keeps growing, narrow it to the next user-visible result. If Build makes assumptions you did not intend, name the specific mismatch and supply the missing rule.</p><p>The modes share conversation context, but that does not remove the need for precise instructions. Write a brief completion statement for each task: for example, every card opens the correct detail page and an invalid URL shows a helpful not-found screen.</p>"
      }
    ],
    "prompt": "Plan only: add resource detail routes to Resource Shelf using the current six records. Each card should open its matching detail page with title, topic, description, file format, and download availability. Define the unknown-ID state and return navigation. Reuse existing components and do not introduce a database. After I approve the approach, implement this slice and verify valid routes, an invalid route, and browser back navigation.",
    "checkpoint": [
      "You can explain why a task belongs in Chat, Plan, or Build.",
      "The plan includes dependencies and failure states.",
      "The implementation is checked against a specific user journey."
    ],
    "sources": [
      {
        "title": "Plan a change in Plan mode",
        "url": "https://docs.lovable.dev/features/plan-mode"
      },
      {
        "title": "Implement changes in Build mode",
        "url": "https://docs.lovable.dev/features/agent-mode"
      },
      {
        "title": "Revert and restore your project with version history",
        "url": "https://docs.lovable.dev/features/projects/history"
      }
    ]
  },
  {
    "id": "prompts-instructions",
    "title": "Write better Lovable prompts and project instructions",
    "description": "Use a repeatable prompt structure and store stable decisions so the app stays coherent as you iterate.",
    "stage": "Start",
    "minutes": 30,
    "answer": "A useful Lovable prompt describes context, the requested change, expected behavior, constraints, and verification. Save enduring decisions in project Instructions, the feature previously called Knowledge. Keep temporary experiments in the conversation and private credentials out of both places.",
    "sections": [
      {
        "title": "Use a five-part prompt",
        "html": "<p>Start with context: what exists and who uses it. State the task in one sentence. Describe expected behavior in enough detail that two people would implement roughly the same result. Then name the boundaries and the checks you will use to evaluate the change.</p><p>For Resource Shelf, 'make search better' leaves several decisions unresolved. A stronger request says that search should match titles and descriptions, ignore letter case, combine with the chosen topic, show the result count, and provide a reset action when there are no matches.</p>"
      },
      {
        "title": "Separate stable rules from a single request",
        "html": "<p>Open the project's Instructions settings and save the audience, purpose, data-field meanings, visual direction, and important product boundaries. State that records are fictional practice data and that unavailable downloads must not pretend to work. These details remain relevant across future changes.</p><p>Do not store a temporary instruction such as 'change the second button today' as a permanent rule. When a decision changes, update its existing statement instead of stacking contradictory notes. Persistent instructions improve consistency, but you still need to review the resulting app.</p>"
      },
      {
        "title": "Include real content and observable states",
        "html": "<p>Supply the exact interface wording when it matters. 'Save resource' and 'Saved in this browser' communicate more than an unexplained heart icon. Write the text for no search results, an empty saved list, and an unavailable file. Good copy makes the expected behavior concrete.</p><p>Ask for the smallest complete feature you can inspect. A request to implement search, payments, team permissions, recommendations, and a redesign at once makes it difficult to locate a mismatch. Complete one meaningful step and carry its verified behavior into the next.</p>"
      },
      {
        "title": "Diagnose a weak result without rewriting everything",
        "html": "<p>If the output looks generic, compare it with the brief. Did the request include an audience, content, and a clear visual direction? If the behavior is wrong, add a precise example: searching for 'portfolio' while Research is selected should show no results because the filters combine.</p><p>If an instruction was ignored, point to the affected component and restate the rule. Ask Lovable to explain the conflict if necessary. Keep a small prompt log recording the request, the observed result, and what clarified it; that turns trial and error into reusable knowledge.</p>"
      }
    ],
    "prompt": "Improve Resource Shelf search. Match title and summary without case sensitivity, trim surrounding whitespace, and combine the search with the active topic filter. Show an accurate result count and a Clear filters control. If nothing matches, show 'No resources match those filters' with a reset action. Keep the six-record dataset and existing layout. Verify empty search, uppercase input, whitespace, a matching query, a conflicting topic, and reset behavior.",
    "checkpoint": [
      "Your next prompt includes context, behavior, constraints, and checks.",
      "Project Instructions contain current, non-conflicting decisions.",
      "You can identify a specific reason when an output misses the brief."
    ],
    "sources": [
      {
        "title": "Prompting best practices",
        "url": "https://docs.lovable.dev/prompting/prompting-one"
      },
      {
        "title": "Instructions",
        "url": "https://docs.lovable.dev/features/knowledge"
      },
      {
        "title": "Implement changes in Build mode",
        "url": "https://docs.lovable.dev/features/agent-mode"
      }
    ]
  },
  {
    "id": "library-search-filters",
    "title": "Build a searchable resource library in Lovable",
    "description": "Create the cards, search, topic filters, and detail routes that form Resource Shelf's first useful workflow.",
    "stage": "Build",
    "minutes": 45,
    "answer": "Use a small, consistent dataset to build the library before adding infrastructure. Each resource needs a stable ID and clear metadata. Search and filters should work together predictably, every card should lead somewhere useful, and the app should explain empty results.",
    "sections": [
      {
        "title": "Give the data a clear shape",
        "html": "<p>Prepare a CSV or equivalent data object with id, title, topic, summary, format, level, download_url, and updated_date. Use stable IDs such as client-kickoff-checklist rather than row positions. A title may change later; the resource's identity should remain stable.</p><p>Inspect the six rows before building. Ensure each has a unique ID and one primary topic. Include varied title lengths and descriptions so the layout has realistic material. Blank download URLs are allowed during the exercise, but the interface must show their availability honestly.</p>"
      },
      {
        "title": "Build cards around the visitor's decision",
        "html": "<p>A useful card tells someone what the resource helps them do, who it suits, and what they will receive. Show the title, a short outcome-focused summary, topic, and file format. Use one clear detail link and a separate save action if favourites are already available.</p><p>Avoid decorative metrics and invented popularity signals. Do not add ratings or download counts without real supporting data. The library's value comes from the relevance of the resources and the ease of finding them, not from fabricated social proof.</p>"
      },
      {
        "title": "Specify search and filter behavior",
        "html": "<p>Choose simple matching for the first version: title and summary, case-insensitive, with trimmed whitespace. Search narrows the active topic, rather than silently clearing it. Show a result count so visitors understand what changed. The All topics state should restore the full topic set.</p><p>Add a clear empty-results message and a reset control. Test at least one exact title fragment, one description word, an uppercase query, and a query that has no results. For six records, predictable behavior is more useful than a complex recommendation system.</p>"
      },
      {
        "title": "Verify the journey and fix mismatches",
        "html": "<p>Open each card and confirm that the detail route shows the matching record. Refresh a detail URL and use the browser's back button. Try an unknown ID. The app should show a helpful missing-resource state rather than a blank screen or a different record.</p><p>If search results are wrong, inspect the source fields and matching rule before changing the visual design. If a detail page loses its data on refresh, investigate how the route resolves the ID. Record the working result as a checkpoint before adding persistence or accounts.</p>"
      }
    ],
    "prompt": "Build Resource Shelf's library from the attached six-row practice dataset. Use stable resource IDs for detail routes. Show title, outcome-focused summary, topic, format, and level. Add case-insensitive search across title and summary, a topic filter, an accurate result count, and a reset action. Detail pages must work on direct navigation and refresh. Handle unknown IDs and blank download URLs explicitly. Keep this version static; do not add accounts or a database.",
    "checkpoint": [
      "All six cards resolve to the correct detail page.",
      "Search, topics, and reset behave consistently.",
      "Direct URLs, refresh, no results, and unknown IDs have usable outcomes."
    ],
    "sources": [
      {
        "title": "Prompting best practices",
        "url": "https://docs.lovable.dev/prompting/prompting-one"
      },
      {
        "title": "Implement changes in Build mode",
        "url": "https://docs.lovable.dev/features/agent-mode"
      },
      {
        "title": "Test and verify your app",
        "url": "https://docs.lovable.dev/features/testing"
      }
    ]
  },
  {
    "id": "visual-editing-mobile",
    "title": "Refine visual design, mobile layout, and accessibility",
    "description": "Use Lovable's preview toolbar to make targeted changes and check the states a screenshot does not reveal.",
    "stage": "Build",
    "minutes": 35,
    "answer": "Current Lovable documentation uses a preview toolbar for selecting elements, editing text, drawing annotations, and leaving comments. Use it to target a specific change, then verify the resulting design across screen sizes and input methods. Different editing actions have different usage rules.",
    "sections": [
      {
        "title": "Create a small visual system",
        "html": "<p>Choose one readable body typeface, a short heading scale, a consistent spacing rhythm, and a clear primary color. For Resource Shelf, keep white as the main background and deep green for emphasis. Use contrast and hierarchy to distinguish the page title, controls, resource cards, and supporting metadata.</p><p>Make the system practical. Similar buttons should look and behave similarly. Labels should stay visible when fields contain text. A saved state should use words as well as color or an icon. The goal is an interface that remains understandable across every resource and state.</p>"
      },
      {
        "title": "Point to the exact change",
        "html": "<p>Select the relevant element in the preview and describe the desired result. If several cards need the same spacing adjustment, identify the shared component rather than requesting unrelated fixes. Use an annotation when moving a group or showing a layout relationship is easier than describing it.</p><p>For a copy change, use the available text-editing control. Avoid assuming all visual edits are free: the documentation distinguishes inline text allowances from standard build usage. Inspect the current product's usage guidance when cost is important to your workflow.</p>"
      },
      {
        "title": "Check narrow screens and keyboard use",
        "html": "<p>Preview a narrow phone width and a desktop width. Search and topic controls should remain legible, cards should stack sensibly, and long titles should wrap without hiding actions. Open a detail page with a long summary and verify that the download action remains discoverable.</p><p>Move through the interface with the keyboard. Check the order of focus, visible focus indicators, descriptive links, and form labels. If a dialog is introduced, check how focus enters and leaves it. Do not rely on hover alone to reveal essential information.</p>"
      },
      {
        "title": "Review non-default states",
        "html": "<p>Inspect the empty saved list, no search results, unavailable download, and missing-resource page. These screens should explain the current state and offer an appropriate next action. A polished default library does not tell you whether these paths work.</p><p>If mobile controls overlap, isolate the layout constraint and ask for a responsive fix. If an icon is confusing, improve its label before adding animation. After each targeted change, repeat the affected path so a visual improvement does not accidentally break navigation or filtering.</p>"
      }
    ],
    "prompt": "Refine Resource Shelf for narrow screens and keyboard navigation. Stack library controls clearly, let long resource titles wrap, keep labels visible, and preserve comfortable action targets. Give saved states a text label and ensure focus indicators are visible. Review the empty saved list, no search results, unavailable file, and unknown resource page. Use the existing white-and-green design. Verify the affected paths after changes and report the screen sizes and states inspected.",
    "checkpoint": [
      "The core flow works at phone and desktop widths.",
      "Important controls work with a keyboard and visible focus.",
      "Empty and error states explain what to do next."
    ],
    "sources": [
      {
        "title": "Edit from the preview",
        "url": "https://docs.lovable.dev/features/preview-toolbar"
      },
      {
        "title": "Test and verify your app",
        "url": "https://docs.lovable.dev/features/testing"
      }
    ]
  },
  {
    "id": "downloads-local-favourites",
    "title": "Make downloads real and save favourites in the browser",
    "description": "Connect actual resource files, handle missing files honestly, and add local favourites without requiring an account.",
    "stage": "Build",
    "minutes": 40,
    "answer": "A working download must point to a real file or a real delivery route. Browser-local favourites can make a small resource library useful without accounts, but they remain tied to that browser and can be cleared. Do not describe local storage as shared or cross-device persistence.",
    "sections": [
      {
        "title": "Create a file manifest before wiring buttons",
        "html": "<p>List each resource ID, actual filename, file format, and public delivery URL. Use files you created or have permission to distribute. Make the displayed title and format match the file. If the tutorial package does not contain an individual resource yet, show an unavailable state or link to the real starter bundle with an accurate label.</p><p>A button that displays a toast is not proof of delivery. Open the final URL and inspect the received file. Check that it is the intended document rather than an HTML error page saved with a misleading extension.</p>"
      },
      {
        "title": "Choose understandable download behavior",
        "html": "<p>Use descriptive link text such as 'Download the kickoff checklist' with the file type nearby. A browser may open a document instead of saving it immediately; explain the result in terms of access to the file, not a promise about every browser's download dialog.</p><p>Handle a missing URL explicitly. Disable the action with a useful explanation or replace it with a clear availability message. Do not send a visitor to a placeholder path. Keep the readme and usage instructions accessible so a downloaded resource has context when separated from the website.</p>"
      },
      {
        "title": "Add local favourites with a clear boundary",
        "html": "<p>Store only stable resource IDs in a versioned browser-storage key, then resolve those IDs against the current dataset. A saved-list page should show the matching records and let users remove them. Explain that the list is saved in this browser and does not create an account.</p><p>Handle unavailable storage gracefully. Private browsing settings, blocked storage, or clearing site data can affect persistence. If storage fails, the session should still work without pretending that the preference will survive a reload. Do not store secrets or sensitive personal content in this feature.</p>"
      },
      {
        "title": "Test delivery and persistence separately",
        "html": "<p>Save two resources, refresh, reopen the list, remove one, and refresh again. Try a record removed from the dataset so stale IDs do not crash the list. Then test every real download from both its detail page and the library if both expose it.</p><p>If a save button changes visually but the choice disappears, inspect the storage write and load behavior. If a file opens incorrectly, inspect the actual response and manifest. These are different problems and should be fixed independently before you add analytics or sign-in.</p>"
      }
    ],
    "prompt": "Add browser-local favourites to Resource Shelf using stable resource IDs and a versioned storage key. Label the feature 'Saved in this browser' and handle blocked storage without crashing. Build an empty saved-list state and ignore stale IDs safely. Wire downloads only to the real URLs in the supplied file manifest; missing URLs must show an honest unavailable state. Verify save, refresh, remove, refresh, stale IDs, and each real file link.",
    "checkpoint": [
      "Each enabled file action reaches the intended real resource.",
      "Favourites survive refresh in the same browser when storage is available.",
      "The interface clearly explains local-only persistence and unavailable files."
    ],
    "sources": [
      {
        "title": "Implement changes in Build mode",
        "url": "https://docs.lovable.dev/features/agent-mode"
      },
      {
        "title": "Test and verify your app",
        "url": "https://docs.lovable.dev/features/testing"
      },
      {
        "title": "Secrets",
        "url": "https://docs.lovable.dev/features/secrets"
      }
    ]
  },
  {
    "id": "cloud-supabase-database",
    "title": "Choose Lovable Cloud or Supabase when the app needs shared data",
    "description": "Decide when a backend is necessary and plan persistent resource records without overcomplicating the first version.",
    "stage": "Extend",
    "minutes": 45,
    "answer": "A static library and local favourites can work without accounts or a database. Add a backend when you need shared updates, cross-device saves, uploads, or user-specific records. Lovable's built-in backend is also called Cloud; connecting your own Supabase project is a separate option with separate management and billing.",
    "sections": [
      {
        "title": "Identify the requirement that changes the architecture",
        "html": "<p>Do not add a database simply because it appears in a tutorial. Resource Shelf's first six records can live in the project. A backend becomes useful when an editor needs to update resources without changing source files, or when a user's saved list must follow them between devices.</p><p>Write the new requirement precisely. For this extension, choose cross-device favourites for signed-in users and administrator-managed resource records. Keep public browsing and free files available without sign-in. The extra infrastructure should support a clear user benefit.</p>"
      },
      {
        "title": "Understand the two backend options",
        "html": "<p>Lovable's built-in backend includes a database, authentication, storage, realtime, and functions. It uses Supabase's open-source foundation without requiring a separate Supabase account. An external Supabase connection uses a project you own in Supabase, with its own dashboard, account, and billing.</p><p>Choose based on management needs, not a claim that one is always best. Decide early: current documentation does not describe switching between them as an automatic one-step migration. If a backend already exists, inspect it before proposing another service or another project.</p>"
      },
      {
        "title": "Plan records and permissions together",
        "html": "<p>Define resources separately from saved_resources. A resource has a stable ID and public metadata. A saved-resource record links a signed-in user to one resource and should prevent duplicate entries. Decide who may create or edit public resource records; ordinary users should not gain that privilege just by signing in.</p><p>Write the access rules before the migration. Public users may read published resource metadata, while each signed-in user may manage only their own favourites. Keep unpublished or internal notes out of public responses. Review the plan and data migration before applying it.</p>"
      },
      {
        "title": "Migrate and verify a small slice",
        "html": "<p>Move the six practice records first and connect the library's read path. Check loading, empty, success, and failure states. Add saved-resource persistence only after the public catalogue still works. If you import existing local favourites, make the action explicit and prevent duplicates.</p><p>Test persistence after refresh and with a second browser session. A completed save should be visible to the same account, while another account must remain isolated. Keep a note of which provider stores the data, who administers it, and how to export it.</p>"
      }
    ],
    "prompt": "Plan an optional backend extension for Resource Shelf using the backend already connected, if any. Keep the public catalogue accessible without login. Model published resources separately from each user's saved-resource links, prevent duplicate saves, and reserve resource editing for authorized administrators. Explain built-in Cloud versus external Supabase if no backend exists. Review permissions and migration before implementing. Then migrate only the six practice records and verify the public read flow before adding account saves.",
    "checkpoint": [
      "The backend solves a named requirement.",
      "The schema separates public resources from private saved lists.",
      "Provider ownership, billing, access rules, and migration are documented."
    ],
    "sources": [
      {
        "title": "Built-in backend",
        "url": "https://docs.lovable.dev/features/cloud"
      },
      {
        "title": "Connect to Supabase",
        "url": "https://docs.lovable.dev/integrations/supabase"
      },
      {
        "title": "Control who can access your app's data",
        "url": "https://docs.lovable.dev/features/database-access"
      }
    ]
  },
  {
    "id": "authentication-access-rules",
    "title": "Add sign-in and test row-level security with two accounts",
    "description": "Give users cross-device saves while proving that one account cannot read or change another account's private records.",
    "stage": "Extend",
    "minutes": 55,
    "answer": "Authentication identifies a user; authorization decides what that user may access. A login screen or hidden button does not protect private records by itself. Resource Shelf's optional account version needs ownership rules for saved lists and separate permissions for editing the public catalogue.",
    "sections": [
      {
        "title": "Design the account flow around a benefit",
        "html": "<p>Keep the library and free downloads open. Offer sign-in when a visitor wants their saved list across devices, then explain that benefit directly. Choose the sign-in methods your audience needs rather than enabling every available provider. Include logout, recovery, and useful error messages.</p><p>Define what happens to browser-local favourites after login. A simple option is an explicit import action showing how many items will be added. Do not silently replace the user's existing account list or imply that old browser data was already synced.</p>"
      },
      {
        "title": "Write ownership rules before polishing forms",
        "html": "<p>A saved-resource row should belong to one user. Reading, creating, and deleting that row require the correct owner. The trusted part of the app must determine ownership; a client should not be able to submit someone else's user ID and gain access.</p><p>Review the generated policies. A rule that merely permits authenticated users may allow every signed-in user to access all covered rows. Public resource editing needs a separate administrator rule. Service-role requests bypass database RLS, so privileged server functions must enforce permissions themselves.</p>"
      },
      {
        "title": "Run a two-account verification",
        "html": "<p>Create account A and account B using synthetic test data. Save different resources in each account. Confirm that A sees A's saved list and B sees B's list. Then test direct requests for A's saved record while signed in as B; hiding it in the interface is insufficient.</p><p>Also test signed-out requests, expired sessions, duplicate saves, and attempts to edit public resource records as an ordinary user. Record the expected result and observed result for each case. A denied request should fail safely without exposing private data in the response.</p>"
      },
      {
        "title": "Handle failures without weakening access",
        "html": "<p>If a legitimate save fails, inspect the session, owner assignment, and policy condition. Do not solve the problem by opening the table to everyone. If a saved list leaks across accounts, stop the affected feature and repair the authorization path before sharing it.</p><p>Retest the complete login-to-save journey on the published app because redirect settings and production configuration can differ from the preview. Keep test accounts and records clearly marked, and remove them when they are no longer needed for verification.</p>"
      }
    ],
    "prompt": "Add optional account-based favourites to Resource Shelf. Public browsing and downloads remain open. Enforce owner-only reads, creates, and deletes for saved-resource records, and separate administrator permissions for catalogue edits. Do not trust a client-supplied owner ID. If privileged server functions bypass RLS, check ownership there too. Provide and run a two-account test using synthetic records, including direct requests, signed-out access, duplicate saves, and an ordinary user attempting a catalogue edit.",
    "checkpoint": [
      "Account A cannot access B's private saved records and vice versa.",
      "Signed-out and ordinary-user privileges match the written rules.",
      "The published login, recovery, and save flow is verified."
    ],
    "sources": [
      {
        "title": "Users and authentication",
        "url": "https://docs.lovable.dev/features/authentication"
      },
      {
        "title": "Control who can access your app's data",
        "url": "https://docs.lovable.dev/features/database-access"
      },
      {
        "title": "Security overview",
        "url": "https://docs.lovable.dev/features/security"
      },
      {
        "title": "Test and verify your app",
        "url": "https://docs.lovable.dev/features/testing"
      }
    ]
  },
  {
    "id": "api-secrets-integrations",
    "title": "Add an integration without exposing private API keys",
    "description": "Understand the browser/server boundary before adding email, AI, or other services to Resource Shelf.",
    "stage": "Extend",
    "minutes": 40,
    "answer": "Private credentials belong in trusted server-side configuration, not browser code or downloadable examples. Add an integration only when it serves a clear task, validate its inputs, and check permissions before calling a private or paid service. The static version of Resource Shelf needs no API key.",
    "sections": [
      {
        "title": "Name the benefit and the data being sent",
        "html": "<p>A useful optional feature might let an editor draft a short resource summary from text they supplied. Write down exactly what information leaves the app, which provider receives it, and what the user expects back. Do not silently send saved lists or private account data to a third party.</p><p>Keep the first catalogue functional without this feature. If a provider is unavailable or credits run out, visitors should still be able to browse and download existing resources. An optional integration should not become a hidden dependency of the core experience.</p>"
      },
      {
        "title": "Distinguish public configuration from secrets",
        "html": "<p>A public analytics measurement ID or a publishable database key has a different role from a secret API credential or service-role key. Browser code is visible to visitors, including values placed in frontend environment variables. A private key must not be shipped there.</p><p>Lovable provides secure secret input and project secret storage for server functions. Use the intended secure form when a service requires a credential. Keep credentials out of chat examples, screenshots, source files, CSV practice data, and the free toolkit. Document the secret's purpose without recording its value.</p>"
      },
      {
        "title": "Protect the server action",
        "html": "<p>For an editor-only summary action, the server must verify that the caller is allowed to edit resources before making the provider request. A disabled frontend button is insufficient. Validate the supplied text, limit its size, and return only the information the interface needs.</p><p>Handle repeated clicks, slow responses, rejected credentials, provider limits, and unexpected output. Show progress and a useful retry option without revealing internal secrets. If the integration creates a cost, make that action intentional and add an appropriate usage limit rather than letting anonymous visitors trigger it freely.</p>"
      },
      {
        "title": "Test the boundary, not just the happy path",
        "html": "<p>Check an authorized request, an unauthenticated request, a normal user attempting the editor action, empty input, overly long input, and a provider failure. Inspect the browser's response and built files for accidental credential exposure. Use synthetic content for the exercise.</p><p>If a call works only from the preview, compare production configuration and permissions. If an integration fails, investigate the server error and provider response instead of moving the key into the browser to make the request easier. Keep the feature off until its access and failure behavior are understood.</p>"
      }
    ],
    "prompt": "Plan an optional editor-only resource-summary helper for Resource Shelf. Keep the public library working without it. Send only text the authorized editor intentionally submits. Keep private provider credentials in server-side secrets, require editor authorization on the server, validate and limit input, prevent duplicate requests, and handle timeouts or provider failure. Explain the data flow and cost drivers before adding a provider. Use synthetic test content and verify unauthorized requests are denied.",
    "checkpoint": [
      "The data flow identifies the provider, input, output, and cost driver.",
      "Private credentials never reach browser code or practice downloads.",
      "Unauthorized and failed requests have safe, understandable outcomes."
    ],
    "sources": [
      {
        "title": "Secrets",
        "url": "https://docs.lovable.dev/features/secrets"
      },
      {
        "title": "Control who can access your app's data",
        "url": "https://docs.lovable.dev/features/database-access"
      },
      {
        "title": "Security overview",
        "url": "https://docs.lovable.dev/features/security"
      },
      {
        "title": "Built-in backend",
        "url": "https://docs.lovable.dev/features/cloud"
      }
    ]
  },
  {
    "id": "github-export-ownership",
    "title": "Sync Lovable with GitHub and keep a recovery plan",
    "description": "Back up the source code, understand two-way sync, and distinguish code portability from moving databases and services.",
    "stage": "Extend",
    "minutes": 35,
    "answer": "Git sync keeps a versioned copy of your Lovable project in your own repository and synchronizes the active branch. It supports collaboration and external deployment, but a repository is not a full backup of database records, uploaded files, authentication settings, or third-party services.",
    "sections": [
      {
        "title": "Connect the intended account and repository",
        "html": "<p>Open the project's Git settings and connect the GitHub account or organization that should own the code. Review the requested repository access and choose the appropriate scope. Link Resource Shelf to its repository, then confirm that the latest project files and a recent change appear there.</p><p>Current documentation describes a workspace connection and a project repository link. The shared connection authorizes access; the project link selects the repository. Keep these concepts separate when working across personal, client, or organization accounts so a project does not end up under the wrong owner.</p>"
      },
      {
        "title": "Verify one small round trip",
        "html": "<p>Make a reversible text change in Lovable and confirm it reaches GitHub. Then make a small change on the active synced branch through your usual development workflow and confirm it appears in Lovable. The integration edits and syncs one branch at a time, so inspect the active branch before diagnosing a missing change.</p><p>Use this exercise to understand the workflow, not to experiment with secrets or production data. Record a known-good commit after the library's main paths work. For larger changes, use branches and review practices appropriate to your project.</p>"
      },
      {
        "title": "Inventory what exists outside the repository",
        "html": "<p>List public worksheet files, database data, storage buckets, authentication providers, redirect URLs, domains, analytics configuration, and any API integrations. State how each can be recovered or reconfigured. The first static Resource Shelf has fewer moving parts; the optional account version needs a more complete inventory.</p><p>Lovable's ownership documentation says created code and content belong to the user subject to third-party rights. That does not remove licenses attached to imported packages, images, fonts, or templates. Record those dependencies when packaging a reusable resource or client handoff.</p>"
      },
      {
        "title": "Check the actual stack before moving hosting",
        "html": "<p>Current documentation distinguishes newer TanStack Start projects from older React and Vite projects. The former can run server code; the latter may build as static files. Inspect your actual project rather than copying a deployment recipe from an older video.</p><p>Moving code is one part of a migration. Data, authentication, files, environment configuration, and service calls need their own plan and verification. You do not need to migrate hosting for this lesson; the goal is to know what you own, where it lives, and how you would restore a working copy.</p>"
      }
    ],
    "prompt": "Create a recovery inventory for Resource Shelf without changing hosting. Identify the actual framework, build commands, runtime, repository and active synced branch, public resource files, database, storage, auth configuration, domains, and external services. Explain which items Git sync preserves and which need separate export or setup. Help verify one harmless two-way GitHub change and record a known-good commit. List third-party licenses that matter when sharing the project.",
    "checkpoint": [
      "A harmless change has completed a GitHub round trip.",
      "The recovery inventory includes non-code dependencies.",
      "You know the actual framework and hosting requirements."
    ],
    "sources": [
      {
        "title": "Sync your Lovable project with GitHub",
        "url": "https://docs.lovable.dev/integrations/github"
      },
      {
        "title": "Deployment, hosting, and ownership options with Lovable",
        "url": "https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership"
      },
      {
        "title": "Revert and restore your project with version history",
        "url": "https://docs.lovable.dev/features/projects/history"
      }
    ]
  },
  {
    "id": "debugging-testing",
    "title": "Debug and test a Lovable app with clear evidence",
    "description": "Reproduce failures, choose the right verification method, and avoid repeated broad fixes that make the cause harder to find.",
    "stage": "Verify",
    "minutes": 45,
    "answer": "A useful bug report states where the issue occurs, the user state, exact steps, expected behavior, and actual behavior. Use browser testing for complete user journeys and focused automated tests for important rules. Investigate recurring failures before requesting another broad rewrite.",
    "sections": [
      {
        "title": "Write a reproduction someone else can follow",
        "html": "<p>Suppose Resource Shelf's saved count says two while the saved-list page shows one item. Record the starting state, which resources you saved, whether you refreshed, the URL, and the visible result. Include a screenshot if it clarifies the mismatch and the exact non-sensitive error if one appears.</p><p>Separate expected from actual behavior. 'It is broken' gives little direction; 'saving the same resource twice increases the count but creates one card' identifies a likely duplicate-handling problem. Keep the report focused on what you observed without inventing its cause.</p>"
      },
      {
        "title": "Choose a test that answers the question",
        "html": "<p>Lovable supports browser testing, frontend tests, and edge-function verification. Browser testing is appropriate for search-to-detail-to-download navigation and login flows. A focused automated test can protect a rule such as combining search with a topic or preventing duplicate saved IDs.</p><p>For a server action, inspect the request, permission check, response, and error behavior. Ask explicitly for edge-function tests when those rules need coverage. A passing component test does not prove a live download URL works, and a screenshot does not prove persistence across a refresh.</p>"
      },
      {
        "title": "Investigate persistent failures before another fix",
        "html": "<p>After a small number of unsuccessful attempts, switch to Plan and ask for the root cause, supporting evidence, and approaches already tried. For the saved-count example, inspect the storage format, state updates, duplicate filtering, and how the count is calculated.</p><p>Implement the smallest fix that addresses the cause and verify the original reproduction plus a related case. If the change affects filtering, recheck reset and no-results behavior. Record what was actually tested instead of treating a tool's success message as a complete test report.</p>"
      },
      {
        "title": "Use history carefully and keep a regression note",
        "html": "<p>Bookmark a known-good version before a large change. Version history can help restore code, but current documentation warns that reverting does not undo database data changes or migrations. Plan data recovery independently when the optional backend is involved.</p><p>After fixing the issue, write a short note: symptom, cause, change, and verification. Add an enduring product rule to project Instructions if it would prevent recurrence. Keep the test suite focused on meaningful behavior; a small reliable check is more useful than many tests that simply repeat the implementation.</p>"
      }
    ],
    "prompt": "Investigate this Resource Shelf bug before editing: saving the same resource twice increases the saved count, but the saved list shows only one card. Expected: one resource is counted once. Reproduce it, inspect storage and state updates, and explain the root cause with evidence. Implement the smallest fix and add a focused rule test if useful. Verify repeated saves, remove, refresh, stale IDs, and the original reproduction. Report actual test outcomes.",
    "checkpoint": [
      "A second person could reproduce the issue from your report.",
      "Verification matches the type of failure.",
      "The fix passes the original case and relevant adjacent behavior."
    ],
    "sources": [
      {
        "title": "Test and verify your app",
        "url": "https://docs.lovable.dev/features/testing"
      },
      {
        "title": "Debug and improve your app",
        "url": "https://docs.lovable.dev/prompting/prompting-debugging"
      },
      {
        "title": "Revert and restore your project with version history",
        "url": "https://docs.lovable.dev/features/projects/history"
      }
    ]
  },
  {
    "id": "security-launch-checklist",
    "title": "Run a security and quality review before launch",
    "description": "Review actual access rules, file delivery, errors, mobile behavior, and the available security scans before inviting people.",
    "stage": "Verify",
    "minutes": 45,
    "answer": "A launch review combines automated checks with direct tests of the app's important rules. Lovable's Quick and Deep scans help identify risks, but they do not prove that every workflow or permission is correct. The review should state what passed, what failed, and what remains unverified.",
    "sections": [
      {
        "title": "Make a risk-based inventory",
        "html": "<p>Start with the version you are launching. A public library with original worksheets and local favourites has different risks from an app with accounts, uploads, and paid API calls. List the data, actions, and services that actually exist rather than checking irrelevant boxes.</p><p>For the simple Resource Shelf, check file permissions, truthful resource descriptions, broken links, accessible controls, and storage errors. For the optional account version, add ownership rules, password recovery, administrative actions, and server authorization. Use synthetic data while verifying behavior.</p>"
      },
      {
        "title": "Review the scan findings",
        "html": "<p>Lovable's Quick scan runs during publishing and checks a defined set of issues, including database settings and dependencies. Deep scan examines application code for broader logic and access problems. Open the security view, review the results, and identify which findings affect your intended use.</p><p>Fix the cause of an issue and rerun the relevant check. Do not hide a warning simply to make a release screen look complete. A scanner's scope is limited, so retain the manual checks for your resource permissions, download behavior, and any account-specific rules.</p>"
      },
      {
        "title": "Walk through the important paths",
        "html": "<p>Test search, topic filtering, direct detail URLs, each real worksheet, saved-list persistence, an empty state, and an invalid resource ID. Use a narrow viewport and a keyboard. If accounts are enabled, repeat the two-account test and a signed-out request to a protected action.</p><p>Check failure behavior deliberately: unavailable storage, a missing file, invalid form input, and a failed API call if one exists. Visitors should receive an understandable message and a useful next step. They should not see secrets, private records, or an invented success confirmation.</p>"
      },
      {
        "title": "Record a concrete release decision",
        "html": "<p>Use a test matrix with test case, expected result, actual result, date, and status. Separate passed checks from assumptions and untested paths. Identify the owner of any remaining issue and whether it blocks the intended launch.</p><p>Before collecting sensitive data or enabling a critical workflow, obtain review appropriate to that use. For this teaching project, a bounded public release of sample resources is enough. Keep the release small, keep a recovery point, and make it easy for a visitor to report a broken resource.</p>"
      }
    ],
    "prompt": "Review the current Resource Shelf version for release. Inventory public files, browser storage, optional account data, editor permissions, and external calls that actually exist. Run the available security scans and explain actionable findings. Verify the core browse/search/detail/download/save journey, direct URLs, mobile, keyboard, and relevant failure states. If accounts are enabled, repeat the two-account authorization checks. Produce a pass/fail/unverified matrix and identify blockers without claiming a scan proves complete security.",
    "checkpoint": [
      "The checklist matches the features actually present.",
      "Important user journeys and permission boundaries have observed results.",
      "Unresolved issues and the release decision are explicit."
    ],
    "sources": [
      {
        "title": "Security overview",
        "url": "https://docs.lovable.dev/features/security"
      },
      {
        "title": "Test and verify your app",
        "url": "https://docs.lovable.dev/features/testing"
      },
      {
        "title": "Control who can access your app's data",
        "url": "https://docs.lovable.dev/features/database-access"
      }
    ]
  },
  {
    "id": "publish-custom-domain",
    "title": "Publish a Lovable app and connect your domain",
    "description": "Deploy the tested version, verify it outside the editor, and connect a custom domain using the records supplied for your project.",
    "stage": "Launch",
    "minutes": 35,
    "answer": "Publishing creates a live version of your project. Later code changes stay off that live version until you publish again. Verify the deployed URL before sharing it, then connect a custom domain if your plan supports it and test domain-specific behavior such as authentication redirects.",
    "sections": [
      {
        "title": "Choose the version and audience deliberately",
        "html": "<p>Complete the release checklist and locate the version you intend to share. Open Publish in the editor, review the suggested address and intended audience, and inspect the security scan result. A public tutorial library needs public website access; private records still require their own authorization rules.</p><p>Finish publishing and retain the returned live URL. Do not confuse a preview link with the published site. Open the live address in a fresh browser session and confirm the page title, resource cards, and expected content match the version you reviewed.</p>"
      },
      {
        "title": "Run a production smoke test",
        "html": "<p>Search for a resource, change its topic filter, open the detail URL directly, refresh, and access the real file. Save an item and check local persistence. If the optional account version is enabled, verify sign-in and a saved-list action on the deployed domain.</p><p>A production failure can come from missing environment configuration, a file path, a route issue, or an authentication redirect. Collect the exact failing URL and behavior, then investigate that difference. Avoid rebuilding the entire project because one production setting differs from the preview.</p>"
      },
      {
        "title": "Connect a domain using project-specific instructions",
        "html": "<p>Custom domains are a paid-plan feature in the current publishing documentation. In the project's Domains settings, connect the hostname you control and follow the actual verification and routing records Lovable provides. The platform supports automatic setup or manual DNS configuration.</p><p>Do not copy a generic IP address from an old tutorial. Compare only the records relevant to the hostname being connected, and preserve unrelated email or service records. Domain connection and domain transfer are different actions; connecting does not require moving the registration to a new registrar.</p>"
      },
      {
        "title": "Confirm the active domain and future update process",
        "html": "<p>Wait for the domain to show as active, then check HTTPS, the primary address, resource paths, and login redirects. Verify any root-to-www or www-to-root behavior you configured. Use the intended primary address consistently in canonical tags and campaign links.</p><p>Make a small later change and publish it when ready. Confirm the update at the live address rather than assuming the preview has already replaced it. Keep the known-good version and a short release note so you can identify what visitors are seeing if a problem is reported.</p>"
      }
    ],
    "prompt": "Prepare Resource Shelf for publication using the tested version. Confirm the intended audience, current scan findings, real worksheet paths, and a live smoke-test checklist. After deployment, verify search, direct detail URLs, refresh, downloads, and saved favourites at the live URL. Explain where this project's exact domain verification and routing records are shown; do not invent DNS values. Once a custom domain is active, verify HTTPS, the primary address, and any account redirect settings.",
    "checkpoint": [
      "The live URL serves the intended version.",
      "The core workflow passes outside the editor.",
      "Custom-domain records, HTTPS, and redirects are verified if configured."
    ],
    "sources": [
      {
        "title": "Publish your Lovable project",
        "url": "https://docs.lovable.dev/features/publish"
      },
      {
        "title": "Connect a domain from another provider",
        "url": "https://docs.lovable.dev/features/custom-domain-connect"
      },
      {
        "title": "Revert and restore your project with version history",
        "url": "https://docs.lovable.dev/features/projects/history"
      }
    ]
  },
  {
    "id": "seo-aeo-geo",
    "title": "Improve Lovable SEO, AEO, and GEO with useful public pages",
    "description": "Make the site readable, discoverable, and easy to cite through clear answers, original examples, technical checks, and source links.",
    "stage": "Launch",
    "minutes": 45,
    "answer": "SEO and AI-search visibility start with useful, crawlable public content. Give each page a clear question, a direct answer, supporting detail, and evidence. Google says its AI search features require no special AI schema or text file, and meeting technical requirements does not guarantee indexing or inclusion.",
    "sections": [
      {
        "title": "Match each page to a distinct question",
        "html": "<p>Use a library page for browsing and detail pages for specific resource needs. A detail page should explain who the worksheet is for, what it contains, when to use it, and how to complete it. Put the answer in text, not only inside an image or video.</p><p>For tutorials, add prerequisites, steps, a copyable original prompt, an example, checkpoints, common failures, and links to the official documentation. Identify the author and review date. Distinguish an authored teaching example from a result you actually tested in a live account.</p>"
      },
      {
        "title": "Align technical signals with the visible page",
        "html": "<p>Give public routes unique titles and descriptions, a logical heading structure, descriptive internal links, and appropriate canonical URLs. Confirm the actual sitemap includes the intended public pages and that robots or noindex directives do not block them accidentally. Keep private account and saved-record pages out of search.</p><p>Current Lovable documentation describes server rendering for newer projects and crawler handling for older projects. Inspect the actual live output instead of assuming a framework choice solves everything. Run the SEO & AI review and recheck the published version after applying changes.</p>"
      },
      {
        "title": "Use structured data and companion content honestly",
        "html": "<p>Add structured data only for real entities and visible content: an article's title, author, dates, or a breadcrumb hierarchy, for example. Do not manufacture ratings or label an illustration as a recorded demonstration. Google no longer shows FAQ rich results as of May 2026, although clear questions and answers still help readers.</p><p>Give companion sites distinct applications for their audiences, such as a designer's resource library or a small-business lead magnet. When syndicating substantially equivalent content, make the preferred canonical relationship clear. Avoid multiplying near-identical pages without additional value.</p>"
      },
      {
        "title": "Measure discovery and keep the guide current",
        "html": "<p>Connect Search Console when you have access, submit the live sitemap, and inspect important URLs. Review queries, impressions, clicks, and landing-page behavior over time. Review the Search Console inclusion setting for Search generative AI features. When available, its Generative AI performance report shows impressions in AI Overviews and AI Mode; too few impressions can keep the report from appearing. Those impressions are different from visits or conversions. Track identifiable AI referrals separately, recognizing that missing referrers make attribution incomplete.</p><p>Update the guide when product labels, flows, or limits change. Add a correction note for meaningful revisions. Helpful content, accessible text, original demonstrations, and accurate sources improve the resource's usefulness; no checklist can promise a search position or an AI citation.</p>"
      }
    ],
    "prompt": "Audit Resource Shelf's public routes for search and answer readiness. Check unique titles, descriptions, canonical URLs, headings, textual explanations, internal links, sitemap, robots directives, and social previews. Keep private routes out of the index. Add truthful structured data that matches visible content, without invented ratings or promises of rich results. Run the available SEO review, identify what must be checked on the published site, and outline Search Console verification.",
    "checkpoint": [
      "Each public page answers a clear, distinct user need.",
      "Live content, canonical URLs, sitemap, and indexability agree.",
      "Claims, authorship, dates, and source links are accurate."
    ],
    "sources": [
      {
        "title": "Optimize your app for SEO and AI search",
        "url": "https://docs.lovable.dev/features/seo-aeo"
      },
      {
        "title": "Optimizing your website for generative AI features on Google Search",
        "url": "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide"
      },
      {
        "title": "Latest documentation updates",
        "url": "https://developers.google.com/search/updates"
      },
      {
        "title": "Generative AI performance report (Search)",
        "url": "https://support.google.com/webmasters/answer/16984139?hl=en"
      }
    ]
  },
  {
    "id": "analytics-views-downloads",
    "title": "Track tutorial views, downloads, and useful outcomes",
    "description": "Measure the learning funnel, preserve traffic attribution, and verify events before treating the numbers as audience evidence.",
    "stage": "Launch",
    "minutes": 45,
    "answer": "Track the path from discovery to useful action: tutorial view, prompt copy, worksheet access, lesson completion, and an optional next step. Native Lovable Analytics covers published-app traffic. Custom learning events require deliberate instrumentation and verification in the site's actual analytics setup.",
    "sections": [
      {
        "title": "Define the event plan before adding tags",
        "html": "<p>Choose a small set of named events: tutorial_view, prompt_copy, resource_download, lesson_complete, and an appropriate signup or enquiry event if that action exists. Define exactly when each fires. A completion event should reflect an intentional completion action, not simply reaching the bottom of a page.</p><p>Use stable identifiers such as tutorial_id, lesson_id, resource_id, and placement. Do not send a visitor's email, free-text prompt, private saved-list contents, or other personal information in event parameters. Record the event definition in the measurement tracker so future reports use the same meaning.</p>"
      },
      {
        "title": "Use the existing analytics setup consistently",
        "html": "<p>Inspect the site's current tag or analytics library before adding another. Preserve its consent behavior and avoid duplicate page-view collection. For a routed app, verify that moving between lessons records the intended view once, not once from each of several overlapping handlers.</p><p>Lovable's native Analytics starts counting on publication. Its visits are sessions, not unique people; a reload or new tab starts another visit. The documented GA4 connector sends page views and events to Google Analytics, while reports stay there. Do not label a local browser counter as shared audience analytics.</p>"
      },
      {
        "title": "Give every distribution test a traceable link",
        "html": "<p>Use consistent UTM values for source, medium, campaign, and creative. For example, identify the platform as the source, the channel type as the medium, the Lovable resource launch as the campaign, and the specific post variant as content. Keep the naming rules in the tracker.</p><p>Use distinct tagged links for each placement you control. A tracked click helps attribute a visit; it does not prove a sale or completed lesson. Some browsers and apps suppress referrers, so interpret direct and unknown traffic carefully rather than assigning it to a channel without evidence.</p>"
      },
      {
        "title": "Verify collection and report honest outcomes",
        "html": "<p>Follow a test link, open a lesson, copy a prompt, download a resource, and mark the lesson complete. Inspect realtime or debug reporting and the event parameters. Repeat an action where duplicate events are a risk. Record which measurement steps were verified and when.</p><p>When traffic arrives, compare qualified visits, resource clicks, completion, and feedback. A download-click event records activation of a link; it does not confirm the file was read or used. Separate instrumentation success from audience performance and avoid presenting setup tests as real demand.</p><p>For Google AI visibility, use the Search Console Generative AI performance report when sufficient impressions make it available. It measures appearances in AI Overviews and AI Mode. Keep those impressions separate from analytics visits, download clicks, and completed work.</p>"
      }
    ],
    "prompt": "Use Resource Shelf's existing approved analytics setup to track tutorial_view, successful prompt_copy, resource_download link activation, and an intentional lesson_complete action. Include stable tutorial_id, lesson_id, resource_id, and placement as appropriate. Preserve consent and prevent duplicate route views. Never send personal data or user-entered text. Create a verification checklist for realtime/debug reporting and document the distinction between a download click, a completed lesson, and a business outcome.",
    "checkpoint": [
      "A test journey produces the intended events once with correct fields.",
      "Campaign links use a consistent naming convention.",
      "Reporting separates setup checks, audience activity, and actual outcomes."
    ],
    "sources": [
      {
        "title": "Analytics",
        "url": "https://docs.lovable.dev/features/analytics"
      },
      {
        "title": "Connect your app to Google Analytics",
        "url": "https://docs.lovable.dev/integrations/google-analytics"
      },
      {
        "title": "Optimizing your website for generative AI features on Google Search",
        "url": "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide"
      },
      {
        "title": "Generative AI performance report (Search)",
        "url": "https://support.google.com/webmasters/answer/16984139?hl=en"
      }
    ]
  },
  {
    "id": "free-pocket-products-costs",
    "title": "Package a free Lovable pocket product and budget the next experiment",
    "description": "Turn the workflow into a useful downloadable kit, control costs, and learn from a small distribution test.",
    "stage": "Launch",
    "minutes": 50,
    "answer": "A strong free pocket product gives someone one complete, useful result. Package an editable brief, original prompts, practice data, real worksheets, and verification tools around that result. Keep the learning resource free while clearly identifying optional platform costs and measuring whether people use it.",
    "sections": [
      {
        "title": "Choose a specific promise and complete the package",
        "html": "<p>The Resource Shelf starter kit helps a freelance designer plan and build a small public resource library. Include a readme with the first step, a blank brief, a completed example, the six-row practice CSV, original prompts, the six worksheets, a test matrix, a launch checklist, and a measurement tracker.</p><p>Make filenames understandable and links functional. Open every delivered file. Keep one clear starting point so the package feels like a guided task rather than a folder of unrelated downloads. Include a short reuse statement for your original material and identify third-party assets or licenses separately.</p>"
      },
      {
        "title": "Keep free delivery and paid dependencies clear",
        "html": "<p>The educational kit can be free while optional tools or features cost money. Current Lovable documentation describes a shared credit balance across building, chat, Cloud, runtime AI, and some connector use, with usage-specific grants. Plan details and prices should link to the current official source instead of being embedded as timeless promises.</p><p>For the first exercise, keep the app public, sample-based, and browser-local. Add accounts, custom domains, or paid integrations only for a demonstrated requirement. Check the workspace's actual balance, plan, and available limits before starting a larger build.</p>"
      },
      {
        "title": "Run a bounded build and traffic experiment",
        "html": "<p>Record the starting usage balance, define one task, complete it, and record the ending usage and observed result. Include external costs separately. Decide in advance what would justify another iteration: a working core flow, useful feedback, or a clear missing requirement.</p><p>For distribution, create a truthful landing page with contents, audience, prerequisites, and direct delivery. Prepare channel-specific posts that teach something useful before linking. Use campaign tags and follow each community's promotion rules. A storefront listing makes delivery possible; it does not establish demand or guarantee discovery.</p>"
      },
      {
        "title": "Improve the product from observed friction",
        "html": "<p>Ask a new reader to begin with the readme and complete the first step without coaching. Note where they hesitate, which file they open, and whether they understand what to build. Fix confusing instructions before expanding the kit with more content.</p><p>Review qualified visits, resource access, completed lessons, and questions. If people arrive but do not start, improve the promise and first step. If they start but get stuck, improve the worked example or troubleshooting. Offer a relevant next resource or service after delivering the free result, with no fabricated income or success claims.</p>"
      }
    ],
    "prompt": "Package the Resource Shelf learning kit around one outcome: plan and build a useful public resource library. Include a clear readme, editable brief, completed example, original prompts, six-row CSV, real worksheets, test matrix, launch checklist, and measurement tracker. Identify optional costs and link to current official pricing rather than inventing a fixed budget. Create a small build-and-distribution experiment with tagged links, observed usage, and completion criteria. Draft educational posts but do not publish them.",
    "checkpoint": [
      "A new reader can find the first step and complete it independently.",
      "Every download is real and optional costs are clearly identified.",
      "The next experiment has a bounded scope, measurement plan, and review criteria."
    ],
    "sources": [
      {
        "title": "Credits and usage",
        "url": "https://docs.lovable.dev/introduction/credits-and-usage"
      },
      {
        "title": "Subscription plans",
        "url": "https://docs.lovable.dev/introduction/subscription-plans"
      },
      {
        "title": "Deployment, hosting, and ownership options with Lovable",
        "url": "https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership"
      },
      {
        "title": "Connect your app to Google Analytics",
        "url": "https://docs.lovable.dev/integrations/google-analytics"
      }
    ]
  }
];
