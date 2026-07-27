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

/**
 * Files a repo owns that we only manage a region or a few keys of. They must never be
 * orphan-pruned: a stale lockfile entry would otherwise delete the repo's own content.
 */
export const SHARED_HOST_FILES: readonly string[] = [
  SETTINGS_PATH,
  ".gitignore",
  ".prettierignore",
  "CLAUDE.md",
];

export const MARKERS = {
  gitignore: {
    start: "# >>> claude-config (managed) >>>",
    end: "# <<< claude-config (managed) <<<",
  },
  prettierignore: {
    start: "# >>> claude-config (managed) >>>",
    end: "# <<< claude-config (managed) <<<",
  },
  claudeMdRulesTable: {
    start: "<!-- claude-config:rules-table start -->",
    end: "<!-- claude-config:rules-table end -->",
  },
} as const;
