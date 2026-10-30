<script lang="ts">
  import { Hint } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<Sandbox
  name="Hint"
  component={Hint}
  controls={{
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
>
  Lowercase letters, numbers, and dashes.
</Sandbox>
