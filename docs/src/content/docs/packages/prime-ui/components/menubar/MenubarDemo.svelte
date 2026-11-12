<script lang="ts">
  import Sandbox from "@docs/Sandbox.svelte";

  import SandboxMenubar from "./SandboxMenubar.svelte";
</script>

<!-- The bar and its menus live in SandboxMenubar, so the generated snippet would mislead. -->
<Sandbox name="Menubar" component={SandboxMenubar} showCode={false} controls={{}} />
