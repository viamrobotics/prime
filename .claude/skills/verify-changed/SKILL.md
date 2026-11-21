---
name: verify-changed
description: Verify changed packages and their dependents off-context by running check, test, and lint across a workspace or monorepo. Use directly only when the mechanical gates alone are wanted. `/ready` is the full pre-handoff pass.
allowed-tools: Bash(node .claude/scripts/verify-changed.mjs:*), Read
---

Verify the current change **without pulling the full test transcript into this context.**

The helper already compacts its output to one line per package plus a short residue tail per
failure, so a subagent buys nothing. Run it in the foreground by default. A foreground call holds the
turn open until it returns, and a completion notice that lands while no tool call is running does not
wake the session.

## What to do

1. Run `node .claude/scripts/verify-changed.mjs` from the repo root, without `--run`. It prints the
   plan preview. The first line says `<n> package(s) in scope`, and each package gets its own line.
2. If the preview lists 8 packages or fewer, run `node .claude/scripts/verify-changed.mjs --run` in
   the foreground with `timeout: 600000`. The output is the compact result, so read it directly.
3. If the preview lists more than 8 packages, start the same command with `run_in_background: true`
   instead. Then wait with foreground `sleep 20` calls, and check the output file after each one. Do
   not end the turn while the run is going. Claude Code refuses a long standalone foreground sleep, so
   do not write a longer one or a loop of sleeps in one call.
4. When the run has exited, `Read` the output file if you did not already have it. It is small, so
   read all of it.

The helper resolves the MINIMAL scope: the packages whose files changed against the base branch plus
every package that transitively depends on them. It prints `<pkg>: PASS` or `<pkg>: FAIL (<step>)`
per package, with a trimmed residue tail on stderr for any failure. Exit code is 2 if any package
failed, 0 otherwise. If it reports `FULL SCOPE (git/config unavailable)`, say so. The scope was
degraded to every package.

## Reconcile

Relay the per-package lines, and for each FAIL the failing step plus the shortest residue that
identifies the fix. If everything passed, say the change verifies clean and is ready for the user to
commit. If anything failed, fix it or hand the specific residue back, then re-run this skill. Never
wave a red verdict through.

## Notes

- Scope math and command selection live in `verify-changed.mjs`, configured by the `verify` block and
  the per-target `verifyCommands` in `.claude/houserules.config.json`. Tune there, not here.
- `verify.timeoutMs` in `.claude/houserules.config.json` caps each command. A hung runner becomes
  `FAIL (<step>, timed out after <n>s)` instead of a stalled run.
- Preview the scope without running anything. `node .claude/scripts/verify-changed.mjs` prints the
  plan, and `--json` emits it machine-readably.
- This replaces a hand-maintained "shared packages" list. Dependents come from the workspace
  dependency graph, so a change to a leaf package still verifies its consumers.
