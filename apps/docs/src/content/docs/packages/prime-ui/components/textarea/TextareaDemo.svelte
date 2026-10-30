<script lang="ts">
  import { Textarea } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<Sandbox
  name="Textarea"
  component={Textarea}
  controls={{
    rows: { kind: "number", label: "Rows", default: 3, min: 1, max: 10 },
    placeholder: { kind: "text", label: "Placeholder", default: "Describe the machine" },
    disabled: { kind: "boolean", label: "Disabled", default: false },
    readonly: { kind: "boolean", label: "Read-only", default: false },
  }}
/>
