<script lang="ts">
  import { Switch } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<Sandbox
  name="Switch"
  component={Switch}
  controls={{
    checked: { kind: "boolean", label: "Checked", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
/>
