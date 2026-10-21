<script lang="ts">
  import { Field, Input } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Validation states, with Field.StateIcon</p>
    <div class="grid max-w-md gap-3">
      <Input placeholder="Default (none)" aria-label="Default" />
      <Input.Group>
        <Input state="info" placeholder="Info" aria-label="Info" />
        <Field.StateIcon state="info" />
      </Input.Group>
      <Input.Group>
        <Input state="warn" placeholder="Warning" aria-label="Warning" />
        <Field.StateIcon state="warn" />
      </Input.Group>
      <Input.Group>
        <Input state="error" placeholder="Error" aria-label="Error" />
        <Field.StateIcon state="error" />
      </Input.Group>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Disabled and read-only</p>
    <div class="grid max-w-md gap-3">
      <Input disabled placeholder="Disabled" aria-label="Disabled" />
      <Input readonly value="Read-only value" aria-label="Read-only" />
    </div>
  </div>
</div>
