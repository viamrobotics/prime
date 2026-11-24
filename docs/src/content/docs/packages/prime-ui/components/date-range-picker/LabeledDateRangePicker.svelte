<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { DateRangePicker, type FieldState } from "@viamrobotics/prime-ui";

  interface Props extends ComponentProps<typeof DateRangePicker> {
    state?: FieldState;
  }

  let { value = $bindable(), state: fieldState, ...rest }: Props = $props();
</script>

<div class="not-content flex flex-col gap-3">
  <DateRangePicker bind:value {...rest}>
    <DateRangePicker.Field aria-label="Date range" class="w-80" state={fieldState}>
      <DateRangePicker.Trigger />
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
