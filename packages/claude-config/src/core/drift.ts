import { SHARED_HOST_FILES } from "./constants.js";
import { unifiedDiff } from "./diff.js";
import { TargetRepo } from "./fs-target.js";
import {
  deepMerge,
  deepRemove,
  parseHostJson,
  parseJsonObject,
} from "./json-merge.js";
import { readLockfile } from "./lockfile.js";
import { extractBody } from "./regions.js";
import type {
  DriftReport,
  FileDrift,
  FileStatus,
  PlanItem,
  RenderPlan,
} from "../types.js";

function drift(item: PlanItem, status: FileStatus, diff?: string): FileDrift {
  return { path: item.path, module: item.module, status, diff };
}

function fullFileDrift(repo: TargetRepo, item: PlanItem): FileDrift {
  const onDisk = repo.read(item.path);
  if (onDisk === null) return drift(item, "missing");
  if (onDisk === item.content) return drift(item, "ok");
  return drift(item, "modified", unifiedDiff(onDisk, item.content));
}

function regionDrift(repo: TargetRepo, item: PlanItem): FileDrift {
  const onDisk = repo.read(item.path);
  if (onDisk === null) return drift(item, "missing");

  const body = extractBody(onDisk, item.region!);
  if (body === null) return drift(item, "no-marker");
  // Trimmed, not byte-exact: a padded region keeps blank lines inside its markers.
  if (body.trim() === item.content.trim()) return drift(item, "ok");
  return drift(item, "modified", unifiedDiff(body, item.content));
}

function isMerge(item: PlanItem): boolean {
  return (item.jsonMode ?? "merge") === "merge";
}

/**
 * One verdict for every patch aimed at the same host file, folded in plan order.
 * Judging each patch alone would report the path once per patch and diff each one
 * against a document that ignores the others.
 */
function jsonDrift(repo: TargetRepo, items: PlanItem[]): FileDrift {
  const head: PlanItem = {
    ...items[0],
    module: [...new Set(items.map((item) => item.module))].join(", "),
  };
  const onDisk = repo.read(head.path);
  if (onDisk === null) {
    const needsFile = items.some(
      (item) =>
        isMerge(item) && Object.keys(parseJsonObject(item.content)).length > 0,
    );
    return drift(head, needsFile ? "missing" : "ok");
  }

  let next: Record<string, unknown>;
  try {
    next = parseHostJson(onDisk);
  } catch {
    return drift(head, "modified", "  (invalid JSON)");
  }

  const before = JSON.stringify(next);
  for (const item of items) {
    const patch = parseJsonObject(item.content);
    next = isMerge(item) ? deepMerge(next, patch) : deepRemove(next, patch);
  }
  if (JSON.stringify(next) === before) return drift(head, "ok");
  return drift(
    head,
    "modified",
    unifiedDiff(onDisk, `${JSON.stringify(next, null, 2)}\n`),
  );
}

export function computeDrift(
  repo: TargetRepo,
  { items }: RenderPlan,
): DriftReport {
  const managed = new Set<string>();
  const jsonGroups = new Map<string, PlanItem[]>();
  for (const item of items) {
    if (item.kind !== "json") continue;
    const group = jsonGroups.get(item.path);
    if (group) group.push(item);
    else jsonGroups.set(item.path, [item]);
  }

  const files: FileDrift[] = [];
  for (const item of items) {
    managed.add(item.path);
    if (item.kind === "full") {
      files.push(fullFileDrift(repo, item));
    } else if (item.kind === "region") {
      files.push(regionDrift(repo, item));
    } else {
      const group = jsonGroups.get(item.path);
      // Report the whole group once, at its first item's position.
      if (group && group[0] === item) files.push(jsonDrift(repo, group));
    }
  }

  const lock = readLockfile(repo.cwd);
  if (lock) {
    for (const path of Object.keys(lock.files)) {
      if (SHARED_HOST_FILES.includes(path)) continue;
      if (!managed.has(path) && repo.exists(path)) {
        files.push({ path, status: "orphaned" });
      }
    }
  }

  return { files };
}

export function isClean(report: DriftReport): boolean {
  return report.files.every((file) => file.status === "ok");
}
