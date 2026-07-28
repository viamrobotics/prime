#!/usr/bin/env node
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { doctor } from "./commands/doctor.js";
import { init } from "./commands/init.js";
import { install } from "./commands/install.js";
import { update } from "./commands/update.js";
import { packageVersion } from "./core/pkg.js";

const HELP = `claude-config: install, update, and doctor Viam's shared Claude tooling

Usage:
  claude-config <command> [options]

Commands:
  init      Sniff the repo and scaffold claude-config.json. Exits 3 if one exists
    --force        Overwrite an existing manifest

  install   Render the manifest and write every managed file

  update    Re-render after a version bump and report the delta

  doctor    Check for drift. Exits 0 clean, 1 on drift
    --fix          Reconcile drift to canonical
    --prune        Also delete orphaned managed files (needs --fix)
    --json         Machine-readable report

Options:
  --cwd <dir>      Target repo root (default: current directory)
  --dry-run        Show what would change without writing

  -h, --help       Show this help
  -v, --version    Show the version

Every command exits 2 on an invalid or missing claude-config.json, 1 on error.`;

function main(): number {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      cwd: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      json: { type: "boolean", default: false },
      fix: { type: "boolean", default: false },
      prune: { type: "boolean", default: false },
      force: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
      version: { type: "boolean", short: "v", default: false },
    },
  });

  if (values.version) {
    console.log(packageVersion());
    return 0;
  }

  const command = positionals[0];
  if (values.help) {
    console.log(HELP);
    return 0;
  }
  // Usage errors belong on stderr so CI logs and pipelines do not mix help text
  // into real output. Only an explicit --help goes to stdout.
  if (command === undefined) {
    console.error(HELP);
    return 1;
  }

  const base = {
    cwd: resolve(values.cwd ?? process.cwd()),
    dryRun: values["dry-run"] ?? false,
    json: values.json ?? false,
  };

  switch (command) {
    case "init":
      return init({ ...base, force: values.force ?? false });
    case "install":
      return install(base);
    case "update":
      return update(base);
    case "doctor":
      return doctor({
        ...base,
        fix: values.fix ?? false,
        prune: values.prune ?? false,
      });
    default:
      console.error(`Unknown command: ${command}\n\n${HELP}`);
      return 1;
  }
}

try {
  process.exit(main());
} catch (error) {
  console.error(`claude-config: ${(error as Error).message}`);
  process.exit(1);
}
