<svelte:options immutable tag="v-context-menu-item" />

<script lang="ts">
import cx from 'classnames';
import { addStyles } from '../../lib/index';
import { dispatcher } from '../../lib/dispatch';

const dispatch = dispatcher();

addStyles();

export let icon: string;
export let variant: 'primary' | 'danger' = 'primary';
export let label: string;

const handleSelect = () => {
  dispatch('select', { value: label });
};
</script>

<button
  role="menuitem"
  aria-labelledby={label}
  class="flex flex-row px-2 py-1.5 hover:bg-light w-full text-left"
  on:click={handleSelect}
>
  {#if icon}
    <v-icon
      name={icon}
      class={cx('p-1', {
        'text-gray-6': variant === 'primary',
        'text-danger-dark': variant === 'danger',
      })}
    />
  {/if}

  <p
    id={label}
    class={cx('font-normal', {
      'text-default': variant === 'primary',
      'text-danger-dark': variant === 'danger',
    })}
  >
    {label}
  </p>
</button>
