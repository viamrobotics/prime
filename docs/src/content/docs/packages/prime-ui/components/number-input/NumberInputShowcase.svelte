<script lang="ts">
  import { Field, Input, NumberInput } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Error state, with Field.StateIcon</h4>
    <Field aria-label="Out of range" state="error">
      <Input.Group class="w-40">
        <NumberInput value={42} min={0} max={10} />
        <Field.StateIcon />
      </Input.Group>
    </Field>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Disabled and read-only</h4>
    <div class="grid max-w-3xs gap-3">
      <Field aria-label="Disabled" disabled class="grid">
        <Input.Group>
          <NumberInput value={3} />
        </Input.Group>
      </Field>
      <Field aria-label="Read-only" class="grid">
        <Input.Group>
          <NumberInput readonly value={3} />
        </Input.Group>
      </Field>
    </div>
  </div>
</div>
