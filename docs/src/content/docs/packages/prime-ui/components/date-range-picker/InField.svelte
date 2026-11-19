<script lang="ts">
  import { DateRangePicker, Field, Hint, Label } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Field class="flex max-w-sm flex-col gap-1" required>
    <Label>Billing period</Label>
    <DateRangePicker>
      <DateRangePicker.Field>
        <DateRangePicker.Trigger />
      </DateRangePicker.Field>
      <DateRangePicker.Content>
        <DateRangePicker.Calendar />
      </DateRangePicker.Content>
    </DateRangePicker>
    <Hint>The first and last day of the invoice.</Hint>
  </Field>
</div>
