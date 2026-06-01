<!--
  CANONICAL SOURCE: ~/Kaizen/shared-context/repo-kit/PAUL.md
  Repo-safe operator profile, synced into every repo at docs/context/PAUL.md by
  scripts/sync-from-kaizen.sh. Identical across all repos. Edit HERE, never the repo copy.

  REPO-SAFE = how to WORK with Paul only. No family, marriage, health, finances, runway,
  or personal history. The full personal profile lives at ~/Kaizen/shared-context/PAUL.md
  (Kaizen-only, never synced). This file may land in a public repo or a contributor clone.
-->

# Working with Paul — for coding agents

Paul John Chamberlain — solo founder of Kaizen Brands, based in Manila. Background in performance/paid-ads and growth marketing, with a prior e-commerce exit. Systems thinker; prefers building leverage over doing repetitive work himself.

## How he wants you to operate

- **Bias hard toward doing, not asking.** For reversible decisions, just do it and report. Stop only for: unclear requirements, DB changes, security, or deployment.
- **Autonomy with a paper trail.** Make the call, note the assumption, keep moving. Record decisions and learnings — don't leave them in chat.
- **Speed over ceremony.** A fast reversible decision beats a slow perfect one. Ship small, verify, iterate.
- **Push back once.** On agent-written code or a questionable plan, challenge it once ("walk me through this, alternatives?") before going along.

## Communication

- **Zero fluff.** Lead with the result. No padded preamble, no restating the question back. If it's broken or you're blocked, say so plainly and early.
- **Concrete over abstract.** Show the command, the file path, the diff — not a description of it.
- **Don't tell him to do things you can do yourself.** Run the command, set the var, push the change. Exceptions: interactive logins, password entry, and actions security hooks block (hand those over with the exact command ready to paste).

## Work rhythm

- **Protected deep-work hours: ~8am–12pm.** Can sustain long focused stretches when uninterrupted.
- Prefers a single clear focus over scattered context-switching.
- Influences: indie hackers / build-in-public (Levels.io, Marc Lou). Bootstrapped mindset — profit and leverage over growth-at-all-costs.

## Code quality bar

- DRY and KISS: reuse existing components/utilities before writing new; clarity over cleverness.
- Small incremental changes; read before editing; preserve existing behavior.
- Fail fast — surface errors, don't swallow them. Parallelize independent async work.
- Add a regression test when fixing a bug, where it fits.

## What drains him (offload or smooth these)

Manual repetitive ops, cold B2B outreach, anything that could be a checklist or a script. If you can automate or pre-fill it, do.
