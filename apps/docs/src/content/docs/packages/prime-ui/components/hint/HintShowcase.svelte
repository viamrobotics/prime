<script lang="ts">
  import { Field, Hint, Input, Label } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">States</p>
    <div class="flex flex-col gap-3">
      <Hint>We'll only use this to send you deploy notifications.</Hint>
      <Hint disabled>Unavailable while the field is disabled.</Hint>
      <Hint state="error">That name is already taken.</Hint>
      <Hint state="warn">This name is similar to an existing robot.</Hint>
      <Hint state="info">Names can be changed later.</Hint>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">In a field</p>
    <Field class="flex max-w-xs flex-col gap-1">
      <Label>Robot name</Label>
      <Input placeholder="rover-1" />
      <Hint>Lowercase letters, numbers, and dashes.</Hint>
    </Field>
  </div>
</div>
