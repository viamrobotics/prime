import { applyPlan } from "../core/apply.js";
import { SHARED_HOST_FILES, WORKFLOWS_REF } from "../core/constants.js";
import { buildLockfile, readLockfile } from "../core/lockfile.js";
import { packageVersion } from "../core/pkg.js";
import { TargetRepo } from "../core/fs-target.js";
import type { CommandContext } from "./context.js";
import * as log from "./log.js";
import { renderPlan } from "./render-plan.js";

export function update({ cwd, dryRun }: CommandContext): number {
  const render = renderPlan(cwd);
  if (!render.success) return 2;

  const { plan } = render;
  const version = packageVersion();
  const previous = readLockfile(cwd);
  const nextFiles = buildLockfile(plan, version).files;
  const previousFiles = previous?.files ?? {};

  const added = Object.keys(nextFiles).filter(
    (path) => !(path in previousFiles),
  );
  const changed = Object.keys(nextFiles).filter(
    (path) => path in previousFiles && previousFiles[path] !== nextFiles[path],
  );
  const removed = Object.keys(previousFiles).filter(
    (path) => !(path in nextFiles) && !SHARED_HOST_FILES.includes(path),
  );

  const repo = new TargetRepo(cwd, dryRun);
  applyPlan(repo, plan, version);

  log.message(
    previous
      ? `template ${previous.templateVersion} -> ${version}`
      : `template -> ${version} (no prior lockfile)`,
  );
  if (previous && previous.workflowsRef !== WORKFLOWS_REF) {
    log.message(`workflows pin ${previous.workflowsRef} -> ${WORKFLOWS_REF}`);
  }

  for (const path of added) log.indent(2, `+ ${path}`);
  for (const path of changed) log.indent(2, `~ ${path}`);
  for (const path of removed) {
    log.indent(2, `- ${path} (orphaned; delete or "doctor --prune")`);
  }

  if (added.length + changed.length + removed.length === 0) {
    log.indent(2, "(no file changes)");
  }

  return 0;
}
