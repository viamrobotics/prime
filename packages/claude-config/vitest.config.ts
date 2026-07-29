import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
    expect: { requireAssertions: true },
    clearMocks: true,
  },
});
