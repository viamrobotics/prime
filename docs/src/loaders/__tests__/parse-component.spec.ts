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
});
