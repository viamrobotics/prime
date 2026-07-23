import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { LOCKFILE_PATH, WORKFLOWS_REF } from "./constants.js";
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
  for (const item of items) files[item.path] = sha256(item.content);
  const modules = [...new Set(items.map((item) => item.module))].sort();
  return { templateVersion, workflowsRef: WORKFLOWS_REF, modules, files };
}

export function writeLockfile(cwd: string, lock: Lockfile): void {
  const absolute = lockfilePath(cwd);
  mkdirSync(dirname(absolute), { recursive: true });
  writeFileSync(absolute, `${JSON.stringify(lock, null, 2)}\n`);
}
