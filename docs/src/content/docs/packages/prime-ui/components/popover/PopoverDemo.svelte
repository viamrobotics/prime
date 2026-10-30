<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxPopover from "./SandboxPopover.svelte";
</script>

<!-- `side` and `align` belong to Popover.Content, so the generated snippet would mislead. -->
<Sandbox
  name="Popover"
  component={SandboxPopover}
  showCode={false}
  controls={{
    side: {
      kind: "select",
      label: "Side",
      default: "bottom",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      kind: "select",
      label: "Align",
      default: "center",
      options: ["start", "center", "end"],
    },
  }}
/>
