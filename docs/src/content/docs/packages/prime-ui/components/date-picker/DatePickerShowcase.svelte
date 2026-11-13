<script lang="ts">
  import { DatePicker, Field, Hint, Label } from "@viamrobotics/prime-ui";
</script>

{#snippet picker(label: string)}
  <DatePicker.Field class="w-64" aria-label={label}>
    <DatePicker.Trigger aria-label={label} />
  </DatePicker.Field>
  <DatePicker.Content>
    <DatePicker.Calendar />
  </DatePicker.Content>
{/snippet}

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Default</h4>
    <DatePicker>
      {@render picker("Date")}
    </DatePicker>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">In a field, with label and hint</h4>
    <Field class="flex max-w-xs flex-col gap-1" required>
      <Label>Start date</Label>
      <DatePicker>
        <DatePicker.Field>
          <DatePicker.Trigger aria-label="Start date" />
        </DatePicker.Field>
        <DatePicker.Content>
          <DatePicker.Calendar />
        </DatePicker.Content>
      </DatePicker>
      <Hint>The first day of the billing period.</Hint>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Error</h4>
    <Field class="flex max-w-xs flex-col gap-1" state="error">
      <Label>Start date</Label>
      <DatePicker>
        <DatePicker.Field>
          <DatePicker.Trigger aria-label="Start date" />
        </DatePicker.Field>
        <DatePicker.Content>
          <DatePicker.Calendar />
        </DatePicker.Content>
      </DatePicker>
      <Hint>Pick a start date.</Hint>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Warn</h4>
    <Field class="flex max-w-xs flex-col gap-1" state="warn">
      <Label>Start date</Label>
      <DatePicker>
        <DatePicker.Field>
          <DatePicker.Trigger aria-label="Start date" />
        </DatePicker.Field>
        <DatePicker.Content>
          <DatePicker.Calendar />
        </DatePicker.Content>
      </DatePicker>
      <Hint>This date is in the past.</Hint>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Disabled</h4>
    <DatePicker disabled>
      {@render picker("Date")}
    </DatePicker>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Read only</h4>
    <DatePicker readonly>
      {@render picker("Date")}
    </DatePicker>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Minute granularity</h4>
    <DatePicker granularity="minute">
      {@render picker("Date and time")}
    </DatePicker>
  </div>
</div>
