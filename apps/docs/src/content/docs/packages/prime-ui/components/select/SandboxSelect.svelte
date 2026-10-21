<script lang="ts">
  import { Select, type FieldState } from "@viamrobotics/prime-ui";
  import type { ComponentProps } from "svelte";

  type Placement = Pick<ComponentProps<typeof Select.Content>, "side" | "align">;

  interface Props extends Placement {
    disabled?: boolean;
    state?: FieldState;
  }

  const { side, align, disabled, state: fieldState }: Props = $props();

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large", disabled: true },
  ];

  let value = $state("md");
</script>

<Select items={sizes} bind:value {disabled}>
  <Select.Trigger class="w-64" state={fieldState} aria-label="Size">
    <Select.Value placeholder="Pick a size" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content {side} {align}>
      <Select.Viewport>
        <Select.Items />
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select>
