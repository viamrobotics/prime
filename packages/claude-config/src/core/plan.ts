import { MARKERS, SETTINGS_PATH } from "./constants.js";
import { BASE_RULES, RULE_MODULES } from "./modules.js";
import { OUTPUT_STYLES, OUTPUT_STYLE_IDS } from "./output-styles.js";
import { HOOKS, HOOK_IDS, hookSettingsPatch } from "./hooks.js";
import { readTemplate } from "./templates.js";
import type { PlanItem, RenderPlan, ResolvedManifest } from "../types.js";

const RULES_DIR = ".claude/rules";

interface RuleEntry {
  file: string;
  loadsWhen: string;
}

/** Enabled toggle rules (in declared order) followed by the always-on base rules. */
function enabledRules({ rules }: ResolvedManifest): RuleEntry[] {
  const toggled = RULE_MODULES.filter((rule) => rules[rule.name]).map(
    (rule) => ({
      file: rule.file,
      loadsWhen: rule.loadsWhen,
    }),
  );
  return [...toggled, ...BASE_RULES];
}

function rulesTable(rules: RuleEntry[]): string {
  const names = rules.map((rule) => `\`${rule.file}\``);
  const col1 = Math.max("Rule".length, ...names.map((name) => name.length));
  const col2 = Math.max(
    "Loads when".length,
    ...rules.map((rule) => rule.loadsWhen.length),
  );
  const pad = (text: string, width: number): string =>
    text + " ".repeat(width - text.length);
  return [
    `| ${pad("Rule", col1)} | ${pad("Loads when", col2)} |`,
    `| ${"-".repeat(col1)} | ${"-".repeat(col2)} |`,
    ...rules.map(
      (rule, index) =>
        `| ${pad(names[index], col1)} | ${pad(rule.loadsWhen, col2)} |`,
    ),
  ].join("\n");
}

function ruleItem(file: string): PlanItem {
  return {
    path: `${RULES_DIR}/${file}`,
    module: `rule:${file.replace(/\.md$/, "")}`,
    kind: "full",
    content: readTemplate(`rules/${file}`),
  };
}

function mcpItems({ mcp }: ResolvedManifest): PlanItem[] {
  if (mcp.svelteTransport === "none") return [];
  const source =
    mcp.svelteTransport === "http" ? "mcp/mcp.http.json" : "mcp/mcp.stdio.json";
  const items: PlanItem[] = [
    {
      path: ".mcp.json",
      module: "mcp",
      kind: "full",
      content: readTemplate(source),
    },
  ];
  if (mcp.vscode) {
    items.push({
      path: ".vscode/mcp.json",
      module: "mcp",
      kind: "full",
      content: readTemplate("mcp/vscode.mcp.json"),
    });
  }
  return items;
}

/**
 * Install each output style whose state is `true` or `"default"`, and set the
 * `"default"` one (if any) as the repo default in settings.json — merged in
 * without disturbing other keys, and removed when no style is default.
 */
function outputStyleItems({ outputStyle }: ResolvedManifest): PlanItem[] {
  const items: PlanItem[] = [];
  let defaultName: string | null = null;
  for (const id of OUTPUT_STYLE_IDS) {
    const state = outputStyle[id];
    if (state === false) continue;
    const style = OUTPUT_STYLES[id];
    items.push({
      path: `.claude/output-styles/${style.file}`,
      module: "output-style",
      kind: "full",
      content: readTemplate(`output-styles/${style.file}`),
    });
    if (state === "default") defaultName = style.name;
  }
  items.push(
    defaultName === null
      ? {
          path: SETTINGS_PATH,
          module: "output-style",
          kind: "json",
          content: JSON.stringify({ outputStyle: null }),
          jsonMode: "remove",
        }
      : {
          path: SETTINGS_PATH,
          module: "output-style",
          kind: "json",
          content: JSON.stringify({ outputStyle: defaultName }),
        },
  );
  return items;
}

/**
 * Install each enabled hook's script and register it in settings.json (deep-merged,
 * so a repo's own hooks survive); a disabled hook's registration is removed.
 */
function hooksItems({ hooks }: ResolvedManifest): PlanItem[] {
  const items: PlanItem[] = [];
  for (const id of HOOK_IDS) {
    const def = HOOKS[id];
    const patch = JSON.stringify(hookSettingsPatch(def));
    if (hooks[id]) {
      items.push({
        path: `.claude/hooks/${def.file}`,
        module: "hooks",
        kind: "full",
        content: readTemplate(`hooks/${def.file}`),
      });
      items.push({
        path: SETTINGS_PATH,
        module: "hooks",
        kind: "json",
        content: patch,
      });
    } else {
      items.push({
        path: SETTINGS_PATH,
        module: "hooks",
        kind: "json",
        content: patch,
        jsonMode: "remove",
      });
    }
  }
  return items;
}

/**
 * Consumes `rules`, `mcp`, `outputStyle`, `hooks`, and `repo.nodeVersion`. The manifest's
 * `ci`, `verify`, and `workflows` sections are validated but produce no files until the
 * workflow caller-stubs land.
 */
export function buildPlan(manifest: ResolvedManifest): RenderPlan {
  const rules = enabledRules(manifest);
  const items: PlanItem[] = [
    ...rules.map((rule) => ruleItem(rule.file)),
    {
      path: ".claude/settings.ci.json",
      module: "settings-ci",
      kind: "full",
      content: readTemplate("claude/settings.ci.json"),
    },
    ...mcpItems(manifest),
    ...outputStyleItems(manifest),
    ...hooksItems(manifest),
    {
      path: ".nvmrc",
      module: "nvmrc",
      kind: "full",
      content: `${manifest.repo.nodeVersion}\n`,
    },
    {
      path: ".gitignore",
      module: "gitignore-block",
      kind: "region",
      content: readTemplate("scaffold/gitignore-block.txt"),
      region: {
        id: "gitignore",
        start: MARKERS.gitignore.start,
        end: MARKERS.gitignore.end,
        anchor: "eof",
      },
    },
    {
      path: ".prettierignore",
      module: "prettierignore-block",
      kind: "region",
      content: readTemplate("scaffold/prettierignore-block.txt"),
      region: {
        id: "prettierignore",
        start: MARKERS.prettierignore.start,
        end: MARKERS.prettierignore.end,
        anchor: "eof",
      },
    },
    {
      path: "CLAUDE.md",
      module: "claude-md",
      kind: "region",
      content: rulesTable(rules),
      region: {
        id: "claude-md-rules-table",
        start: MARKERS.claudeMdRulesTable.start,
        end: MARKERS.claudeMdRulesTable.end,
        anchor: "after-h1",
        pad: true,
      },
    },
  ];
  return { items };
}
