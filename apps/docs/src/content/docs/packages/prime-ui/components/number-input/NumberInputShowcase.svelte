<script lang="ts">
  import { Field, Label, NumberInput } from "@viamrobotics/prime-ui";

  let count = $state<number | undefined>(3);
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Two-way bound</p>
    <Field class="flex max-w-3xs flex-col gap-1">
      <Label>Quantity</Label>
      <NumberInput bind:value={count} min={0} max={10} step={1} />
    </Field>
    <p class="text-sm text-subtle-2">value: <code>{count ?? "undefined"}</code></p>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Error state, with StateIcon</p>
    <div class="max-w-3xs">
      <NumberInput state="error" value={42} min={0} max={10} aria-label="Out of range">
        <NumberInput.StateIcon />
      </NumberInput>
    </div>
  </div>
</div>
