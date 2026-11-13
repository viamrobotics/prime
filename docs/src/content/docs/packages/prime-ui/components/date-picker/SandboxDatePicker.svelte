<script lang="ts">
  import { DatePicker, type FieldState } from "@viamrobotics/prime-ui";
  import type { ComponentProps } from "svelte";

  type Value = ComponentProps<typeof DatePicker>["value"];

  interface Props {
    granularity?: "day" | "hour" | "minute" | "second";
    disabled?: boolean;
    readonly?: boolean;
    state?: FieldState;
  }

  const { granularity, disabled, readonly, state: fieldState }: Props = $props();

  let value = $state<Value>();
</script>

<div class="not-content flex flex-col gap-3">
  <DatePicker bind:value {granularity} {disabled} {readonly}>
    <DatePicker.Field class="w-64" state={fieldState} aria-label="Date">
      <DatePicker.Trigger aria-label="Open calendar" />
    </DatePicker.Field>
    <DatePicker.Content>
      <DatePicker.Calendar />
    </DatePicker.Content>
  </DatePicker>

  <p class="text-sm text-subtle-2">value: <code>{value?.toString() ?? "none"}</code></p>
</div>
