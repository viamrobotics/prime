import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { collectEntries } from "../components";

const INDEX = `export { default as DatePicker } from './DatePicker/DatePicker.svelte';
export { Select } from './Select/select.ts';
`;

const BARREL = `import Root from './Select.svelte';
import Trigger from './SelectTrigger.svelte';
import Item from './Item.svelte';

export const Select = Object.assign(Root, { Trigger, Item });
`;

const DATE_PICKER = `<!--
@component
Pick a date. See [\`Select\`](../Select/Select.svelte) and [\`Trigger\`](../Select/SelectTrigger.svelte) and [\`Item\`](../Select/Item.svelte).
-->
<script lang="ts">
interface Props {
  value?: string;
}
let { value = $bindable('') }: Props = $props();
</script>
`;

const PART = `<script lang="ts">
const { children }: Select.TriggerProps = $props();
</script>
`;

describe("collectEntries", () => {
  let lib: string;

  beforeEach(async () => {
    lib = await mkdtemp(join(tmpdir(), "collect-entries-"));
    await mkdir(join(lib, "DatePicker"));
    await mkdir(join(lib, "Select"));
    await writeFile(join(lib, "index.ts"), INDEX);
    await writeFile(join(lib, "DatePicker", "DatePicker.svelte"), DATE_PICKER);
    await writeFile(join(lib, "Select", "select.ts"), BARREL);
    await writeFile(join(lib, "Select", "Select.svelte"), PART);
    await writeFile(join(lib, "Select", "SelectTrigger.svelte"), PART);
    await writeFile(join(lib, "Select", "Item.svelte"), PART);
  });

  afterEach(async () => {
    await rm(lib, { recursive: true, force: true });
  });

  it("keys a root by its kebab-case name and a part by its slug under the root", async () => {
    const entries = await collectEntries(lib, "pages");

    expect(entries.map((entry) => entry.id)).toEqual([
      "date-picker",
      "select",
      "select/trigger",
      "select/item",
    ]);
  });

  it("names a part Root.Part and flags only roots as roots", async () => {
    const entries = await collectEntries(lib, "pages");

    expect(
      entries.map(({ data }) => [data.name, data.root, data.isRoot, data.file]),
    ).toEqual([
      ["DatePicker", "date-picker", true, "DatePicker/DatePicker.svelte"],
      ["Select", "select", true, "Select/Select.svelte"],
      ["Select.Trigger", "select", false, "Select/SelectTrigger.svelte"],
      ["Select.Item", "select", false, "Select/Item.svelte"],
    ]);
  });

  it("carries the parsed props contract onto the entry", async () => {
    const [datePicker] = await collectEntries(lib, "pages");

    expect(datePicker.data.propsType).toBe("Props");
    expect(datePicker.data.props).toEqual([
      {
        name: "value",
        type: "string",
        optional: true,
        bindable: true,
        description: "",
        default: "''",
      },
    ]);
  });

  it("points doc links at pages and page anchors in pages mode", async () => {
    const [datePicker] = await collectEntries(lib, "pages");

    expect(datePicker.doc).toBe(
      "Pick a date. See [`Select`](../select/) and [`Trigger`](../select/#select-trigger) and [`Item`](../select/#select-item).",
    );
  });

  it("points doc links at #api and part anchors in anchors mode", async () => {
    const [datePicker] = await collectEntries(lib, "anchors");

    expect(datePicker.doc).toBe(
      "Pick a date. See [`Select`](#api) and [`Trigger`](#select-trigger) and [`Item`](#select-item).",
    );
  });
});
