import { svelte } from "@sveltejs/vite-plugin-svelte";
import { playwright } from "@vitest/browser-playwright";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    // Resolve prime-ui to its source so the Sandbox spec doesn't depend on a
    // prior `dist` build. The astro build still uses the package's `svelte`
    // export (dist).
    alias: {
      "@viamrobotics/prime-ui": fileURLToPath(
        new URL("../../packages/prime-ui/src/lib/index.ts", import.meta.url),
      ),
    },
  },
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
          name: "server",
          environment: "node",
          include: ["src/**/*.{test,spec}.{js,ts}"],
          exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"],
        },
      },
    ],
  },
});
