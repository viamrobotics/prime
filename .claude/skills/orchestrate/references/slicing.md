# Slicing and the seam, in depth

Open this while you are drawing a phase's slices, before you dispatch. `SKILL.md` §1 carries the
rules a run always needs. This carries the cases that decide how a slice's acceptance is worded,
which slices may share a wave, and what to do when a resource cannot be partitioned.

## Why the seam is yours to write

Writing the shared surface is small, high-leverage, and exactly the judgment you are the expensive
model for. A wave dispatched without it makes each worker guess at the others' shapes, which is the
failure that makes parallel agent work produce merge-conflicted mush.

## The two brief-authoring defects

**Both bounds on a numeric or set-valued criterion.** A cap alone lets a worker satisfy the letter
with a degenerate answer, like one token used once.

**A named source for a criterion over observed values.** Without it, a browser's own defaults count
as violations too. Both are brief-authoring defects: fix the brief, not the model.

## Why the reconcile pass pays

A criterion no slice tests is one you write yourself at the barrier, in the most expensive context
available, after the cheap workers with the right files already open have finished and gone. That is
the cost §1's reconcile pass avoids, and it is why the pass runs before dispatch rather than at
phase close. §8 checks the same list at phase close, and that is the backstop rather than the plan.

## What disjoint actually means

Two "unrelated" features that both edit a barrel export are not parallel. They serialize, or one of
them gives that file up.

## Acceptance design

**A whole-suite run is not a valid slice acceptance.** Workers in a wave run in parallel, so when one
runs its acceptance its siblings are mid-edit. A red full suite there says nothing about the slice,
and it pushes the worker to either report a spurious `BLOCKED` or reach outside its owned paths to
fix a sibling's half-written file. Repo-wide verification is the wave barrier's job (§7), where the
tree is quiet.

**A green test run is not a green typecheck.** Most JS runners (vitest, bun, jest through babel) strip
types rather than check them, so a slice passes its named test file and still fails the repo's `tsc` at
the barrier. Where the repo typechecks as a separate step, give the slice both commands: the behavior
check on the owned tests, and the typecheck on the owned project. The barrier catches this either way.
It catches it after the wave closed, which costs a residue pass instead of the worker's own retry.

Two commands is the ceiling, not a starting point. Each one a slice carries is paid by every worker
in the wave at once, so a package-wide typecheck handed to four slices is four package-wide
typechecks. Prefer the narrowest command that could actually fail on this slice's changes.

**The acceptance has to be cheap enough to iterate against, because iterating is what it is for.** A
worker runs it, fixes what is red, and runs it again until it goes green. Hand it a command too slow
or too broad for that loop and it will quietly stand up a narrower proxy, iterate against that, then
run your acceptance at the end as a formality. That is two runs where you asked for one, and a green
proxy proves nothing about the command you actually named. Narrow the acceptance until it can carry
the loop. Never word the brief so the acceptance reads as a closing ceremony.

**Pair the typecheck in only when its project is quiet.** `tsc` runs per project, not per file, so a
package-scoped typecheck reads whatever a sibling is mid-write in that package, which is the same
failure as the whole-suite run above. Slices in disjoint packages can each carry their own, and that
is a reason to prefer slicing along package or tsconfig-project boundaries where the phase allows it.
When slices in one wave share a project, leave the typecheck at the barrier and **say so in the
brief**, so a worker does not add it back on its own.

## What a slice has to own

**A slice owns the tests that assert its files' behavior, or it cannot finish.** If a slice changes
`plan.ts`, it owns `plan.test.ts`. If it changes a warning string, it owns the suite asserting that
string. Get this wrong and you get one of two failures, both of which surface at the barrier in the
most expensive context you have: the worker ships a fix with no regression test, because the only
valid home was outside its `owns`, or it breaks a sibling's assertion and correctly declines to
repair it. Walk each slice's file list and ask what currently asserts these bytes.

**A slice judged against a spec carries that spec, by path.** When the plan records a format, a
standard, or a criteria doc that a slice's output has to conform to, name it on the brief's
`Reference` line. "Never hand a worker the whole plan" means the plan, not the one document the slice
is measured by. A worker left to infer a format invents one, and that surfaces at the barrier, in the
most expensive context you have, after the worker who could have gotten it right is gone.

## Shared resources and lanes

**Slice by shared mutable resource, not by feature.** File ownership is the usual expression of
this, but it is not the only resource two slices can contend for. Before a wave, name everything two
slices might both write, then draw the slices so each one is owned once:

- a repo-wide formatter or fixer, which rewrites files nobody assigned it
- generated tool directories, especially gitignored ones nothing can restore
- append-only logs and ledgers, where a write inside an isolated worktree is silently discarded
  rather than conflicted
- a package's build output, when two slices in that package both need to build

**Lanes, when a resource cannot be partitioned.** Work whose SUBJECT is one of those shared
resources does not belong in the main checkout beside slices that merely read it. Give it a lane: a
worktree on its own branch, or a checkout pinned at HEAD for read-only falsification. Two costs to
plan for. A worktree needs its own dependency install, and **it carries none of the tool directory**,
so a lane worker cannot be pointed at a brief by path and cannot capture a baseline that assumes an
installed tree. Give a lane worker its brief inline.

## Waves across plans, and dropped slices

A quality phase planned by the `refactor-planner` agent, where installed, arrives pre-sliced: its
plan names each slice's owned paths, findings, and acceptance commands. Validate that slicing
against the rules here instead of re-deriving it.

**Slices in one wave may come from different plans.** Nothing here requires a wave's slices to share
a phase, or even a project. When several plans are in flight, drawing waves across all of them by
the resource rule above is what finds the real parallelism, and it is usually much wider than any
single plan's phase boundaries suggest. Record which plan each slice came from, and update BOTH that
plan's status and the wave's when it lands.

**When you drop a slice, re-home its scope.** A slice canceled mid-program usually carried more
than the reason it was canceled for. Read its brief before deleting it and move whatever is still
wanted into another slice, or you will rediscover the orphaned half several slices later.
