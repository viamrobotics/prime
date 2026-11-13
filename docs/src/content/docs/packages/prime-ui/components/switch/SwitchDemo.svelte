<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { Switch } from "@viamrobotics/prime-ui";
</script>

<Sandbox
  name="Switch"
  component={Switch}
  controls={{
    checked: { kind: "boolean", label: "Checked", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
/>
