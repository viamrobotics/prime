<svelte:options immutable />

<script lang="ts">
export let crumbs = '';

let parsedCrumbs: string[];

$: parsedCrumbs = crumbs.split(',').map((str) => str.trim());
</script>

<div
  class="inline-flex gap-2.5 rounded-full border border-medium bg-light px-3 py-px text-default"
>
  {#each parsedCrumbs as crumb, index (crumb)}
    <small class="text-xs">
      {crumb}
    </small>
    {#if index !== parsedCrumbs.length - 1}
      <div>
        <div
          class="-mt-0.5 h-[69%] w-px -rotate-[30deg] border-l border-medium"
        />
        <div
          class="-mt-0.5 h-[69%] w-px rotate-[30deg] border-l border-medium"
        />
      </div>
    {/if}
  {/each}
</div>
