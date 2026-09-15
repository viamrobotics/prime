---
name: sweep
description: Shard a repo-wide mechanical edit into per-package writer subagents, costing O(shards) not O(matches). Use for a rote change across many files, such as renaming an import or swapping an API call.
argument-hint: <the mechanical change to make across the repo>
allowed-tools: Bash, Grep, Glob, Read, Agent
---

Apply a mechanical, repo-wide change **off-context**: **$ARGUMENTS**

The whole point is cost. A naive sweep reads every match and every diff into this context, which is
O(matches). Instead: locate once, shard by package, and fan out one **cheap writer per shard**. The
orchestrator sees only a one-line count per package, which is O(shards). You never load the match set.

## 0. Is this actually a sweep?

Use this only for a **rote, rule-based** edit with a crisp definition of done, such as a find/replace,
an import rename, or a codemod-shaped change. If each site needs real judgment, it's not a sweep. Do
it inline or plan it. If it touches a handful of files in one package, just do it, because the fan-out
overhead isn't worth it.

## 1. Locate once (count, don't read)

Find the scope with a single counting pass. **Do not** read the matches into context.

```
grep -rlZ '<pattern>' -- <paths> | xargs -0 -n1 dirname | sort | uniq -c
```

You want the **set of files and packages** that match and _how many_, not their contents. If the
pattern needs refining, refine it here, cheaply, before fanning out.

## 2. Shard by package

Group the matching files by package, using `.claude/houserules.config.json` `targets[].pathPrefix` or the
top-level dir. Each package is one shard. Sharding by package rather than by file keeps writers from
colliding and makes verification package-scoped.

## 3. Fan out one writer per shard — in ONE message

Dispatch all shards in a single message as parallel `Agent` calls. Each writer is **cheap and
pinned**: request `model: haiku` (or `effort: low`). A mechanical edit doesn't need a strong model,
and a fleet of strong ones is the cost trap this skill exists to avoid.

Give each writer:

- the **exact transformation rule**, unambiguous and the same for every shard, and
- its shard only, meaning the file list or the package path, and
- this instruction: **report only a one-line result**, `<package>: edited N file(s)`, or `0, no
matches`, or `blocked: <reason>`. It must **not** paste diffs, file contents, or per-file logs.

> **Writer brief (per shard):** In `<package>`, apply exactly this change: `<rule>`. Only touch files
> matching `<pattern>`. Do not reformat, do not fix unrelated issues, do not explain. Reply with one
> line: `<package>: edited N file(s)`.

## 4. Collect counts + verify

Tally the one-liners into a single table of package → count. Then verify the touched packages. If
`/verify-changed` is installed, run it, because it scopes to exactly what changed plus dependents.
Otherwise run the repo's verify on the affected packages. Report the total as `edited N files across M
packages` along with the verify verdict. If a writer reported `blocked`, surface just that shard for a
closer look.

## Notes

- The orchestrator transcript should contain **M count-lines and a verdict**, never the match set or a
  single diff. If you find yourself reading matches here, stop and push it into a writer.
- Same rule for every shard. If shards need _different_ rules, they're different sweeps. Run them
  separately.
