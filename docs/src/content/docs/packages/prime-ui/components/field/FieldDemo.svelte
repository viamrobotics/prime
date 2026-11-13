<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { Field, Hint, Input, Label } from "@viamrobotics/prime-ui";
</script>

<Sandbox
  name="Field"
  component={Field}
  controls={{
    required: { kind: "boolean", label: "Required", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
    state: { kind: "select", label: "State", default: "none", options: ["none", "info", "warn", "error"] },
  }}
>
  <Label>Robot name</Label>
  <Input.Group>
    <Input placeholder="rover-1" />
    <Field.StateIcon />
  </Input.Group>
  <Hint>Lowercase letters, numbers, and dashes.</Hint>
</Sandbox>
