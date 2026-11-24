import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
import { getViteConfig } from "astro/config";
import { defineConfig, type UserProjectConfigFn } from "vitest/config";

import { sourceAliases } from "./source-aliases.mjs";

const astroViteConfig = getViteConfig({});

const astroProject: UserProjectConfigFn = async (env) => ({
  ...(await astroViteConfig(env)),
  test: {
    name: "astro",
    environment: "node",
    include: ["src/**/*.astro.{test,spec}.{js,ts}"],
    expect: { requireAssertions: true },
  },
});

export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  // Specs resolve every workspace library to its source so they never depend on a
  // prior `dist` build. The astro build still uses each package's `svelte` export.
  resolve: { alias: sourceAliases },
  test: {
    expect: { requireAssertions: true },
    projects: [
      {
        extends: "./vitest.config.ts",
        test: {
          name: "client",
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium", headless: true }],
          },
          include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
        },
      },
      {
        extends: "./vitest.config.ts",
        test: {
          name: "ssr",
          environment: "node",
          include: ["src/**/*.ssr.{test,spec}.{js,ts}"],
        },
      },
      {
        extends: "./vitest.config.ts",
        test: {
          name: "server",
          environment: "node",
          include: ["src/**/*.{test,spec}.{js,ts}"],
          exclude: [
            "src/**/*.svelte.{test,spec}.{js,ts}",
            "src/**/*.ssr.{test,spec}.{js,ts}",
            "src/**/*.astro.{test,spec}.{js,ts}",
          ],
        },
      },
      astroProject,
    ],
  },
});
