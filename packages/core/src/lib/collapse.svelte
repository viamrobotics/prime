<!--
@component
  
An element that Toggles visibility of content.

```svelte
    <Collapse
      title='Motor 1'
    >
      <Breadcrumbs slot='title' crumbs={['Robot', 'Motor']}></Breadcrumbs>
      <Badge slot='header' label='Inactive'></Badge>
      <div slot='content' "text-sm p-4 border border-t-0 border-light">Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen.</div>
    </Collapse>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { createEventDispatcher } from 'svelte';
import { Icon } from '$lib';

/**
 * The title for the collapse component.
 */
export let title = '';
/**
 * Whether the collapse is in the open position.
 */
export let open = false;

type Events = {
  /** Fires when the collapse is toggled */
  toggle: boolean 
}

const dispatch = createEventDispatcher<Events>();

const handleClick = () => {
  open = !open;
  dispatch('toggle', open);
};
</script>

<div class="relative w-full">
  <div
    role="button"
    aria-label="Toggle Content"
    tabindex="0"
    class="w-full py-2 px-4 flex items-center justify-between text-default cursor-pointer border border-light bg-white"
    on:click={handleClick}
    on:keyup|preventDefault={handleClick}
  >
    <div class="flex flex-wrap gap-x-3 gap-y-1 items-center">
      {#if title}
        <h2 class="m-0 text-sm">{title}</h2>
      {/if}

      <slot name="title" />
    </div>

    <div class="h-full flex items-center gap-3">
      <slot name="header" />

      <div
      class={cx(
        'transition-transform duration-200',
        {
          'rotate-0': !open,
          'rotate-180': open,
        }
      )}
    >
      <Icon name="chevron-down" />
    </div>
    </div>
  </div>

  {#if open}
      <slot name="content"/>
  {/if}
</div>
