#!/usr/bin/env node
import { resolve } from "node:path";
import { Command, CommanderError } from "commander";
import { doctor } from "./commands/doctor.js";
import { init } from "./commands/init.js";
import { install } from "./commands/install.js";
import { update } from "./commands/update.js";
import { packageVersion } from "./core/pkg.js";

interface GlobalOptions {
  cwd?: string;
  dryRun?: boolean;
}

/** Null until a subcommand runs, which tells "no command given" apart from "exited 0". */
let exitCode: number | null = null;

function context(command: Command) {
  const options = command.optsWithGlobals<GlobalOptions>();
  return {
    cwd: resolve(options.cwd ?? process.cwd()),
    dryRun: options.dryRun ?? false,
  };
}

const program = new Command()
  .name("claude-config")
  .description("install, update, and doctor Viam's shared Claude tooling")
  .version(packageVersion(), "-v, --version")
  .option("--cwd <dir>", "target repo root (default: current directory)")
  .option("--dry-run", "show what would change without writing")
  .showHelpAfterError()
  .exitOverride();

program
  .command("init")
  .description("sniff the repo and scaffold claude-config.json")
  .option("--force", "overwrite an existing manifest")
  .action((options: { force?: boolean }, command: Command) => {
    exitCode = init({ ...context(command), force: options.force ?? false });
  });

program
  .command("install")
  .description("render the manifest and write every managed file")
  .action((_options: unknown, command: Command) => {
    exitCode = install(context(command));
  });

program
  .command("update")
  .description("re-render after a version bump and report the delta")
  .action((_options: unknown, command: Command) => {
    exitCode = update(context(command));
  });

program
  .command("doctor")
  .description("check for drift; exits 0 clean, 1 on drift")
  .option("--fix", "reconcile drift to canonical")
  .option("--prune", "also delete orphaned managed files (requires --fix)")
  .option("--json", "machine-readable report")
  .action(
    (
      options: { fix?: boolean; prune?: boolean; json?: boolean },
      command: Command,
    ) => {
      if (options.prune && !options.fix) {
        command.error("error: --prune requires --fix");
      }
      exitCode = doctor({
        ...context(command),
        fix: options.fix ?? false,
        prune: options.prune ?? false,
        json: options.json ?? false,
      });
    },
  );

program.addHelpText(
  "after",
  "\nEvery command exits 2 on an invalid or missing claude-config.json, 1 on error.",
);

try {
  program.parse();
  if (exitCode === null) {
    // Usage output belongs on stderr so CI logs do not mix help text into real
    // output. Only an explicit --help goes to stdout, which commander handles.
    program.outputHelp({ error: true });
    process.exit(1);
  }
  process.exit(exitCode);
} catch (error) {
  if (error instanceof CommanderError) {
    // --help and --version report success; parse failures already wrote to stderr.
    process.exit(error.exitCode === 0 ? 0 : 1);
  }
  console.error(`claude-config: ${(error as Error).message}`);
  process.exit(1);
}
