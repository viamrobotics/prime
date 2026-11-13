<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { Label } from "@viamrobotics/prime-ui";
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
