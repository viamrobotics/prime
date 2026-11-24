# @viamrobotics/prime-editor

A CodeMirror 6 code editor for Svelte 5, themed with Viam's code tokens, with a diff view.

## Layout

- `src/lib/CodeEditor/CodeEditor.svelte`: the editor. It takes `bind:value`, `language`, `readonly`, `disabled`, `placeholder`, `lineNumbers`, `wrapLines`, `original`, `diff`, `collapseUnchanged`, and the attributes of a `div`. Setting `original` opens the diff view.
- `src/lib/CodeEditor/code-editor.ts`: the `CodeEditorLanguage` and `CodeEditorDiff` types. Type only.
- `src/lib/CodeEditor/aria-attributes.ts`: routes the `aria-*` attributes onto the editing surface and builds the original side's name in a split diff.
- `src/lib/CodeEditor/expand-unchanged.ts`: `expandUnchanged`, the command behind the expand key. It finds the collapsed run of unchanged lines at the cursor, on either side of a split diff.
- `src/lib/CodeEditor/languages.ts`: `languageSupport`, which maps a `CodeEditorLanguage` to its CodeMirror grammar.
- `src/lib/CodeEditor/theme.ts`: `codeEditorTheme`, the editor theme and highlight style. Every color is a `--color-code-*` or other token variable from `@viamrobotics/tailwind-config`.
- `src/lib/index.ts`: the public exports.
- `src/lib/CodeEditor/__tests__/`: the specs, excluded from the published package. `fixtures/` holds the wrapper components the specs render.
- `test/`: shared test infrastructure, never published. `tailwind.css` is the stylesheet the specs import.
- `styles.css`: the consumer's Tailwind entry. It imports the tokens and points Tailwind at `dist`.
- The demos live on the package's page in [docs](../../docs/), under `src/content/docs/packages/prime-editor/`.

## Commands

```bash
pnpm --filter @viamrobotics/prime-docs dev          # docs site; this package resolves to its source and hot-reloads
pnpm --filter @viamrobotics/prime-editor build      # svelte-package + publint + check-declarations.mjs
pnpm --filter @viamrobotics/prime-editor check      # svelte-check
pnpm --filter @viamrobotics/prime-editor test       # vitest
pnpm --filter @viamrobotics/prime-editor lint       # eslint
pnpm --filter @viamrobotics/prime-editor format     # prettier --check
```

Tests named `*.svelte.spec.ts` run in Chromium through `@vitest/browser-playwright`. Tests named `*.ssr.spec.ts` run in node and server-render the component.

## Conventions

- Svelte 5 runes only. See [.claude/rules/svelte.md](../../.claude/rules/svelte.md).
- State flows through `bind:value` only, never a change callback. A function binding can veto or transform an edit, and the editor reads `value` back after each edit to put the document in line with it.
- A change that comes from `value` or `original` is annotated, so it is never written back to `value`.
- `language`, `readonly` and `disabled`, `placeholder`, `lineNumbers`, `wrapLines`, the accessible name, and the other `aria-*` attributes each live in a compartment and reconfigure the existing editor. The editor is rebuilt only on a switch between the single and the split layout, and on a change to `collapseUnchanged`.
- The setup is composed from `@codemirror/*` extensions, never `basicSetup`, so each piece can sit in a compartment. Search, selection-match highlighting, and folding are always on. The fold gutter rides in the `lineNumbers` compartment.
- `Props` extends the `div` attributes. Every `aria-*` attribute goes to the editing surface, the element with the `textbox` role, and every other attribute spreads onto the outer element. In a split diff the `value` side takes `aria-label` and `aria-labelledby` as given and the other `aria-*` attributes. The original side gets its own name: `aria-label` becomes `<name>, original`, and `aria-labelledby` gains the id of a visually hidden `original` span rendered after the consumer's ids. Each side has its own name compartment, so a rename reconfigures both live.
- The editor never validates. The theme paints the error border from `aria-invalid` on the editing surface.
- Tab is not bound, so focus can always leave the editor.
- The unified diff reconfigures its own compartment when `original` appears or disappears, and sends a new `original` as a change to the original document.
- Every editor needs `aria-label` or `aria-labelledby`, and `$props()` is annotated `Props & AccessibleName` so omitting both is a type error. A readonly editor keeps `tabindex` 0 so it stays reachable by keyboard. A disabled editor has no tab stop, takes no focus or selection, and marks the editing surface `aria-disabled`. `disabled` wins over `readonly`, and in a split diff it applies to both sides.
- Colors come from `@viamrobotics/tailwind-config` tokens only, never a literal.
- CodeMirror paints the selection behind the lines, so the cursor-line, fold, and collapsed-lines bands, the diff tints, the changed-word fills, and the search match are translucent. Each lands on its opaque token over the surface. An opaque fill hides the selection under it. The selected search match stays opaque, since it covers exactly a selected range.
- `Ctrl-Shift-]` (`Cmd-Alt-]` on macOS) is bound ahead of the fold keymap. It expands the collapsed run of unchanged lines at the cursor, and falls through to unfold when there is none.
- `--color-gray-1` is the code surface in every state. A readonly editor drops its border, and a disabled editor keeps a transparent one on the disabled fill.
- The focus ring is a 2px `--color-link` outline on `:has(.cm-content:focus-visible)`, and `.cm-focused` draws no outline, so the ring follows the browser's `:focus-visible` heuristic. CodeMirror focuses the content from script on mousedown, so a click into a readonly editor matches `:focus-visible` only when the previously focused element did.
- `bind:value` with no fallback can start `undefined`, and the editor reads it as `value ?? ''`.
