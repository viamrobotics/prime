# Verify Your Work

After finishing a batch of edits but before telling the user the work is done, reconcile the code:

1. **Format.** Run the repo's format command; it rewrites files in place, so there's no need to eyeball formatting.
2. **Lint with autofix.** Run lint so mechanical issues self-correct and only real problems remain.
3. **Type-check and test** the package(s) you touched.

Prefer package-scoped commands so you rebuild only what changed: `pnpm --filter <pkg> run <script>`.

Report honestly:

- If a step surfaces errors that don't auto-resolve, say so and show them. Never claim success over a failing or unrun check.
- "Done" means every check passed, not that the edits were made.

This is the always-on habit; the per-language "Verify Your Work" notes name the exact commands for each stack.
