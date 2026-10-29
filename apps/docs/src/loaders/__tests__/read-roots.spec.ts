import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { readRoots } from "../components";

const INDEX = `export { default as Button } from './Button/Button.svelte';
export { Select } from './Select/select.ts';
export { Helper } from './Util/helper.ts';
export type { FieldContext } from './Field/useField.svelte.ts';
export { InputStates, type InputState } from './Input/state.ts';
`;

const SELECT_BARREL = `import Root from './Select.svelte';
import Trigger from './SelectTrigger.svelte';

export const Select = Object.assign(Root, { Trigger });
`;

const writeLib = async (lib: string, index: string, barrel: string) => {
  await mkdir(join(lib, "Button"), { recursive: true });
  await mkdir(join(lib, "Select"), { recursive: true });
  await mkdir(join(lib, "Util"), { recursive: true });
  await writeFile(join(lib, "index.ts"), index);
  await writeFile(join(lib, "Button", "Button.svelte"), "");
  await writeFile(join(lib, "Select", "Select.svelte"), "");
  await writeFile(join(lib, "Select", "SelectTrigger.svelte"), "");
  await writeFile(join(lib, "Select", "select.ts"), barrel);
  await writeFile(join(lib, "Util", "helper.ts"), "export const Helper = 1;\n");
};

describe("readRoots", () => {
  let lib: string;

  beforeEach(async () => {
    lib = await mkdtemp(join(tmpdir(), "read-roots-"));
  });

  afterEach(async () => {
    await rm(lib, { recursive: true, force: true });
  });

  it("yields only component roots when index.ts also has plain value and type exports", async () => {
    await writeLib(lib, INDEX, SELECT_BARREL);

    const roots = await readRoots(lib);

    expect(roots).toEqual([
      { name: "Button", file: "Button/Button.svelte", parts: [] },
      {
        name: "Select",
        file: "Select/Select.svelte",
        parts: [{ name: "Trigger", file: "Select/SelectTrigger.svelte" }],
      },
    ]);
  });

  it("throws when a compound barrel lists a part it does not import", async () => {
    await writeLib(
      lib,
      INDEX,
      "import Root from './Select.svelte';\nexport const Select = Object.assign(Root, { Missing });\n",
    );

    await expect(readRoots(lib)).rejects.toThrow(/part Missing is not imported/);
  });
});
