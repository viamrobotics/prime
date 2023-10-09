<script lang="ts">
import cx from 'classnames';
import { Icon, type IconName } from '$lib';

export let icon: IconName | undefined = undefined;

let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<li role="presentation">
  <button
    type="button"
    tabindex="-1"
    role="menuitem"
    class={cx(
      'flex h-7.5 w-full select-none items-center px-2 py-1 text-xs outline-none hover:bg-light',
      extraClasses
    )}
    on:click
    on:keydown
    on:mouseenter
  >
    {#if icon}
      <Icon
        name={icon}
        size="sm"
      />
    {/if}

    <span class="pl-1.5"><slot /></span>
  </button>
</li>
