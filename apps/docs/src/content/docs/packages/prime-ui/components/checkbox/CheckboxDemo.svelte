<script lang="ts">
  import { Checkbox } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<Sandbox
  name="Checkbox"
  component={Checkbox}
  controls={{
    checked: { kind: "boolean", label: "Checked", default: false },
    indeterminate: { kind: "boolean", label: "Indeterminate", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
/>
