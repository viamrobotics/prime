<script lang="ts">
  import { Field, Label, RadioGroup } from "@viamrobotics/prime-ui";

  let size = $state("md");
</script>

<div class="not-content">
  <Field class="flex flex-col gap-1">
    <Label>Size</Label>
    <RadioGroup bind:value={size} name="size">
      <RadioGroup.Item value="sm">Small</RadioGroup.Item>
      <RadioGroup.Item value="md">Medium</RadioGroup.Item>
      <RadioGroup.Item value="lg">Large</RadioGroup.Item>
    </RadioGroup>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{size}</code></p>
</div>
