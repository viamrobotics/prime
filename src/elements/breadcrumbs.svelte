<svelte:options immutable tag="v-breadcrumbs" />

<script lang="ts">
import { addStyles } from '../lib/index';

export let crumbs = '';

addStyles();

let parsedCrumbs: string[];

$: parsedCrumbs = crumbs.split(',').map((str) => str.trim());
</script>

<div
  class="inline-flex gap-3 -ml-1 px-4 border border-border-2 bg-bg-2 text-text-default rounded-full"
>
  {#each parsedCrumbs as crumb, index (crumb)}
    <small class="py1">
      {crumb}
    </small>
    {#if index !== parsedCrumbs.length - 1}
      <div>
        <div
          class="w-px h-[60%] border-l border-border-2 -rotate-[30deg] -mt-px"
        />
        <div
          class="w-px h-[60%] border-l border-border-2 rotate-[30deg] -mt-0.5"
        />
      </div>
    {/if}
  {/each}
</div>
