<script lang="ts">
import cx from 'classnames';
import type { SelectState } from './select.svelte';
import Icon from '$lib/icon/icon.svelte';

export let value: string | undefined;
export let menuId: string;
export let isOpen: boolean;
export let disabled: boolean;
export let state: SelectState;

/** Additional CSS classes to pass to the input. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

$: isWarn = state === 'warn';
$: isError = state === 'error';

$: defaultClasses =
  !disabled &&
  !isError &&
  !isWarn &&
  'border-light group-hover:border-gray-6 group-focus:border-gray-9 bg-white';

$: disabledClasses =
  disabled &&
  'border-disabled-light group-focus:border-disabled-dark bg-disabled-light text-disabled-dark cursor-not-allowed';

$: warnClasses =
  isWarn &&
  !disabled &&
  'border-warning-bright group-hover:outline-warning-bright group-focus:outline-warning-bright group-hover:outline-[1.5px] group-hover:-outline-offset-1 group-focus:outline-[1.5px] group-focus:-outline-offset-1';

$: errorClasses =
  isError &&
  !disabled &&
  'border-danger-dark group-hover:outline-danger-dark group-hover:outline-[1.5px] group-hover:-outline-offset-1 group-focus:outline-danger-dark group-focus:outline-[1.5px] group-focus:-outline-offset-1';
</script>

<div class="group flex w-full">
  <input
    bind:value
    role="combobox"
    aria-controls={menuId}
    aria-expanded={isOpen}
    readonly={disabled ? true : undefined}
    aria-disabled={disabled ? true : undefined}
    type="text"
    class={cx(
      'h-7.5 w-full grow appearance-none border py-1.5 pl-2 pr-1 text-xs leading-tight outline-none',
      defaultClasses,
      disabledClasses,
      warnClasses,
      errorClasses,
      extraClasses
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
    on:click
    on:keydown
  >
    <Icon
      name="chevron-down"
      cx={['cursor-pointer text-gray-6 transition', { 'rotate-180': isOpen }]}
    />
  </button>
</div>
