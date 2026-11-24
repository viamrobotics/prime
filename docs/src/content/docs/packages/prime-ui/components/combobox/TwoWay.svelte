<script lang="ts">
  import { Combobox, Field, Input, Label } from "@viamrobotics/prime-ui";

  const resources = [
    { value: "camera", label: "Camera" },
    { value: "motor", label: "Motor" },
    { value: "base", label: "Base" },
    { value: "arm", label: "Arm" },
    { value: "sensor", label: "Sensor" },
  ];

  let resource = $state("motor");
  let query = $state("");
</script>

<div class="not-content">
  <Field label="Resource type" class="flex max-w-xs flex-col gap-1">
    <Label />
    <Combobox bind:value={resource} bind:query items={resources}>
      <Input.Group>
        <Combobox.Input placeholder="Search resource types" />
        <Combobox.Trigger />
      </Input.Group>
      <Combobox.Content>
        <Combobox.Viewport>
          <Combobox.Items />
          <Combobox.Empty>No matching resource type</Combobox.Empty>
        </Combobox.Viewport>
      </Combobox.Content>
    </Combobox>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">
    value: <code>{resource}</code>, query: <code>{JSON.stringify(query)}</code>
  </p>
</div>
