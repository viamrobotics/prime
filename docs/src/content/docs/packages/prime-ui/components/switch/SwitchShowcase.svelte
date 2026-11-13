<script lang="ts">
  import { Field, Label, Switch } from "@viamrobotics/prime-ui";

  const states = [
    { label: "off", checked: false, disabled: false },
    { label: "on", checked: true, disabled: false },
    { label: "disabled off", checked: false, disabled: true },
    { label: "disabled on", checked: true, disabled: true },
  ];

  const tones = [
    { label: "info", className: "switch-info" },
    { label: "success", className: "switch-success" },
    { label: "warning", className: "switch-warning" },
    { label: "danger", className: "switch-danger" },
  ];
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Default</h4>
    <div class="flex flex-wrap gap-6">
      {#each states as { label, checked, disabled } (label)}
        <span class="flex flex-col items-center gap-1">
          <Switch {checked} {disabled} aria-label={label} />
          <span class="text-xs text-subtle-2">{label}</span>
        </span>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Tone, while on</h4>
    <div class="flex flex-wrap gap-6">
      {#each tones as { label, className } (label)}
        <span class="flex flex-col items-center gap-1">
          <Switch checked class={className} aria-label={label} />
          <span class="text-xs text-subtle-2">{label}</span>
        </span>
      {/each}
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Error</h4>
    <div class="flex flex-wrap gap-6">
      <Field state="error" class="flex items-center gap-2">
        <Switch />
        <Label>off</Label>
      </Field>
      <Field state="error" class="flex items-center gap-2">
        <Switch checked />
        <Label>on</Label>
      </Field>
    </div>
  </div>
</div>
