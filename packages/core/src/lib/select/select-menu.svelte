<svelte:options
  immutable
  accessors
/>

<script lang="ts">
import cx from 'classnames';

export let open = false;
export let element: HTMLUListElement;

/** Additional CSS classes to pass to the menu. */

let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<div
  class={cx(
    'absolute inset-x-0 top-full z-max mt-1 w-full overflow-hidden border border-gray-9 bg-white shadow-md',
    {
      invisible: !open,
    },
    extraClasses
  )}
>
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
</div>
