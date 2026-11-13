# @viamrobotics/prime-editor

A CodeMirror 6 code editor for Svelte 5, themed with Viam's code tokens, with a diff view.

## Layout

- `src/lib/CodeEditor/CodeEditor.svelte`: the editor. It takes `bind:value`, `language`, `readonly`, `lineNumbers`, `wrapLines`, `original`, `diff`, `aria-label`, `aria-labelledby`, and `class`. Setting `original` opens the diff view.
- `src/lib/CodeEditor/code-editor.ts`: the `CodeEditorLanguage` and `CodeEditorDiff` types. Type only.
- `src/lib/CodeEditor/languages.ts`: `languageSupport`, which maps a `CodeEditorLanguage` to its CodeMirror grammar.
- `src/lib/CodeEditor/theme.ts`: `codeEditorTheme`, the editor theme and highlight style. Every color is a `--color-code-*` or other token variable from `@viamrobotics/tailwind-config`.
- `src/lib/index.ts`: the public exports.
- `src/lib/CodeEditor/__tests__/`: the specs and their wrapper components, excluded from the published package.
- `test/`: shared test infrastructure, never published. `tailwind.css` is the stylesheet the specs import.
- `styles.css`: the consumer's Tailwind entry. It imports the tokens and points Tailwind at `dist`.
- The demos live on the package's page in [docs](../../docs/), under `src/content/docs/packages/prime-editor/`.

## Commands

```bash
pnpm --filter @viamrobotics/prime-docs dev          # docs site; this package resolves to its source and hot-reloads
pnpm --filter @viamrobotics/prime-editor build      # svelte-package + publint
pnpm --filter @viamrobotics/prime-editor check      # svelte-check
pnpm --filter @viamrobotics/prime-editor test       # vitest
pnpm --filter @viamrobotics/prime-editor lint       # eslint
pnpm --filter @viamrobotics/prime-editor format     # prettier --check
```

Tests named `*.svelte.spec.ts` run in Chromium through `@vitest/browser-playwright`.

## Conventions

- Svelte 5 runes only. See [.claude/rules/svelte.md](../../.claude/rules/svelte.md).
- State flows through `bind:value` only, never a change callback. A function binding can veto or transform an edit, and the editor reads `value` back after each edit to put the document in line with it.
- A change that comes from `value` or `original` is annotated, so it is never written back to `value`.
- `language`, `readonly`, `lineNumbers`, `wrapLines`, and the accessible name each live in a compartment and reconfigure the existing editor. The editor is rebuilt only on a switch between the single and the split layout.
- The unified diff reconfigures its own compartment when `original` appears or disappears, and sends a new `original` as a change to the original document.
- Every editor needs `aria-label` or `aria-labelledby`. A readonly editor keeps `tabindex` 0 so it stays reachable by keyboard.
- Colors come from `@viamrobotics/tailwind-config` tokens only, never a literal.
