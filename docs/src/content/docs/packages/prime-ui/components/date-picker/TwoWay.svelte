<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { DatePicker, Field, Label } from "@viamrobotics/prime-ui";

  let value = $state<ComponentProps<typeof DatePicker>["value"]>();
</script>

<div class="not-content">
  <Field class="flex max-w-xs flex-col gap-1">
    <Label>Deploy date</Label>
    <DatePicker bind:value name="deploy">
      <DatePicker.Field>
        <DatePicker.Trigger />
      </DatePicker.Field>
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{value?.toString() ?? "none"}</code></p>
</div>
