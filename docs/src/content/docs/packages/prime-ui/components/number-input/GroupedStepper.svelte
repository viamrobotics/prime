<script lang="ts">
  import { Field, Input, Label, NumberInput } from "@viamrobotics/prime-ui";

  let length = $state<number | undefined>(12.5);
</script>

<div class="not-content">
  <Field label="Length" class="flex flex-col items-start gap-1">
    <Label />
    <Input.Group class="w-40">
      <NumberInput bind:value={length} min={0} step={0.5} />
      <span class="shrink-0 text-subtle-2">mm</span>
    </Input.Group>
  </Field>
</div>
