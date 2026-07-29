import { applyPlan } from "../core/apply.js";
import { packageVersion } from "../core/pkg.js";
import { TargetRepo } from "../core/fs-target.js";
import type { CommandContext } from "./context.js";
import * as log from "./log.js";
import { renderPlan } from "./render-plan.js";

export function install({ cwd, dryRun }: CommandContext): number {
  const render = renderPlan(cwd);
  if (!render.success) return 2;

  const { plan } = render;
  const repo = new TargetRepo(cwd, dryRun);
  const { written } = applyPlan(repo, plan, packageVersion());
  const verb = dryRun ? "would write" : "wrote";
  for (const path of written) log.indent(2, `${verb}  ${path}`);
  log.line(`${written.length} file(s) ${dryRun ? "planned" : "written"}.`);
  return 0;
}
