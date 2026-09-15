---
name: changeset
description: Record a pending release note (changeset) for the packages a change touched. Use after completing a user-visible change, before the user commits.
argument-hint: [pkg[:level] ...] ["summary"]
allowed-tools: Bash(node .claude/scripts/changeset-write.mjs:*), Bash(node .claude/scripts/changeset-gate.mjs:*), Bash(git status:*), Bash(git diff:*), Read, Glob, Grep
---

Record what this change means for the next release. Arguments (optional overrides): $ARGUMENTS

**If you dispatched the `changeset-writer` subagent, its report is a recommendation, not a
completed write.** `changeset-write.mjs` is refused for any subagent by the repo's ledger write
gate, so the agent stops at package set, bump levels, summary, and the literal command. Run that
command yourself at step 5 below. Read its recommendation, sanity-check it against the diff, and
proceed from wherever the numbered steps below still apply, usually straight to step 5.

**One changeset per feature, not one per change.** A feature is usually built over several
turns, and each turn is not its own release note. Read the release notes a user will see: one
feature is one bullet there, however many commits it took.

1. **Survey what is already pending.** Glob `.changeset/*.md` and read them. For each, ask
   whether this change is part of the feature that changeset already describes.
   - **Already covered, and its summary still describes the feature.** Record nothing. Report
     which file covers it and stop. This is the common case on a feature's second turn.
   - **Covered, but the summary is now wrong or the package set grew.** Amend it in place with
     step 5's `--amend`. Do not add a second file.
   - **A genuinely separate feature.** Write a new changeset.

   The test is whether a reader needs both bullets. If the second one only extends, refines, or
   fixes the first, it is the same feature. Two features shipped in the same session are two
   changesets, and that is what `--amend` is not for. When several pending changesets already
   describe one tangled feature, run `/changeset-condense` instead of amending them one at a
   time.

2. **Identify touched packages.** `git status --porcelain` and `git diff --name-only`, mapped
   through the targets in `.claude/houserules.config.json`.
3. **Pick the bump level per package** (semver):
   - `patch`: fixes, internal refactors with no API change. The default.
   - `minor`: new user-facing capability, backward-compatible.
   - `major`: breaking change. **Confirm with the user before recording a major.**
4. **Write the summary.** This is the canonical spec, and the `changeset-writer` agent follows it
   too.
   - **One short sentence**, 15 words or fewer, in changelog voice, naming what changed as the
     package's users read it.
   - Describe the change, not its mechanism, its rationale, or what stayed the same.
   - When amending, write the sentence for the whole feature as it now stands, not for the part
     you just added. The old summary is replaced, so it has to cover everything.
   - No semicolons and no second clause. "So that…", "whenever…", "because…", and ", and also…"
     all mean you are packing in too much. A run-on is still too much even when it's one sentence.
   - Use exact names and numbers from the diff, not from memory.
   - Never put a ledger id in the summary. The summary ships in the public CHANGELOG, and a
     backlog or decision id resolves only against the local ledger. Name what was fixed in
     plain words instead.

   Good: `Fix compact tool output hook to reduce noise.`

   Too much: `changeset-write.mjs now authors with @changesets/write whenever changesets is
installed, so files match the version; the zero-dep writer remains as fallback.`
   → `Changeset authoring uses the repo's installed changesets writer when available.`

5. **Record it.** The script validates package names against the real workspace.

   ```
   node .claude/scripts/changeset-write.mjs --pkg <name>:<level> [--pkg <name>:<level> ...] --summary "<summary>" --chat <session-id>
   ```

   Pass the current session's id as `--chat` when you know it. It stamps the outcome
   record that links the changeset to its session, and it is safe to omit.

   To fold this change into a pending changeset instead, name it with `--amend`:

   ```
   node .claude/scripts/changeset-write.mjs --amend <id> --summary "<rewritten summary>" [--pkg <name>:<level> ...]
   ```

   `--amend` rewrites that one file in place. The bumps it already declares are kept, and a
   `--pkg` for a package it already names raises the level but never lowers it, so pass only what
   the pending file is missing.

   Nothing release-worthy (tests, tooling, docs)? Record that decision instead:

   ```
   node .claude/scripts/changeset-write.mjs --empty --summary "<why no release is needed>"
   ```

6. **Check for package-set drift.** `node .claude/scripts/changeset-gate.mjs` flags a
   just-written changeset whose declared packages are missing one the current diff also
   touches. It also runs on its own as a Stop hook at the end of the turn, so this step just
   surfaces the same finding immediately instead of waiting for it. If it reports drift, add
   the missing package with `--amend` and re-run it.
7. **Report** the `.changeset/*.md` path and what it declares, and say whether you created it or
   amended it.

Never hand-edit `CHANGELOG.md`, which `changeset version` generates at release time, and never
hand-write or hand-edit `.changeset/*.md`. Always go through the script.
