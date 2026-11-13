<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { StatusDot } from "@viamrobotics/prime-ui";
</script>

<Sandbox
  name="StatusDot"
  component={StatusDot}
  controls={{
    state: {
      kind: "select",
      label: "State",
      default: "success",
      options: ["info", "warning", "success", "danger", "disabled"],
    },
    variant: { kind: "select", label: "Variant", default: "solid", options: ["solid", "hollow"] },
    working: { kind: "boolean", label: "Working", default: false },
    label: { kind: "text", label: "Label", default: "Online" },
  }}
/>
