<script lang="ts">
  import { Combobox, Field, Input, Label, type ComboboxFilter } from "@viamrobotics/prime-ui";

  const components = [
    { value: "left-motor", label: "left-motor" },
    { value: "right-motor", label: "right-motor" },
    { value: "motor-controller", label: "motor-controller" },
    { value: "front-camera", label: "front-camera" },
    { value: "camera-mount", label: "camera-mount" },
  ];

  const startsWith: ComboboxFilter = (option, query) =>
    option.label.toLowerCase().startsWith(query.trim().toLowerCase());

  let component = $state("");
</script>

<div class="not-content">
  <Field class="flex max-w-xs flex-col gap-1">
    <Label>Component</Label>
    <Combobox bind:value={component} items={components} filter={startsWith}>
      <Input.Group>
        <Combobox.Input placeholder="Starts with..." />
        <Combobox.Trigger />
      </Input.Group>
      <Combobox.Content>
        <Combobox.Viewport>
          <Combobox.Items />
          <Combobox.Empty>No component starts with that</Combobox.Empty>
        </Combobox.Viewport>
      </Combobox.Content>
    </Combobox>
  </Field>
</div>
