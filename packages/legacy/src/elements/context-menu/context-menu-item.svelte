<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { dispatcher } from '../../lib/dispatch';

const dispatch = dispatcher();

export let icon: string;
export let variant: 'primary' | 'danger' = 'primary';
export let label: string;

const handleSelect = (event: Event) => {
  dispatch(event, 'select', { value: label });
};
</script>

<button
  role="menuitem"
  aria-labelledby={label}
  class="flex w-full items-center gap-1 px-2 py-1.5 text-left hover:bg-light"
  on:click={handleSelect}
>
  {#if icon && variant === 'primary'}
    <v-icon
      name={icon}
      class="text-gray-400"
    />
  {/if}

  {#if icon && variant === 'danger'}
    <v-icon
      name={icon}
      class="text-danger-dark"
    />
  {/if}

  <p
    id={label}
    class={cx('text-sm', {
      'text-default': variant === 'primary',
      'text-danger-dark': variant === 'danger',
    })}
  >
    {label}
  </p>
</button>
