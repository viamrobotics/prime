<script lang="ts">
  import { RadioGroup } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Horizontal</p>
    <RadioGroup value="md" name="size-horizontal" orientation="horizontal" class="gap-4" aria-label="Size">
      <RadioGroup.Item value="sm">Small</RadioGroup.Item>
      <RadioGroup.Item value="md">Medium</RadioGroup.Item>
      <RadioGroup.Item value="lg">Large</RadioGroup.Item>
    </RadioGroup>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled group</p>
    <RadioGroup value="md" name="size-disabled" disabled aria-label="Size">
      <RadioGroup.Item value="sm">Small</RadioGroup.Item>
      <RadioGroup.Item value="md">Medium</RadioGroup.Item>
      <RadioGroup.Item value="lg">Large</RadioGroup.Item>
    </RadioGroup>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">One disabled item</p>
    <RadioGroup value="sm" name="size-item-disabled" aria-label="Size">
      <RadioGroup.Item value="sm">Small</RadioGroup.Item>
      <RadioGroup.Item value="md" disabled>Medium (sold out)</RadioGroup.Item>
      <RadioGroup.Item value="lg">Large</RadioGroup.Item>
    </RadioGroup>
  </div>
</div>
