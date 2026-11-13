<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { Checkbox } from "@viamrobotics/prime-ui";
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
