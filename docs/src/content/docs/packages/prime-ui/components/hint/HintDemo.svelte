<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { Hint } from "@viamrobotics/prime-ui";
</script>

<Sandbox
  name="Hint"
  component={Hint}
  controls={{
    disabled: { kind: "boolean", label: "Disabled", default: false },
    state: { kind: "select", label: "State", default: "none", options: ["none", "info", "warn", "error"] },
  }}
>
  Lowercase letters, numbers, and dashes.
</Sandbox>
