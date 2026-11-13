<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { Progress } from "@viamrobotics/prime-ui";
</script>

<Sandbox
  name="Progress"
  component={Progress}
  controls={{
    value: { kind: "number", label: "Value", default: 40, min: 0, max: 100 },
    label: { kind: "text", label: "Label", default: "Upload" },
  }}
/>
