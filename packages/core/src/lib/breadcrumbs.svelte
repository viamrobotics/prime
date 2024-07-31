<!--
@component

A navigation aid that helps users understand the relationships between parents and children.

```svelte
<Breadcrumbs crumbs={['Dessert', 'Cookie']} />
```
-->
<svelte:options immutable />

<script lang="ts">
import classnames from 'classnames';

/** A list of each part. */
export let crumbs: [string, ...string[]];

/** Render the breadcrumbs as disabled. */
export let isDisabled = false;

/** Additional CSS classes to pass to the breadcrumbs container. */
export let cx: classnames.Argument = '';
</script>

<div
  class={classnames(
    'inline-flex gap-2.5 rounded-full border border-medium bg-light px-2.5 py-px',
    isDisabled ? 'text-disabled' : 'text-default',
    cx
  )}
>
  {#each crumbs as crumb, index (crumb)}
    <small class="truncate text-xs">
      {crumb}
    </small>
    {#if index !== crumbs.length - 1}
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
