<svelte:options immutable tag='v-input-internal' />

<script lang='ts'>

type LabelPosition = 'top' | 'left'
type Types = 'text' | 'email' | 'number' | 'integer' | 'time' | 'date' | 'datetime-local'

import cx from 'classnames';
import { tick } from 'svelte';
import { get_current_component } from 'svelte/internal';
import { htmlToBoolean } from '../../lib/boolean';
import { addStyles } from '../../lib/index';
import { dispatcher } from '../../lib/dispatch';

export let type: Types = 'text';
export let autocomplete: string;
export let placeholder = '';
export let readonly: string;
export let required: string;
export let disabled: string;
export let label: string;
export let value = '';
export let step = '1';
export let name: string;
export let min = '-Infinity';
export let max = '+Infinity';
export let labelposition: LabelPosition = 'top';
export let tooltip = '';
export let state: 'info' | 'warn' | 'error'| 'success' | '' = 'info';
export let message: '';
export let incrementor: 'buttons' | 'slider' | 'none' = 'none';

const dispatch = dispatcher();

addStyles();

// @TODO switch to <svelte:this bind:this={component}> https://github.com/sveltejs/rfcs/pull/58
const component = get_current_component() as HTMLElement & { internals: ElementInternals };
const internals = component.attachInternals();

let input: HTMLInputElement;
let stepDecimalDigits: number;
let isNumeric: boolean;
let isReadonly: boolean;
let isDisabled: boolean;
let stepNumber: number;
let minNumber: number;
let maxNumber: number;
let insertStepAttribute: boolean;
let inputType: string;
let inputPattern: string;

$: isNumeric = type === 'number' || type === 'integer';
$: isReadonly = htmlToBoolean(readonly, 'readonly');
$: isRequired = htmlToBoolean(required, 'required');
$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: stepNumber = Number.parseFloat(step);
$: minNumber = Number.parseFloat(min);
$: maxNumber = Number.parseFloat(max);
$: insertStepAttribute = type === 'time' || isNumeric;

$: {
  const arr = String(step).split('.');
  stepDecimalDigits = arr.length === 2 ? arr.pop()?.length ?? 0 : 0;
}

$: {
  if (type === 'number') {
    inputType = 'text';
  } else if (type === 'integer') {
    inputType = 'number';
  } else {
    inputType = type;
  }
}

$: {
  if (type === 'number') {
    inputPattern = '^([-+,0-9.]+)';
  } else if (type === 'integer') {
    inputPattern = '[0-9]+';
  }
}

let numberDragTooltip: HTMLElement & { recalculateStyle(): void };
let numberDragCord: HTMLElement;
let numberDragHead: HTMLElement;
let isDragging = false;
let startX = 0;
let startValue = 0;


const handleInput = () => {
  if (value === input.value) {
    return;
  }

  if (type === 'number' && input.value.endsWith('.')) {
    return;
  }

  value = input.value;

  internals.setFormValue(value);

  dispatch('input', { value });
};

const getDecimals = (value = '') => {
  return Math.max(value.split('.').pop()?.length ?? 0, stepDecimalDigits);
};

const handleKeydown = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase();

  if (key !== 'arrowup' && key !== 'arrowdown') {
    return;
  }

  event.preventDefault();

  const x = Number.parseFloat(input.value || '0');

  if (key === 'arrowup') {
    value = (x + stepNumber).toFixed(type === 'integer' ? 0 : getDecimals(input.value));
  } else if (key === 'arrowdown') {
    value = (x - stepNumber).toFixed(type === 'integer' ? 0 : getDecimals(input.value));
  }

  input.value = value;

  internals.setFormValue(value);

  dispatch('input', { value });
};

const handleNumberDragMove = (event: PointerEvent) => {
  const x = event.clientX;
  const deltaString = (-(startX - x) * stepNumber / 10).toFixed(type === 'integer' ? 0 : stepDecimalDigits);
  const delta = type === 'integer' ? Number.parseInt(deltaString, 10) : Number.parseFloat(deltaString);

  value = input.value = (startValue + delta).toFixed(getDecimals(input.value));

  const valueNum = Number.parseFloat(value);

  if (valueNum > maxNumber) {
    value = String(maxNumber);
    return;
  }

  if (valueNum < minNumber) {
    value = String(minNumber);
    return;
  }

  if (valueNum > startValue) {
    const dx = x - startX;
    numberDragCord.style.cssText = `
      width: ${dx}px;
    `;
    numberDragHead.style.transform = `translate(${dx}px, 0px)`;
  } else if (valueNum < startValue) {
    const dx = startX - x;
    numberDragCord.style.cssText = `
      width: ${dx}px;
      transform: translate(-${dx}px, 0);
    `;
    numberDragHead.style.transform = `translate(-${dx}px, 0px)`;
  }

  internals.setFormValue(value);
  dispatch('input', { value });

  numberDragTooltip.recalculateStyle();
};

const handleNumberDragUp = () => {
  isDragging = false;

  window.removeEventListener('pointermove', handleNumberDragMove);
};

const handleNumberDragDown = async (event: PointerEvent) => {
  event.preventDefault();
  event.stopPropagation();

  startX = event.clientX;
  value ||= '0';
  startValue = Number.parseFloat(value);
  isDragging = true;

  await tick();

  numberDragHead.style.transform = 'translate(0px, 0px)';
  numberDragTooltip.recalculateStyle();

  window.addEventListener('pointermove', handleNumberDragMove);
  window.addEventListener('pointerup', handleNumberDragUp, { once: true });
};

</script>

<label
  class={cx('relative flex gap-1 w-full', {
    'flex-col': labelposition === 'top',
    'items-center': labelposition === 'left',
  })}
>
  <div class='flex items-center gap-1.5'>
    {#if label}
      <p class={cx('text-xs capitalize', {
        'inline whitespace-nowrap': labelposition === 'left',
        'text-text-disabled-fg pointer-events-none': isDisabled,
        'after:text-danger-fg after:content-["*"] after:ml-1': isRequired,
      })}>
        {label}
      </p>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <div class={cx({
          'icon-info-outline text-gray-6': state === 'info',
          'icon-error-outline text-warning-fg': state === 'warn',
          'icon-error-outline text-danger-fg': state === 'error',
        })} />
      </v-tooltip>
    {/if}
  </div>
  <input
    type={inputType}
    {autocomplete}
    {placeholder}
    {name}
    {value}
    inputmode={isNumeric ? 'numeric' : undefined}
    pattern={inputPattern}
    readonly={(isDisabled || isReadonly) ? true : undefined}
    required={(isRequired) ? true : undefined}
    aria-disabled={isDisabled ? true : undefined}
    bind:this={input}
    class={cx('w-full py-1.5 pr-2.5 leading-tight text-xs h-[30px] border outline-none appearance-none', {
      'pl-2.5': isNumeric === false,
      'pl-3': isNumeric,
      'bg-white border-gray-8': !isDisabled,
      'pointer-events-none bg-disabled-bg text-disabled-fg border-disabled-bg': isDisabled || isDragging || isReadonly,
      'border-danger-fg border': state === 'error',
    })}
    step={insertStepAttribute ? step : null}
    on:input|preventDefault|stopPropagation={handleInput}
    on:keydown={isNumeric ? handleKeydown : undefined}
  />

  {#if incrementor === 'slider' && isNumeric}
    <div
      class='absolute left-[0.2rem] bottom-[3px] h-[24px] w-1 z-50 bg-gray-400 hover:bg-gray-700 cursor-pointer'
      on:pointerdown={handleNumberDragDown}
    >
      {#if isDragging}
        <div
          bind:this={numberDragCord}
          class='h-px bg-gray-400 mt-[calc(13px)] pointer-events-none'
        />
        <div
          bind:this={numberDragHead}
          class='pointer-events-none -mt-[5px] -ml-[2px]'
        >
          <div class='h-2 w-2'>
            <v-tooltip
              bind:this={numberDragTooltip}
              state='visible'
              minwidth='auto'
              text={value}
            >
              <div class='h-2 w-2 bg-gray-800 rounded-full ' />
            </v-tooltip>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  {#if message}
    <span class={cx('text-xs', {
      'text-red-600': state === 'error',
    })}>
      {message}
    </span>
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
