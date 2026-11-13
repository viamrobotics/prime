<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { Textarea } from "@viamrobotics/prime-ui";
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
