<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxChart from "./SandboxChart.svelte";
</script>

<!-- The wrapper maps a control onto the y bounds, so the generated snippet would mislead. The legend hides series. -->
<Sandbox
  name="Chart"
  component={SandboxChart}
  showCode={false}
  controls={{
    fixedBounds: { kind: "boolean", label: "Fixed y bounds (0 to 100)", default: false },
    loading: { kind: "boolean", label: "Loading", default: false },
  }}
/>
