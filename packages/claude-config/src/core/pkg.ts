import { readFileSync } from "node:fs";
import { parseJsonObject } from "./json-merge.js";

export function packageVersion(): string {
  const raw = readFileSync(
    new URL("../../package.json", import.meta.url),
    "utf8",
  );
  const pkg = parseJsonObject(raw);
  if (typeof pkg.version !== "string")
    throw new Error("package.json is missing a version string");
  return pkg.version;
}
