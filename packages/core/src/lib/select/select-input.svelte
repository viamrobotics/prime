<script lang="ts">
import cx from 'classnames';
import { Icon } from '$lib/icon';
import { InputStates, type InputState } from '$lib/input';

export let value: string | undefined;
export let menuId: string;
export let isOpen: boolean;
export let isFocused: boolean | undefined = undefined;
export let disabled = false;
export let state: InputState = InputStates.NONE;
export let inputElement: HTMLInputElement | undefined = undefined;

/** Additional CSS classes to pass to the input. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

$: isWarn = state === 'warn';
$: isError = state === 'error';

$: defaultClasses =
  !disabled &&
  !isError &&
  !isWarn &&
  cx('border-light bg-white group-hover/select-input:border-gray-6', {
    'focus:border-gray-9': isFocused !== false,
  });

$: disabledClasses =
  disabled &&
  cx(
    'cursor-not-allowed border-disabled-light bg-disabled-light text-disabled-dark',
    { 'focus:border-disabled-dark': isFocused !== false }
  );

$: warnClasses =
  isWarn &&
  !disabled &&
  cx(
    'border-warning-bright group-hover/select-input:outline-[1.5px] group-hover/select-input:-outline-offset-1 group-hover/select-input:outline-warning-bright',
    {
      'focus:outline-[1.5px] focus:-outline-offset-1 focus:outline-warning-bright':
        isFocused !== false,
    }
  );

$: errorClasses =
  isError &&
  !disabled &&
  cx(
    'border-danger-dark group-hover/select-input:outline-[1.5px] group-hover/select-input:-outline-offset-1 group-hover/select-input:outline-danger-dark',
    {
      'focus:outline-[1.5px] focus:-outline-offset-1 focus:outline-danger-dark':
        isFocused !== false,
    }
  );
</script>

<div class="group/select-input relative flex w-full">
  <input
    bind:value
    bind:this={inputElement}
    role="combobox"
    readonly={disabled ? true : undefined}
    aria-controls={menuId}
    aria-expanded={isOpen}
    aria-disabled={disabled ? true : undefined}
    aria-invalid={isError}
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
    on:blur
    on:mousemove
  />
  <button
    type="button"
    class="absolute right-2 top-1/2 -translate-y-1/2 transform"
    tabindex="-1"
    aria-label="Toggle menu"
    aria-controls={menuId}
    aria-expanded={isOpen}
    on:click
    on:keydown
    on:mousedown|preventDefault
    on:pointerdown|preventDefault
  >
    <Icon
      name="chevron-down"
      cx={['text-gray-6 transition', { 'rotate-180': isOpen }]}
    />
  </button>
</div>
