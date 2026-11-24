<script lang="ts">
  import { Field, Input } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Validation states, with Field.StateIcon</h4>
    <div class="grid max-w-md gap-3">
      <Field aria-label="Default" class="grid">
        <Input placeholder="Default (none)" />
      </Field>
      <Field aria-label="Info" state="info" class="grid">
        <Input.Group>
          <Input placeholder="Info" />
          <Field.StateIcon />
        </Input.Group>
      </Field>
      <Field aria-label="Warning" state="warn" class="grid">
        <Input.Group>
          <Input placeholder="Warning" />
          <Field.StateIcon />
        </Input.Group>
      </Field>
      <Field aria-label="Error" state="error" class="grid">
        <Input.Group>
          <Input placeholder="Error" />
          <Field.StateIcon />
        </Input.Group>
      </Field>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Disabled and read-only</h4>
    <div class="grid max-w-md gap-3">
      <Field aria-label="Disabled" disabled class="grid">
        <Input placeholder="Disabled" />
      </Field>
      <Field aria-label="Read-only" class="grid">
        <Input readonly value="Read-only value" />
      </Field>
    </div>
  </div>
</div>
