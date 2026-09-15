---
name: design-review
description: Review changed styled markup against the design system: tokens, spacing, contrast, hit targets, and component reuse in CSS, JSX, TSX, Svelte, Vue, and Astro. Use when a change touches styled markup and a design read is wanted on its own. A full pre-handoff pass is `/ready`, which is preferred when a whole change is being handed off.
allowed-tools: Bash(git diff:*), Bash(git merge-base:*), Bash(node .claude/scripts/design.mjs:*), Bash(node .claude/scripts/mcp-config-check.mjs:*), Read, Grep, Agent
---

Review the design-system fit of a working-tree change. Arguments (optional file filter): $ARGUMENTS

1. **Resolve the changed UI files.** Diff against the merge-base:
   ```
   git diff --name-only "$(git merge-base HEAD origin/main)"...HEAD
   ```
   Filter to `.css`, `.jsx`, `.tsx`, `.svelte`, `.vue`, `.astro`. If none changed, say so and
   stop. There is nothing to review.
2. **Run the checker.** `node .claude/scripts/design.mjs check <files>` finds hardcoded
   literals, off-scale spacing and type, contrast failures, and undersized hit targets, each
   with an exact number.
3. **Reach for the rendered tier only when the source pass cannot settle it.** This step is
   conditional, not routine. Run it when `check` raised something only a render can decide,
   such as a contrast ratio against a background painted by another layer, or when the
   change is visual enough to warrant a look. `node .claude/scripts/design.mjs render
<target>` takes an `http(s)://` URL or a path to a local `.html` file. It never starts a
   dev server, so point it at something already running or at a file on disk. It reports
   composited contrast and rendered geometry as text. It captures no screenshot, so there is
   no image to handle. With no Chrome installed it prints one line and exits
   non-zero, and that is a valid outcome: fall back to "cannot determine from source".

   To check one component with nothing running, write a temporary HTML file that embeds the
   component's markup, the CSS under review, and the token values it depends on, then render
   that file:

   ```html
   <!doctype html>
   <style>
     /* the CSS under review, with the token values it depends on inlined */
   </style>
   <div class="component-under-review"><!-- the component's markup --></div>
   ```

   Delete the temporary file once the render finishes.

   **Run this step inside a subagent and bring back only the verdict.** A render launches a
   browser and can report a finding per element on a busy page, and a review touching several
   components pays that repeatedly. The subagent absorbs the launch and the raw output, and
   the main context gets the verdict. This is the same discipline `/verify-changed` and
   `blast-radius` use.

4. **Read only what it reported.** For a token the check names, run
   `node .claude/scripts/design.mjs token <name>` to confirm it. Never read
   `.claude/design/tokens.json` whole.
5. **Layer judgment for what the script cannot compute:**
   - Whether an existing component is being reinvented. Run
     `node .claude/scripts/design.mjs list [group]` before treating a value as uncovered.
   - Whether a new value needs a new token or an existing one already fits. Reuse is the
     default.
   - Whether visual emphasis lands on the primary action.
   - Calibrate the depth of this to the size of the change. A one-line tweak does not need a
     full critique.
6. **If the chrome-devtools MCP server is wired in, check its config.** Look for a
   `chrome-devtools` entry in `.mcp.json` or `.vscode/mcp.json`. If one exists, run:
   ```
   node .claude/scripts/mcp-config-check.mjs .mcp.json .vscode/mcp.json
   ```
   passing whichever of those files exist. It checks the pinned server version, the required
   flags, and that every wired-in client agrees. **UNMEASURED**: no repo in this monorepo
   wires `.mcp.json` for chrome-devtools, so this checker has never run against a real
   wired-in config, only against paired fire-or-stay-silent fixtures. Treat a finding as a
   lead, not a verdict, and report a false positive rather than working around it. Skip this
   step entirely if no client wires the server in.
7. **Report in two groups.** Mechanical findings first: everything `design.mjs check` named,
   plus anything `design.mjs render` computed, each with file, line, and the exact token or
   scale value. Judgment findings second. Do not merge the two lists, since they carry
   different confidence. If nothing is wrong, say so plainly. "Nothing to report" is a valid
   and expected outcome, not a failure to find something. For anything that depends on
   rendered output and the rendered tier was not run, say "cannot determine from source"
   instead of guessing.

## Accessibility is a separate review

Contrast and hit-target thresholds are also WCAG success criteria.
`@houserules/plugin-accessibility` owns the accessibility verdict. Run its
`/accessibility-review` skill for focus states, keyboard behavior, and screen-reader
concerns. This skill reports the design-system angle only and does not duplicate that work.

## Off-context reviews

For a large diff, run this review through the `design-reviewer` agent instead of in this
context. Hand it the changed files and let it run the checker and read the tokens. Only the
diff and the check output stay in the subagent. The main context gets back a verdict, not a
transcript.

## Findings

Fix anything mechanical the checker named: a literal that maps to an existing token, an
off-scale spacing or type value. For a finding that needs a design decision, such as whether
a new token is warranted, say so and hand it back rather than inventing one.
