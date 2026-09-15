---
name: blast-radius
description: Map a change's blast radius once and archive a dated impact map to .claude/plans/. Use before a wide or risky change.
argument-hint: <the change / symbol / module whose impact to map>
allowed-tools: Bash, Read, Grep, Glob, Agent, Write
---

Map, and **archive**, the blast radius of: **$ARGUMENTS**

A blast-radius survey is expensive to run and cheap to re-read. Run the read-only fan-out **once**,
write the result to a dated artifact under `.claude/plans/`, and let every later session `grep` that
file instead of re-fanning the whole survey.

## 1. Name the surface

Identify the exact thing changing: the exported symbol(s), file(s), route, config key, or schema.
Get the concrete names to search for. A blast-radius map is only as good as the seeds you fan out on.

## 2. Fan out read-only mappers — once, in one message

Dispatch one `blast-radius-mapper` agent per search angle, in parallel, so no single agent holds the
whole picture and you don't serialize the survey. The agent definition pins the sonnet model, the
read-only toolset, and the report format, so a brief carries only the surface and its one angle:

- **by symbol:** direct importers and callers of each changed export.
- **by string:** config keys, route paths, feature flags, magic strings the change renames or removes.
- **by contract:** types, enums, and interfaces the change alters, and their structural consumers.
- **by boundary:** cross-package edges, such as a monorepo dependent that imports the changed package.

Each mapper returns a compact list of `file:line → how it consumes the surface → risk if it breaks`,
plus a coverage note. When the `blast-radius-mapper` agent is not installed, fall back to read-only
`Agent`/Explore calls with `model: "sonnet"` passed on each. Mapping consumers is search-and-report
work, and inheriting a premium session model multiplies the survey's cost without widening it.

## 3. Write the dated artifact

Write `.claude/plans/blast-radius-<slug>-<YYYY-MM-DD>.md`, stamping the date with `date +%Y-%m-%d` and
the commit with `git rev-parse --short HEAD`. It **must** open with a staleness disclaimer and carry
these sections:

```markdown
# Blast radius — <surface> — <YYYY-MM-DD>

> ⚠️ Snapshot at commit `<sha>` on <date>. Cited lines drift as code changes. Re-verify each before
> relying on it, and treat this as a map, not ground truth. Regenerate with `/blast-radius <surface>`.

## Surface

<the exact symbols/files/keys this maps>

## Impact by file

- `path:line` — <symbol/consumer> — <how it uses the surface> — **risk:** <what breaks if changed>
- ...

## Cross-package / boundary impact

<dependent packages or services that consume the surface, if any>

## Completeness self-audit

- **Coverage:** HIGH | MED | LOW — <which angles were exhausted, which were sampled>
- **Gaps:** <search angles not run, dynamic/reflective usages a static search can miss, generated code>
```

## 4. Hand back the artifact, not the survey

Tell the user the map is at `.claude/plans/blast-radius-<slug>-<date>.md` and give the one-line
headline: N consumers across M files, coverage HIGH/MED/LOW, and the sharpest risk. Do **not** paste
the whole map into this context. The point is that it lives on disk. `.claude/plans/` is gitignored by
the plans module, so the artifact is local living state, not a commit.

## Notes

- The reusable kernel is the **artifact shape, read-only fan-out, staleness disclaimer, and freshness
  cue**, not repo-specific search logic. Tune the seed patterns in steps 1 and 2 to your codebase, and
  keep the shape.
- Completeness honesty matters more than breadth. A `LOW` coverage with named gaps is more useful than
  a confident map that silently missed the dynamic call sites.
