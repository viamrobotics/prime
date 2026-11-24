import { describe, expect, it } from "vitest";

import { parseComponentSource, rewriteSvelteLinks } from "../parse-component";

const component = `<!--
@component
A thing. See [\`Field\`](../Field/Field.svelte).

\`\`\`svelte
<Thing bind:value />
\`\`\`
-->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'value'> {
    /** Current value. */
    value?: string;

    /** Contextual state. @default 'none' */
    state?: 'none' | 'error';

    /** Dim it. */
    disabled?: boolean;

    'aria-describedby'?: string;
  }

  let {
    value = $bindable(''),
    state,
    disabled = false,
    'aria-describedby': describedBy,
    ...restProps
  }: Props = $props();
</script>

<input {...restProps} />
`;

describe("parseComponentSource", () => {
  const parsed = parseComponentSource(component);

  it("lifts the @component block without its marker", () => {
    expect(parsed.doc.startsWith("A thing.")).toBe(true);
    expect(parsed.doc).toContain("```svelte");
  });

  it("records the Props extends clause", () => {
    expect(parsed.extends).toBe("Omit<HTMLInputAttributes, 'value'>");
    expect(parsed.external).toBe(false);
  });

  it("reads each prop's JSDoc description", () => {
    expect(
      parsed.props.find((prop) => prop.name === "value")?.description,
    ).toBe("Current value.");
  });

  it("prefers an @default tag over the destructuring default", () => {
    expect(parsed.props.find((prop) => prop.name === "state")?.default).toBe(
      "'none'",
    );
  });

  it("falls back to the destructuring default", () => {
    expect(parsed.props.find((prop) => prop.name === "disabled")?.default).toBe(
      "false",
    );
  });

  it("reads the default from inside $bindable and marks the prop bindable", () => {
    const value = parsed.props.find((prop) => prop.name === "value");
    expect(value?.bindable).toBe(true);
    expect(value?.default).toBe("''");
  });

  it("unquotes a quoted prop name", () => {
    expect(parsed.props.map((prop) => prop.name)).toContain("aria-describedby");
  });

  it("marks a bits-ui props type as external with no local props", () => {
    const external = parseComponentSource(
      `<script lang="ts">\nconst { children, ...rest }: Select.TriggerProps = $props();\n</script>`,
    );
    expect(external.propsType).toBe("Select.TriggerProps");
    expect(external.external).toBe(true);
    expect(external.props).toEqual([]);
  });

  describe("given an intersection annotation", () => {
    const intersection = (alias: string) =>
      parseComponentSource(`<script lang="ts">
interface Props {
  title?: string;
  'aria-label'?: string;
  size?: number;
}
${alias}
const { size }: Props & Name = $props();
</script>`);

    it("reads the table from the local interface and keeps the full annotation", () => {
      const parsed = intersection(
        "type Name = { title: string } | { 'aria-label': string };",
      );

      expect(parsed.external).toBe(false);
      expect(parsed.propsType).toBe("Props & Name");
      expect(parsed.props.map((prop) => prop.name)).toEqual([
        "title",
        "aria-label",
        "size",
      ]);
    });

    it("lists the required names of a three-arm alias in arm order", () => {
      const parsed = intersection(
        "type Name = { title: string } | { 'aria-label': string } | { 'aria-labelledby': string };",
      );

      expect(parsed.requiresOneOf).toEqual([
        "title",
        "aria-label",
        "aria-labelledby",
      ]);
    });

    it("lists the required names of a two-arm alias", () => {
      const parsed = intersection(
        "type Name = { 'aria-label': string } | { 'aria-labelledby': string };",
      );

      expect(parsed.requiresOneOf).toEqual(["aria-label", "aria-labelledby"]);
    });

    it("leaves requiresOneOf undefined when no alias union is named", () => {
      const parsed = intersection("type Name = { title: string };");

      expect(parsed.requiresOneOf).toBeUndefined();
    });
  });
});

describe("parseComponentSource edge cases", () => {
  it("returns an empty doc when the component has no @component block", () => {
    const parsed = parseComponentSource(
      `<!-- just a note -->\n<script lang="ts">\nlet { a }: Props = $props();\n</script>`,
    );

    expect(parsed.doc).toBe("");
  });

  it("reads props from the script that calls $props, past a module script", () => {
    const parsed = parseComponentSource(`<script lang="ts" module>
export const FLAG = 1;
</script>
<script lang="ts">
interface Props {
  size?: number;
}
let { size }: Props = $props();
</script>`);

    expect(parsed.props.map((prop) => prop.name)).toEqual(["size"]);
    expect(parsed.propsType).toBe("Props");
  });

  it("reports no props type when the component never calls $props", () => {
    const parsed = parseComponentSource(
      `<script lang="ts">\nconst a = 1;\n</script>`,
    );

    expect(parsed.propsType).toBeUndefined();
    expect(parsed.external).toBe(false);
    expect(parsed.props).toEqual([]);
  });

  it("records optionality and the verbatim type text of each prop", () => {
    const parsed = parseComponentSource(`<script lang="ts">
interface Props {
  required: string;
  optional?: 'a' | 'b';
  noType?;
}
let { required }: Props = $props();
</script>`);

    expect(
      parsed.props.map(({ name, type, optional }) => ({ name, type, optional })),
    ).toEqual([
      { name: "required", type: "string", optional: false },
      { name: "optional", type: "'a' | 'b'", optional: true },
      { name: "noType", type: "unknown", optional: true },
    ]);
  });

  it("joins multiple extended types and leaves bindable false on plain props", () => {
    const parsed = parseComponentSource(`<script lang="ts">
interface Props extends A, Omit<B, 'x'> {
  plain?: number;
}
let { plain = 3 }: Props = $props();
</script>`);

    expect(parsed.extends).toBe("A, Omit<B, 'x'>");
    expect(parsed.props[0].bindable).toBe(false);
    expect(parsed.props[0].default).toBe("3");
  });

  it("leaves default undefined when a prop has neither tag nor destructuring default", () => {
    const parsed = parseComponentSource(`<script lang="ts">
interface Props {
  tone?: string;
}
let { tone }: Props = $props();
</script>`);

    expect(parsed.props[0].default).toBeUndefined();
  });

  it("leaves a bindable with no fallback without a default", () => {
    const parsed = parseComponentSource(`<script lang="ts">
interface Props {
  value?: string;
}
let { value = $bindable() }: Props = $props();
</script>`);

    expect(parsed.props[0].bindable).toBe(true);
    expect(parsed.props[0].default).toBeUndefined();
  });
});

describe("rewriteSvelteLinks", () => {
  it("rewrites a sibling .svelte link through the resolver", () => {
    const doc =
      "See [`Field`](../Field/Field.svelte) and [`Trigger`](./SelectTrigger.svelte).";
    const hrefs: Record<string, string> = {
      Field: "../field/",
      SelectTrigger: "../select/#select-trigger",
    };
    expect(rewriteSvelteLinks(doc, (file) => hrefs[file])).toBe(
      "See [`Field`](../field/) and [`Trigger`](../select/#select-trigger).",
    );
  });

  it("leaves a link the resolver cannot place untouched", () => {
    const doc = "See [`X`](./Unknown.svelte).";
    expect(rewriteSvelteLinks(doc, () => undefined)).toBe(doc);
  });

  it("rewrites every link in a doc and ignores non-svelte links", () => {
    const doc =
      "[a](./A.svelte) [site](https://example.com/B.svelte) [md](./notes.md) [b](../../Dir/B.svelte)";

    expect(rewriteSvelteLinks(doc, (file) => `/${file}/`)).toBe(
      "[a](/A/) [site](https://example.com/B.svelte) [md](./notes.md) [b](/B/)",
    );
  });
});
