<script lang="ts">
  import { DatePicker, Field, Hint, Label } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Field label="Start date" class="flex max-w-xs flex-col gap-1" required>
    <Label />
    <DatePicker name="start">
      <DatePicker.Field>
        <DatePicker.Trigger />
      </DatePicker.Field>
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
    <Hint>The first day of the billing period.</Hint>
  </Field>
</div>
