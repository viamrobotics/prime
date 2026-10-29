import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import starlightThemeNova from "starlight-theme-nova";

import { sourceAliases } from "./source-aliases.mjs";

const base = process.env.DOCS_BASE ?? "/prime/";
const site = process.env.DOCS_SITE ?? "https://viamrobotics.github.io";

// `astro dev` resolves every workspace library to its source so package edits
// hot-reload into the docs with no `dist` build. `astro build` keeps each
// package's `svelte` export (dist), so the published site renders what npm
// consumers get.
const packagesSourceInDev = {
  name: "packages-source-in-dev",
  config(_, { command }) {
    if (command !== "serve") return;
    return { resolve: { alias: sourceAliases } };
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
      components: {
        Head: "./src/components/Head.astro",
      },
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
              label: "@viamrobotics/prime-panes",
              link: "/packages/prime-panes/",
            },
            {
              label: "@viamrobotics/prime-tree",
              link: "/packages/prime-tree/",
            },
            {
              label: "@viamrobotics/tailwind-config",
              items: [
                { label: "Overview", link: "/packages/tailwind-config/" },
                {
                  label: "Component classes",
                  link: "/packages/tailwind-config/component-classes/",
                },
              ],
            },
            {
              label: "@viamrobotics/tweakpane-config",
              link: "/packages/tweakpane-config/",
            },
          ],
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss(), packagesSourceInDev],
  },
});
