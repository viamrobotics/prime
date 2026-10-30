<script lang="ts">
  import { Progress } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<Sandbox
  name="Progress"
  component={Progress}
  controls={{
    value: { kind: "number", label: "Value", default: 40, min: 0, max: 100 },
    label: { kind: "text", label: "Label", default: "Upload" },
  }}
/>
