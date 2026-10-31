<script lang="ts">
  import { Notify, provideNotify, type NotifyVariant } from "@viamrobotics/prime-ui";

  const variants: NotifyVariant[] = ["info", "success", "warning", "danger", "pending"];

  const notify = provideNotify();
</script>

<div class="not-content flex flex-wrap gap-2">
  {#each variants as variant (variant)}
    <button
      type="button"
      class="button"
      onclick={() => notify[variant](variant, "A short explanation of what happened.")}
    >
      {variant}
    </button>
  {/each}
  <Notify />
</div>
