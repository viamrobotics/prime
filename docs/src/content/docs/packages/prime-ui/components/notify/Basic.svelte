<script lang="ts">
  import { Notify, provideNotify } from "@viamrobotics/prime-ui";

  import BasicActions from "./BasicActions.svelte";

  provideNotify();
</script>

<div class="not-content">
  <BasicActions />
  <Notify />
</div>
