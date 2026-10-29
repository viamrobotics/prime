<script lang="ts">
  let isDark = $state(false);
</script>

<div
  class={[
    "border-light bg-white text-default flex flex-col gap-3 rounded-sm border p-4",
    { dark: isDark },
  ]}
>
  <button
    type="button"
    class="button self-start"
    aria-pressed={isDark}
    onclick={() => (isDark = !isDark)}
  >
    Dark mode
  </button>
  <p class="text-heading font-medium">Tokens inside this box</p>
  <p class="text-subtle-1 text-sm">
    <code class="text-code">dark:</code> is
    <span class="dark:hidden">inactive</span><span class="hidden dark:inline">active</span>
  </p>
  <div class="grid grid-cols-3 gap-2 text-sm">
    <div class="bg-extralight border-light rounded-sm border p-3">bg-extralight</div>
    <div class="bg-light border-light rounded-sm border p-3">bg-light</div>
    <div class="bg-medium border-light rounded-sm border p-3">bg-medium</div>
  </div>
  <div class="bg-success-light text-success-dark border-success-medium rounded-sm border p-3 text-sm">
    Success tokens
  </div>
  <div class="bg-danger-light text-danger-dark border-danger-medium rounded-sm border p-3 text-sm">
    Danger tokens
  </div>
</div>
