<script lang="ts">
  import { Field, Hint, Label, NumberInput } from "@viamrobotics/prime-ui";

  let count = $state<number | undefined>(3);
</script>

<div class="not-content">
  <Field class="flex max-w-3xs flex-col gap-1">
    <Label>Quantity</Label>
    <NumberInput bind:value={count} min={0} max={10} step={1} />
    <Hint>Clear the field and the value becomes undefined.</Hint>
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{count ?? "undefined"}</code></p>
</div>
