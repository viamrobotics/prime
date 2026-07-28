import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LOCKFILE_PATH, WORKFLOWS_REF } from "./constants.js";
import { TargetRepo } from "./fs-target.js";
import { isPlainObject } from "./json-merge.js";
import type { Lockfile, RenderPlan } from "../types.js";

export function sha256(content: string): string {
  return `sha256-${createHash("sha256").update(content, "utf8").digest("hex")}`;
}

export function lockfilePath(cwd: string): string {
  return join(cwd, LOCKFILE_PATH);
}

function isLockfile(value: unknown): value is Lockfile {
  return (
    isPlainObject(value) &&
    typeof value.templateVersion === "string" &&
    typeof value.workflowsRef === "string" &&
    Array.isArray(value.modules) &&
    isPlainObject(value.files)
  );
}

export function readLockfile(cwd: string): Lockfile | null {
  try {
    const value: unknown = JSON.parse(readFileSync(lockfilePath(cwd), "utf8"));
    return isLockfile(value) ? value : null;
  } catch {
    return null;
  }
}

export function buildLockfile(
  { items }: RenderPlan,
  templateVersion: string,
): Lockfile {
  const files: Record<string, string> = {};
  // One path can have several plan items: settings.json takes a patch per output
  // style and per hook. Chain their hashes so a change in any contributor shows up,
  // rather than letting the last item overwrite the entry and hide the rest.
  for (const item of items) {
    const previous = files[item.path];
    files[item.path] = sha256(
      previous === undefined ? item.content : previous + item.content,
    );
  }
  const modules = [...new Set(items.map((item) => item.module))].sort();
  return { templateVersion, workflowsRef: WORKFLOWS_REF, modules, files };
}

export function writeLockfile(repo: TargetRepo, lock: Lockfile): void {
  repo.write(LOCKFILE_PATH, `${JSON.stringify(lock, null, 2)}\n`);
}
