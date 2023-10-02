<svelte:options
  immutable
  accessors
/>

<script lang="ts">
import cx from 'classnames';
import { Icon, type IconName } from '$lib';

export let open = false;
export let element: HTMLUListElement;
export let button: { text: string; icon: IconName } | undefined = undefined;
export let heading = '';

/** Additional CSS classes to pass to the menu. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<div
  class={cx(
    'absolute left-0 right-0 top-full z-max mt-1 w-full overflow-hidden border border-gray-9 bg-white drop-shadow-md',
    {
      invisible: !open,
    },
    extraClasses
  )}
>
  {#if heading}
    <span class="flex flex-wrap py-1 pl-2 text-xs text-default">
      {heading}
    </span>
  {/if}
  <ul
    role="menu"
    class="flex max-h-36 flex-col overflow-y-auto scrollbar-thin scrollbar-black scrollbar-w-1.5 scrollbar-track-transparent scrollbar-thumb-black scrollbar-thumb-border-0 scrollbar-thumb-border-transparent"
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
      class="flex h-7.5 w-full items-center border-t border-light px-2 py-1 text-xs hover:bg-light"
    >
      <Icon
        name={button.icon}
        size="sm"
      />

      <span class="pl-1.5">{button.text}</span>
    </button>
  {/if}
</div>
