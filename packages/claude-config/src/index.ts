export { buildPlan } from "./core/plan.js";
export {
  loadManifest,
  parseManifest,
  manifestPath,
  ManifestError,
} from "./core/manifest.js";
export { computeDrift, isClean } from "./core/drift.js";
export { applyPlan } from "./core/apply.js";
export { render } from "./core/render.js";
export { TargetRepo } from "./core/fs-target.js";
export { buildLockfile, readLockfile, sha256 } from "./core/lockfile.js";
export { RULE_MODULES, BASE_RULES, RULE_MODULE_NAMES } from "./core/modules.js";
export {
  WORKFLOWS_REF,
  WORKFLOWS_VERSION,
  MARKERS,
  MANIFEST_FILENAME,
  LOCKFILE_PATH,
} from "./core/constants.js";
export { packageVersion } from "./core/pkg.js";
export type * from "./types.js";
