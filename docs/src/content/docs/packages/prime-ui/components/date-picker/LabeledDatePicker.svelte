<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { DatePicker, type FieldState } from "@viamrobotics/prime-ui";

  interface Props extends ComponentProps<typeof DatePicker> {
    state?: FieldState;
  }

  let { value = $bindable(), state: fieldState, ...rest }: Props = $props();
</script>

<div class="not-content flex flex-col gap-3">
  <DatePicker bind:value {...rest}>
    <DatePicker.Field aria-label="Date" class="w-64" state={fieldState}>
      <DatePicker.Trigger />
    </DatePicker.Field>
    <DatePicker.Content>
      <DatePicker.Calendar />
    </DatePicker.Content>
  </DatePicker>

  <p class="text-sm text-subtle-2">value: <code>{value?.toString() ?? "none"}</code></p>
</div>
