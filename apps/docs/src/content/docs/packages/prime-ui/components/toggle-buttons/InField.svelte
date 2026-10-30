<script lang="ts">
  import { Field, Hint, Label, ToggleButtons } from "@viamrobotics/prime-ui";

  const items = [
    { value: "mm", label: "mm" },
    { value: "cm", label: "cm" },
    { value: "in", label: "in" },
  ];

  let units = $state("mm");
</script>

<div class="not-content">
  <Field class="flex flex-col gap-1">
    <Label>Units</Label>
    <ToggleButtons bind:value={units} {items} />
    <Hint>Applies to every measurement on the page.</Hint>
  </Field>
</div>
