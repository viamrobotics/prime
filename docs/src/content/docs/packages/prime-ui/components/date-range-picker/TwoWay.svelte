<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { DateRangePicker, Field, Label } from "@viamrobotics/prime-ui";

  let value = $state<ComponentProps<typeof DateRangePicker>["value"]>();

  const status = $derived.by(() => {
    if (!value) return "nothing chosen";
    if (value.start && value.end) return "finished range";
    return "half chosen, pick an end";
  });
</script>

<div class="not-content">
  <Field label="Reporting period" class="flex max-w-sm flex-col gap-1">
    <Label />
    <DateRangePicker bind:value name="period">
      <DateRangePicker.Field>
        <DateRangePicker.Trigger />
      </DateRangePicker.Field>
      <DateRangePicker.Content>
        <DateRangePicker.Calendar />
      </DateRangePicker.Content>
    </DateRangePicker>
  </Field>

  <ul class="mt-3 flex flex-col gap-1 text-sm text-subtle-2">
    <li>start: <code>{value?.start?.toString() ?? "none"}</code></li>
    <li>end: <code>{value?.end?.toString() ?? "none"}</code></li>
    <li>status: {status}</li>
  </ul>
</div>
