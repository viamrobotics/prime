#!/usr/bin/env node
// Regenerates schema/manifest.schema.json from the zod schema in src/core/manifest.ts.
// Run via `pnpm --filter @viamrobotics/claude-config run schema`. test/schema.test.ts
// fails if the committed file falls out of sync.

import { writeFileSync } from "node:fs";
import { format, resolveConfig } from "prettier";
import { buildJsonSchema } from "../dist/core/manifest.js";

const target = new URL("../schema/manifest.schema.json", import.meta.url);
const path = target.pathname;

// Formatted here so the write lands prettier-canonical and `pnpm format` is a no-op.
const options = (await resolveConfig(path)) ?? {};
const text = await format(JSON.stringify(buildJsonSchema()), {
  ...options,
  parser: "json",
});

writeFileSync(target, text);
console.log(`Wrote ${path}`);
