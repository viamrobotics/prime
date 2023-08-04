<!--
  @component
  
  The switch is used to handle a binary input.

  ```svelte
  <Switch
    enabled='false'
    label='Switch Label'
  />
  ```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { createEventDispatcher } from 'svelte';

/**
 * The switch label text.
 */
export let label = '';
/**
 * The name of the icon next to the switch label.
 */
export let name = '';
/**
 * Shows if the switch is 'on' or 'off'.
 */
export let enabled = false;
/**
 * Shows if the switch is annotated (if the text of 'on' or 'off' is displayed next to the switch).
 */
export let variant: 'annotated' | 'default' = 'default';
/**
 * Shows if the switch is disabled (if the disabled style of the switch is displayed).
 */
export let disabled = false;
/**
 * Shows if the switch is readonly (if the readonly style of the switch is displayed).
 */
export let readonly = false;
/**
 * Shows the message of the tooltip.
 * TODO(APP-2290): Tooltips above icons won't work until icons are migrated.
 */
// export let tooltip = '';

const dispatch = createEventDispatcher<{
  /** When the switch is clicked. */
  input: { value: boolean };
}>();

let input: HTMLInputElement;

const handleClick = () => {
  if (!(disabled || readonly)) {
    enabled = !enabled;
    input.checked = enabled;
    dispatch('input', { value: enabled });
  }
};
</script>

<label
  class={cx('flex w-fit flex-col justify-start gap-1', {
    'text-disabled-dark': disabled,
  })}
>
  <div class="flex items-center gap-1.5">
    {#if label}
      <button
        class="w-fit text-xs"
        on:click={handleClick}>{label}</button
      >
    {/if}

    <!-- * TODO(APP-2290), (APP-2304): Can't specify icon for tooltip until tooltip/icons are migrated. -->
    <!-- {#if tooltip}
      <v-tooltip text={tooltip}>
        <v-icon
          class="-mt-0.5"
          name="information-outline"
        />
      </v-tooltip>
    {/if} -->
  </div>

  <button
    on:click={handleClick}
    type="button"
    class={cx('flex items-center gap-2', {
      'pointer-events-none cursor-not-allowed': disabled || readonly,
    })}
    role="switch"
    aria-label={label}
    aria-disabled={disabled}
    aria-checked={enabled ? 'true' : 'false'}
  >
    <div
      class={cx(
        'relative inline-flex h-5 w-11 flex-shrink-0 cursor-pointer border duration-200 ease-in-out focus:outline-none motion-safe:transition-colors',
        {
          'border-gray-4 bg-gray-4': disabled || readonly,
          'border-gray-6 bg-gray-6': !enabled && !(disabled || readonly),
          'border-success-dark bg-success-dark':
            enabled && !(disabled || readonly),
          'text-disabled-dark': disabled,
        }
      )}
    >
      <span
        class={cx(
          'pointer-events-none relative ml-px mt-px inline-block h-4 w-4 transform bg-white ring-0 duration-200 ease-in-out motion-safe:transition-transform',
          {
            'border-gray-4': disabled || readonly,
          }
        )}
        class:translate-x-0={!enabled}
        class:translate-x-6={enabled}
      />
      <input
        {name}
        {disabled}
        {readonly}
        class="hidden"
        type="checkbox"
        checked={enabled}
        bind:this={input}
      />
    </div>

    {#if variant === 'annotated'}
      <p class="text-sm">{enabled ? 'on' : 'off'}</p>
    {/if}
  </button>
</label>
