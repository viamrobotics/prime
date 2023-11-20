<!--
@component
  
For displaying a list of items.

```svelte
<ResourcePill value="BeagleBone" on:remove={onRemove} />
```
-->
<svelte:options immutable />

<script lang="ts">
import { Icon, type IconName } from '$lib';
import cx from 'classnames';

import { createEventDispatcher } from 'svelte';

/** The text in the resource pill. */
export let value = '';

/** Whether or not the resource pill is removable. If removable, there is a button to remove the resource pill. */
export let removable = false;

/** Additional CSS classes to pass to the resource pill. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

/** The icon shown in the button. */
export let icon: IconName;

const dispatch = createEventDispatcher<{
  /** When the resource pill is removed. */
  remove: { value: string };
}>();

const handleRemove = () => {
  dispatch('remove', { value });
};
</script>

<div
  class={cx(
    'flex h-6 max-w-fit items-center gap-1.5 whitespace-nowrap rounded border border-medium bg-light pl-1.5 pr-2 text-xs',
    extraClasses
  )}
>
  <Icon
    name={icon}
    cx="text-gray-6"
    size="sm"
  />

  <span>
    {value}
  </span>

  {#if removable}
    <button
      on:click={handleRemove}
      class="text-gray-6 hover:text-default"
      aria-label="remove"
    >
      <Icon
        name="close"
        size="xs"
      />
    </button>
  {/if}
</div>
