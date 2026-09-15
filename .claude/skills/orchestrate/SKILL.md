---
name: orchestrate
description: Execute a planned phase from .claude/plans/ with scoped task-worker subagents. Use to drive a planned phase to done.
argument-hint: '[<plan-slug>] [<phase> | all] [--auto]'
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
- **Trivial work?** If the phase is a handful of files you'd finish in one pass, **do it yourself**.
  Briefs, dispatch, and review cost more than the work below roughly two slices.

### Arguments

`/orchestrate [<plan-slug>] [<phase> | all] [--auto] [--ignore-gates <key,key>]`, both leading
parts optional. A bare token that is a number or `all` is the **phase**. Anything else is the
**plan slug**.

| Invocation                     | Means                                                   |
| ------------------------------ | ------------------------------------------------------- |
| `/orchestrate`                 | resolved plan (below), its live phase                   |
| `/orchestrate auth-rework`     | that plan, its live phase                               |
| `/orchestrate 3`               | resolved plan, phase 3                                  |
| `/orchestrate auth-rework all` | that plan, every remaining phase, check-in between each |
| `… all --auto`                 | same, without the inter-phase check-in                  |

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

Never infer a plan from mtime or from which directory sorts first. State the resolved plan and phase
before you slice anything. That one line is what lets the user stop you cheaply if you picked wrong.

**Default is check-in.** After each phase closes, report what landed and stop for the user. `--auto`
suppresses only that pause.

**Gates.** A gate is a named stop condition that halts an `--auto` run at a phase boundary for
user input. `--ignore-gates <key,key>` disables the named gates, for a run whose owner accepts
the documented cost. The registry today is one key: `context-size` (§8). `BLOCKED` is not a
gate and can never be ignored, because it marks a correctness stop, not a preference.

## 1. Slice the phase

Read the phase sub-plan (`phase-N-<slug>.md`). Break its steps into **slices**: the unit one worker
owns end to end.

Two pre-slicing moments, each skipped silently when its skill is not installed:

- **Wide or risky phase → `/blast-radius` first.** When the phase touches several packages, or its
  sub-plan carries a `wide` signal on its `**Signals:**` line, run it before drawing slices and
  let the impact map inform the `owns` sets and wave boundaries. A small phase never pays for a
  fan-out map.
- **Codemod-shaped step → `/sweep`, not slices.** A rote, rule-based, repo-wide step (an import
  rename, an API swap) goes to `/sweep` as one unit instead of being drawn into file-owned
  slices. Judgment-scoped work still slices. The two fan-out models stay distinct.

A well-formed slice has:

- **`owns`:** the exact paths/globs that worker may write. Nothing outside them.
- **a falsifiable done:** a command at its narrowest form, e.g. `vitest run <file>`, reachable as
  `pnpm --filter <pkg> test <path/to/file.test.ts>`.
- **a brief that fits on one screen.** If it needs more than ~8 steps or touches more than ~6 files,
  split it.
- **both bounds on a numeric or set-valued criterion, and a named source for one over observed
  values.** Miss either and the brief is the defect, not the model.

Then apply four rules to the set you drew:

- **Reconcile the phase's acceptance against the slices', before you dispatch.** Check each "done
  when" criterion in the sub-plan against the union of the slice acceptances, and assign every orphan
  to the slice that owns the code it covers. A slice is scoped by file ownership and a criterion is
  not, so all of them can pass while the phase fails.
- **Keep each acceptance narrow enough that a worker can iterate against it.** A whole-suite run is
  never valid, because a wave's siblings are mid-edit while it runs. Two commands is the ceiling.
  Pair a typecheck in only when the slice owns its project alone, and otherwise leave it at the
  barrier and say so in the brief.
- **File ownership is the parallelism constraint, not conceptual independence.** Two slices may run
  in the same wave **iff their `owns` sets are disjoint**. They serialize, or one gives the file up.
  A slice also owns the tests asserting its files' behavior, or it cannot finish.
- **Slice by shared mutable resource, not by feature.** Files are the usual resource, not the only
  one. Name everything two slices might both write, from the repo's fixer to a gitignored tool
  directory to an append-only ledger, then draw the slices so each one is owned once.

Read `references/slicing.md` before you write the briefs. It carries how to word an acceptance a
worker can iterate against, the test-ownership and carry-the-spec-by-path rules in full, lanes for a
resource that cannot be partitioned, waves drawn across several plans, and what to do with a dropped
slice's leftover scope.

**Orchestrator-owned files** never appear in any worker's `owns`: lockfiles, generated indexes,
barrel/export files, shared type modules, migrations, config. You edit those (§2). Workers that need a
change there **request it in their report**. They don't reach for it.

## 2. Write the seam yourself — before any fan-out

Contract-first is what makes parallel slices safe. Before dispatching a wave, **you** write the shared
surface it depends on: interfaces, type signatures, function stubs, config keys, the migration, the
route table. Commit it to disk before fanning out, so workers implement **against a fixed seam**. If
a wave's slices would have to negotiate an interface between themselves, the seam isn't written yet.
Write it, then dispatch.

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

Update it **in place** at every transition, in the same pass as the transition. A slice table that
lags the truth is worse than none.

Run `node .claude/scripts/plan-lint.mjs`, if installed, after writing or updating the table. It
checks the status vocabulary and the ROADMAP cross-link, so a typo'd status does not silently break
the resume grep in §9.

## 4. Dispatch a wave — one message, one worker per slice

Send every slice in the wave as parallel `Agent` calls **in a single message**, each with
`subagent_type: task-worker` and `model: sonnet`. (No `task-worker` agent installed? Use
`general-purpose` with `model: sonnet` and paste `agents/task-worker.md` inline, ahead of the brief.)

Mark the slices `DISPATCHED` before you send.

If the host repo installed effort variants, pick `subagent_type` by the slice's shape instead
of defaulting every slice to `task-worker`. A mechanical or wide slice (sweeps, boilerplate,
many small files) takes `task-worker-low`. A judgment-heavy slice (architecture calls, tricky
seams) takes `task-worker-high`. The rare slice you would otherwise pull into your own context
takes `task-worker-xhigh`. Everything else stays on the `task-worker` default. A variant exists
only if `.claude/agents/task-worker-<effort>.md` is installed. If it is absent, fall back to
`task-worker`.

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

Never hand a worker the whole plan. It gets its slice, its seam, and its constraints.

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
because a table showing only the live wave hides how much is left.

Collapse the on-disk vocabulary into four display states, so the table stays scannable while the
sub-plan stays greppable:

| On disk                             | Prints as    |
| ----------------------------------- | ------------ |
| `DONE`                              | `✅ done`    |
| `DISPATCHED` `IN REVIEW` `REVISING` | `🔄 running` |
| `TODO`                              | `⬜ pending` |
| `BLOCKED`                           | `⛔ blocked` |

No prose duplicating the table. One line under it for anything the columns can't carry (a blocked
slice's reason, a revise round in flight), then move on.

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

Seconds to run. A deletion outside `owns` is a defect regardless of what the report says about it,
and if plan state is gone, stop the wave and recover before anything else.

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
- **Did it satisfy the letter and worsen the artifact?** A worker optimizes for the acceptance you
  wrote. Ask what the change does to the shipped thing, not just to the check.
- **Deviations.** Did it depart from the seam, the constraints, or the plan's architecture?
  Before a `REVISE` that accuses the worker of departing from the brief, the spec, or the plan,
  `Read` the cited step in full. A grep listing of a numbered list shows only each item's first
  line, and a revise grounded on an extraction the worker can refute costs a full round.
- **Ownership.** Did it touch anything outside `owns`? Confirm cheaply with
  `git diff --name-only` (names, not content).
- **Spot-read only what's load-bearing**, with `offset`/`limit`. A full diff read here forfeits the
  entire point of the skill.

Read `references/review-patterns.md` when a report reads green and you are deciding whether to
believe it. It carries the worked failure for each check above, including the cache-hit tail and the
observation that would have read the same either way.

Verdict, one per slice:

| Verdict     | When                                                                     | Next                                                       |
| ----------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| **APPROVE** | acceptance passes, no deviation that matters                             | slice → `DONE`                                             |
| **REVISE**  | fixable within the same slice                                            | §6                                                         |
| **RESLICE** | the slice was mis-specified (scope wrong, seam missing, two jobs in one) | slice → `BLOCKED`, rewrite the brief, redispatch next wave |

Out-of-scope discoveries a worker reported go to `/backlog-add`, not into this phase. When no
backlog skill is installed, append them to a `## Deferred` section in the sub-plan instead,
creating it if absent, so the discovery survives for the user to triage. Never drop one silently.

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
both files.

**A phase that touched UI surfaces gets its reviews now.** When the phase's diff reached UI code
(components, styles, templates), or its sub-plan carries a `ui` signal on its `**Signals:**`
line, run `/accessibility-review` and `/design-review`, each skipped silently when not
installed. Their findings route like worker reports: a fix-worthy item becomes one revise pass
over the owning slice's paths, and the rest route per §5's out-of-scope rule.

**The last phase also hands over the PR description.** When this close flips the ROADMAP to
DONE and `/pr-description` is installed, produce the description alongside the acceptance
checklist. The user still creates the PR.

**Before reporting, promote durable decisions.** Skip this step if `.claude/scripts/decision-log.mjs`
is absent. Re-read the phase's `## Notes & decisions` and the decisions-and-deviations section of
every report you reconciled, and run `/decide` on anything that clears its bar.

**An autonomous run collects its rulings.** A ruling is a judgment call you made mid-run that
departed from the plan or filled a gap the plan left open, and under `--auto` the transcript is the
only place it lives, because the user was not there to be asked. List every one in the phase-close
report with a single line for what it costs if it turns out wrong. Record the durable ones with
`/decide`, so a ruling that outlives this phase sits on disk instead of in a report read once.

`references/closing.md` carries the bar a decision or a ruling has to clear, the supersede case, and
what the snapshot in §7 is protecting.

Then report to the user: slices run, what landed, the verify verdict, anything backlogged. **Stop
here** unless the invocation was `all --auto`, in which case continue to the next phase's §1.

**The context-size gate** runs at this boundary, only after the close checklist above has passed
and never mid-wave. When the session's context has grown past roughly half the window (the
harness's approaching-auto-compact warning is the strong signal), act by mode:

- Check-in mode: add one line to the report suggesting `/clear`, then
  `/orchestrate <slug> <next-phase>` in the fresh session. The plan docs are the state (§9), so
  a compaction summary of them is redundant and `/clear` is cheaper than `/compact`.
- `all --auto`: stop instead of opening the next phase and print the resume commands (`/clear`,
  then `/orchestrate <slug> all --auto`). `--ignore-gates context-size` (§0) disables this stop
  for a run whose owner accepts unbounded context growth.

At the end of the last phase, flip the ROADMAP header to `**Status:** DONE` and hand over the
per-phase acceptance checklist. `/ready` gives you that roll-up if it's installed.

## 9. Resume discipline

A session that dies mid-wave leaves the truth on disk:

```
grep -n 'DISPATCHED\|IN REVIEW\|REVISING\|BLOCKED' .claude/plans/<slug>/phase-*.md
```

Those slices' workers are gone. Their edits are not. Check the working tree for what actually landed
(`git diff --name-only`), reconcile the table, and redispatch what's genuinely unfinished. Never
assume a `DISPATCHED` slice did nothing.

## Notes

- **No worker accumulates another slice's history**, which is the anti-rot argument for this shape.
- **Worktree isolation** (`isolation: 'worktree'`) exists for waves that genuinely can't be made
  disjoint. Default to not using it. Correct slicing is cheaper than merging, and needing it usually
  means §1 was done wrong.
- **Design decisions belong in `/plan-project`** and plan mode, where the user is in the loop, not
  in an orchestration run.
