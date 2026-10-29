<script lang="ts">
  import { MultiSelect, type FieldState } from "@viamrobotics/prime-ui";

  interface Props {
    disabled?: boolean;
    state?: FieldState;
  }

  const { disabled, state: fieldState }: Props = $props();

  const toppings = [
    { value: "cheese", label: "Cheese" },
    { value: "olives", label: "Olives" },
    { value: "peppers", label: "Peppers" },
    { value: "anchovies", label: "Anchovies", disabled: true },
  ];

  let value = $state(["cheese"]);
</script>

<MultiSelect items={toppings} bind:value {disabled}>
  <MultiSelect.Trigger class="w-64" state={fieldState} aria-label="Toppings">
    <MultiSelect.Value placeholder="Pick toppings" />
  </MultiSelect.Trigger>
  <MultiSelect.Portal>
    <MultiSelect.Content>
      <MultiSelect.Viewport>
        <MultiSelect.Items />
      </MultiSelect.Viewport>
    </MultiSelect.Content>
  </MultiSelect.Portal>
</MultiSelect>
