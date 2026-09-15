---
name: ready
description: Use right before handing a finished change back, when the question is whether the change is ready. This is the entry point for pre-handoff work and it runs `/verify-changed` and `/review-change` off-context itself, so prefer it over either of those whenever a whole change is being handed off.
allowed-tools: Bash, Read, Grep, Glob, Agent
---

Roll the pre-handoff checks into a **single ready / not-ready verdict** plus the acceptance checklist
the user can actually verify. Keep the heavy work off this context by delegating to the scoped skills
and reading only their compact results.

## 1. Verify (delegate — do not run the full suite here)

If `/verify-changed` is installed (`.claude/skills/verify-changed/`), invoke it and take its
per-package PASS/FAIL verdict as the verification result. If it is not installed, spawn **one**
subagent to run the repo's verify or test command and return only PASS/FAIL plus any failing residue.
Do not stream the full suite into this context.

## 2. Review (delegate if reviewers exist)

If reviewer agents are installed (`.claude/agents/*-reviewer.md`, non-DRAFT), invoke `/review-change`
and take its OK/Conflict/Gap reconciliation. If none exist, skip the step and say review was not run.

## 3. Changeset / handoff hooks (don't re-run — just report)

houserules' Stop hooks already enforce the auto-fix and changeset-nudge on every turn boundary. Do
**not** re-run them. Only confirm the deterministic state they check:

- **Changeset present** if the change is user-visible. `ls .changeset/*.md`, excluding README, shows a
  pending entry, or you record why none is needed.
- **Working tree** matches what you intend to hand off. `git status --porcelain` shows nothing stray.

## 4. Backlog resolved-but-not-removed (the novel check)

If `.claude/scripts/backlog-log.mjs` is absent, no backlog module is installed and there is no
ledger to ask. Skip this check and say backlog was not checked.

A backlog item you _fixed_ during this work must be _removed_ from its ledger. A resolved item left
open misleads the next session. Detect it:

```
git diff --name-only    # did this change touch files a backlog entry is about?
node .claude/scripts/backlog-log.mjs list
```

Ask the ledger, not the rendered markdown. `BACKLOG.md` is generated and gitignored, so a fresh
clone may not have it yet, and grepping it would report nothing on a repo that has entries.

For each open backlog entry whose subject the current change plausibly resolves, flag it: _"<ID> looks
resolved by this change but is still in <file>. Remove it with `node .claude/scripts/backlog-log.mjs
remove <ID> <file> "<resolution>"`."_ Do not auto-remove. Surface the candidates for the user's call.

## 5. Emit the verdict + acceptance checklist

Produce, in this order:

1. **VERDICT: READY** or **VERDICT: NOT READY.** Not-ready if verify failed, a reviewer returned
   Conflict, a user-visible change has no changeset, or a resolved backlog item lingers.
2. **Blockers**, only if not ready. One line each, with the exact fix.
3. **Acceptance checklist.** The falsifiable "done" criteria for this change, as checkboxes the user
   can confirm in the running system, such as a test passing, a route returning 200, or a flag
   flipping. This is the CLAUDE.md-mandated hand-off artifact. Emit it every time, ready or not.

Keep the whole output compact. This is a summary the user reads at a glance, not a transcript.
