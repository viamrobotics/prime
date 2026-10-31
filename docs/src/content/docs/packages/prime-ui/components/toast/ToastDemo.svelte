<script lang="ts">
  import { Toast, provideToast, type ToastVariant } from "@viamrobotics/prime-ui";

  const variants: ToastVariant[] = ["info", "success", "warning", "danger"];

  const toast = provideToast();

  let variant = $state<ToastVariant>("success");
  let title = $state("Saved");
</script>

<div class="not-content flex flex-wrap items-end gap-3">
  <label class="flex flex-col gap-1 text-sm text-subtle-1">
    Variant
    <select class="rounded-sm border border-medium bg-medium px-2 py-1" bind:value={variant}>
      {#each variants as option (option)}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </label>
  <label class="flex flex-col gap-1 text-sm text-subtle-1">
    Title
    <input class="rounded-sm border border-medium bg-medium px-2 py-1" bind:value={title} />
  </label>
  <button type="button" class="button" onclick={() => toast.create({ title, variant })}>
    Show toast
  </button>
  <Toast />
</div>
