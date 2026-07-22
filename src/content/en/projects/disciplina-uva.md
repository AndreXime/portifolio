---
order: 4
title: "UVA academic planning: progress, timetable, and conflicts in the browser"
shortDescription: "I built an academic organizer for Computer Science at UVA: progress, flowchart, weekly timetable, and planner without relying on spreadsheets. The React and Vite SPA embeds the curriculum via CSV validated at build time and persists multiple profiles in the browser with Zustand. It runs client-only; updating the official curriculum requires a rebuild."
tech: ["React", "Vite", "Zustand", "TypeScript", "Tailwind CSS", "React Flow"]
imageUrl: "../../images/projects/disciplina-uva.png"
link: "https://disciplina-uva.andreximenes.xyz/"
github: "https://github.com/AndreXime/organiza-cc-uva"
---

## Technical context

I modeled a feature-based SPA: each area (manager, flowchart, timetable, planner, events, settings) owns screen and store, with Zustand for global state and persistence in `localStorage`. I chose Vite and React to ship everything on the client, with no backend: the official curriculum enters the bundle through a virtual module generated at build from the CSVs and a typed calendar. The trade-off is obvious and deliberate: zero server and zero sync across devices, in exchange for simple static deploy and offline use after the first load. In post-build, a prerender injects the initial `App` HTML into `dist` outside the client Rollup pipeline, so the SSR bundle is not mixed with browser JS.

## Engineering challenges (how and why)

- **Curriculum as a build contract:** I validate every course and equivalence row on parse (ids, workload, day+block schedule tokens) and fail `npm run build` if the CSV is inconsistent. That way the site never ships with a broken prerequisite or unreadable schedule; HMR reacts to changes in data files.
- **Availability via prerequisite graph:** I recompute the set of unlocked courses from what is marked done and block unmarking a node if another already completed course depends on it. Equivalences link by the official curriculum name, so progress stays anchored to matrix ids.
- **Schedule conflicts in the week and the plan:** on the weekly timetable, events for available courses disappear from view when they overlap an interval of a selected one; in the planner, I compare interval pairs per day and future semesters only unlock what prior semesters (plus completed history) already satisfy.
- **Automatic path fill:** I generate semesters in sequence packing the maximum without schedule conflict, respecting prerequisites and a cap on electives (up to seven total, minus those already completed). It is an editable starting point, not official enrollment.
- **Profiles with versioned snapshot:** each profile stores progress, planning, timetable selection, calendar filters, and UI preferences in a validated V1 snapshot; switching profiles saves the current one, applies the target, and a debounce on the stores (plus flush on tab hide) avoids corrupting the catalog. JSON export/import allows backup without an account.
- **Flowchart with edge routing:** I built the graph by term with React Flow and custom routing (local lanes vs channel between rows) so long prerequisites do not cut across cards; path drafts stay in `localStorage` until export.
