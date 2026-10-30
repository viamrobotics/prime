<script lang="ts">
  import { Progress } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  {#each [0, 50, 100] as value (value)}
    <div class="flex flex-col gap-2">
      <p class="text-xs font-medium text-subtle-2 uppercase">{value}</p>
      <Progress {value} label="{value} percent" />
    </div>
  {/each}

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Indeterminate</p>
    <Progress label="Loading" />
  </div>
</div>
