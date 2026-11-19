<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { DateRangePicker, Field, Hint, Label } from "@viamrobotics/prime-ui";

  const MAX_DAYS = 7;

  let value = $state<ComponentProps<typeof DateRangePicker>["value"]>();

  const withinLimit = (next: typeof value) => {
    if (!next?.start || !next.end) return true;
    return next.start.add({ days: MAX_DAYS - 1 }).compare(next.end) >= 0;
  };
</script>

<div class="not-content">
  <Field class="flex max-w-sm flex-col gap-1">
    <Label>Export window</Label>
    <DateRangePicker
      bind:value={
        () => value,
        (next) => {
          if (withinLimit(next)) value = next;
        }
      }
    >
      <DateRangePicker.Field>
        <DateRangePicker.Trigger />
      </DateRangePicker.Field>
      <DateRangePicker.Content>
        <DateRangePicker.Calendar />
      </DateRangePicker.Content>
    </DateRangePicker>
    <Hint>
      Ranges longer than {MAX_DAYS} days are declined by the setter, so picking one changes nothing.
    </Hint>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">
    start: <code>{value?.start?.toString() ?? "none"}</code>, end:
    <code>{value?.end?.toString() ?? "none"}</code>
  </p>
</div>
