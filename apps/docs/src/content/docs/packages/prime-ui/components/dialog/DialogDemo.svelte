<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxDialog from "./SandboxDialog.svelte";
</script>

<!-- `width` is a class on Dialog.Content, so the generated snippet would mislead. -->
<Sandbox
  name="Dialog"
  component={SandboxDialog}
  showCode={false}
  controls={{
    width: {
      kind: "select",
      label: "Width class",
      default: "max-w-md",
      options: ["max-w-sm", "max-w-md", "max-w-2xl"],
    },
  }}
/>
