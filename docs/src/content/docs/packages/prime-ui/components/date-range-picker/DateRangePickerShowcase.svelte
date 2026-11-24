<script lang="ts">
  import { DateRangePicker, Field, Hint, Label } from "@viamrobotics/prime-ui";
</script>

{#snippet picker(label: string)}
  <DateRangePicker.Field class="w-80">
    <DateRangePicker.Trigger aria-label={label} />
  </DateRangePicker.Field>
  <DateRangePicker.Content>
    <DateRangePicker.Calendar />
  </DateRangePicker.Content>
{/snippet}

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Default</h4>
    <Field aria-label="Date range">
      <DateRangePicker>
        {@render picker("Date range")}
      </DateRangePicker>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">In a field, with label and hint</h4>
    <Field label="Billing period" class="flex max-w-sm flex-col gap-1" required>
      <Label />
      <DateRangePicker>
        <DateRangePicker.Field>
          <DateRangePicker.Trigger aria-label="Billing period" />
        </DateRangePicker.Field>
        <DateRangePicker.Content>
          <DateRangePicker.Calendar />
        </DateRangePicker.Content>
      </DateRangePicker>
      <Hint>The first and last day of the invoice.</Hint>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Error</h4>
    <Field label="Billing period" class="flex max-w-sm flex-col gap-1" state="error">
      <Label />
      <DateRangePicker>
        <DateRangePicker.Field>
          <DateRangePicker.Trigger aria-label="Billing period" />
        </DateRangePicker.Field>
        <DateRangePicker.Content>
          <DateRangePicker.Calendar />
        </DateRangePicker.Content>
      </DateRangePicker>
      <Hint>Pick both a start and an end date.</Hint>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Warn</h4>
    <Field label="Billing period" class="flex max-w-sm flex-col gap-1" state="warn">
      <Label />
      <DateRangePicker>
        <DateRangePicker.Field>
          <DateRangePicker.Trigger aria-label="Billing period" />
        </DateRangePicker.Field>
        <DateRangePicker.Content>
          <DateRangePicker.Calendar />
        </DateRangePicker.Content>
      </DateRangePicker>
      <Hint>This period is in the past.</Hint>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Disabled</h4>
    <Field aria-label="Date range">
      <DateRangePicker disabled>
        {@render picker("Date range")}
      </DateRangePicker>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Read only</h4>
    <Field aria-label="Date range">
      <DateRangePicker readonly>
        {@render picker("Date range")}
      </DateRangePicker>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Minute granularity</h4>
    <Field aria-label="Date and time range">
      <DateRangePicker granularity="minute">
        {@render picker("Date and time range")}
      </DateRangePicker>
    </Field>
  </div>
</div>
