<script lang="ts">
  import { NumberInput } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Error state, with StateIcon</p>
    <div class="max-w-3xs">
      <NumberInput state="error" value={42} min={0} max={10} aria-label="Out of range">
        <NumberInput.StateIcon />
      </NumberInput>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled and read-only</p>
    <div class="grid max-w-3xs gap-3">
      <NumberInput disabled value={3} aria-label="Disabled" />
      <NumberInput readonly value={3} aria-label="Read-only" />
    </div>
  </div>
</div>
