import { unifiedDiff } from "./diff.js";
import { TargetRepo } from "./fs-target.js";
import { deepMerge, deepRemove, parseJsonObject } from "./json-merge.js";
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
  if (body.trim() === item.content.trim()) return drift(item, "ok");
  return drift(item, "modified", unifiedDiff(body, item.content));
}

function jsonDrift(repo: TargetRepo, item: PlanItem): FileDrift {
  const patch = parseJsonObject(item.content);
  const mode = item.jsonMode ?? "merge";
  const onDisk = repo.read(item.path);
  if (onDisk === null) {
    const needsFile = mode === "merge" && Object.keys(patch).length > 0;
    return drift(item, needsFile ? "missing" : "ok");
  }

  let current: Record<string, unknown>;
  try {
    current = parseJsonObject(onDisk);
  } catch {
    return drift(item, "modified", "  (invalid JSON)");
  }

  const before = JSON.stringify(current);
  const next =
    mode === "merge"
      ? deepMerge(structuredClone(current), patch)
      : deepRemove(structuredClone(current), patch);
  if (JSON.stringify(next) === before) return drift(item, "ok");
  return drift(
    item,
    "modified",
    unifiedDiff(onDisk, `${JSON.stringify(next, null, 2)}\n`),
  );
}

export function computeDrift(
  repo: TargetRepo,
  { items }: RenderPlan,
): DriftReport {
  const managed = new Set<string>();
  const files: FileDrift[] = items.map((item) => {
    managed.add(item.path);
    if (item.kind === "full") return fullFileDrift(repo, item);
    if (item.kind === "json") return jsonDrift(repo, item);
    return regionDrift(repo, item);
  });

  const lock = readLockfile(repo.cwd);
  if (lock) {
    for (const path of Object.keys(lock.files)) {
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
