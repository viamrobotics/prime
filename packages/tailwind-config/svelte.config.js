import adapter from "@sveltejs/adapter-static";

// The docs site embeds this playground under <DOCS_BASE>/playground/tailwind-config;
// each package supplies its own segment. Falls back to BASE_PATH, then '' (local/npm).
const docsBase = process.env.DOCS_BASE?.replace(/\/$/, "");
const base = docsBase
  ? `${docsBase}/playground/tailwind-config`
  : (process.env.BASE_PATH ?? "");

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
    runes: ({ filename }) =>
      filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
  },
  kit: {
    adapter: adapter({
      fallback: "index.html",
    }),
    paths: {
      base,
    },
  },
};

export default config;
