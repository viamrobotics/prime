<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxTooltip from "./SandboxTooltip.svelte";
</script>

<!-- `side` belongs to Tooltip.Content, so the generated snippet would mislead. -->
<Sandbox
  name="Tooltip"
  component={SandboxTooltip}
  showCode={false}
  controls={{
    side: {
      kind: "select",
      label: "Side",
      default: "top",
      options: ["top", "right", "bottom", "left"],
    },
    openDelay: {
      kind: "number",
      label: "Open delay (ms)",
      default: 300,
      min: 0,
      max: 2000,
      step: 50,
    },
    interactive: { kind: "boolean", label: "Interactive", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
/>
