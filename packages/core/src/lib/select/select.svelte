<!--
@component

For selecting from a list of options.

```svelte
<Select on:input={onSelect}>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</Select>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { Icon } from '$lib/icon';
import { InputStates, type InputState } from '$lib/input';
import { preventHandler, preventKeyboardHandler } from '$lib/prevent-handler';

/** The selected option value, if any */
export let value: string | undefined = undefined;

/** Whether or not the select should be rendered as disabled and be non-operable. */
export let disabled = false;

/** The state of the select (info, warn, error, success), if any. */
export let state: InputState = InputStates.NONE;

/** Additional CSS classes to pass to the select container. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

$: handleDisabled = preventHandler(disabled);
$: handleDisabledKeydown = preventKeyboardHandler(disabled);

$: isWarn = state === InputStates.WARN;
$: isError = state === InputStates.ERROR;

$: defaultClasses =
  !disabled &&
  !isError &&
  !isWarn &&
  'border-light hover:border-gray-6 focus:border-gray-9 bg-white';

$: disabledClasses =
  disabled &&
  'border-disabled-light focus:border-disabled-dark bg-disabled-light text-disabled-dark cursor-not-allowed';

$: warnClasses =
  isWarn &&
  !disabled &&
  'border-warning-bright hover:outline-warning-bright focus:outline-warning-bright hover:outline-[1.5px] hover:-outline-offset-1 focus:outline-[1.5px] focus:-outline-offset-1';

$: errorClasses =
  isError &&
  !disabled &&
  'border-danger-dark hover:outline-danger-dark focus:outline-danger-dark hover:outline-[1.5px hover:-outline-offset-1 focus:outline-[1.5px] focus:-outline-offset-1';
</script>

<div class={cx('relative w-full', extraClasses)}>
  <select
    bind:value
    aria-disabled={disabled ? true : undefined}
    aria-invalid={isError ? true : undefined}
    class={cx(
      'peer h-7.5 w-full appearance-none rounded-none border px-2 py-1.5 text-xs leading-tight outline-none',
      defaultClasses,
      disabledClasses,
      warnClasses,
      errorClasses,
      extraClasses
    )}
    {...$$restProps}
    on:change
    on:change|capture={handleDisabled}
    on:mousedown
    on:mousedown|capture={handleDisabled}
    on:keydown
    on:keydown|capture={handleDisabledKeydown}
  >
    <slot />
  </select>
  <span
    class={cx(
      'pointer-events-none absolute right-2 top-1.5 text-gray-6 transition',
      {
        'peer-active:rotate-180': !disabled,
      }
    )}
  >
    <Icon name="chevron-down" />
  </span>
</div>
