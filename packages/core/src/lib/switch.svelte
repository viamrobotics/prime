<!--
  @component
  
  The switch is used to handle a binary input.

  ```svelte
  <Switch on annotated disabled />
  ```
-->
<svelte:options immutable />

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import cx from 'classnames';
import { preventHandler, preventKeyboardHandler } from '$lib';

/** Shows if the switch is on or off. */
export let on = false;

/**
 * Whether or not to render the `On` and `Off` annotations, which can be
 * overwritten by using the slots `on` and `off` slots.
 *
 * Note: If you use the `on` and/or `off` slots, this will be ignored.
 */
export let annotated = false;

/** Shows if the switch is disabled (if the disabled style of the switch is displayed). */
export let disabled = false;

/** Additional CSS classes to pass to the button. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const dispatch = createEventDispatcher<{
  /** When the switch is toggled. */
  change: boolean;
}>();

$: handleDisabled = preventHandler(disabled);
$: handleDisabledKeydown = preventKeyboardHandler(disabled);

const toggle = () => {
  on = !on;
  dispatch('change', on);
};
</script>

<button
  type="button"
  role="switch"
  aria-disabled={disabled ? true : undefined}
  aria-checked={on ? 'true' : 'false'}
  {...$$restProps}
  class={cx(
    'flex items-center gap-2 outline-offset-2',
    {
      'cursor-not-allowed': disabled,
    },
    extraClasses
  )}
  on:click={toggle}
  on:click|capture={handleDisabled}
  on:keydown={handleDisabledKeydown}
>
  <div
    class={cx(
      'relative inline-flex h-5 w-11 flex-shrink-0 border duration-200 ease-in-out focus:outline-none motion-safe:transition-colors',
      {
        'border-gray-6 bg-gray-6': !on && !disabled,
        'border-success-dark bg-success-dark': on && !disabled,
        'border-gray-4 bg-gray-4 text-disabled-dark': disabled,
      }
    )}
  >
    <span
      class={cx(
        'pointer-events-none relative ml-px mt-px inline-block h-4 w-4 transform bg-white ring-0 duration-200 ease-in-out motion-safe:transition-transform',
        {
          'border-gray-4': disabled,
          'translate-x-0': !on,
          'translate-x-6': on,
        }
      )}
    />
    <input
      {disabled}
      type="checkbox"
      class="hidden"
      bind:checked={on}
    />
  </div>

  {#if annotated || $$slots.on || $$slots.off}
    <p class={cx('pr-px text-sm', { 'text-gray-5': disabled })}>
      {#if on}
        <slot name="on">On</slot>
      {:else}
        <slot name="off">Off</slot>
      {/if}
    </p>
  {/if}
</button>
