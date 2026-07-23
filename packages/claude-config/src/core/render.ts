export type RenderVars = Record<string, string | boolean>;

/**
 * Matches the innermost `{{#if x}}…{{/if}}` or `{{^x}}…{{/if}}` block — the body's
 * negative lookahead forbids another opener/closer, so nested blocks resolve
 * inside-out across the render loop.
 */
const CONDITIONAL =
  /\{\{(#if|\^)\s*(\w+)\}\}((?:(?!\{\{(?:#if|\^)\s*\w+\}\}|\{\{\/if\}\})[\s\S])*)\{\{\/if\}\}/;

const VARIABLE = /\{\{(\w+)\}\}/g;

/**
 * Minimal template renderer. Supports only `{{var}}` substitution and
 * `{{#if flag}}…{{/if}}` / `{{^flag}}…{{/if}}` conditionals — deliberately no loops.
 *
 * Interpolation requires `{{name}}` with no inner spaces, so GitHub Actions
 * expressions like `${{ github.event.number }}` (which contain spaces/dots) pass
 * through untouched.
 */
export function render(template: string, vars: RenderVars): string {
  let out = template;
  let guard = 0;
  while (CONDITIONAL.test(out)) {
    if (++guard > 10_000) {
      throw new Error("render: runaway conditional expansion");
    }
    out = out.replace(
      CONDITIONAL,
      (_match, kind: string, name: string, body: string) => {
        if (!(name in vars)) {
          throw new Error(`render: unknown conditional variable "${name}"`);
        }
        const include = kind === "#if" ? Boolean(vars[name]) : !vars[name];
        return include ? body : "";
      },
    );
  }
  return out.replace(VARIABLE, (_match, name: string) => {
    if (!(name in vars)) throw new Error(`render: unknown variable "${name}"`);
    const value = vars[name];
    if (typeof value === "boolean") {
      throw new Error(
        `render: "${name}" is boolean; use {{#if ${name}}}…{{/if}}`,
      );
    }
    return value;
  });
}
