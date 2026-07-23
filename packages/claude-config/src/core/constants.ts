/**
 * The commit of viamrobotics/claude-ci-workflows that every generated Claude
 * workflow stub pins. This is the ONLY place the pin lives; bump it here + publish
 * and every repo picks it up on `claude-config update`.
 */
export const WORKFLOWS_REF = "97b61edeb3aebf3b9bfc93129ac9beae053e5aab";
export const WORKFLOWS_VERSION = "v2.1.0";

export const MANIFEST_FILENAME = "claude-config.json";
export const LOCKFILE_PATH = ".claude/.claude-config.lock";

export const SETTINGS_PATH = ".claude/settings.json";

export const MARKERS = {
  gitignore: {
    start: "# >>> claude-config (managed) >>>",
    end: "# <<< claude-config (managed) <<<",
  },
  claudeMdRulesTable: {
    start: "<!-- claude-config:rules-table start -->",
    end: "<!-- claude-config:rules-table end -->",
  },
} as const;
