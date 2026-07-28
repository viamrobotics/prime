import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";
import ts from "typescript-eslint";

export default defineConfig(
  {
    ignores: ["dist/**", ".wireit/**", "templates/**", "test/__snapshots__/**"],
  },
  js.configs.recommended,
  ts.configs.recommended,
  prettier,
  {
    languageOptions: { globals: { ...globals.node } },
    rules: {
      // typescript-eslint recommends disabling no-undef on TS projects.
      "no-undef": "off",
    },
  },
);
