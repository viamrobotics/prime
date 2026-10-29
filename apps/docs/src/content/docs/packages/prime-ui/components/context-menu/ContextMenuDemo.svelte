<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxContextMenu from "./SandboxContextMenu.svelte";
</script>

<!-- The area and items live in SandboxContextMenu, so the generated snippet would mislead. -->
<Sandbox name="ContextMenu" component={SandboxContextMenu} showCode={false} controls={{}} />
