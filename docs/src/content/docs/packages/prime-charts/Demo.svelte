<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxChart from "./SandboxChart.svelte";
</script>

<!-- The wrapper maps each control onto bounds and hidden series, so the generated snippet would mislead. -->
<Sandbox
  name="Chart"
  component={SandboxChart}
  showCode={false}
  controls={{
    fixedBounds: { kind: "boolean", label: "Fixed y bounds (0 to 100)", default: false },
    loading: { kind: "boolean", label: "Loading", default: false },
    hideCell01: { kind: "boolean", label: "Hide cell-01", default: false },
    hideCell02: { kind: "boolean", label: "Hide cell-02", default: false },
    hideCell03: { kind: "boolean", label: "Hide cell-03", default: false },
  }}
/>
