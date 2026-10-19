<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";
  import { mdiCog } from "@mdi/js";
  import { Icon } from "@viamrobotics/prime-ui";
</script>

<Sandbox
  name="Icon"
  component={Icon}
  controls={{
    icon: {
      kind: "text",
      label: "Icon (SVG path)",
      default: mdiCog,
    },
    size: {
      kind: "select",
      label: "Size",
      default: "xl",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"],
    },
  }}
/>
