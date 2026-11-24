<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import LabeledCheckbox from "./LabeledCheckbox.svelte";
</script>

<Sandbox
  name="Checkbox"
  component={LabeledCheckbox}
  controls={{
    checked: { kind: "boolean", label: "Checked", default: false },
    indeterminate: { kind: "boolean", label: "Indeterminate", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
/>
