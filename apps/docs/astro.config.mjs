import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import starlightThemeNova from "starlight-theme-nova";

const base = process.env.DOCS_BASE ?? "/prime/";
const site = process.env.DOCS_SITE ?? "https://viamrobotics.github.io";

export default defineConfig({
  site,
  base,
  integrations: [
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
            { label: "@viamrobotics/prime-ui", link: "/packages/prime-ui/" },
            {
              label: "@viamrobotics/tailwind-config",
              link: "/packages/tailwind-config/",
            },
          ],
        },
        {
          label: "Playgrounds",
          items: [{ label: "prime-ui", link: "/playground/prime-ui/" }],
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
