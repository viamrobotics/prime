import { readFileSync } from "node:fs";

// Resolved from this module's own location (dist/core/ or src/core/, both two
// levels under the package root) so the CLI finds its templates no matter which
// repo's directory it is invoked from.
const TEMPLATE_ROOT = new URL("../../templates/", import.meta.url);

export function readTemplate(relativePath: string): string {
  return readFileSync(new URL(relativePath, TEMPLATE_ROOT), "utf8");
}
