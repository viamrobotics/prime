<script lang="ts">
  import { Field, Hint, Label, MultiSelect } from "@viamrobotics/prime-ui";

  const MAX_TOPPINGS = 2;

  const toppings = [
    { value: "cheese", label: "Cheese" },
    { value: "olives", label: "Olives" },
    { value: "peppers", label: "Peppers" },
    { value: "mushrooms", label: "Mushrooms" },
  ];

  let picked = $state(["cheese"]);
</script>

<div class="not-content">
  <Field class="flex max-w-xs flex-col gap-1">
    <Label>Toppings</Label>
    <MultiSelect
      items={toppings}
      bind:value={
        () => picked,
        (next) => {
          if (next.length <= MAX_TOPPINGS) picked = next;
        }
      }
    >
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
    <Hint>Up to {MAX_TOPPINGS}. A third pick is refused.</Hint>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{JSON.stringify(picked)}</code></p>
</div>
