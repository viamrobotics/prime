<script lang="ts">
  import { Toast, provideToast, type ToastVariant } from "@viamrobotics/prime-ui";

  const variants: ToastVariant[] = ["info", "success", "warning", "danger"];

  const toast = provideToast();
</script>

<div class="not-content flex flex-wrap gap-2">
  {#each variants as variant (variant)}
    <button type="button" class="button" onclick={() => toast.create({ title: variant, variant })}>
      {variant}
    </button>
  {/each}
  <Toast />
</div>
