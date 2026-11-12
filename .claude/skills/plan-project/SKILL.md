---
name: plan-project
description: Plan a large, multi-phase implementation as a persisted .claude/plans/<name>/ workspace with a ROADMAP and one sub-plan per phase. Use when a task is too big to hold in one in-context plan.
argument-hint: <what to build>
allowed-tools: Read, Edit, Write, Grep, Glob, Bash, Agent
---

Plan a multi-phase implementation as a persisted project: **$ARGUMENTS**

**This skill plans. It does not implement.** It ends at a scaffolded workspace and a handoff (§4).
Starting phase 1 is the user's call, not a continuation of planning.

One discipline makes this cheaper than re-planning from scratch each session. The plan lives on disk,
not in the transcript, and **`ROADMAP.md` is the single source of truth for what's done**. Every phase
updates its status _in place_ the moment it lands, so resuming is a grep rather than a re-derivation
from scrollback.

## 0. How much ceremony does this earn?

There are three tiers, and the ask lands in exactly one:

- **Do it inline.** A handful of files you will finish now, with the shape already obvious. Write no
  plan at all.
- **Plan inline, persist nothing.** Enough moving parts to be worth thinking through first, but still
  one sitting. Use plan mode or an in-context plan and scaffold no `.claude/plans/` dir.
- **Persist a workspace.** The rest of this skill.

Name the tier out loud before doing anything, in one sentence, with the reason you picked it. The
user can then override it in a word. Silently scaffolding is the failure this prevents, since a
`.claude/plans/` dir for a one-sitting task is pure overhead that no one asks you to delete.

The top tier has a bar. Scaffold **only** when at least one holds:

- **3+ distinct phases** that can land independently and each leave the tree working.
- Work you expect to **pause and resume** across sessions or days.
- Enough moving parts that "what's left?" won't be obvious from `git diff` alone.

When it's a genuine toss-up between the middle tier and this one, ask the user whether to track it
as a project.

## 1. Name the plan and scaffold the workspace

Pick a short kebab slug for the effort, such as `auth-rework` or `payments-v2`. Stamp the date once so
the docs are dateable on resume:

```
date +%Y-%m-%d
```

Create the workspace directory (houserules already installed `.claude/plans/.gitignore`):

```
mkdir -p .claude/plans/<slug>
```

Everything under `.claude/plans/` is **gitignored by default**. It's your living project state, not a
commit artifact, and it churns every phase. To share a plan with the team, `git add -f` it or delete
`.claude/plans/.gitignore`.

## 2. Design the phases

Break the work into **coarse phases**, typically 2 to 6. If you have a dozen, you're listing steps,
not phases. Each phase must:

- land independently and leave the tree in a working state, and
- have a **falsifiable "done"**, the acceptance you could actually check (a test passes, a route
  returns 200, a flag flips).

Cut the phases **vertically**, so each one is a thin end-to-end path someone can actually touch,
rather than a layer of the stack. The default pull is horizontal, a schema phase then a service
phase then a UI phase, and that shape has no working tree and no falsifiable acceptance until the
last phase lands. Prefer one narrow feature wired all the way through over one whole layer built for
features that do not exist yet.

Read independence off the finished cut, do not manufacture it. When two phases name disjoint path
roots and neither reads the other's output, mark them `After: none` (or the phases they really wait
on) so they can run together. Re-cutting horizontally to make lanes brings back the no-working-tree
failure described above.

Ground the phases in the real code, not guesses. Read the repo's own docs and run targeted greps
first. If a subsystem is unfamiliar, fan out **one read-only Explore subagent** to map its seams
before you commit to a phase boundary, and fan out only for what the docs and greps don't answer. For
the design thinking itself, plan mode and the Plan agent are available. This skill's job is to
**persist** the result, not to replace them.

A phase whose work is answering questions rather than writing code can name the `research-spike`
agent in its sub-plan, one spike per scoped question set, each writing one report into the plan
workspace. A follow-up synthesis step names `research-synth` to merge those reports into one
reference document, resolving contradictions explicitly. Both agents are optional installs from the
`research` module. When they are absent, the phase says what to research and the implementer does it
in-context.

## 3. Write the three doc types

Create these under `.claude/plans/<slug>/`. Keep each lean and cross-linked, with relative links so
the workspace is self-contained. A phase that records its spec in `## Reference` is what lets
`/orchestrate` hand that spec to the slice it judges, as the brief's `Reference:` line.

**`PLAN.md`** is the stable overview: goal plus approach, and it rarely changes once set.

```markdown
# PLAN: <slug>

**Created:** <date> · **Status:** see [ROADMAP.md](ROADMAP.md)

## Goal

<One paragraph: what we're building and why. The problem, not the steps.>

## Approach

<The high-level strategy: key decisions, constraints, explicit non-goals.>

## Phases

1. **<name>**: <one line> → [phase-1-<slug>.md](phase-1-<slug>.md)
2. **<name>**: <one line> → [phase-2-<slug>.md](phase-2-<slug>.md)

## Key files & interfaces

<The load-bearing files/APIs this work touches, and where a resuming session should look first.>
```

**`ROADMAP.md`** is the **living** status doc, the one file resume reads first.

```markdown
# ROADMAP: <slug>

**Status:** IN PROGRESS · **Started:** <date> · **Updated:** <date>

> Resuming? Read this file's status lines below. Do not re-derive scope from the transcript.

## Phases

- [x] **Phase 1: <name>** · Status: DONE (<date>) · [sub-plan](phase-1-<slug>.md)
- [~] **Phase 2: <name>** · Status: IN PROGRESS · [sub-plan](phase-2-<slug>.md)
- [ ] **Phase 3: <name>** · Status: TODO · [sub-plan](phase-3-<slug>.md) · After: none

## Log

- <date>: <one line on what changed / what's next>
```

Status vocabulary is fixed so it's greppable: **`TODO` · `IN PROGRESS` · `DONE` · `BLOCKED`**.
Checkboxes mirror it: `[ ]` todo, `[~]` in progress, `[x]` done.

The optional trailing `After` segment sets order. Absent means the phase waits on the line above it,
and the first line waits on nothing. `none` means no dependency, and does not reset the chain for the
line below. A list such as `After: 2, 3` names the phases that must be `DONE` first.

**`phase-N-<slug>.md`** is one file per phase, the working record for that slice.

```markdown
# Phase N: <name>

**Status:** TODO · **Part of:** [PLAN.md](PLAN.md) · **Roadmap:** [ROADMAP.md](ROADMAP.md)
**Signals:** <optional: `wide` for a big footprint, `ui` for user-facing surfaces, else omit the line>
**Domain:** <optional: comma-separated path roots this phase may write, each in backticks, never a glob. Omit the line for `all`>

## Objective

<What "done" means here: the falsifiable acceptance from step 2.>

## Reference

<Relative links to any spec, format, or standard this phase's work must conform to, or "none".>

## Steps

- [ ] <step: the decision made, plus the acceptance that shows it holds. Never a code block>
- [ ] <step>

Self-check before handing off: if fenced code is more than a tenth of a phase file's lines, the
plan is implementing. Move the code into a "decisions" bullet as prose, or drop it. `plan-lint`
warns above that share.

## Review Focus

<Optional: up to five inputs or failure modes the spec implies but no step's tests exercise.>

- <the input or failure mode: what must hold, pinned by `path/to/__tests__/owning-step.test.ts`>

## Notes & decisions

<Captured as you implement: what you chose, what you ruled out, surprises. This is the durable
memory that survives the transcript.>
```

`## Review Focus` lists the inputs and failure modes the spec implies but no step's tests exercise,
so a reviewer knows where to look. Five items is the cap. Each item names the test file that pins it
in backticks, in the step that owns the code. `plan-lint` warns past five items and on an item that
names no test path. Omit the section when every case the spec implies already has a test.

The optional `**Signals:**` line is read by `/orchestrate` where that skill is installed: `wide`
turns on its pre-slicing `/blast-radius` map and `ui` its close-of-phase accessibility and design
reviews. Omit the line when neither applies.

For a control-flow-heavy phase, one where the hard part is which function calls which and in what
order, add an optional call-stack sketch to that phase file: the call tree in diff syntax, with `+`
on the frames the phase adds and `-` on the ones it removes. Pin the signatures those frames depend
on in `## Reference` beside it, so a slice implementing one frame compiles against the same shape as
the slice implementing its caller.

## 4. Stop and hand off

The scaffold **is** the deliverable. Do not open phase 1. Do not edit a source file. Do not dispatch a
subagent to start. Every phase in the ROADMAP stays `TODO`.

This is a hard stop, not a suggestion. The point of writing the plan down is that the user gets to
read it and change it before any code moves, and a skill that slides from planning into implementing
takes that away. A phase that looks small enough to just do is still the user's call.

Before the report, dispatch one `plan-reviewer` on the workspace path with
`subagent_type: "plan-reviewer"` and wait for its list. It reads the finished plan as the person who
would build it and returns what that person would still have to ask. Carry each question into the
handoff under the assumptions line, or say the list was empty. It costs one `plan-reviewer` run
and catches a mis-specified slice before a worker spends a run on it. Do not edit the plan to
answer a question. The user decides.

Report, then wait:

- the resolved slug and the workspace path,
- the phases, one line each, in order,
- anything you had to assume or couldn't resolve while planning,
- the next command, so starting is one keystroke. When any phase carries an `After` that is not the
  chain, name the first ready set, with `/orchestrate <slug> all` as the command and the `2,3` form
  as the explicit one:
  - `/orchestrate <slug> 1` fans out scoped workers for phase 1 (needs the `orchestrate` module).
  - Or the user asks you to take phase 1 in-context.
- the execution mode, with its cost, and a recommendation. `/orchestrate` runs workers per slice and
  pays for briefs, dispatch, and review, which is worth it above roughly two slices. In-context is
  one pass and cheaper below that. Recommend one for this plan and give the reason from its own phase
  sizes. The user still makes the choice.

Whoever picks it up works in `After` order, concurrently where the ROADMAP allows. Before starting a phase, they
set its ROADMAP line and sub-plan header to `IN PROGRESS`, then tick the sub-plan's step checkboxes as
they go. Don't smuggle a later phase's work into the current one. The point is that each phase lands
cleanly.

## 5. Status in place (for whoever implements)

The instant a phase lands and its acceptance actually passes, update **both** the ROADMAP line
(`[x]` / `Status: DONE (<date>)`) and the sub-plan header, in the same edit pass, before moving on. A
stale ROADMAP is worse than none, because it lies to the next session. Add a one-line `## Log` entry
with the date and what's next, and bump the `**Updated:**` date. If a phase is blocked, mark it
`BLOCKED` and note why in the sub-plan. Don't leave it silently `IN PROGRESS`. Under nested `/orchestrate` the ROADMAP line is the dispatcher's
write, per `references/nested.md`.

If `.claude/scripts/plan-lint.mjs` is installed, run `node .claude/scripts/plan-lint.mjs` after
the edit. It checks every phase's status cell against the fixed vocabulary and cross-checks each
ROADMAP line against the sub-plan header it links to, so a pass that missed one half of the
update does not sit undetected until the next resume.

Before the workspace is discarded, re-read the phase's `## Notes & decisions` and offer to promote
anything durable with `/decide`. It proposes, it does not bulk-write. Most notes are not decisions,
and a bulk write is how a decision log fills with diary. Apply the bar from the `decide` skill: not
obvious from the code, a competent person could have chosen otherwise, and re-deriving it costs real
time. A note that records something decided and then reversed mid-phase graduates as two linked
records, the first decision and a second that supersedes it, never flattened into one. Skip this step
silently if `.claude/scripts/decision-log.mjs` is absent, since the `decisions` module is optional.

When the plan itself changes and a phase splits, drops, or reorders, edit PLAN.md and ROADMAP.md to
match reality. The docs track what you're _actually_ doing, not the original guess.

## 6. Resume discipline

Returning to this work in a new session, or after a detour? Read `ROADMAP.md` first. Grep for the live
phase instead of reconstructing state from scrollback:

```
grep -n 'Status: IN PROGRESS\|Status: BLOCKED' .claude/plans/<slug>/ROADMAP.md
```

Open the matching sub-plan for its steps and notes, then continue. Only fall back to reading the diff
or transcript for detail the docs don't capture.

## 7. Finishing

When every phase is `DONE`, flip the ROADMAP header to `**Status:** DONE`, add a final `## Log` line,
and give the user the acceptance checklist: the per-phase "done" criteria, now checkable. The
workspace stays on disk as the project's record, and it's gitignored, so it never enters a commit. If
the user wants the plan gone, delete `.claude/plans/<slug>/` and leave `.claude/plans/.gitignore`.
