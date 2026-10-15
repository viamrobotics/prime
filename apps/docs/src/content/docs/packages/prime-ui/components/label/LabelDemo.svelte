<script lang="ts">
  import { Label } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<Sandbox
  name="Label"
  component={Label}
  controls={{
    required: { kind: "boolean", label: "Required", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
>
  Email address
</Sandbox>
