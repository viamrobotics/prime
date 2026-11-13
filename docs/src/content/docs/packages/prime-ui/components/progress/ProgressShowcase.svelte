<script lang="ts">
  import { Progress } from "@viamrobotics/prime-ui";

  const TONE_VALUE = 60;

  const tones = [
    { label: "info", className: "progress-info" },
    { label: "success", className: "progress-success" },
    { label: "warning", className: "progress-warning" },
    { label: "danger", className: "progress-danger" },
  ];
</script>

<div class="not-content flex flex-col gap-6">
  {#each [0, 50, 100] as value (value)}
    <div class="flex flex-col gap-2">
      <h4 class="text-xs font-medium text-subtle-2 uppercase">{value}</h4>
      <Progress {value} label="{value} percent" />
    </div>
  {/each}

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Indeterminate</h4>
    <Progress label="Loading" />
  </div>

  {#each tones as { label, className } (label)}
    <div class="flex flex-col gap-2">
      <h4 class="text-xs font-medium text-subtle-2 uppercase">{label}</h4>
      <Progress value={TONE_VALUE} class={className} label="{label} tone" />
    </div>
  {/each}
</div>
