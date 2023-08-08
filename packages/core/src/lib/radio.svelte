<!--
@component
  
A graphical control element that allows the user to choose only one of a predefined set of mutually exclusive options.

```svelte
<v-radio
  options="['Opt 1', 'Opt 2', 'Opt 3']"
  selected="Opt 1"
/>
```
-->
<svelte:options immutable />

<script lang="ts">
import { Tooltip, Icon } from '$lib';

type LabelPosition = 'top' | 'left';

import cx from 'classnames';
import { createEventDispatcher } from 'svelte';

/**
 * The label for the radio button.
 */
export let label = '';
/**
 * The set of options that is available in the radio button.
 */
export let options: string[] = [];
/**
 * The selected option on the radio button.
 */
export let selected = '';
/**
 * The position of the label on the radio button.
 */
export let labelposition: LabelPosition = 'top';
/**
 * The tooltip message associated with the icon on your radio button.
 */
export let tooltip = '';
/**
 * The state of the radio button.  Which is an indicator of what icon is associated with your radio button.
 */
export let state: 'info' | 'warn' | 'error' = 'info';
/**
 * Whether or not the radio is readonly.
 */
export let readonly = false;
/**
 * The icon on the radio button.
 */
let icon: string;
/**
 * The width of the radio button.  Specifically, if width is 100% or if its the default.
 */
export let width: 'full' | 'default' = 'default';

const dispatch = createEventDispatcher<{
  /** When an option on the radio is selected. */
  input: { value: string };
}>();

const handleClick = (value: string) => {
  if (!readonly) {
    selected = value;
    dispatch('input', { value });
  }
};

$: {
  switch (state) {
    case 'info': {
      icon = 'information-outline';
      break;
    }
    case 'warn': {
      icon = 'alert-circle-outline';
      break;
    }
    case 'error': {
      icon = 'alert-circle-outline';
      break;
    }
  }
}
</script>

<label
  class={cx('flex gap-1', {
    'flex-col': labelposition === 'top',
    'flex-row': labelposition === 'left',
  })}
>
  <div class="flex items-center gap-1.5">
    {#if label}
      <p
        class={cx('text-xs text-subtle-1', {
          'text-black/50': readonly,
        })}
      >
        {label}
      </p>
    {/if}

    {#if tooltip}
      <Tooltip>
        <div
          class={cx({
            'text-warning-bright': state === 'warn',
            'text-danger-dark': state === 'error',
          })}
        >
          <Icon name={icon} />
        </div>
        <div slot="text">
          {tooltip}
        </div>
      </Tooltip>
    {/if}
  </div>

  <div class="flex flex-nowrap">
    {#each options as option}
      <button
        aria-label="Select {option}"
        class={cx('whitespace-nowrap border px-3 py-1.5 text-xs', {
          'border-light bg-medium text-subtle-1':
            option !== selected && !readonly,
          'border-gray-6 bg-light font-semibold text-default':
            option === selected && !readonly,
          'border-medium bg-light font-semibold text-disabled-dark':
            option === selected && readonly,
          'pointer-events-none cursor-not-allowed border-light bg-disabled-light text-disabled-dark':
            readonly,
          'w-full': width === 'full',
        })}
        on:click={() => handleClick(option)}
      >
        {option}
      </button>
    {/each}
  </div>
</label>
