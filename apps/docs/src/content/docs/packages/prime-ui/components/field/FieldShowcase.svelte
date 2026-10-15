<script lang="ts">
  import { Checkbox, Field, Hint, Input, Label, RadioGroup, Select } from "@viamrobotics/prime-ui";

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
  ];

  let name = $state("");
  let size = $state("md");
  let shape = $state("square");
  let agreed = $state(false);
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Input: required, error, disabled</p>
    <div class="grid max-w-md gap-4">
      <Field class="flex flex-col gap-1" required>
        <Label>Robot name</Label>
        <Input bind:value={name} placeholder="rover-1" />
        <Hint>Lowercase letters, numbers, and dashes.</Hint>
      </Field>
      <Field class="flex flex-col gap-1" state="error">
        <Label>Robot name</Label>
        <Input value="Rover 1">
          <Input.StateIcon />
        </Input>
        <Hint>Lowercase letters, numbers, and dashes.</Hint>
        <Hint>Spaces and capitals are not allowed.</Hint>
      </Field>
      <Field class="flex flex-col gap-1" disabled>
        <Label>Robot name</Label>
        <Input value="rover-1" />
        <Hint>Unavailable while the part is offline.</Hint>
      </Field>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Select</p>
    <Field class="flex max-w-md flex-col gap-1">
      <Label>Size</Label>
      <Select bind:value={size} items={sizes}>
        <Select.Trigger>
          <Select.Value placeholder="Pick a size" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Viewport>
              {#each sizes as item (item.value)}
                <Select.Item value={item.value} label={item.label} />
              {/each}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select>
      <Hint>Applies to every new part.</Hint>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">RadioGroup, named by the label</p>
    <Field class="flex max-w-md flex-col gap-1">
      <Label>Shape</Label>
      <RadioGroup bind:value={shape} name="shape">
        <RadioGroup.Item value="square">Square</RadioGroup.Item>
        <RadioGroup.Item value="round">Round</RadioGroup.Item>
      </RadioGroup>
      <Hint>The label reaches the group through aria-labelledby.</Hint>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Checkbox</p>
    <Field class="grid max-w-md grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1" required>
      <Checkbox bind:checked={agreed} />
      <Label>Accept the terms</Label>
      <Hint class="col-start-2">Required before the part can be deployed.</Hint>
    </Field>
  </div>
</div>
