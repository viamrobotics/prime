---
name: review-change
description: Use when the ask is a review of a working-tree or branch change by the per-target reviewer agents mapped by houserules.config.json pathPrefix. Use it directly only when review is wanted without the mechanical gates, such as mid-branch on work that is not finished. A full pre-handoff pass is `/ready`, which runs this skill already.
allowed-tools: Bash, Read, Agent
---

Review the current change by dispatching the **per-target reviewer agents** houserules ships: one
read-only auditor per area, each checking the change against that area's authoritative source.

## 1. Find the changed areas

```
git diff --name-only
```

Reviewing a branch rather than just the working tree? Use `git diff --name-only <base>...HEAD`, where
base is the changesets `baseBranch`.

## 2. Map changed paths → reviewers

Read `.claude/houserules.config.json`. Each entry in `targets[]` has a `pathPrefix` and a `name`, and the
matching reviewer agent is `${name}-reviewer`, installed at `.claude/agents/${name}-reviewer.md`.
For each changed file, find the target whose `pathPrefix` it falls under, longest prefix wins, and
collect the set of `${name}-reviewer` agents whose area was touched. Skip a target with no
`*-reviewer.md` agent on disk, and note it as an unreviewed area.

## 3. Fan out — one message, read-only

Build the change package once, before dispatching:

```
node .claude/scripts/review-package.mjs <base>..HEAD
```

It writes one file (log, stat, and a `-U10` diff) and prints the path. For a working-tree
review with no commits yet, skip this and fall back to handing each reviewer its diff
directly.

Dispatch every matched reviewer in a **single message** as parallel `Agent` calls, each scoped to its
own area's changed files. They are read-only by construction. Give each agent the package file's
path with the instruction to Read it once and review only its own area's files, and the
instruction to return one verdict per its own contract:
**OK**, **Conflict** (quote the rule and the conflicting code), or **Gap** (source silent).

Do not review the code yourself here. The reviewers own the authoritative sources. Your job is the
dispatch and the reconcile.

## 4. Reconcile

Collect the verdicts into one table of area → OK / Conflict / Gap, with a one-line reason. Then:

- **Any Conflict** means the change violates an authoritative rule. Surface it with the quote, then
  fix or flag it before handoff.
- **Gap** means the source is silent. Note it as a judgment call for the user.
- **All OK** means the change is consistent with every touched area's source of truth. Say so.

## Notes

- Reviewer agents ship as **DRAFTs** (`npx houserules modules --modules=reviewers`). Each needs its
  authoritative source filled in before its verdict means anything, and `npx houserules doctor` flags
  any still-DRAFT reviewer. A DRAFT reviewer's verdict is not trustworthy, so treat it as unreviewed.
- This dispatches reviewers. It does not run tests. For scoped verification, use `/verify-changed`.
- This is the general per-target dispatcher, not a design or accessibility specialist. A change
  that touches markup or styled components is better served by `/accessibility-review` or
  `/design-review`, which own those verdicts directly.
