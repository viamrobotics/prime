<script lang="ts">
  import { Notify, provideNotify, type NotifyVariant } from "@viamrobotics/prime-ui";

  const variants: NotifyVariant[] = ["info", "success", "warning", "danger", "pending"];

  const notify = provideNotify();

  let variant = $state<NotifyVariant>("danger");
  let title = $state("Failed to publish");
  let persist = $state(false);
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
  <label class="flex items-center gap-2 text-sm text-subtle-1">
    <input type="checkbox" bind:checked={persist} />
    Persist
  </label>
  <button
    type="button"
    class="button"
    onclick={() => notify[variant](title, "The module is unreachable.", { persist })}
  >
    Show notification
  </button>
  <Notify />
</div>
