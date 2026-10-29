<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxMultiSelect from "./SandboxMultiSelect.svelte";
</script>

<!-- `state` belongs to MultiSelect.Trigger, so the generated snippet would mislead. -->
<Sandbox
  name="MultiSelect"
  component={SandboxMultiSelect}
  showCode={false}
  controls={{
    state: {
      kind: "select",
      label: "State",
      default: "none",
      options: ["none", "info", "warn", "error"],
    },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
/>
