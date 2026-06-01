#!/usr/bin/env bash
# sync-from-kaizen.sh — copy canonical business + agent-context docs from ~/Kaizen into this repo.
#
# CANONICAL COPY lives in the kb-repo-doc-sync skill. The fleet installer
# (install-doc-sync.sh) drops this exact file into each repo's scripts/ dir.
# Do not fork per-repo logic in here — keep it generic and slug-agnostic.
#
# Direction: Kaizen (source of truth) -> repo (generated artifact). One way.
# Runs from .husky/pre-commit so synced changes land in the same commit.
# Safe to run anywhere: silently no-ops when ~/Kaizen is absent (CI / contributor / Vercel).
#
# Slug resolution order:
#   1. $KAIZEN_PROJECT_SLUG  (explicit override)
#   2. <repo>/.kaizen-slug   (written by the installer)
#   3. basename of the repo root
#
# Two source tiers:
#   - SHARED  (company-tier): $KAIZEN_HOME/shared-context/repo-kit/  — identical in every repo
#   - PROJECT (per-slug):     $KAIZEN_HOME/projects/<slug>/          — this product's docs
# Only files that exist at the source are synced; missing sources are skipped.

set -euo pipefail

KAIZEN_HOME="${KAIZEN_HOME:-$HOME/Kaizen}"

# Off-machine (Vercel/CI/contributor clone): no Kaizen, nothing to sync. Exit clean.
if [[ ! -d "$KAIZEN_HOME" ]]; then
  exit 0
fi

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || { echo "sync-from-kaizen: not a git repo" >&2; exit 0; }

# Resolve slug.
if [[ -n "${KAIZEN_PROJECT_SLUG:-}" ]]; then
  SLUG="$KAIZEN_PROJECT_SLUG"
elif [[ -f "$REPO_ROOT/.kaizen-slug" ]]; then
  SLUG="$(tr -d '[:space:]' < "$REPO_ROOT/.kaizen-slug")"
else
  SLUG="$(basename "$REPO_ROOT")"
fi

# Validate slug — it flows into a filesystem path, so reject traversal / unexpected chars.
if ! [[ "$SLUG" =~ ^[A-Za-z0-9_-]+$ ]]; then
  echo "sync-from-kaizen: refusing invalid slug '$SLUG' (must match [A-Za-z0-9_-]+)" >&2
  exit 1
fi

KAIZEN="$KAIZEN_HOME/projects/$SLUG"
SHARED_DIR="$KAIZEN_HOME/shared-context/repo-kit"

# Company-tier: <repo-kit-relative>:<repo-relative>. Same content across all repos.
SHARED=(
  "KAIZEN.md:docs/KAIZEN.md"
  "PAUL.md:docs/PAUL.md"
)

# Project-tier: <kaizen-project-relative>:<repo-relative>. Mirrors the table in SKILL.md.
FILES=(
  "PROJECT.md:docs/OVERVIEW.md"
  "brand/BRAND.md:docs/BRAND.md"
  "brand/DESIGN.md:DESIGN.md"
  "ROADMAP.md:ROADMAP.md"
  "SETUP.md:docs/business/SETUP.md"
  "docs/decisions.md:docs/business/decisions.md"
  "icp.md:docs/business/icp.md"
  "competitors.md:docs/business/competitors.md"
)

changed=0
sync_one() {  # $1 = abs source, $2 = repo-relative dest
  local src="$1" dst="$REPO_ROOT/$2"
  [[ -f "$src" ]] || return 0          # source not created yet — skip silently
  mkdir -p "$(dirname "$dst")"
  if ! cmp -s "$src" "$dst" 2>/dev/null; then
    rsync -a --safe-links "$src" "$dst"
    git add "$dst" 2>/dev/null || true
    echo "↻ synced: $2"
    changed=1
  fi
}

for pair in "${SHARED[@]}"; do
  sync_one "$SHARED_DIR/${pair%%:*}" "${pair##*:}"
done

if [[ -d "$KAIZEN" ]]; then
  for pair in "${FILES[@]}"; do
    sync_one "$KAIZEN/${pair%%:*}" "${pair##*:}"
  done
else
  echo "⚠️  sync-from-kaizen: no Kaizen project dir for slug '$SLUG' ($KAIZEN) — synced shared only" >&2
fi

[[ $changed -eq 1 ]] && echo "✓ Kaizen → repo sync complete" || echo "✓ Kaizen → repo: no changes"
