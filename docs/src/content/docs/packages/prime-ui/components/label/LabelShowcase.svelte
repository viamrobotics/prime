<script lang="ts">
  import { Field, Input, Label } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">States</p>
    <div class="flex flex-col gap-3">
      <Label>Default label</Label>
      <Label required>Required label</Label>
      <Label disabled>Disabled label</Label>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">In a field</p>
    <Field class="flex max-w-xs flex-col gap-1" required>
      <Label>Email</Label>
      <Input type="email" placeholder="you@viam.com" />
    </Field>
  </div>
</div>
