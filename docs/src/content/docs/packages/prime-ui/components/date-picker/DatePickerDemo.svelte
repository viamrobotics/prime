<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxDatePicker from "./SandboxDatePicker.svelte";
</script>

<Sandbox
  name="DatePicker"
  component={SandboxDatePicker}
  showCode={false}
  controls={{
    granularity: {
      kind: "select",
      label: "Granularity",
      default: "day",
      options: ["day", "hour", "minute", "second"],
    },
    state: {
      kind: "select",
      label: "State",
      default: "none",
      options: ["none", "info", "warn", "error"],
    },
    disabled: { kind: "boolean", label: "Disabled", default: false },
    readonly: { kind: "boolean", label: "Read only", default: false },
  }}
/>
