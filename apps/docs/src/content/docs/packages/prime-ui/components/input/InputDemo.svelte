<script lang="ts">
  import { Input } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<Sandbox
  name="Input"
  component={Input}
  controls={{
    placeholder: { kind: "text", label: "Placeholder", default: "you@viam.com" },
    state: {
      kind: "select",
      label: "State",
      default: "none",
      options: ["none", "info", "warn", "error"],
    },
    disabled: { kind: "boolean", label: "Disabled", default: false },
    readonly: { kind: "boolean", label: "Read-only", default: false },
  }}
>
  <Input.StateIcon />
</Sandbox>
