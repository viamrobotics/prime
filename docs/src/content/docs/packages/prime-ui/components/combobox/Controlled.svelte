<script lang="ts">
  import { Combobox, Field, Hint, Input, Label } from "@viamrobotics/prime-ui";

  const regions = [
    { value: "us-east", label: "US East" },
    { value: "us-west", label: "US West" },
    { value: "eu-central", label: "EU Central (no capacity)" },
  ];

  let region = $state("us-east");
</script>

<div class="not-content">
  <Field label="Region" class="flex max-w-xs flex-col gap-1">
    <Label />
    <Combobox
      items={regions}
      bind:value={
        () => region,
        (next) => {
          if (next !== "eu-central") region = next;
        }
      }
    >
      <Input.Group>
        <Combobox.Input placeholder="Search regions" />
        <Combobox.Trigger />
      </Input.Group>
      <Combobox.Content>
        <Combobox.Viewport>
          <Combobox.Items />
          <Combobox.Empty>No matching region</Combobox.Empty>
        </Combobox.Viewport>
      </Combobox.Content>
    </Combobox>
    <Hint>EU Central is declined by the setter, so picking it changes nothing.</Hint>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{region}</code></p>
</div>
