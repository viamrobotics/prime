<script lang="ts">
  import { Checkbox } from "@viamrobotics/prime-ui";

  const states = [
    { label: "unchecked", checked: false, indeterminate: false, disabled: false },
    { label: "checked", checked: true, indeterminate: false, disabled: false },
    { label: "indeterminate", checked: false, indeterminate: true, disabled: false },
    { label: "disabled", checked: false, indeterminate: false, disabled: true },
    { label: "disabled + checked", checked: true, indeterminate: false, disabled: true },
  ];
</script>

<div class="not-content flex flex-wrap gap-6">
  {#each states as { label, checked, indeterminate, disabled } (label)}
    <span class="flex flex-col items-center gap-1">
      <Checkbox {checked} {indeterminate} {disabled} aria-label={label} />
      <span class="text-xs text-subtle-2">{label}</span>
    </span>
  {/each}
</div>
