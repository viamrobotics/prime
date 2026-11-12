---
name: orchestrate
description: Execute a planned phase from .claude/plans/ with scoped task-worker subagents. Use to drive a planned phase to done.
argument-hint: '[<plan-slug>] [<phase> | <n,m> | all] [--auto] [--flat]'
allowed-tools: Read, Edit, Write, Grep, Glob, Bash, Agent, SendMessage
---

Drive planned work to done as **planner → orchestrator → reviewer**: **$ARGUMENTS**

You stay expensive and small. The implementation happens in cheap, tightly-scoped `task-worker`
subagents, and a worker that reads twelve files and writes six pays for that itself, in a context
that dies with its slice. What comes back to you is a **report**, not a diff. Your context holds the
plan, the seam you write yourself, and N one-screen reports. It never holds worker diffs, full file
dumps, per-file logs, or the match set of anything. If you're reading implementation here, you've
stopped orchestrating and started working.

## 0. Preconditions and arguments

This skill executes a **plan that already exists**. List the candidates with their live status:

```
grep -l . .claude/plans/*/ROADMAP.md | xargs grep -H '^\*\*Status:\*\*'
```

- **No plan workspace?** Stop and run `/plan-project "<what to build>"` first (the `plans` module).
  Orchestration without a persisted phase boundary has nothing to slice and nowhere to record status.
- **Trivial work?** If you'd finish the phase in one pass, **do it yourself**. Below roughly two
  slices, briefs, dispatch, and review cost more than the work.

### Arguments

`/orchestrate [<plan-slug>] [<phase> | <n,m> | all] [--auto] [--flat] [--ignore-gates <key,key>]`,
both leading parts optional. A bare token that is a number, a comma list, or `all` is the **phase**. Anything else is
the **plan slug**. Each phase runs one layer down by default (§4). `--flat` runs it here.

| Invocation                     | Means                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------- |
| `/orchestrate`                 | resolved plan (below), its live phase                                         |
| `/orchestrate auth-rework`     | that plan, its live phase                                                     |
| `/orchestrate 3`               | resolved plan, phase 3                                                        |
| `/orchestrate auth-rework 2,3` | phases 2 and 3 at once, refused up front if domains overlap or one is missing |
| `/orchestrate auth-rework all` | every remaining phase, check-in between each, concurrent where `After` allows |
| `… all --auto`                 | same, without the inter-phase check-in                                        |
| `… --flat`                     | run §1 to §8 here, which suits a phase under two slices                       |

**Live phase** is the one marked `IN PROGRESS` in that plan's `ROADMAP.md`. If none is marked, take
the first `TODO`.

### Resolving which plan

No slug given? In order:

1. **One workspace under `.claude/plans/`** → that's it. (Ignore `blast-radius-*` impact maps. They
   are archives, not plans.)
2. **The conversation names one.** The user just planned it, or you're resuming work you were already
   doing on it.
3. **Exactly one has `Status: IN PROGRESS`** → that one.
4. **Otherwise ask.** Two half-finished plans is precisely when guessing wrong is expensive. List the
   slugs with their status lines and let the user pick.

Never infer a plan from mtime or sort order. State the resolved plan and phase before you slice
anything, so the user can stop you cheaply if you picked wrong.

**Default is check-in.** After each phase closes, report what landed and stop for the user. `--auto`
suppresses only that pause.

**Gates.** A gate is a named stop that halts an `--auto` run at a phase boundary for user input.
`--ignore-gates <key,key>` disables the named gates. The only key today is `context-size` (§8).
`BLOCKED` is not a gate and can never be ignored, because it marks a correctness stop.

## 1. Slice the phase

Read the phase sub-plan (`phase-N-<slug>.md`). Break its steps into **slices**: the unit one worker
owns end to end.

Two pre-slicing moments, each skipped silently when its skill is not installed:

- **Wide or risky phase → `/blast-radius` first.** When the phase touches several packages, or its
  sub-plan carries a `wide` signal on its `**Signals:**` line, run it before drawing slices and let
  the impact map inform the `owns` sets and wave boundaries.
- **Codemod-shaped step → `/sweep`, not slices.** A rote, rule-based, repo-wide step goes to `/sweep`
  as one unit. Judgment-scoped work still slices.

A well-formed slice has:

- **`owns`:** the exact paths/globs that worker may write. Nothing outside them.
- **a falsifiable done:** a command at its narrowest form, e.g. `vitest run <file>`, reachable as
  `pnpm --filter <pkg> test -- <path/to/file.test.ts>`.
- **a brief that fits on one screen.** If it needs more than ~8 steps or touches more than ~6 files,
  split it.
- **both bounds on a numeric or set-valued criterion, and a named source for one over observed
  values.** Miss either and the brief is the defect, not the model.

Then apply four rules to the set you drew:

- **Reconcile the phase's acceptance against the slices' before you dispatch.** Check each "done
  when" criterion in the sub-plan against the union of the slice acceptances, and assign every orphan
  to the slice that owns the code it covers.
- **Keep each acceptance narrow enough that a worker can iterate against it.** A whole-suite run is
  never valid, because siblings are mid-edit. Two commands is the ceiling. Pair a typecheck in only
  when the slice owns its project alone, and otherwise leave it at the barrier and say so.
- **File ownership is the parallelism constraint.** Two slices may run in the same wave **iff their
  `owns` sets are disjoint**. A slice also owns the tests asserting its files' behavior.
- **Slice by shared mutable resource, not by feature.** Name everything two slices might both write,
  from the repo's fixer to a gitignored tool directory to an append-only ledger, then draw the slices
  so each one is owned once.

Read `references/slicing.md` before you write the briefs. It carries acceptance wording, the
test-ownership and carry-the-spec-by-path rules, lanes, multi-plan waves, and dropped-slice scope.

**Orchestrator-owned files** never appear in any worker's `owns`: lockfiles, generated indexes,
barrel/export files, shared type modules, migrations, config. You edit those (§2). Workers that need a
change there **request it in their report**. They don't reach for it.

## 2. Write the seam yourself — before any fan-out

Contract-first is what makes parallel slices safe. Before dispatching a wave, **you** write the
shared surface it depends on (interfaces, signatures, stubs, config keys, migrations) to disk, so
workers implement **against a fixed seam**. If a wave's slices would have to negotiate an interface
between themselves, the seam isn't written yet.

## 3. Record the slice table (state on disk)

Append to the phase sub-plan, so a dead session resumes by grepping instead of re-deriving:

```markdown
## Slices

| id  | owns                     | depends | wave | status |
| --- | ------------------------ | ------- | ---- | ------ |
| 1a  | `src/auth/session*.ts`   | —       | 1    | TODO   |
| 1b  | `src/auth/tokens.ts`     | —       | 1    | TODO   |
| 2a  | `src/api/routes/auth.ts` | 1a,1b   | 2    | TODO   |
```

Status vocabulary is fixed and greppable, extending the ROADMAP's:
**`TODO` · `DISPATCHED` · `IN REVIEW` · `REVISING` · `DONE` · `BLOCKED`**.

Update it **in place** at every transition. A table that lags the truth is worse than none.

Run `node .claude/scripts/plan-lint.mjs`, if installed, after writing or updating the table. It
checks the status vocabulary and the ROADMAP cross-link, so a typo'd status does not silently break
the resume grep in §9.

## 4. Dispatch a wave — one message, one worker per slice

By default, §1 through §8 run one layer down, one `phase-orchestrator` spawn per phase.
`references/nested.md` carries the brief, the relay, the `all` loop, and the context-size gate.

Send the wave as parallel `Agent` calls **in a single message**, up to the "Wave ceiling" in
`references/slicing.md` and batched past it, each with
`subagent_type: task-worker` plus the `model` and `effort` its shape earns, from the table in
`references/slicing.md`. (No `task-worker` installed? The same file carries the fallback.)

Mark the slices `DISPATCHED` first.

A slice that must fetch a page or search the web takes `task-worker-research`, or the same fallback.

Before dispatching, check whether a rule scoped to the wave's paths needs an MCP tool the worker's
`tools:` line lacks. The fix is `orchestrate.workerTools`, with its recipe in `references/slicing.md`.

`task-worker.md` carries the standing rules. Each brief adds only what's specific to this slice,
and **never restates or overrides a standing rule**. The one most often violated is the fixer
prohibition (below).

> **Slice `<id>` — `<name>`.** Objective: `<the falsifiable done>`.
> You own **only** these paths: `<owns>`. Do not edit anything outside them.
> Context you need: `<the seam file(s) + the 2–3 files worth reading first>`.
> Reference: `<the plan doc(s) this slice's output is judged against, by path, or "none">`.
> Steps: `<the ≤8 steps>`.
> Acceptance: `<command(s), scoped to your owned paths>` is your iteration loop. Run it, fix what is
> red, run it again, and stop the moment it goes green. Include the last ~10 lines of each in your
> report.
> Constraints: `<the architectural decisions from PLAN.md this slice must respect>`.

Hand a worker its slice, seam, and constraints, never the whole plan.

### The status table — the one shape you print between waves

The slice table (§3) is state on disk. This is its user-facing projection. Emit it **once when the
wave goes out and once when it closes**, and nowhere else. Same three columns, every run:

```markdown
| Slice            | Owns                     | State      |
| ---------------- | ------------------------ | ---------- |
| 1a session store | `src/auth/session*.ts`   | ✅ done    |
| 1b token codec   | `src/auth/tokens.ts`     | 🔄 running |
| 2a route wiring  | `src/api/routes/auth.ts` | ⬜ pending |
```

Every slice in the phase appears in every printing, including the waves that haven't opened yet,
because a live-wave-only table hides how much is left.

Collapse the on-disk vocabulary into four display states: `DONE` prints `✅ done`, `DISPATCHED`
`IN REVIEW` `REVISING` print `🔄 running`, `TODO` prints `⬜ pending`, and `BLOCKED` prints
`⛔ blocked`. No prose duplicating the table. One line under it for anything the columns can't carry.

**Formatting is orchestrator work, not worker work.** The fixer runs once at the barrier (§7), never
in a worker. A lint or format finding inside a `DISPATCHED` slice's owned path is not residue, and
you do not act on it.

Read `references/fixer-and-residue.md` when a hook or linter reports something while a wave is live.
It carries why a worker-run fixer collides, the `fix.onSubagentStop` and `Stop` hook settings to
check, and how to route residue at the barrier.

## 5. Review the report, not the diff

**Check the tree before you read the report.** The report is the worker's claim about what it did.
The tree is what it did. Run this first, every slice, before forming any opinion:

```
git status --short | grep '^ T\|^T '   # typechanges: a file replaced by a symlink
git status --short | grep '^ D\|^D '   # deletions: every one must be intentional
ls .claude/plans/<slug>/               # plan state still there
```

A deletion outside `owns` is a defect whatever the report says, and if plan state is gone, stop the
wave and recover first.

Each worker returns a report: files touched, the acceptance command and its output tail, decisions
and deviations, and anything blocked or out of scope. Its first line is one of
**`DONE` · `DONE_WITH_CONCERNS` · `NEEDS_CONTEXT` · `BLOCKED`**, which is the worker's own claim and
not the slice's status. `DONE_WITH_CONCERNS` says read the deviation before approving,
`NEEDS_CONTEXT` says the brief was missing something only you have, so answer it and resend rather
than reslicing. Mark the slice `IN REVIEW` and judge it against the brief:

- **Acceptance evidence present and passing?** No evidence, no approval. An unrun acceptance is a
  `REVISE`, always. A brief with two commands needs two tails.
- **Did the acceptance actually RUN, or did an incremental runner report a cache hit as success?**
- **Could the evidence have come out any other way?** An observed value is evidence only if a broken
  implementation would have produced a different one.
- **Did it satisfy the letter and worsen the artifact?** Ask what the change does to the shipped
  thing, not just to the check.
- **Deviations.** Did it depart from the seam, the constraints, or the plan? Before a `REVISE` that
  accuses the worker of departing from the spec, `Read` the cited step in full.
- **Ownership.** Did it touch anything outside `owns`? Confirm with `git diff --name-only`.
- **Spot-read only what's load-bearing**, with `offset`/`limit`.

Read `references/review-patterns.md` when a report reads green and you are deciding whether to
believe it. It carries the worked failure for each check above.

A stalled worker is marked failed, partial result attached, as is a report saying "stalled". Its
slice is not approved. Run `git diff --name-only` against its `owns`, because its partial edits are on
disk. Mark the slice `REVISING` or dispatch a fresh worker with what landed in the brief. A
notification saying the worker awaits its own background work is interim, so wait for its final
report. `references/review-patterns.md` has the recipe.

Verdict, one per slice:

| Verdict     | When                                                                     | Next                                                       |
| ----------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| **APPROVE** | acceptance passes, no deviation that matters                             | slice → `DONE`                                             |
| **REVISE**  | fixable within the same slice                                            | §6                                                         |
| **RESLICE** | the slice was mis-specified (scope wrong, seam missing, two jobs in one) | slice → `BLOCKED`, rewrite the brief, redispatch next wave |

Out-of-scope discoveries a worker reported go to `/backlog-add`, or to a `## Deferred` section in the
sub-plan when no backlog skill is installed. Never drop one silently.

## 6. Revise in place, capped at 2 rounds

Send the fix back to **the same worker** via `SendMessage` with its agent ID. Its context is intact,
so the fix costs a fraction of a cold respawn that re-reads everything. Mark the slice `REVISING`.
Name the specific defect and the acceptance to re-run, never "please improve this."

**Cap: 2 revise rounds.** A third failure is evidence the _brief_ was wrong, not that the model is too
weak. `RESLICE` it, or take that one slice in-context yourself. `references/review-patterns.md` has
the escalation order and the fallback for a harness with no `SendMessage`.

## 7. Close the wave

Every slice reviewed (`DONE` or `BLOCKED`), and only then. This is the wave **barrier**, the one point
where the tree is quiet enough to touch globally:

1. **Fix once.** Run the repo's auto-fix (`lint:fix` / `format:fix`, or the `fix.commands` in
   `.claude/houserules.config.json`) across the packages the wave touched, in one pass over a tree
   that is finally consistent.
2. **Tidy once.** Run `/tidy` over the wave's diff, if that skill is installed, after the fixer
   and before verify so its edits are proven by the same verification. Never inside a worker, for
   the same reason as the fixer.
3. **Verify what actually changed.** Run `/verify-changed` if installed (it scopes to the changed
   packages plus dependents, off-context), otherwise the repo's verify on the touched packages.
4. **Update the slice table** in place, then print the status table (§4), the wave-close printing.
5. **Snapshot the state nothing can regenerate**, into a scratch directory: the plan workspace and
   anything else gitignored that no command can rebuild. `references/closing.md` says what to copy.
6. **Then** open the next wave. Dispatching over an unreviewed slice is precisely how the
   architecture drifts while you aren't looking.

**Residue** is what auto-fix couldn't fix, and it's yours by default. Never send it back to the slice
workers, whose briefs are spent. `references/fixer-and-residue.md` has the routing table for when it
is genuinely bulk work.

A `BLOCKED` slice stops the phase. Record why in the sub-plan and surface it to the user. `--auto`
does not override this.

## 8. Close the phase

All waves done → check the phase's own acceptance from the sub-plan, then update **both** the sub-plan
header and the `ROADMAP.md` line to `DONE (<date>)` in one pass, with a `## Log` entry. This is
`/plan-project`'s status-in-place discipline, and orchestration doesn't get to skip it.

Run `node .claude/scripts/plan-lint.mjs` if installed, to confirm the update actually landed on
both files. Under nested mode the ROADMAP flip and that run belong to the dispatcher (see
`references/nested.md`), and under `--flat` this layer writes both files as before.

**A phase that touched UI surfaces gets its reviews now.** When the diff reached UI code, or the
sub-plan carries a `ui` signal, run `/accessibility-review` and `/design-review`, each skipped
silently when not installed. A fix-worthy finding becomes one revise pass over the owning slice's
paths, and the rest route per §5's out-of-scope rule. A stalled review re-dispatches once, then
you run its deterministic checker in-context and report the judgment tier as not run.

**The last phase also hands over the PR description** with `/pr-description`, if installed.

**Before reporting, promote durable decisions.** Skip this if `.claude/scripts/decision-log.mjs` is
absent. Re-read the phase's `## Notes & decisions` and every report's deviations, and run `/decide`
on anything that clears its bar.

**An autonomous run collects its rulings.** Under `--auto`, list each mid-run departure from the
plan with its cost if wrong. `references/closing.md` carries the bar for `/decide`, what a ruling is,
the stalled-review fallback, and what the §7 snapshot protects.

Then report to the user: slices run, what landed, the verify verdict, anything backlogged. **Stop
here** unless the invocation was `all --auto`, in which case continue to the next phase's §1.

**The context-size gate** runs at this boundary, never mid-wave. Past roughly half the window,
check-in mode suggests `/clear`, then `/orchestrate <slug> <next-phase>`. Under `all --auto`, stop
and print the resume commands unless `--ignore-gates context-size` is set. `references/closing.md`
says why `/clear` beats `/compact`.

At the end of the last phase, flip the ROADMAP header to `**Status:** DONE` and hand over the
per-phase acceptance checklist. `/ready` gives you that roll-up if it's installed.

## 9. Resume discipline

A session that dies mid-wave leaves the truth on disk:

```
grep -n 'DISPATCHED\|IN REVIEW\|REVISING\|BLOCKED' .claude/plans/<slug>/phase-*.md
```

Those slices' workers are gone and their edits are not. Check `git diff --name-only`, reconcile the
table, and redispatch what's unfinished. Never assume a `DISPATCHED` slice did nothing: a stalled
worker is the same case, edits on disk, marked failed.

## Notes

- **Worktree isolation** is for waves that cannot be made disjoint. Default to not using it, and read
  `references/slicing.md` first.
- **Design decisions belong in `/plan-project`**, where the user is in the loop.
