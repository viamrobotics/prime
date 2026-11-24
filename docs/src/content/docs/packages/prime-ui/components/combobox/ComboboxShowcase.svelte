<script lang="ts">
  import { Combobox, Field, Input, Label } from "@viamrobotics/prime-ui";

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large", disabled: true },
  ];
</script>

{#snippet list()}
  <Combobox.Content>
    <Combobox.Viewport>
      <Combobox.Items />
      <Combobox.Empty>No matching size</Combobox.Empty>
    </Combobox.Viewport>
  </Combobox.Content>
{/snippet}

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Placeholder, with a disabled item</h4>
    <div class="max-w-xs">
      <Field label="Size" class="flex flex-col gap-1">
        <Label />
        <Combobox items={sizes}>
          <Input.Group>
            <Combobox.Input placeholder="Pick a size" />
            <Combobox.Trigger />
          </Input.Group>
          {@render list()}
        </Combobox>
      </Field>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Error</h4>
    <div class="max-w-xs">
      <Field label="Size" class="flex flex-col gap-1" state="error">
        <Label />
        <Combobox items={sizes}>
          <Input.Group>
            <Combobox.Input placeholder="Pick a size" />
            <Combobox.Trigger />
          </Input.Group>
          {@render list()}
        </Combobox>
      </Field>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Disabled</h4>
    <div class="max-w-xs">
      <Field label="Size" class="flex flex-col gap-1">
        <Label />
        <Combobox items={sizes} value="md" disabled>
          <Input.Group>
            <Combobox.Input />
            <Combobox.Trigger />
          </Input.Group>
          {@render list()}
        </Combobox>
      </Field>
    </div>
  </div>
</div>
