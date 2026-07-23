import type { RuleModuleName } from "../types.js";

export interface RuleModuleDef {
  name: RuleModuleName;
  file: string;
  /** "Loads when" cell for the generated CLAUDE.md rules table. */
  loadsWhen: string;
}

/** Rules installed in every repo regardless of the manifest; design-system stays last. */
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
  {
    file: "design-system.md",
    loadsWhen: "every session (design system context)",
  },
];

/** Toggleable rule modules, in the order they appear in the rules table. */
export const RULE_MODULES: readonly RuleModuleDef[] = [
  {
    name: "svelte",
    file: "svelte.md",
    loadsWhen: "editing `.svelte`, `.svelte.ts`, `.svelte.js`",
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
];

export const RULE_MODULE_NAMES: readonly RuleModuleName[] = RULE_MODULES.map(
  (r) => r.name,
);
