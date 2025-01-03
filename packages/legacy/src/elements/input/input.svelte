<svelte:options immutable />

<script lang="ts">
type LabelPosition = 'top' | 'left';
type Types =
  | 'text'
  | 'email'
  | 'number'
  | 'integer'
  | 'time'
  | 'date'
  | 'datetime-local';

import cx from 'classnames';
import { tick } from 'svelte';
import { htmlToBoolean } from '../../lib/boolean';
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
export let icon: string;
export let min = '-Infinity';
export let max = '+Infinity';
export let labelposition: LabelPosition = 'top';
export let tooltip = '';
export let state: 'info' | 'warn' | 'error' | 'success' | '' = 'info';
export let message = '';
export let incrementor: 'buttons' | 'slider' | 'none' = 'none';

// https://github.com/sveltejs/svelte/issues/7596
export let internals: ElementInternals;

const dispatch = dispatcher();

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
$: isInvalidNumericInput = false;
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

let numberDragTooltip: HTMLElement & { recalculateStyle?(): void };
let numberDragCord: HTMLElement;
let numberDragHead: HTMLElement;
let isDragging = false;
let startX = 0;
let startValue = 0;
let prevNumberValue = value;

const handleInput = (event: Event) => {
  if (value === input.value) {
    return;
  }

  if (type === 'number') {
    prevNumberValue = value;

    // only allow number-related characters to be typed
    value = input.value = input.value.replaceAll(
      new RegExp(/[^\d+.e-]/i, 'g'),
      ''
    );

    // only set and send value if valid, and different from previous value
    if (
      Number.isNaN(Number(value)) ||
      Number(prevNumberValue) === Number(value)
    ) {
      return;
    }
  } else {
    input.value = value = input.value;
  }
  internals.setFormValue(value);
  dispatch(event, 'input', { value });
};

const handleBlur = () => {
  isInvalidNumericInput = Number.isNaN(Number(input.value));
};

const getDecimals = (value = '') => {
  return Math.max(
    value.includes('.') ? value.length - value.indexOf('.') - 1 : 0,
    stepDecimalDigits
  );
};

const handleKeydown = (event: KeyboardEvent) => {
  const key = event.key.toLowerCase();

  if (key !== 'arrowup' && key !== 'arrowdown') {
    return;
  }

  event.preventDefault();

  const x = Number.parseFloat(input.value || '0');

  if (key === 'arrowup') {
    value = (x + stepNumber).toFixed(
      type === 'integer' ? 0 : getDecimals(input.value)
    );
  } else if (key === 'arrowdown') {
    value = (x - stepNumber).toFixed(
      type === 'integer' ? 0 : getDecimals(input.value)
    );
  }

  input.value = value;

  internals.setFormValue(value);

  dispatch(event, 'input', { value });
};

const handleNumberDragMove = (event: PointerEvent) => {
  const x = event.clientX;
  const deltaString = ((-(startX - x) * stepNumber) / 10).toFixed(
    type === 'integer' ? 0 : stepDecimalDigits
  );
  const delta =
    type === 'integer'
      ? Number.parseInt(deltaString, 10)
      : Number.parseFloat(deltaString);
  value = input.value = (startValue + delta * stepNumber).toFixed(
    getDecimals(input.value)
  );

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
  dispatch(event, 'input', { value });

  // The tooltip may not be mounted the first time this handler is called.
  if (numberDragTooltip.recalculateStyle) {
    numberDragTooltip.recalculateStyle();
  }
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
  // The tooltip may not be mounted the first time this handler is called.
  if (numberDragTooltip.recalculateStyle) {
    numberDragTooltip.recalculateStyle();
  }

  window.addEventListener('pointermove', handleNumberDragMove);
  window.addEventListener('pointerup', handleNumberDragUp, { once: true });
};

$: {
  switch (state) {
    case 'info': {
      icon = 'information-outline';
      break;
    }
    case 'warn':
    case 'error': {
      icon = 'alert-circle-outline';
      break;
    }
  }
}
</script>

<label
  class={cx('relative flex w-full', {
    'flex-col gap-1': labelposition === 'top',
    'items-center gap-2': labelposition === 'left',
  })}
>
  <div class="flex items-center gap-1.5">
    {#if label}
      <p
        class={cx('text-xs', {
          'inline whitespace-nowrap': labelposition === 'left',
          'text-subtle-1': !isDisabled,
          'pointer-events-none text-disabled-dark': isDisabled,
          'after:ml-1 after:text-danger-dark after:content-["*"]': isRequired,
        })}
      >
        {label}
      </p>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <div
          class={cx({
            'text-gray-6': state === 'info',
            'text-warning-bright': state === 'warn',
            'text-danger-dark': state === 'error',
          })}
        >
          <v-icon name={icon} />
        </div>
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
    readonly={isDisabled || isReadonly ? true : undefined}
    required={isRequired ? true : undefined}
    aria-disabled={isDisabled ? true : undefined}
    bind:this={input}
    class={cx(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none',
      {
        'pl-2.5': !isNumeric,
        'pl-3': isNumeric,
        'border-light bg-white hover:border-medium focus:border-gray-9':
          !isDisabled && !isInvalidNumericInput,
        'pointer-events-none border-disabled-light bg-disabled-light text-disabled-dark':
          isDisabled || isDragging || isReadonly,
        'border border-danger-dark outline-[1.5px] -outline-offset-1 outline-danger-dark':
          state === 'error' || isInvalidNumericInput,
        'border-warning-bright outline-[1.5px] -outline-offset-1 outline-warning-bright':
          state === 'warn',
      }
    )}
    step={insertStepAttribute ? step : null}
    on:input|preventDefault={handleInput}
    on:keydown={isNumeric ? handleKeydown : undefined}
    on:blur={isNumeric ? handleBlur : undefined}
  />

  {#if incrementor === 'slider' && isNumeric}
    <div
      class="absolute bottom-[3px] left-[0.2rem] z-50 h-[24px] w-1 cursor-pointer bg-gray-400 hover:bg-gray-700"
      on:pointerdown={handleNumberDragDown}
    >
      {#if isDragging}
        <div
          bind:this={numberDragCord}
          class="pointer-events-none mt-[calc(13px)] h-px bg-gray-400"
        />
        <div
          bind:this={numberDragHead}
          class="pointer-events-none -ml-[2px] -mt-[5px]"
        >
          <div class="h-2 w-2">
            <v-tooltip
              bind:this={numberDragTooltip}
              state="visible"
              minwidth="auto"
              text={value}
            >
              <div class="h-2 w-2 rounded-full bg-gray-800" />
            </v-tooltip>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  {#if message}
    <span
      class={cx('text-xs', {
        'text-red-600': state === 'error',
        'text-warning-bright': state === 'warn',
      })}
    >
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

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
