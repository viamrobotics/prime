#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const docsRoot = resolve(here, "..");
const repoRoot = resolve(docsRoot, "..", "..");

// Each library package builds a static SvelteKit playground to <pkgDir>/build/ via
// its own `vite-build`/`build` wireit script, which reads DOCS_BASE to compute the
// right base path. Those scripts are declared as dependencies of the docs
// `build:playgrounds` script, so wireit builds them (with the correct DOCS_BASE)
// before this runs. This script only copies the finished output into place.
// To embed a new package: add it here and to the `build:playgrounds` wireit
// dependencies in apps/docs/package.json, then add a sidebar entry.
const playgrounds = [
  { name: "prime-ui", pkgDir: "packages/prime-ui" },
  { name: "tailwind-config", pkgDir: "packages/tailwind-config" },
  { name: "tweakpane-config", pkgDir: "packages/tweakpane-config" },
];

for (const { name, pkgDir } of playgrounds) {
  const src = resolve(repoRoot, pkgDir, "build");
  const dest = resolve(docsRoot, "public", "playground", name);
  if (!existsSync(src)) {
    throw new Error(
      `[playgrounds] ${pkgDir}/build/ not found — the ${name} playground build must run first`,
    );
  }
  if (existsSync(dest)) rmSync(dest, { recursive: true });
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log(
    `[playgrounds] copied ${pkgDir}/build/ -> apps/docs/public/playground/${name}/`,
  );
}
