<script lang="ts">
  import { provideKeybindings } from "@viamrobotics/prime-ui";

  import ListingBody from "./ListingBody.svelte";

  provideKeybindings();
</script>

<div class="not-content">
  <ListingBody />
</div>
