# Planning a milestone

A milestone is one directory under `.claude/plans/` that holds a `MILESTONE.md` and two or more
member plans. Each member is an ordinary workspace from `SKILL.md` sections 1 to 3. The milestone
has no phases of its own. Its steps schedule member phases side by side, and its session owns the
files and artifacts the members share.

The failure this recipe answers is a wrong-shaped output: a milestone scaffolded for work with one
lane, or members cut so that every step runs one phase at a time. Produce these parts, in this
order:

1. the bar's verdict, said out loud,
2. the member cut,
3. `MILESTONE.md`,
4. the member plans, written only as far as the rolling horizon,
5. the handoff.

Promoting one or several existing plans into a milestone follows the same parts with a different
start. It is described last.

## 1. The bar

List each phase you expect, with its write roots. Count hub files among them: a shared test file,
the composition root, a shared render or report module, the spec every phase updates, the lockfile.
Then answer four yes or no questions in order. The first no decides, and it routes to the tier it
names.

1. **Lanes.** Do the phases split into two or more groups with disjoint write roots? No: one
   persisted plan. This excludes four features that all edit one pipeline test file, which run one
   at a time whatever the plan count.
2. **Free hands.** With the rulings each phase needs taken before it starts, can two groups be live
   at once while the owner is needed by at most one? No: one persisted plan, or plans in sequence
   when question 4 would pass. This excludes a deploy whose every phase waits on a credential and a
   run the owner reads, where the files split but the owner runs one lane at a time.
3. **Braid.** Does an artifact cross between groups in the middle of their sequences, not only where
   they join? No: one persisted plan with parallel phases, ordered by `After` and `Domain`. This
   excludes two tracks that meet only in a final integration phase, which `After` already schedules.
4. **Separate closure.** Does each group have its own goal, and could it finish on a different day
   without holding the other's `DONE` hostage? No: one persisted plan with parallel phases. This
   excludes an issue sweep, where one PR closes every item. Yes: a milestone.

These are not signals, and none of them moves an effort up a tier:

- **Phase count.** Fourteen phases in one lane are one plan.
- **Unrelated goals.** A sweep of unrelated issues is one plan, closed by one PR.
- **Mixed kinds of work.** Copy, design, code, and deploy in one effort are still one plan.
- **A contract document between phases.** A spec one phase writes and the next reads is a
  `## Reference` line, not a braid between plans.

**Say the verdict before the first write. Never skip it.** The verdict is one sentence that names
each question's answer, or the first no that decided it, such as "One plan with parallel phases:
question 3 is a no, since the two tracks only meet at the end." Your closing report names the same
questions.

The excuse that skipped it in a real run: "the owner already named the tier, so that's the tier
I'll take." The answer: the owner's naming overrides a no, but it never replaces the verdict. The
verdict is what tells the owner about the no they overrode. Say it, then take the tier the owner
named.

The owner can override the verdict in a word. When the answer is a lower tier and the owner named
no tier, continue with `SKILL.md` at that tier and do not read further here.

## 2. Cut the members

The shape is a matrix. Members are the rows, steps are the columns, and each cell is one member
phase.

- **A member owns a goal.** Name it in product terms, such as "accounts and device records, the
  API". Nothing assigns a path root to a member as a whole.
- **Each member phase declares its `Domain`.** The overlap that matters is phase against phase
  inside one step, across members.
- **A step is one increment cut across members.** It is vertical, a thin path someone can touch,
  even when the phase a member contributes to it is one layer of that member. The step closes on an
  end-to-end check that runs alone. Each member phase checks itself hermetically, so the phases in a
  step stay safe to run together.

Refuse three cuts:

- **A plan per item of a same-recipe series.** The items share the recipe and its hub files, so
  they form one lane, and a plan each adds ROADMAPs without adding concurrency. Write one member
  with a phase per item.
- **A "design, architecture and scaffolding" member.** No other member can start until all of it
  lands, so it serializes the milestone. Its parts go elsewhere: architecture questions become
  gates, interfaces become contracts under held paths, and scaffolding becomes each member's first
  phase in the first step.
- **A member that exists to wrap others.** `MILESTONE.md` is already the wrapper, and a plan with no
  goal of its own can only copy the other members' status, which goes stale.

## 3. Write `MILESTONE.md`

Write it at `.claude/plans/<milestone>/MILESTONE.md`. At scaffold, every step is `TODO`.

```markdown
# MILESTONE: <slug>

**Status:** IN PROGRESS · **Started:** <date> · **Updated:** <date>

> Resuming? Read the step marked IN PROGRESS, then the ROADMAP of each member it names.

## Goal

<One paragraph, and the check that says the milestone is delivered.>

## Members

| Member    | Owns                                 | Verify                    |
| --------- | ------------------------------------ | ------------------------- |
| `backend` | accounts and device records, the API | `pnpm --filter api check` |
| `web`     | the sign-up and device pages         | `pnpm --filter web check` |

## Held paths

- `pnpm-lock.yaml`
- `contracts`

## Contracts

| Id  | Path                 | Version | Producer             | Consumers         |
| --- | -------------------- | ------- | -------------------- | ----------------- |
| C1  | `contracts/api.yaml` | 1       | `backend/signup-api` | `web/signup-form` |

## Resources

- `bench-rig`: the one provisioned device

## Gates

- G1 · OPEN · decision · auth approach · blocks `sign-up`

## Steps

### Step: skeleton · Status: TODO

Every surface builds and reaches a health route.

- Items: `backend/scaffold`, `web/scaffold`
- Seam: none
- Close: `pnpm check`
- Needs: none

### Step: sign-up · Status: TODO

A user signs up from the web app against the real API.

- Items: `backend/signup-api`, `web/signup-form`
- Seam: contract C1 at version 1
- Close: `pnpm test:e2e signup`
- Needs: G1
- Uses: `web/signup-form` holds `bench-rig`

### Step: provision · Status: TODO

A signed-in user claims a device. Items are written when this step is next.

## Log

- <date>: scaffolded, steps `skeleton` and `sign-up` written in full. Bar: <the verdict sentence>.
```

Fill each section from the ask and the code, in this order:

- **Goal.** The outcome the ask names, plus the one command or observation that says it is
  delivered.
- **Members.** One row per member from section 2. `Verify` is the command the milestone session runs
  for that member at each step barrier, scoped to that member's packages.
- **Held paths.** Find them in three places: the lockfile, root config such as the workspace file,
  the root `package.json`, and a base tsconfig, and any file two members' phases would both write,
  such as a barrel, generated code, or the composition root. Only the milestone session writes a
  held path, so leave it out of every member phase `Domain`. When the lockfile is held, the
  dependency fields of each member's `package.json` belong to the step's seam. The item owns the
  rest of the file and requests any new dependency. `.changeset` and the ledgers are held
  without being listed.
- **Contracts.** For each step, ask what one member's phase produces that another member's phase
  reads: an API schema, a shared type, a theme file. Each becomes one row, with an integer version
  starting at 1, the producing item, and the consuming items, all as `<member>/<phase-slug>`. Keep
  the contract's file under a held path, since the milestone session writes each version as the
  seam of the step that raises it.
- **Resources.** Exclusive things that are not files: a device, a shared dev stack, a repo-wide
  generator, a quiet machine for a timing test. An item that needs one names it on its step's
  `Uses` line.
- **Gates.** Find them in the unknowns of the ask. A choice the owner makes is a `decision`. A
  question research answers is a `spike`. An act only a person does, such as issuing a credential or
  buying a device, is `human`. Each gate names the step it blocks, and that step lists the gate on its `Needs` line. `plan-lint` checks the two agree. A default you took without the owner is a closed decision
  gate, `CLOSED (<date>, default taken)`. It has no other home, so write no `## Defaults taken`
  section.
- **Steps.** In execution order. Each has a stable slug, a one-line increment, its `Items` as
  `<member>/<phase-slug>`, its `Seam` (the contract versions and held-path edits its items need
  before they start, or `none`), its `Close` command, its `Needs` gates, and a `Uses` line when an
  item holds a resource. A seam too long for its line goes in `seam-<step-slug>.md` beside `MILESTONE.md`, linked from the
  `Seam` line. Reference a phase by its slug, never its number, since numbers shift when a
  phase is inserted.
- **Log.** One dated line for the scaffold, ending in a `Bar:` clause that records the verdict
  said in section 1. `plan-lint` checks the first Log line holds a real verdict, not the placeholder.

Phase status lives only in member ROADMAPs, and step status only in `MILESTONE.md`. Never copy one
into the other. Three more rules hold for every line of `MILESTONE.md`:

- **No member status anywhere.** A `Members` row, a step line, a gate, the `Goal`, or a `## Log`
  line never says a member or phase is done or in progress, such as "(DONE before promotion)". Only
  a step's own status line states status.
- **Phases are named by slug in prose too.** Write `<member>/<phase-slug>`, never "phases 7 and 8".
- **Each section holds only its template lines.** A reason or a history note goes in the `## Log`.

## 4. Write the members, to the rolling horizon

Each member is a workspace at `.claude/plans/<milestone>/<member>/` with `PLAN.md`, `ROADMAP.md`,
and `phase-N-<slug>.md` files, exactly as `SKILL.md` section 3 writes them. Phase numbers are local
to the member. A member phase's `After` names only phases of the same member, since order across
members is the step order. Mark a phase `**Signals:** owner` when it needs the owner's input after
it starts, such as a design iteration.

Write only as far as the next two steps, because steps further out were replanned before they ran:

- **Phases that are items of the first two steps** get a full sub-plan.
- **Every later member phase you can name** gets a ROADMAP line only, linking the sub-plan filename
  it will have. `plan-lint` reports such a phase only once every step has its `Items` line and
  the phase is still in none of them.
- **Steps after the second** are scope lines: the step heading, its status, and the one-line
  increment, with no `Items` line.

When a step closes, write the step two ahead in full: its `Items`, `Seam`, and `Close`, and the
sub-plans of its phases.

Run `node .claude/scripts/plan-lint.mjs` from the repo root when the scaffold is written, if it is
installed, and fix every error before the handoff.

## 5. Hand off

Dispatch the `plan-reviewer` on the milestone directory, as `SKILL.md` section 4 describes for a
plan. Then follow that section's paragraph that begins "A milestone gets one handoff for the whole
milestone". Give `/orchestrate <milestone>` as the execution line, one phase-orchestrator per item, and offer
in-context only when `/orchestrate` is not installed. List the gates closed by a default taken, so
the owner can reopen one. Every phase and every step stays `TODO`.

## Promoting existing plans

Promotion has two cases. In the first, a plan grows into a milestone because work is inserted that
has its own goal and its own write roots. In the second, several existing plans combine into one
milestone, with no work inserted. Promotion keeps every existing plan intact:

1. Wait for a quiet point, with no phase of an existing plan `IN PROGRESS`. If one is, stop and name
   that phase to the owner. Step 7 covers the owner's go to promote anyway. Run
   `node .claude/scripts/plan-lint.mjs` on the existing plans, if it is installed, and keep its
   output for step 8.
2. Apply the bar, and say its verdict before the first write, as section 1 requires. With inserted
   work, apply it to the inserted work only, never to the old plan. With several existing plans and
   no inserted work, apply it to their remaining phases, the ones not `DONE` or `DROPPED`. A yes to
   question 3 names the artifact that crosses and the step where it crosses. A no keeps inserted
   work in the existing plan as new phases, or in a plan that runs after it. A no leaves several
   plans as separate plans. Either way promotion stops, unless the owner named the milestone.
3. Create `.claude/plans/<milestone>/` and move each existing workspace under it, as
   `.claude/plans/<milestone>/<plan>/`. Its phases keep their numbers and slugs. Never split it,
   renumber it, or move phases between members. The move breaks two kinds of path: a repo-rooted
   `.claude/plans/<plan>/` path, and a relative link that leaves the moved plan for a file that did
   not move with it. Rewrite every path the move broke, in `DONE` phases too, and in any plan outside
   the milestone that points into a moved one. Log the rewrites as one `## Log` line that counts them
   by kind, such as "rewrote 14 repo-rooted paths and 6 outbound relative links". Never log a moved
   plan as "unchanged".
4. Write `MILESTONE.md` with each existing plan as a member row. Steps reference its remaining
   phases by slug. A `DONE` phase needs no step.
5. Scaffold each new member as in sections 2 to 4, including its `plan-reviewer` pass. With no
   inserted work there is no new member, so skip this step.
6. Reconcile the remaining phases before they run. Add a `## Reference` line to each phase that will
   consume another member's output. Write the contract row for that output when the step where it
   crosses is written in full, with its `Items` and `Seam`. An empty `Contracts` table is correct
   only while every crossing the bar named sits in a scope-line step.
7. If the owner says go while a phase is `IN PROGRESS`, place that phase in the first step, set that
   step `IN PROGRESS`, and log both in the `## Log`. Never flip the phase to `BLOCKED`, since it is
   not blocked and the next session would stop on it. Never edit an `After` marker to silence lint.
   Two `IN PROGRESS` phases whose `Domain` roots overlap cannot share that step, and neither can wait
   in a `TODO` one. Stop, name both, and leave the choice of which runs first to the owner.
8. Run `plan-lint` on the milestone, as section 4 says. Fix every error the promotion caused. An
   error that step 1's output already held is reported to the owner in the handoff, not fixed by the
   promotion.

Re-apply the bar every time work is inserted into a milestone, to the inserted work only. Work that
fails it becomes phases of an existing member, placed in a step, and never a new member.
