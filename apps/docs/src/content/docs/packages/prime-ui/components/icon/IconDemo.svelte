<script lang="ts">
  import { Icon } from "@viamrobotics/prime-ui";
  import Sandbox from "@docs/Sandbox.svelte";
</script>

<Sandbox
  name="Icon"
  component={Icon}
  controls={{
    icon: {
      kind: "select",
      label: "Icon",
      default: "cog",
      options: ["cog", "alert-circle", "information", "check-circle", "viam-service", "ask-ai"],
    },
    size: {
      kind: "select",
      label: "Size",
      default: "xl",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"],
    },
  }}
/>
