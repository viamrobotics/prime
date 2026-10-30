<script lang="ts">
  import { ToggleButtons } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<!-- The Sandbox cannot edit an `items` array, so the options are composed and the generated snippet would mislead. -->
<Sandbox
  name="ToggleButtons"
  component={ToggleButtons}
  showCode={false}
  controls={{
    value: { kind: "select", label: "Value", default: "mm", options: ["mm", "cm", "in"] },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
>
  <ToggleButtons.Item value="mm">mm</ToggleButtons.Item>
  <ToggleButtons.Item value="cm">cm</ToggleButtons.Item>
  <ToggleButtons.Item value="in">in</ToggleButtons.Item>
</Sandbox>
