<script lang="ts">
  import { Field, ToggleButtons } from "@viamrobotics/prime-ui";

  const items = [
    { value: "mm", label: "mm" },
    { value: "cm", label: "cm" },
    { value: "in", label: "in" },
  ];

  let units = $state("mm");
</script>

<div class="not-content">
  <Field aria-label="Units">
    <ToggleButtons bind:value={units} {items} />
  </Field>

  <p class="mt-3 text-sm text-subtle-2">value: <code>{units}</code></p>
</div>
