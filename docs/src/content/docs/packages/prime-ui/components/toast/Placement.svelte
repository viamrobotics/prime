<script lang="ts">
  import { Toast, provideToast } from "@viamrobotics/prime-ui";

  const toast = provideToast({ placement: "top-end" });
</script>

<div class="not-content">
  <button type="button" class="button" onclick={() => toast.info("Copied")}>Copy</button>
  <Toast />
</div>
