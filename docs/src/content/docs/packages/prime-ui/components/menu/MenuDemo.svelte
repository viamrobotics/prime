<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxMenu from "./SandboxMenu.svelte";
</script>

<!-- `side` and `align` belong to Menu.Content, so the generated snippet would mislead. -->
<Sandbox
  name="Menu"
  component={SandboxMenu}
  showCode={false}
  controls={{
    side: {
      kind: "select",
      label: "Side",
      default: "bottom",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      kind: "select",
      label: "Align",
      default: "start",
      options: ["start", "center", "end"],
    },
  }}
/>
