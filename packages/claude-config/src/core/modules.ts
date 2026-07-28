import type { RuleModuleName } from "../types.js";

export interface RuleModuleDef {
  name: RuleModuleName;
  file: string;
  /** "Loads when" cell for the generated CLAUDE.md rules table. */
  loadsWhen: string;
}

/** Rules installed in every repo regardless of the manifest. */
export const BASE_RULES: readonly { file: string; loadsWhen: string }[] = [
  { file: "code-comments.md", loadsWhen: "editing any code file" },
  {
    file: "editing-discipline.md",
    loadsWhen: "every session (edit from current state, in scope)",
  },
  {
    file: "verification.md",
    loadsWhen: "every session (verify before reporting done)",
  },
];

/** Toggleable rule modules, in the order they appear in the rules table. */
export const RULE_MODULES: readonly RuleModuleDef[] = [
  {
    name: "svelte",
    file: "svelte.md",
    loadsWhen: "editing `.svelte`, `.svelte.ts`, `.svelte.js`",
  },
  {
    name: "frontendAesthetics",
    file: "frontend-aesthetics.md",
    loadsWhen: "editing `.svelte` or `.css`",
  },
  {
    name: "three",
    file: "three.md",
    loadsWhen: "editing Three.js code (`**/three/**`, `**/*.three.ts`)",
  },
  { name: "typescript", file: "typescript.md", loadsWhen: "editing `.ts`" },
  {
    name: "testingFrontend",
    file: "testing-frontend.md",
    loadsWhen: "editing test files (`**/*.spec.ts`)",
  },
  {
    name: "prDescription",
    file: "pr-description.md",
    loadsWhen: "editing files under `.changeset/`",
  },
  {
    name: "changesets",
    file: "changesets.md",
    loadsWhen: "editing files under `.changeset/` or `CHANGELOG.md`",
  },
  { name: "go", file: "go.md", loadsWhen: "editing `.go`" },
  {
    name: "testingGo",
    file: "testing-go.md",
    loadsWhen: "editing Go tests (`**/*_test.go`)",
  },
  {
    name: "viamContext",
    file: "viam-context.md",
    loadsWhen: "every session (Viam API and SDK sources)",
  },
  {
    name: "designSystem",
    file: "design-system.md",
    loadsWhen: "every session (design system context)",
  },
];

export const RULE_MODULE_NAMES: readonly RuleModuleName[] = RULE_MODULES.map(
  (r) => r.name,
);
