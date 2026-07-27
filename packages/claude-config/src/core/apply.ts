import { buildLockfile, writeLockfile } from "./lockfile.js";
import { deepMerge, deepRemove, parseJsonObject } from "./json-merge.js";
import { upsertRegion } from "./regions.js";
import { TargetRepo } from "./fs-target.js";
import type { PlanItem, RenderPlan } from "../types.js";

/** Deep-merges or deep-removes a JSON fragment (creating the file only when merging
 * non-empty content). Compares semantically, so a repo's own formatting is left alone
 * when nothing actually changes. Returns false when nothing changed. */
function applyJson(
  repo: TargetRepo,
  { content, jsonMode, path }: PlanItem,
): boolean {
  const patch = parseJsonObject(content);
  const mode = jsonMode ?? "merge";
  const existing = repo.read(path);
  if (
    existing === null &&
    (mode === "remove" || Object.keys(patch).length === 0)
  ) {
    return false;
  }

  const base = existing ? parseJsonObject(existing) : {};
  const before = JSON.stringify(base);
  const next =
    mode === "merge" ? deepMerge(base, patch) : deepRemove(base, patch);
  if (existing !== null && JSON.stringify(next) === before) return false;

  repo.write(path, `${JSON.stringify(next, null, 2)}\n`);
  return true;
}

export interface ApplyOptions {
  /** Restrict writes to these paths (used by `doctor --fix`); omit to write all. */
  paths?: Set<string>;
}

export interface ApplyResult {
  written: string[];
}

export function applyPlan(
  repo: TargetRepo,
  plan: RenderPlan,
  templateVersion: string,
  { paths }: ApplyOptions = {},
): ApplyResult {
  const written: string[] = [];
  for (const item of plan.items) {
    if (paths && !paths.has(item.path)) continue;

    let wrote: boolean;
    if (item.kind === "full") {
      wrote = repo.write(item.path, item.content);
    } else if (item.kind === "json") {
      wrote = applyJson(repo, item);
    } else {
      const existing = repo.read(item.path);
      const { content } = upsertRegion(existing, item.content, item.region!);
      wrote = repo.write(item.path, content);
    }

    if (wrote) written.push(item.path);
  }

  if (!repo.dryRun) {
    writeLockfile(repo.cwd, buildLockfile(plan, templateVersion));
  }

  return { written: [...new Set(written)] };
}
