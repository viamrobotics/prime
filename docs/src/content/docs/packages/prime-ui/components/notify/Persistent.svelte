<script lang="ts">
  import { Notify, provideNotify } from "@viamrobotics/prime-ui";

  const notify = provideNotify();

  let dismissed = $state(0);
</script>

<div class="not-content flex items-center gap-3">
  <button
    type="button"
    class="button"
    onclick={() =>
      notify.warning("Machine offline", "It stays until you dismiss it.", {
        persist: true,
        onDismiss: () => dismissed++,
      })}
  >
    Go offline
  </button>
  <span class="text-sm text-subtle-1">Dismissed {dismissed} times</span>
  <Notify />
</div>
