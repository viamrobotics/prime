<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import LabeledSwitch from "./LabeledSwitch.svelte";
</script>

<Sandbox
  name="Switch"
  component={LabeledSwitch}
  controls={{
    checked: { kind: "boolean", label: "Checked", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
/>
