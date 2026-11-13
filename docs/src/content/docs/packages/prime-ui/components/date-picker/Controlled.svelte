<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { DatePicker, Field, Hint, Label } from "@viamrobotics/prime-ui";

  let value = $state<ComponentProps<typeof DatePicker>["value"]>();
</script>

<div class="not-content">
  <Field class="flex max-w-xs flex-col gap-1">
    <Label>Billing day</Label>
    <DatePicker
      bind:value={
        () => value,
        (next) => {
          if (!next || next.day <= 28) value = next;
        }
      }
    >
      <DatePicker.Field>
        <DatePicker.Trigger />
      </DatePicker.Field>
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
    <Hint>Days after the 28th are declined by the setter, so picking one changes nothing.</Hint>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{value?.toString() ?? "none"}</code></p>
</div>
