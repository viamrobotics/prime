<script lang="ts">
  import { Field, Label, RadioGroup } from "@viamrobotics/prime-ui";

  let size = $state("md");
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Two-way bound, in a field</p>
    <Field class="flex flex-col gap-1">
      <Label>Size</Label>
      <RadioGroup bind:value={size} name="size">
        <RadioGroup.Item value="sm">Small</RadioGroup.Item>
        <RadioGroup.Item value="md">Medium</RadioGroup.Item>
        <RadioGroup.Item value="lg">Large</RadioGroup.Item>
      </RadioGroup>
    </Field>
    <p class="text-sm text-subtle-2">value: <code>{size}</code></p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Horizontal</p>
    <RadioGroup value="md" name="size-horizontal" orientation="horizontal" aria-label="Size">
      <RadioGroup.Item value="sm">Small</RadioGroup.Item>
      <RadioGroup.Item value="md">Medium</RadioGroup.Item>
      <RadioGroup.Item value="lg">Large</RadioGroup.Item>
    </RadioGroup>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled</p>
    <RadioGroup value="md" name="size-disabled" disabled aria-label="Size">
      <RadioGroup.Item value="sm">Small</RadioGroup.Item>
      <RadioGroup.Item value="md">Medium</RadioGroup.Item>
      <RadioGroup.Item value="lg">Large</RadioGroup.Item>
    </RadioGroup>
  </div>
</div>
