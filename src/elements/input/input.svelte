<svelte:options immutable tag='v-input-internal' />

<script lang='ts'>

import cx from 'classnames';
import { tick } from 'svelte';
import { get_current_component } from 'svelte/internal';
import { htmlToBoolean } from '../../lib/boolean';
import { addStyles, dispatch } from '../../lib/index';

// @TODO switch to <svelte:this bind:this={component}> https://github.com/sveltejs/rfcs/pull/58
const component = get_current_component() as HTMLElement & { internals: ElementInternals };
const internals = component.attachInternals();

// @TODO remove when we decide which number input we like
const experimental = window.localStorage.getItem('__PRIME_useExperimentalNumberInput') !== null

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
export let min = '-Infinity';
export let max = '+Infinity';
export let labelposition: LabelPosition = 'top';
export let tooltip = '';
export let state: 'info' | 'warn' | 'error'| 'success' | '' = 'info';
export let message: '';

let root: HTMLElement;
let input: HTMLInputElement;
let stepDecimalDigits: number;
let isReadonly: boolean;
let isDisabled: boolean;
let stepNumber: number;
let minNumber: number;
let maxNumber: number;
let insertStepAttribute: boolean;

$: stepDecimalDigits = String(step).split('.').pop()?.length ?? 0;
$: isReadonly = htmlToBoolean(readonly, 'readonly');
$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: stepNumber = Number.parseFloat(step);
$: minNumber = Number.parseFloat(min);
$: maxNumber = Number.parseFloat(max);
$: insertStepAttribute = type === 'time' || type === 'number';

addStyles();

const handleInput = (event: Event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  value = input.value;

  internals.setFormValue(value);
  dispatch(root, 'input', { value });
};

let numberDragTooltip: HTMLElement & { recalculateStyle(): void };
let numberDragCord: HTMLElement;
let numberDragHead: HTMLElement;
let isDragging = false;
let y = 0;
let startX = 0;
let startValue = 0;

const handleNumberDragMove = (event: PointerEvent) => {
  const x = event.clientX;
  const delta = -(startX - x) * stepNumber / 10;

  value = input.value = (startValue + delta).toFixed(type === 'integer' ? 0 : 1);

  const valueNum = Number.parseFloat(value);

  if (valueNum > maxNumber) {
    value = String(maxNumber);
    return;
  }

  if (valueNum < minNumber) {
    value = String(minNumber);
    return;
  }

  numberDragHead.style.transform = `translate(${x - 4}px, 0px)`;

  if (valueNum > startValue) {
    numberDragCord.style.cssText = `
      left: ${startX}px;
      right: ${x}px;
      width: ${x - startX}px;
    `;
  } else if (valueNum < startValue) {
    numberDragCord.style.cssText = `
      left: ${x}px;
      right: ${startX}px;
      width: ${startX - x}px;
    `;
  }

  internals.setFormValue(value);
  dispatch(root, 'input', { value });

  numberDragTooltip.recalculateStyle();
};

const handleNumberDragUp = () => {
  isDragging = false;

  window.removeEventListener('pointermove', handleNumberDragMove);
};

const handleNumberDragDown = async (event: PointerEvent) => {
  event.preventDefault();
  event.stopPropagation();

  const el = event.target as HTMLElement
  const rect = el.getBoundingClientRect()

  y = rect.top + (rect.height / 2)
  startX = event.clientX;
  value ||= '0'
  startValue = Number.parseFloat(value);
  isDragging = true;

  await tick();

  numberDragHead.style.transform = `translate(${event.clientX - 4}px, 0px)`;
  numberDragTooltip.recalculateStyle();

  window.addEventListener('pointermove', handleNumberDragMove);
  window.addEventListener('pointerup', handleNumberDragUp, { once: true });
};

const increment = (direction: 1 | -1) => {
  const numberValue = Number.parseFloat(value || '0');
  const currentValueDigits = String(value).split('.').pop()?.length ?? 0;

  if (type === 'number') {
    value = input.value = (numberValue + stepNumber * direction).toFixed(Math.max(stepDecimalDigits, currentValueDigits));
  } else if (type === 'integer') {
    value = input.value = String(Math.round(numberValue + stepNumber * direction));
  }
}

</script>

<label
  bind:this={root}
  class={cx('relative flex gap-1 min-w-[6rem] w-full', {
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
        <div class={cx({
          'icon-info-outline': state === 'info',
          'icon-error-outline text-orange-400': state === 'warn',
          'icon-error-outline text-red-600': state === 'error',
        })} />
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
    aria-disabled={isDisabled}
    bind:this={input}
    class={cx('w-full py-1.5 pr-2.5 leading-tight text-xs h-[30px] border border-black outline-none appearance-none', {
      'pl-2.5': type !== 'number' && type !== 'integer',
      'pl-3': type === 'number' || type === 'integer',
      'bg-white': !isDisabled,
      'opacity-50 pointer-events-none bg-gray-200': isDisabled || isDragging,
      'border-red-600 border': state === 'error',
    })}
    step={insertStepAttribute ? step : null}
    on:input={handleInput}
  />

  {#if !experimental && (type === 'number' || type === 'integer')}
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

  {#if experimental && (type === 'number' || type === 'integer')}
    <div
      class='absolute left-[0.2rem] bottom-[3px] h-[24px] w-1 bg-gray-400 hover:bg-gray-700 cursor-pointer'
      on:pointerdown={handleNumberDragDown}
    >
      {#if isDragging}
        <div
          bind:this={numberDragCord}
          class='fixed h-px bg-gray-400 mt-[calc(13px)] pointer-events-none'
        />
        <div
          bind:this={numberDragHead}
          class='fixed left-0 w-2 h-[26px] pointer-events-none'
        >
          <div class='absolute h-2 w-2 top-[calc(9px)]'>
            <v-tooltip
              bind:this={numberDragTooltip}
              state='visible'
              minwidth='auto'
              text={value}
            >
              <div class='absolute  h-2 w-2 bg-gray-800 rounded-full ' />
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