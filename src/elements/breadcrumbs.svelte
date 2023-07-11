<svelte:options immutable />

<script lang="ts">
export let crumbs = '';

let parsedCrumbs: string[];

$: parsedCrumbs = crumbs.split(',').map((str) => str.trim());
</script>

<div
  class="inline-flex gap-2.5 px-3 py-px border border-medium bg-light text-default rounded-full"
>
  {#each parsedCrumbs as crumb, index (crumb)}
    <small class="text-xs">
      {crumb}
    </small>
    {#if index !== parsedCrumbs.length - 1}
      <div>
        <div
          class="w-px h-[69%] border-l border-medium -rotate-[30deg] -mt-0.5"
        />
        <div
          class="w-px h-[69%] border-l border-medium rotate-[30deg] -mt-0.5"
        />
      </div>
    {/if}
  {/each}
</div>
