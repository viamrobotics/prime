import { applyPlan } from "../core/apply.js";
import { computeDrift, isClean } from "../core/drift.js";
import { packageVersion } from "../core/pkg.js";
import { TargetRepo } from "../core/fs-target.js";
import type { FileStatus } from "../types.js";
import type { DoctorContext } from "./context.js";
import * as log from "./log.js";
import { renderPlan } from "./render-plan.js";

const FIXABLE: FileStatus[] = ["modified", "missing", "no-marker"];

export function doctor({
  cwd,
  dryRun,
  json,
  fix,
  prune,
}: DoctorContext): number {
  const render = renderPlan(cwd);
  if (!render.success) return 2;

  const { plan } = render;
  const repo = new TargetRepo(cwd, dryRun);
  let report = computeDrift(repo, plan);

  if (fix) {
    const paths = new Set(
      report.files
        .filter((file) => FIXABLE.includes(file.status))
        .map((file) => file.path),
    );

    if (paths.size > 0) applyPlan(repo, plan, packageVersion(), { paths });
    if (prune) {
      for (const file of report.files) {
        if (file.status === "orphaned") repo.remove(file.path);
      }
    }

    report = computeDrift(repo, plan);
  }

  if (json) {
    log.json(report);
    return isClean(report) ? 0 : 1;
  }

  const problems = report.files.filter((file) => file.status !== "ok");
  const okCount = report.files.length - problems.length;
  log.message(`claude-config doctor — ${cwd}\n`);
  for (const file of problems) {
    log.indent(2, `${file.status.padEnd(9)} ${file.path}`);
    if (file.diff) log.indent(4, `${file.diff}\n`);
  }

  const clean = isClean(report);
  const summary =
    problems.length > 0
      ? `${okCount} ok, ${problems.length} to reconcile`
      : `${okCount} ok — clean`;

  log.message(summary);
  if (!clean && !fix) {
    log.line(`Run "claude-config doctor --fix" to reconcile.`);
  }

  return clean ? 0 : 1;
}
