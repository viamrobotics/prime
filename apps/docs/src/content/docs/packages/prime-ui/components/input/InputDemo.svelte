<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import GroupedInput from "./GroupedInput.svelte";
</script>

<Sandbox
  name="Input"
  component={GroupedInput}
  controls={{
    placeholder: { kind: "text", label: "Placeholder", default: "you@viam.com" },
    state: {
      kind: "select",
      label: "State",
      default: "none",
      options: ["none", "info", "warn", "error"],
    },
    disabled: { kind: "boolean", label: "Disabled", default: false },
    readonly: { kind: "boolean", label: "Read-only", default: false },
  }}
/>
