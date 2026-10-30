<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxTabs from "./SandboxTabs.svelte";
</script>

<!-- The wrapper composes the parts in a loop, so the generated snippet would mislead. -->
<Sandbox
  name="Tabs"
  component={SandboxTabs}
  showCode={false}
  controls={{
    count: { kind: "number", label: "Tabs", default: 3, min: 1, max: 4, step: 1 },
    disabled: { kind: "boolean", label: "Disable second tab", default: false },
  }}
/>
