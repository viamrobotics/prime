import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import starlightThemeNova from "starlight-theme-nova";

const base = process.env.DOCS_BASE ?? "/prime/";
const site = process.env.DOCS_SITE ?? "https://viamrobotics.github.io";

// `astro dev` resolves prime-ui to its source so component edits hot-reload into
// the docs with no `dist` build. `astro build` keeps the package's `svelte` export
// (dist), so the published site renders what npm consumers get.
const primeUiSourceInDev = {
  name: "prime-ui-source-in-dev",
  config(_, { command }) {
    if (command !== "serve") return;
    return {
      resolve: {
        // Each subpath gets its own entry and the bare specifier is anchored, so a
        // subpath such as `/styles.css` is never rewritten to a path under index.ts.
        alias: [
          {
            find: "@viamrobotics/prime-ui/icons",
            replacement: fileURLToPath(
              new URL(
                "../../packages/prime-ui/src/lib/icons/index.ts",
                import.meta.url,
              ),
            ),
          },
          {
            find: "@viamrobotics/prime-ui/styles.css",
            replacement: fileURLToPath(
              new URL("../../packages/prime-ui/styles.css", import.meta.url),
            ),
          },
          {
            find: /^@viamrobotics\/prime-ui$/,
            replacement: fileURLToPath(
              new URL(
                "../../packages/prime-ui/src/lib/index.ts",
                import.meta.url,
              ),
            ),
          },
        ],
      },
    };
  },
};

export default defineConfig({
  site,
  base,
  integrations: [
    svelte(),
    starlight({
      plugins: [starlightThemeNova()],
      // starlight-theme-nova defaults expressiveCode to false; re-enable so
      // <Code> from @astrojs/starlight/components works in MDX.
      expressiveCode: true,
      title: "Viam Prime",
      description: "Viam component libraries and design system documentation.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/viamrobotics/prime",
        },
      ],
      customCss: [
        "@fontsource-variable/public-sans",
        "@fontsource-variable/roboto-mono",
        "./src/tailwind.css",
      ],
      sidebar: [
        { label: "Introduction", link: "/" },
        {
          label: "Packages",
          items: [
            {
              label: "@viamrobotics/prime-ui",
              items: [
                { label: "Overview", link: "/packages/prime-ui/" },
                {
                  label: "Components",
                  autogenerate: { directory: "packages/prime-ui/components" },
                },
              ],
            },
            {
              label: "@viamrobotics/tailwind-config",
              link: "/packages/tailwind-config/",
            },
            {
              label: "@viamrobotics/tweakpane-config",
              link: "/packages/tweakpane-config/",
            },
          ],
        },
        {
          label: "Playgrounds",
          items: [
            { label: "Overview", link: "/playground/" },
            {
              label: "tweakpane-config",
              link: "/playground/tweakpane-config/",
            },
            { label: "tailwind-config", link: "/playground/tailwind-config/" },
          ],
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss(), primeUiSourceInDev],
  },
});
