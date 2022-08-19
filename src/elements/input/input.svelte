<svelte:options immutable={true} tag='v-input-internal' />

<script lang='ts'>

import cx from 'classnames';
import { get_current_component } from 'svelte/internal';
import { htmlToBoolean } from '../../lib/boolean';
import { addStyles, dispatch } from '../../lib/index';

// @TODO switch to <svelte:this bind:this={component}> https://github.com/sveltejs/rfcs/pull/58
const component = get_current_component() as HTMLElement & { internals: ElementInternals };
const internals = component.attachInternals();

type LabelPosition = 'top' | 'left'
type Types = 'text' | 'email' | 'number' | 'integer' | 'time' | 'date' | 'datetime-local'

export let type: Types = 'text';
export let placeholder = '';
export let readonly = 'false';
export let disabled = 'false';
export let label = '';
export let value = '';
export let step = '1';
export let name = '';
export let labelposition: LabelPosition = 'top';
export let tooltip = '';

let root: HTMLElement;
let input: HTMLInputElement;
let stepDecimalDigits: number;
let isReadonly: boolean;
let isDisabled: boolean;
let stepNumber: number;
let insertStepAttribute: boolean;

$: stepDecimalDigits = String(step).split('.').pop()?.length ?? 0;
$: isReadonly = htmlToBoolean(readonly, 'readonly');
$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: stepNumber = Number.parseFloat(step);
$: insertStepAttribute = type === 'time' || type === 'number';

addStyles();

const handleInput = (event: Event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  value = input.value;

  internals.setFormValue(value);
  dispatch(root, 'input', { value });
};

const increment = (direction: 1 | -1) => {
  const numberValue = Number.parseFloat(value || '0');
  const currentValueDigits = String(value).split('.').pop()?.length ?? 0;

  if (type === 'number') {
    value = input.value = (numberValue + stepNumber * direction).toFixed(Math.max(stepDecimalDigits, currentValueDigits));
  } else if (type === 'integer') {
    value = input.value = String(Math.round(numberValue + stepNumber * direction));
  }
  
  internals.setFormValue(value);
  dispatch(root, 'input', { value });
};

</script>

<label
  bind:this={root}
  class={cx('relative flex gap-1 max-w-[14rem]', {
    'flex-col': labelposition === 'top',
    'items-center': labelposition === 'left',
  })}
>
  <div class='flex items-center gap-1.5'>
    {#if label}
      <p class={cx('text-xs capitalize', {
        'inline whitespace-nowrap': labelposition === 'left',
        'opacity-50 pointer-events-none': isDisabled,
      })}>
        {label}
      </p>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <div class="icon-info-outline text-orange-400" />
      </v-tooltip>
    {/if}
  </div>

  <input
    type={type === 'integer' ? 'number' : type}
    {placeholder}
    {name}
    {value}
    pattern={type === 'integer' ? '[0-9]*' : undefined}
    readonly={isReadonly || isDisabled}
    bind:this={input}
    class={cx('w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none', {
      'opacity-50 pointer-events-none': isDisabled,
    })}
    on:input={handleInput}
    step={insertStepAttribute ? step : null}
  />

  {#if type === 'number' || type === 'integer'}
    <div class='absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col'>
      <button
        on:click={() => increment(+1)}
        aria-label='Increment up by {stepNumber}'
        class='icon-chevron-down rotate-180 text-[15px]'
      />
      <button
        on:click={() => increment(-1)}
        aria-label='Increment down by {stepNumber}'
        class='icon-chevron-down text-[15px]'
      />
    </div>
  {/if}
</label>

<style>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance:textfield;
}

</style>