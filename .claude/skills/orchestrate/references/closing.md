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
