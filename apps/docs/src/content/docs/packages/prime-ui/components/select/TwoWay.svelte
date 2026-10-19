<script lang="ts">
  import { Field, Label, Select } from "@viamrobotics/prime-ui";

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
  ];

  let size = $state("md");
</script>

<div class="not-content">
  <Field class="flex max-w-xs flex-col gap-1">
    <Label>Size</Label>
    <Select bind:value={size} items={sizes} name="size">
      <Select.Trigger>
        <Select.Value placeholder="Pick a size" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            <Select.Items />
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{size}</code></p>
</div>
