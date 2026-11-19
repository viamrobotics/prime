<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { DateRangePicker, type FieldState } from "@viamrobotics/prime-ui";

  type Value = ComponentProps<typeof DateRangePicker>["value"];

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
  <DateRangePicker bind:value {granularity} {disabled} {readonly}>
    <DateRangePicker.Field class="w-80" state={fieldState} aria-label="Date range">
      <DateRangePicker.Trigger aria-label="Open calendar" />
    </DateRangePicker.Field>
    <DateRangePicker.Content>
      <DateRangePicker.Calendar />
    </DateRangePicker.Content>
  </DateRangePicker>

  <p class="text-sm text-subtle-2">
    start: <code>{value?.start?.toString() ?? "none"}</code>, end:
    <code>{value?.end?.toString() ?? "none"}</code>
  </p>
</div>
