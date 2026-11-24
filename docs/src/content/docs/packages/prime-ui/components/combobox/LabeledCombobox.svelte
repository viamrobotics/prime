<script lang="ts">
  import { Combobox, Field, Input, Label, type FieldState } from "@viamrobotics/prime-ui";

  interface Props {
    disabled?: boolean;
    allowDeselect?: boolean;
    state?: FieldState;
  }

  const { disabled, allowDeselect, state: fieldState }: Props = $props();

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large", disabled: true },
  ];

  let value = $state("md");
</script>

<Field label="Size" class="flex w-64 flex-col gap-1" state={fieldState}>
  <Label />
  <Combobox items={sizes} bind:value {disabled} {allowDeselect}>
    <Input.Group>
      <Combobox.Input placeholder="Pick a size" />
      <Combobox.Trigger />
    </Input.Group>
    <Combobox.Content>
      <Combobox.Viewport>
        <Combobox.Items />
        <Combobox.Empty>No matching size</Combobox.Empty>
      </Combobox.Viewport>
    </Combobox.Content>
  </Combobox>
</Field>
