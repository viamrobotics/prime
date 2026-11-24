<script lang="ts">
  import { Field, Select } from "@viamrobotics/prime-ui";

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
  ];

  let size = $state("md");
</script>

<div class="not-content max-w-xs pt-32">
  <Field aria-label="Size">
    <Select items={sizes} bind:value={size}>
      <Select.Trigger class="w-64">
        <Select.Value placeholder="Pick a size" />
      </Select.Trigger>
      <Select.Content side="top" align="end">
        <Select.Viewport>
          <Select.Items />
        </Select.Viewport>
      </Select.Content>
    </Select>
  </Field>
</div>
