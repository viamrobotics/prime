<svelte:options
  immutable
  accessors
/>

<script lang="ts">
import cx from 'classnames';
import { Icon } from '$lib';

export let open = false;
export let element: HTMLUListElement;
export let button: { text: string; icon: string } | undefined = undefined;
export let heading = '';

/** Additional CSS classes to pass to the menu. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<div
  class={cx(
    'border-gray-9 z-max absolute left-0 right-0 top-full mt-1 w-full overflow-hidden border bg-white drop-shadow-md',
    {
      invisible: !open,
    },
    extraClasses
  )}
>
  {#if heading}
    <span class="text-default flex flex-wrap py-1 pl-2 text-xs">
      {heading}
    </span>
  {/if}
  <ul
    role="menu"
    class="scrollbar-thin scrollbar-black scrollbar-w-1.5 scrollbar-track-transparent scrollbar-thumb-black scrollbar-thumb-border-0 scrollbar-thumb-border-transparent flex max-h-36 flex-col overflow-y-auto"
    tabindex="-1"
    bind:this={element}
    on:mouseleave
    {...$$restProps}
  >
    <slot />
  </ul>
  {#if button !== undefined}
    <button
      type="button"
      class="hover:bg-light border-light flex h-[30px] w-full items-center border-t px-2 py-1 text-xs"
    >
      <Icon
        name={button.icon}
        size="sm"
      />

      <span class="pl-1.5">{button.text}</span>
    </button>
  {/if}
</div>
