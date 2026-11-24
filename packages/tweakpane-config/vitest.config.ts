import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "svelte-tweakpane-ui": path.resolve(
        import.meta.dirname,
        "test/svelte-tweakpane-ui.ts",
      ),
    },
  },
  test: {
    environment: "node",
    include: ["src/lib/__tests__/**/*.test.ts"],
  },
});
