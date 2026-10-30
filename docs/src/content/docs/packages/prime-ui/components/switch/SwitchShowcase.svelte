<script lang="ts">
  import { Field, Label, Switch } from "@viamrobotics/prime-ui";

  const states = [
    { label: "off", checked: false, disabled: false },
    { label: "on", checked: true, disabled: false },
    { label: "disabled off", checked: false, disabled: true },
    { label: "disabled on", checked: true, disabled: true },
  ];
</script>

<div class="not-content flex flex-wrap gap-6">
  {#each states as { label, checked, disabled } (label)}
    <span class="flex flex-col items-center gap-1">
      <Switch {checked} {disabled} aria-label={label} />
      <span class="text-xs text-subtle-2">{label}</span>
    </span>
  {/each}
  <Field state="error" class="flex items-center gap-2">
    <Switch />
    <Label>error</Label>
  </Field>
</div>
