<script lang="ts">
  import { Field, Input, NumberInput } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Error state, with Field.StateIcon</p>
    <Input.Group class="w-40">
      <NumberInput state="error" value={42} min={0} max={10} aria-label="Out of range" />
      <Field.StateIcon state="error" />
    </Input.Group>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled and read-only</p>
    <div class="grid max-w-3xs gap-3">
      <Input.Group>
        <NumberInput disabled value={3} aria-label="Disabled" />
      </Input.Group>
      <Input.Group>
        <NumberInput readonly value={3} aria-label="Read-only" />
      </Input.Group>
    </div>
  </div>
</div>
