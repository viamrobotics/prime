<!--
@component
  
A navigation aid that helps users understand the relationships between parents and children.

```svelte
<Breadcrumbs crumbs={['Dessert', 'Cookie']} />
```
-->
<svelte:options immutable />

<script lang="ts">
/** A list of each part. */
export let crumbs: [string, ...string[]];
</script>

<div
  class="border-medium bg-light text-default inline-flex gap-2.5 rounded-full border px-2.5 py-px"
>
  {#each crumbs as crumb, index (crumb)}
    <small class="text-xs">
      {crumb}
    </small>
    {#if index !== crumbs.length - 1}
      <div>
        <div
          class="border-medium -mt-0.5 h-[69%] w-px -rotate-[30deg] border-l"
        />
        <div
          class="border-medium -mt-0.5 h-[69%] w-px rotate-[30deg] border-l"
        />
      </div>
    {/if}
  {/each}
</div>
