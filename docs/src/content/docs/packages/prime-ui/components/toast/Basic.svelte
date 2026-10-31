<script lang="ts">
  import { Toast, provideToast } from "@viamrobotics/prime-ui";

  import BasicActions from "./BasicActions.svelte";

  provideToast();
</script>

<div class="not-content">
  <BasicActions />
  <Toast />
</div>
