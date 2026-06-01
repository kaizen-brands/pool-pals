<!--
  CANONICAL SOURCE: ~/Kaizen/shared-context/repo-kit/KAIZEN.md
  Repo-safe company overview, synced into every repo at docs/context/KAIZEN.md by
  scripts/sync-from-kaizen.sh. Identical across all repos. Edit HERE, never the repo copy.

  REPO-SAFE = no revenue targets, no scorecard, no financial position, no personal data.
  This file may end up in a public repo or a contributor's clone. Keep it that way.
  Full internal versions live at ~/Kaizen/{COMPANY,MISSION}.md (Kaizen-only, never synced).
-->

# Kaizen Brands — for coding agents

**What it is:** A one-person company with an AI-powered team, building a portfolio of small, focused software products. Each product solves one problem well for everyday people (primarily Philippines & Australia) who'll pay a few dollars a month for something that saves them time.

## The Kaizen Way

_Kaizen (改善): continuous improvement. Small, daily, compounding._

Lots of small bets, fast — not big bets. Ship an MVP in days, not months. Spend a small ad budget to find out if anyone cares. Kill what doesn't work without guilt; double down on what does. Every day a little better; every week something shipped.

## Operating loop

**Ship → small paid ad test → scale the winners → kill the losers.** "Shipped" means a monetizable MVP: payment flow + analytics + at least one acquisition channel attempted. We don't debate whether an idea is good — we test it with real money and let the market decide.

## Values that change how you should build

- **Ship over perfect.** A live product with users beats a beautiful one in a repo. Optimize for learning speed; quality follows traction. Professional, not perfectionist.
- **Speed is a feature.** Prefer a fast reversible decision over a slow "right" one. If something breaks, Sentry tells us.
- **Radical honesty, zero fluff.** If it's broken, say so plainly. No padded updates.
- **One human, many agents.** We scale with systems, not headcount. If an agent can do it, Paul shouldn't.
- **Compound over sprint.** Every system, SOP, and logged learning compounds. Build the machine that builds the products.

## Operating principles (day-to-day rules)

- **Revenue-blocking bugs trump everything.** If someone can't pay, nothing else matters.
- **WIP limit: 3.** Max 3 products actively worked at once. Focus beats breadth.
- **Nearest-to-done first.** Finishing beats starting. Always.
- **Small test before big spend.** Never scale ad spend until a cheap test shows signal.
- **Automate the third time.** First time do it; second time note it; third time automate it.
- **Write it down.** A decision not recorded didn't happen. Log learnings — don't leave them in chat.
- **Ask forgiveness, not permission** for small reversible decisions. Just do it, then report.
- **Default to public/async.** Post to shared channels, not DMs. Async beats real-time interruptions.

## How we build (stack defaults)

Next.js (App Router) + React + TypeScript; Convex (datastore + server fns); Better Auth; shadcn/ui + Tailwind v4; Vercel (auto-deploy from GitHub); Cloudflare (Images/Stream/R2). pnpm where a lockfile exists. Repos auto-deploy on push to main — never deploy via the Vercel CLI.

## What we don't do

Enterprise sales; venture-backed growth (bootstrapped, profit > growth); feature factories; meetings (agents, not meetings); perfectionism.

## Where the rest lives

- This product's overview: docs/context/OVERVIEW.md
- Business roadmap: ROADMAP.md; Engineering plan: docs/PLAN.md
- Open work right now: docs/TASKS.md; Ideas/backlog: docs/IDEAS.md
- How to work with Paul: docs/context/PAUL.md
