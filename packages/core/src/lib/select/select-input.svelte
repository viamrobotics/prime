<script lang="ts">
import cx from 'classnames';
import type { SelectState } from './select.svelte';
import Icon from '$lib/icon/icon.svelte';

export let value: string | undefined;
export let menuId: string;
export let isOpen: boolean;
export let disabled: boolean;
export let state: SelectState;

$: isWarn = state === 'warn';
$: isError = state === 'error';
</script>

<div class="flex w-full">
  <input
    bind:value
    role="combobox"
    aria-controls={menuId}
    aria-expanded={isOpen}
    readonly={disabled ? true : undefined}
    aria-disabled={disabled ? true : undefined}
    type="text"
    class={cx(
      'h-[30px] w-full grow appearance-none border py-1.5 pl-2 pr-1 text-xs leading-tight outline-none',
      {
        'border-light hover:border-gray-6 focus:border-gray-9 bg-white':
          !disabled && !isError && !isWarn,
        'border-disabled-light focus:border-disabled-dark bg-disabled-light text-disabled-dark cursor-not-allowed':
          disabled,
        'border-warning-bright hover:outline-warning-bright focus:outline-warning-bright hover:outline-[1.5px] hover:-outline-offset-1 focus:outline-[1.5px] focus:-outline-offset-1':
          isWarn,
        'border-danger-dark hover:outline-danger-dark focus:outline-danger-dark hover:outline-[1.5px hover:-outline-offset-1 focus:outline-[1.5px] focus:-outline-offset-1':
          isError,
      }
    )}
    {...$$restProps}
    on:input
    on:keydown
    on:focus
    on:mousemove
  />
  <button
    class="absolute right-2 top-1.5"
    tabindex="-1"
    aria-label="Toggle menu"
    on:toggle
    on:keydown
  >
    <Icon
      name="chevron-down"
      cx={['text-gray-6 transition cursor-pointer', { 'rotate-180': isOpen }]}
    />
  </button>
</div>
