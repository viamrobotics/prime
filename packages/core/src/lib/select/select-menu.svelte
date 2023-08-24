<svelte:options
  immutable
  accessors
/>

<script lang="ts">
import cx from 'classnames';
import { Icon } from '$lib';

export let open = false;
export let element: HTMLUListElement;
export let button: { text: string; icon?: string } | undefined = undefined;
export let heading = '';
</script>

<div
  class={cx(
    'border-gray-9 absolute left-0 right-0 top-full z-40 mt-1 w-full overflow-hidden border bg-white drop-shadow-md',
    {
      invisible: !open,
    }
  )}
>
  {#if heading}
    <span class="text-default flex flex-wrap py-1 pl-2 text-xs">
      {heading}
    </span>
  {/if}
  <ul
    role="menu"
    class="select-menu flex max-h-36 flex-col overflow-y-auto"
    bind:this={element}
    on:mouseleave
  >
    <slot />
  </ul>
  {#if button !== undefined}
    <button
      class="hover:bg-light border-light flex h-[30px] w-full items-center border-t px-2 py-1 text-xs"
    >
      {#if button.icon}
        <Icon
          name={button.icon}
          size="sm"
        />
      {/if}

      <span class="pl-1.5"> {button.text}</span>
    </button>
  {/if}
</div>

<style>
.select-menu::-webkit-scrollbar {
  width: 6px;
}

.select-menu::-webkit-scrollbar-track {
  background: transparent;
}

.select-menu::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 0;
  border: 0 solid transparent;
}

.select-menu {
  scrollbar-width: thin;
  scrollbar-color: black transparent;
}
</style>
