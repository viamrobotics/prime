<script lang="ts">
  import { NumberInput } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<Sandbox
  name="NumberInput"
  component={NumberInput}
  controls={{
    value: { kind: "number", label: "Value", default: 3 },
    min: { kind: "number", label: "Min", default: 0 },
    max: { kind: "number", label: "Max", default: 10 },
    step: { kind: "number", label: "Step", default: 1 },
    state: {
      kind: "select",
      label: "State",
      default: "none",
      options: ["none", "info", "warn", "error"],
    },
  }}
>
  <NumberInput.StateIcon />
</Sandbox>
