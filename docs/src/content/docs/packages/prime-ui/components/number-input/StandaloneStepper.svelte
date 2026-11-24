<script lang="ts">
  import { Field, Label, NumberInput } from "@viamrobotics/prime-ui";

  let quantity = $state<number | undefined>(3);
</script>

<div class="not-content">
  <Field label="Quantity" class="flex flex-col items-start gap-1">
    <Label />
    <NumberInput bind:value={quantity} min={0} max={10} class="w-32" />
  </Field>
</div>
