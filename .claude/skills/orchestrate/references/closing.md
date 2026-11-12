# Closing a wave and a phase

Open this at a barrier or at phase close, when you are deciding what to snapshot and which of the
run's notes deserve a record. `SKILL.md` §7 and §8 carry the steps. This carries what each one is
protecting against.

## What the snapshot is for

The plan workspace is the whole reason a long run is resumable, and it is gitignored, so git is never
the fallback. Copy the plan directory plus any gitignored write-log, credential, or user-owned config
the tool directory carries. Skip everything the installer rewrites. It costs a second and it is the
only thing standing between a destructive slice and starting over.

## Why plan-lint runs at phase close

`node .claude/scripts/plan-lint.mjs` confirms the status update actually landed on both files. It has
caught real drift of exactly this shape: a ROADMAP line marked `DONE` while its sub-plan header still
read an earlier status.

## Review Focus at phase close

Before flipping the phase to DONE, read the sub-plan's `## Review Focus` section and confirm each
pinned test exists in the tree. A missing one is an unmet acceptance, so the phase stays open until
the test lands or the item is removed with a recorded reason.

## Promoting decisions and rulings

Run `/decide` on anything that clears its bar: not obvious from the code, a competent person could
have chosen otherwise, and re-deriving it costs real time. This proposes, it does not bulk-write.
Most notes and most deviations are not decisions. A worker deviation you accepted is a decision
candidate, because you approved a departure from the brief and nothing else in the tree records why.
A note that was decided and then reversed mid-phase graduates as two linked records: the original and
a `supersede` that replaces it, not one flattened summary.

A ruling from an `--auto` run is judged by that same bar. The difference is where it came from. A
decision was reasoned about with the user in the loop, and a ruling was made without them, so the
report has to state the cost if it was wrong even when the ruling is not durable enough to record.

## What a ruling is

A ruling is a judgment call you made mid-run that departed from the plan or filled a gap the plan left
open. Under `--auto` the transcript is the only place it lives, because the user was not there to be
asked. Listing it with a one-line cost if wrong, and recording the durable ones with `/decide`, puts
a ruling that outlives the phase on disk instead of in a report read once.

## Why `/clear` beats `/compact` at the context-size gate

The plan docs are the state, so a compaction summary of them is redundant. `/clear` is cheaper than
`/compact`, then `/orchestrate <slug> <next-phase>` resumes from disk. Under `all --auto` the stop
prints `/clear` and then `/orchestrate <slug> all --auto`. `--ignore-gates context-size` is for a run
whose owner accepts unbounded context growth.

## Resume after a dead session

Run `grep -n 'DISPATCHED\|IN REVIEW\|REVISING\|BLOCKED' .claude/plans/<slug>/phase-*.md`. The
slices it lists have no workers left, but their edits landed in the tree, so compare the table against
`git diff --name-only` before redispatching.

## A stalled close-of-phase review

`/accessibility-review`, `/design-review`, and the decision reviewer are subagents, so they can stall
like a worker (a report containing the word "stalled"). Re-dispatch the review once. If it stalls
again, run the deterministic checker in-context and report the judgment tier as not run, so the user
knows that half of the review never happened.

## The PR description

`/pr-description` hands the text over. The user still creates the PR.
