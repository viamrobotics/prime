import { fileURLToPath } from "node:url";

const here = (path) => fileURLToPath(new URL(path, import.meta.url));

/**
 * Vite aliases that resolve every workspace library to its source instead of its
 * `dist`, so an edit to a package hot-reloads into its docs page under `astro dev`
 * and the docs specs run without a prior package build. `astro build` leaves them
 * out and renders each package's published `svelte` export.
 *
 * Each subpath gets its own entry and the bare specifier is anchored, so a subpath
 * such as `/styles.css` is never rewritten to a path under `index.ts`.
 * `@viamrobotics/tailwind-config` has no entry: its exports are the CSS files
 * themselves.
 */
export const sourceAliases = [
  {
    find: "@viamrobotics/prime-ui/icons",
    replacement: here("../../packages/prime-ui/src/lib/icons/index.ts"),
  },
  {
    find: "@viamrobotics/prime-ui/styles.css",
    replacement: here("../../packages/prime-ui/styles.css"),
  },
  {
    find: /^@viamrobotics\/prime-ui$/,
    replacement: here("../../packages/prime-ui/src/lib/index.ts"),
  },
  {
    find: "@viamrobotics/prime-panes/styles.css",
    replacement: here("../../packages/prime-panes/styles.css"),
  },
  {
    find: /^@viamrobotics\/prime-panes$/,
    replacement: here("../../packages/prime-panes/src/lib/index.ts"),
  },
  {
    find: "@viamrobotics/prime-tree/styles.css",
    replacement: here("../../packages/prime-tree/styles.css"),
  },
  {
    find: /^@viamrobotics\/prime-tree$/,
    replacement: here("../../packages/prime-tree/src/lib/index.ts"),
  },
  {
    find: /^@viamrobotics\/tweakpane-config$/,
    replacement: here("../../packages/tweakpane-config/src/lib/index.ts"),
  },
];
