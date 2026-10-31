<script lang="ts">
  import { provideKeybindings } from "@viamrobotics/prime-ui";

  import BasicHotkeys from "./BasicHotkeys.svelte";

  provideKeybindings();
</script>

<div class="not-content">
  <BasicHotkeys />
</div>
