<script lang="ts">
import cx from 'classnames';
import Select from 'svelte-select';
import type { ComponentProps, ComponentEvents } from 'svelte';
import { theme } from '../theme';
import type { IconName } from '../icon/icons';
import { InputStates, type InputState } from '../input';
import Progress from '../progress/progress.svelte';
import Icon from '../icon/icon.svelte';

type Events = ComponentEvents<Select>;

interface SelectItem {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  group?: string;
}

type Option = SelectItem | string;

type DisallowedProps = 'items' | 'showChevron' | 'hideEmptyState' | 'hasError';

interface $$Props extends Omit<ComponentProps<Select>, DisallowedProps> {
  value?: string | string[];
  options: Option[];
  state?: InputState;
  cx?: cx.Argument;
  onBlur?: (event: Events['blur']['detail']) => void;
  onChange?: (event: Events['change']) => void;
  onClear?: (event: Events['clear']) => void;
  onFilter?: (event: Events['filter']) => void;
  onFocus?: (event: Events['focus']) => void;
  onInput?: (event: Events['focus']) => void;
  onSelect?: (event: Events['select']) => void;
}

export let options: $$Props['options'];
export let inputAttributes: $$Props['inputAttributes'] = undefined;
export let containerStyles: $$Props['containerStyles'] = '';
export let state: $$Props['state'] = InputStates.NONE;
export let onBlur: $$Props['onBlur'] = undefined;
export let onChange: $$Props['onChange'] = undefined;
export let onClear: $$Props['onClear'] = undefined;
export let onFilter: $$Props['onFilter'] = undefined;
export let onFocus: $$Props['onFocus'] = undefined;
export let onInput: $$Props['onInput'] = undefined;
export let onSelect: $$Props['onSelect'] = undefined;

let cxArgument: $$Props['cx'] = '';
export { cxArgument as cx };

let className: $$Props['class'] = '';
export { className as class };

$: normalizedOptions = options.map((option) => {
  if (typeof option === 'string') {
    return { value: option, label: option };
  }

  return option;
});

$: icons = normalizedOptions.map((option) => option.icon) as (
  | IconName
  | undefined
)[];

$: warnClasses = state === InputStates.WARN ? 'border-warning-bright' : '';

const { colors, borderColor } = theme.extend;
</script>

<Select
  showChevron
  hideEmptyState
  containerStyles="padding-left: 0.375rem {containerStyles}"
  class="{cx(cxArgument)} {className} {warnClasses}"
  items={normalizedOptions}
  inputAttributes={{ autocomplete: 'off', ...inputAttributes }}
  hasError={state === InputStates.ERROR}
  --border="1px solid {state === InputStates.WARN
    ? colors['warning-medium']
    : borderColor.light}"
  --border-hover="1px solid {colors['gray-6']}"
  --border-focused="1px solid {colors['gray-9']}"
  --background="#ffffff"
  --border-radius="0"
  --font-size="0.75rem"
  --height="1.875rem"
  --padding-left="0.5rem"
  --padding-right="0.5rem"
  --padding-top="0.375rem"
  --padding-bottom="0.375rem"
  --chevron-height="1rem"
  --chevron-icon-colour={colors['gray-6']}
  --chevron-icon-width="1rem"
  --clear-icon-color={colors['gray-6']}
  --clear-icon-width="1rem"
  --item-height="auto"
  --item-line-height="auto"
  --item-first-border-radius="0"
  --item-is-active-bg={colors['gray-8']}
  --item-is-active-color="#fff"
  --item-active-background="#f7f7f8"
  --item-hover-bg="#f7f7f8"
  --item-padding="0.5rem"
  --disabled-border-color={colors['disabled-light']}
  --disabled-background={colors['disabled-light']}
  --error-border="1px solid {colors['danger-dark']}"
  --list-shadow="none"
  --list-border="1px solid {colors['gray-9']}"
  --list-border-radius="0"
  {...$$restProps}
  on:blur={onBlur}
  on:change={onChange}
  on:clear={onClear}
  on:filter={onFilter}
  on:focus={onFocus}
  on:input={onInput}
  on:select={onSelect}
>
  <div
    slot="item"
    let:item
    let:index
  >
    {@const icon = icons[index]}
    <div class="flex items-center gap-2">
      {#if icon}
        <Icon
          cx="flex-shrink-0"
          name={icon}
        />
      {/if}
      <div class="flex w-full flex-col flex-wrap overflow-x-hidden">
        <div class="w-full min-w-0 text-wrap break-words">{item.label}</div>
        {#if item.description}
          <div class="break-word w-full min-w-0 text-wrap text-[0.6rem]">
            {item.description}
          </div>
        {/if}
      </div>
    </div>
  </div>
  <Icon
    slot="chevron-icon"
    name="chevron-down"
    cx="text-gray-6"
  />
  <Icon
    slot="clear-icon"
    name="close"
    cx="text-gray-6"
  />
  <Progress slot="loading-icon" />
</Select>
