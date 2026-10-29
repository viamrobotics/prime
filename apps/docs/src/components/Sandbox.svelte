<!--
@component
Docs playground shell: renders a live prime-ui component above a controls panel
built from prime-ui's own inputs, so tweaking a control re-renders the component.

`controls` is keyed by the target component's prop names; each entry seeds a
control and its default value. Pass inner content (e.g. `RadioGroup.Item`s) as
children.

```svelte
<Sandbox
  name="Checkbox"
  component={Checkbox}
  controls={{
    checked: { kind: 'boolean', label: 'Checked', default: false },
    disabled: { kind: 'boolean', label: 'Disabled', default: false }
  }}
/>
```
-->
<script lang="ts" generics="Props extends ComponentProps<any>">
  import { Checkbox, Field, Input, Label, NumberInput, Select } from "@viamrobotics/prime-ui";
  import type { Component, ComponentProps, Snippet } from "svelte";

  type Control =
    | { kind: "text"; label: string; default: string }
    | { kind: "number"; label: string; default: number; min?: number; max?: number; step?: number }
    | { kind: "boolean"; label: string; default: boolean }
    | { kind: "select"; label: string; default: string; options: string[] };

  interface Props_ {
    /** The component to render live. */
    component: Component<Props>;

    /** Controls keyed by the target component's prop names. */
    controls: Partial<Record<keyof Props, Control>>;

    /** Tag name used in the generated code snippet. */
    name?: string;

    /** Show the generated markup below the preview. @default true */
    showCode?: boolean;

    /** Inner content forwarded into the previewed component. */
    children?: Snippet;
  }

  const { component, controls, name = "Component", showCode = true, children }: Props_ = $props();

  const entries = $derived(Object.entries(controls) as [string, Control][]);

  const seed = (): Partial<Props> => {
    const initial: Partial<Props> = {};
    for (const [key, control] of Object.entries(controls) as [string, Control][]) {
      initial[key as keyof Props] = control.default as Props[keyof Props];
    }
    return initial;
  };

  const values = $state(seed());

  const set = (key: string, value: unknown) => {
    values[key as keyof Props] = value as Props[keyof Props];
  };

  const Preview = $derived(component);

  const code = $derived.by(() => {
    const props = entries
      .map(([key]) => {
        const value = values[key as keyof Props];
        return typeof value === "string" ? `  ${key}="${value}"` : `  ${key}={${String(value)}}`;
      })
      .join("\n");
    return props ? `<${name}\n${props}\n/>` : `<${name} />`;
  });
</script>

<div class="overflow-hidden rounded-lg border border-light not-content">
  <div class="flex min-h-32 items-center justify-center bg-white p-8">
    {#if children}
      <Preview {...values as Props}>{@render children()}</Preview>
    {:else}
      <Preview {...values as Props} />
    {/if}
  </div>

  <div class="flex flex-col gap-2 border-t border-light bg-light p-4">
    {#each entries as [key, control] (key)}
      {#if control.kind === "boolean"}
        <Field class="flex items-center gap-2">
          <Checkbox
            bind:checked={() => values[key as keyof Props] as boolean, (v) => set(key, v)}
          />
          <Label>{control.label}</Label>
        </Field>
      {:else if control.kind === "number"}
        <Field class="flex flex-col gap-1">
          <Label>{control.label}</Label>
          <NumberInput
            value={values[key as keyof Props] as number}
            min={control.min}
            max={control.max}
            step={control.step}
            oninput={(e) => set(key, e.currentTarget.valueAsNumber)}
          />
        </Field>
      {:else if control.kind === "select"}
        <Field class="flex flex-col gap-1">
          <Label>{control.label}</Label>
          <Select
            items={control.options.map((option) => ({ value: option, label: option }))}
            bind:value={() => values[key as keyof Props] as string, (v) => set(key, v)}
          >
            <Select.Trigger>
              <Select.Value placeholder={control.label} />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content>
                <Select.Viewport>
                  {#each control.options as option (option)}
                    <Select.Item value={option} label={option} />
                  {/each}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select>
        </Field>
      {:else}
        <Field class="flex flex-col gap-1">
          <Label>{control.label}</Label>
          <Input
            value={values[key as keyof Props] as string}
            oninput={(e) => set(key, e.currentTarget.value)}
          />
        </Field>
      {/if}
    {/each}
  </div>

  {#if showCode}
    <pre
      class="overflow-x-auto border-t border-light bg-gray-1 p-4 font-mono text-xs text-default"><code
        >{code}</code
      ></pre>
  {/if}
</div>
