<script lang="ts">
  import { Collapsible } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<!-- The parts are composed as children, so the generated snippet would omit them. -->
<Sandbox
  name="Collapsible"
  component={Collapsible}
  showCode={false}
  controls={{
    open: { kind: "boolean", label: "Open", default: false },
    disabled: { kind: "boolean", label: "Disabled", default: false },
  }}
>
  <Collapsible.Trigger class="font-semibold">Advanced</Collapsible.Trigger>
  <Collapsible.Content class="pt-2 text-sm">Extra settings live here.</Collapsible.Content>
</Sandbox>
