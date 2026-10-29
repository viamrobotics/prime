<script lang="ts">
  import { MultiSelect } from "@viamrobotics/prime-ui";

  const toppings = [
    { value: "cheese", label: "Cheese" },
    { value: "olives", label: "Olives" },
    { value: "peppers", label: "Peppers" },
    { value: "anchovies", label: "Anchovies", disabled: true },
  ];
</script>

{#snippet options()}
  <MultiSelect.Portal>
    <MultiSelect.Content>
      <MultiSelect.Viewport>
        <MultiSelect.Items />
      </MultiSelect.Viewport>
    </MultiSelect.Content>
  </MultiSelect.Portal>
{/snippet}

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Placeholder, with a disabled item</p>
    <MultiSelect items={toppings}>
      <MultiSelect.Trigger class="w-64" aria-label="Toppings">
        <MultiSelect.Value placeholder="Pick toppings" />
      </MultiSelect.Trigger>
      {@render options()}
    </MultiSelect>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Several values</p>
    <MultiSelect items={toppings} value={["cheese", "olives", "peppers"]}>
      <MultiSelect.Trigger class="w-64" aria-label="Toppings">
        <MultiSelect.Value placeholder="Pick toppings" />
      </MultiSelect.Trigger>
      {@render options()}
    </MultiSelect>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Error</p>
    <MultiSelect items={toppings}>
      <MultiSelect.Trigger class="w-64" aria-label="Toppings" state="error">
        <MultiSelect.Value placeholder="Pick toppings" />
      </MultiSelect.Trigger>
      {@render options()}
    </MultiSelect>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled</p>
    <MultiSelect items={toppings} value={["cheese"]} disabled>
      <MultiSelect.Trigger class="w-64" aria-label="Toppings">
        <MultiSelect.Value placeholder="Pick toppings" />
      </MultiSelect.Trigger>
      {@render options()}
    </MultiSelect>
  </div>
</div>
