import type { OutputStyleId, OutputStyleState } from "../types.js";

export interface OutputStyleDef {
  /** Value written to `.claude/settings.json`; matches the style file's frontmatter `name`. */
  name: string;
  /** File under `templates/output-styles/` and `.claude/output-styles/`. */
  file: string;
  /** State applied when the manifest doesn't mention this style. */
  defaultState: OutputStyleState;
}

export const OUTPUT_STYLES: Record<OutputStyleId, OutputStyleDef> = {
  terse: { name: "Terse", file: "Terse.md", defaultState: "default" },
};

export const OUTPUT_STYLE_IDS = Object.keys(OUTPUT_STYLES) as OutputStyleId[];
