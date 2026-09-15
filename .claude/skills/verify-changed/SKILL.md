---
name: verify-changed
description: Use when the ask is to verify changed packages and their dependents off-context by running check, test, and lint across a workspace or monorepo. Use it directly only when the mechanical gates alone are wanted, such as after a dependency bump or a build-breaking edit. A full pre-handoff pass is `/ready`, which runs this skill already.
allowed-tools: Agent
---

Verify the current change **without pulling the full test transcript into this context.**

The point of this skill is the off-context boundary. A full monorepo verify is minutes of streaming
output, so you must **not** run it here. Instead spawn **one** subagent that runs the resolver,
executes the scoped commands, and returns only the verdict.

## What to do

Spawn a single general-purpose subagent with one `Agent` call, using the instructions below. Do not
run any Bash yourself. This skill's `allowed-tools` is `Agent` precisely so the work stays off this
context.

> **Subagent brief — scoped verify:**
>
> 1. Run `node .claude/scripts/verify-changed.mjs --run` from the repo root.
> 2. That helper resolves the MINIMAL scope, meaning the packages whose files changed against the base
>    branch plus every package that transitively depends on them. It runs each package's verify
>    commands and prints one line per package (`<pkg>: PASS` or `<pkg>: FAIL (<step>)`), with a
>    trimmed residue tail on stderr for any failure. Exit code is 2 if any package failed, 0 otherwise.
> 3. Return **only** the per-package PASS/FAIL lines, and for each FAIL the failing step plus the
>    shortest residue that identifies the fix. Do **not** paste full command output.
> 4. If the helper reports `FULL SCOPE (git/config unavailable)`, say so. The scope was degraded to
>    every package.

## Reconcile

Relay the subagent's verdict: which packages passed, and which failed and why, one line each. If
everything passed, say the change verifies clean and is ready for the user to commit. If anything
failed, fix it or hand the specific residue back, then re-run this skill. Never wave a red verdict
through.

## Notes

- Scope math and command selection live in `verify-changed.mjs`, configured by the `verify` block and
  the per-target `verifyCommands` in `.claude/houserules.config.json`. Tune there, not here.
- Preview the scope without running anything. `node .claude/scripts/verify-changed.mjs` prints the
  plan, and `--json` emits it machine-readably.
- This replaces a hand-maintained "shared packages" list. Dependents come from the workspace
  dependency graph, so a change to a leaf package still verifies its consumers.
