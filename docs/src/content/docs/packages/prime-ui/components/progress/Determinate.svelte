<script lang="ts">
  import { Progress } from "@viamrobotics/prime-ui";

  let value = $state(40);
</script>

<div class="not-content flex flex-col gap-3">
  <Progress {value} label="Upload" />
  <input type="range" min="0" max="100" aria-label="Value" bind:value />
  <p class="text-sm text-subtle-2">value: <code>{value}</code></p>
</div>
