<!--
  REPO-OWNED. Lives at <repo>/docs/PLAN.md. Edited in the repo, with the code.
  NOT synced from Kaizen — this is the engineering execution surface, not a business doc.

  PLAN.md = the repo's single ENGINEERING-STATE doc: where this codebase is right now
  and where to pick up. Current slices, protected areas, next-up, build-state, handoff.

  It is NOT a task tracker — atomic tasks live in the Kaizen API, fetched live with
  `kaizen tasks list --project <slug>`. It is NOT a per-feature spec — those are
  docs/features/<feature>.md (from a PRD). For business direction see ROADMAP.md.
  See ~/Kaizen/manuals/REPO-DOCS.md for the full doc system.

  Keep it current. A stale PLAN.md is worse than none — prune ruthlessly.
-->

# Pool Pals — Engineering Plan

> **Updated:** YYYY-MM-DD · **Branch model:** worktrees off `origin/main`
> Atomic tasks: `kaizen tasks list --project <slug>` (live) · Direction: `ROADMAP.md` · Per-feature: `docs/features/`

## Build state

<One-line status + what's built. The coarse "how far along" the old PROGRESS.md held.>
- **Status:** <e.g. building trust-layer MVP · ~40% to first paying placement>
- **Working / shipped:** <key capabilities live>
- **Not yet:** <key gaps>

## Current slices

<The 1–4 chunks of work actively in flight. A "slice" is a shippable vertical:
a thing that goes green and merges on its own. Each maps to a Kaizen task where one exists.>

### <Slice name> — <status: in progress | blocked | in review>
- **Goal:** <what "done" means for this slice, in one line>
- **Touches:** <files / modules / surfaces this slice changes>
- **Approach:** <the chosen path, and any path explicitly rejected>
- **Open questions:** <unknowns that could change the approach>
- **Task:** <KAIZEN-#### or "no task — repo-local">

## Protected areas — do not break

<Code, contracts, or behavior that must keep working. The "if you touch this, stop
and think" list. Auth boundaries, payment paths, schema, public API, migration order.>

- **<Area>** — <why it's load-bearing / what breaks if it changes>

## Next up (engineering)

<Ordered queue of what's next once current slices land. Implementation-level, not
product-level. If it's a product bet, it belongs in ROADMAP.md instead.>

- [ ] <Slice / refactor / fix>
- [ ] <Slice / refactor / fix>

## Handoff state

<For the next agent / session picking this up cold. What's half-done, what's safe to
assume, what to verify first. Update this when you stop mid-slice.>

- **In-flight branch/worktree:** <path or "none">
- **Last verified working:** <what you confirmed green, and how>
- **Watch out for:** <traps the next person will hit>

## Recently shipped

<Trailing log. Newest first. Prune older than ~2 cycles — git history is the real record.>

- YYYY-MM-DD — <slice> shipped · <commit/PR ref> · <one-line outcome>

---
<!--
  Conventions:
  - Slices are vertical and shippable, not horizontal layers.
  - Every protected area names the failure mode, not just the file.
  - Don't duplicate ROADMAP (product) or TASKS.md (canonical task state) here.
  - This file is the cold-start handoff surface — write it for an agent who has zero context.
-->
