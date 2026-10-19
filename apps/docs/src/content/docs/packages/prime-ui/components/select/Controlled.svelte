<script lang="ts">
  import { Field, Hint, Label, Select } from "@viamrobotics/prime-ui";

  const regions = [
    { value: "us-east", label: "US East" },
    { value: "us-west", label: "US West" },
    { value: "eu-central", label: "EU Central (no capacity)" },
  ];

  let region = $state("us-east");
</script>

<div class="not-content">
  <Field class="flex max-w-xs flex-col gap-1">
    <Label>Region</Label>
    <Select
      items={regions}
      bind:value={
        () => region,
        (next) => {
          if (next !== "eu-central") region = next;
        }
      }
    >
      <Select.Trigger>
        <Select.Value placeholder="Pick a region" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            <Select.Items />
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select>
    <Hint>EU Central is declined by the setter, so picking it changes nothing.</Hint>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{region}</code></p>
</div>
