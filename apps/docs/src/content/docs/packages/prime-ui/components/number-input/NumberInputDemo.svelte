<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import GroupedNumberInput from "./GroupedNumberInput.svelte";
</script>

<Sandbox
  name="NumberInput"
  component={GroupedNumberInput}
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
/>
