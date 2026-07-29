# Verify Your Work

Before reporting a batch of edits as done:

1. **Format.** Run the repo's format command. It rewrites files in place, so there is no need to eyeball formatting.
2. **Lint with autofix.** Mechanical issues self-correct and only real problems remain.
3. **Type-check and test** the packages you touched.

Scope commands to what changed: `pnpm --filter <pkg> run <script>`.

Report honestly. If a step surfaces errors that do not auto-resolve, say so and show them. Never claim success over a failing or unrun check. "Done" means every check passed, not that the edits were made.

Each language rule has a "Verify Your Work" section with the exact commands for that stack.
