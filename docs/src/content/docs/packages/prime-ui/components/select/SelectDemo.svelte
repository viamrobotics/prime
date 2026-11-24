<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import LabeledSelect from "./LabeledSelect.svelte";
</script>

<!-- `side` and `align` belong to Select.Content, so the generated snippet would mislead. -->
<Sandbox
  name="Select"
  component={LabeledSelect}
  showCode={false}
  controls={{
    side: {
      kind: "select",
      label: "Side",
      default: "bottom",
      options: ["top", "right", "bottom", "left"],
    },
    align: { kind: "select", label: "Align", default: "start", options: ["start", "center", "end"] },
    state: {
      kind: "select",
      label: "State",
      default: "none",
      options: ["none", "info", "warn", "error"],
    },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
/>
