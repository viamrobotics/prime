/**
 * The commit of viamrobotics/claude-ci-workflows that every generated Claude
 * workflow stub pins. This is the ONLY place the pin lives; bump it here + publish
 * and every repo picks it up on `claude-config update`.
 */
export const WORKFLOWS_REF = "97b61edeb3aebf3b9bfc93129ac9beae053e5aab";

export const MANIFEST_FILENAME = "claude-config.json";
/** Must match the `./schema` export in package.json. */
export const SCHEMA_FILENAME = "manifest.schema.json";
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

/** Both ignore files take the same comment-delimited block. */
const IGNORE_BLOCK = {
  start: "# >>> claude-config (managed) >>>",
  end: "# <<< claude-config (managed) <<<",
} as const;

export const MARKERS = {
  gitignore: IGNORE_BLOCK,
  prettierignore: IGNORE_BLOCK,
  claudeMdRulesTable: {
    start: "<!-- claude-config:rules-table start -->",
    end: "<!-- claude-config:rules-table end -->",
  },
} as const;
