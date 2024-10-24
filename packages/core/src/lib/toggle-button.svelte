<!--
@component

For users to toggle between a predefined set of mutually exclusive options.

```svelte
<ToggleButtons
  options="['Opt 1', 'Opt 2', 'Opt 3']"
  selected="Opt 1"
/>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { preventHandler } from './prevent-handler';
import { createEventDispatcher } from 'svelte';

/** The set of options that is available in the radio button. */
export let options: string[];

/** The selected option on the radio button. */
export let selected: string | undefined = undefined;

/**  Whether or not the radio should render as disabled. */
export let disabled = false;

/** Additional CSS classes to pass to the fieldset. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const dispatch = createEventDispatcher<{
  /** When an option on the radio is selected. */
  input: string;
}>();

$: isSelected = (option: string) => option === selected;
$: handleDisabled = preventHandler(disabled);

$: getButtonClasses = (option: string) => {
  return {
    'border-light bg-medium text-subtle-1': option !== selected && !disabled,
    'border-gray-6 bg-light font-semibold text-default':
      option === selected && !disabled,
    'border-medium bg-light font-semibold text-disabled-dark':
      option === selected && disabled,
    'cursor-not-allowed border-light bg-disabled-light text-disabled-dark':
      disabled,
  };
};

const handleClick = (value: string) => {
  dispatch('input', value);
};
</script>

<fieldset
  aria-disabled={disabled ? true : undefined}
  class={cx('flex', extraClasses)}
  {...$$restProps}
>
  {#if $$slots.label}
    <label
      class={cx(
        cx('mb-1 flex text-xs', {
          'text-subtle-1': !disabled,
          'cursor-not-allowed text-disabled-dark': disabled,
        })
      )}
    >
      <slot name="label" />
    </label>
  {/if}

  <div class="flex w-fit flex-nowrap">
    {#each options as option}
      <button
        type="button"
        aria-pressed={isSelected(option)}
        aria-disabled={disabled ? true : undefined}
        class={cx(
          'h-7.5 whitespace-nowrap border px-3 py-1.5 text-xs',
          getButtonClasses(option)
        )}
        on:click={() => handleClick(option)}
        on:click|capture={handleDisabled}
      >
        {option}
      </button>
    {/each}
  </div>
</fieldset>
