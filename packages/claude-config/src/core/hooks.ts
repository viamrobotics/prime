import type { HookId } from "../types.js";

export interface HookDef {
  /** File under `templates/hooks/` and `.claude/hooks/`. */
  file: string;
  /** Claude Code hook event this registers under in settings.json. */
  event: string;
  /** Command settings.json runs for the hook. */
  command: string;
}

export const HOOKS: Record<HookId, HookDef> = {
  sessionStart: {
    file: "session-start.mjs",
    event: "SessionStart",
    command: 'node "$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.mjs"',
  },
};

export const HOOK_IDS = Object.keys(HOOKS) as HookId[];

/** The settings.json fragment that registers a hook (deep-merged in, so other hooks survive). */
export function hookSettingsPatch({
  event,
  command,
}: HookDef): Record<string, unknown> {
  return {
    hooks: {
      [event]: [{ hooks: [{ type: "command", command }] }],
    },
  };
}
