<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import LabeledFileInput from "./LabeledFileInput.svelte";
</script>

<Sandbox
  name="FileInput"
  component={LabeledFileInput}
  controls={{
    placeholder: { kind: "text", label: "Placeholder", default: "No file chosen" },
    multiple: { kind: "boolean", label: "Multiple", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
    state: {
      kind: "select",
      label: "State",
      default: "none",
      options: ["none", "info", "warn", "error"],
    },
  }}
/>
