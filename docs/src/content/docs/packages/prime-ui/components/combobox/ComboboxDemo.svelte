<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxCombobox from "./SandboxCombobox.svelte";
</script>

<Sandbox
  name="Combobox"
  component={SandboxCombobox}
  showCode={false}
  controls={{
    state: {
      kind: "select",
      label: "State",
      default: "none",
      options: ["none", "info", "warn", "error"],
    },
    allowDeselect: { kind: "boolean", label: "Allow deselect", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
/>
