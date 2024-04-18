<script lang="ts">
export let variant: 'dark' | 'light';
</script>

<!-- @TODO(mp) Rip this out and make it our canonical loader. -->
<div class="container -ml-1 flex w-4 items-center p-[1.5px]">
  {#each { length: 8 } as _, index}
    <div
      style="
        transform: rotate({index * 45}deg);
        animation-delay: {index * 100}ms;
      "
      class="pill absolute -mt-[0.5px] h-px w-[3px] rounded-[1px] {variant ===
      'dark'
        ? 'bg-gray-8'
        : 'bg-white'}"
    />
  {/each}
</div>

<style>
.pill {
  transform-origin: 6.5px 0.5px;
  animation: 0.8s linear 0s infinite fadeout;
}

@keyframes fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
