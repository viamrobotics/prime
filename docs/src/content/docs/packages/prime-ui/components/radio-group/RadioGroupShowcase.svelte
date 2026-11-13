<script lang="ts">
  import { Field, Label, RadioGroup } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Horizontal</h4>
    <RadioGroup value="md" name="size-horizontal" orientation="horizontal" class="gap-4" aria-label="Size">
      <RadioGroup.Item value="sm">Small</RadioGroup.Item>
      <RadioGroup.Item value="md">Medium</RadioGroup.Item>
      <RadioGroup.Item value="lg">Large</RadioGroup.Item>
    </RadioGroup>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Disabled group</h4>
    <RadioGroup value="md" name="size-disabled" disabled aria-label="Size">
      <RadioGroup.Item value="sm">Small</RadioGroup.Item>
      <RadioGroup.Item value="md">Medium</RadioGroup.Item>
      <RadioGroup.Item value="lg">Large</RadioGroup.Item>
    </RadioGroup>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Error</h4>
    <Field state="error" class="flex flex-col gap-2">
      <Label>Size</Label>
      <RadioGroup value="md" name="size-error">
        <RadioGroup.Item value="sm">Small</RadioGroup.Item>
        <RadioGroup.Item value="md">Medium</RadioGroup.Item>
        <RadioGroup.Item value="lg">Large</RadioGroup.Item>
      </RadioGroup>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">One disabled item</h4>
    <RadioGroup value="sm" name="size-item-disabled" aria-label="Size">
      <RadioGroup.Item value="sm">Small</RadioGroup.Item>
      <RadioGroup.Item value="md" disabled>Medium (sold out)</RadioGroup.Item>
      <RadioGroup.Item value="lg">Large</RadioGroup.Item>
    </RadioGroup>
  </div>
</div>
