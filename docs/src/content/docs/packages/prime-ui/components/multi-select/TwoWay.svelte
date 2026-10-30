<script lang="ts">
  import { Field, Label, MultiSelect } from "@viamrobotics/prime-ui";

  const toppings = [
    { value: "cheese", label: "Cheese" },
    { value: "olives", label: "Olives" },
    { value: "peppers", label: "Peppers" },
  ];

  let picked = $state(["cheese"]);
</script>

<div class="not-content">
  <Field class="flex max-w-xs flex-col gap-1">
    <Label>Toppings</Label>
    <MultiSelect bind:value={picked} items={toppings} name="toppings">
      <MultiSelect.Trigger>
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
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{JSON.stringify(picked)}</code></p>
</div>
