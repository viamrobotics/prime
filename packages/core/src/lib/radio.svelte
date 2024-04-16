<!--
@component

For users to choose only one of a predefined set of mutually exclusive options.

```svelte
<Radio
  name="options"
  options="['Opt 1', 'Opt 2', 'Opt 3']"
  selected="Opt 1"
/>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import Label from '$lib/label.svelte';
import { Icon, type IconName } from '$lib/icon';
import { preventHandler, preventKeyboardHandler } from '$lib/prevent-handler';

interface Option {
  label: string;
  value: string;
  description?: string;
  icon?: IconName;
}

type Options = (string | Option)[];

/** The set of options that is available in the radio button. */
export let options: Options;

/** The name for the inputs in the fieldset of radio options. */
export let name: string;

/** The selected option on the radio button. */
export let selected: string | undefined = undefined;

/**  Whether or not the radio should render as disabled. */
export let disabled = false;

/** Whether or not the fieldset should render as required */
export let required = false;

/** Additional CSS classes to pass to the fieldset. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

let optionsInternal: Option[] = [];

$: optionsInternal = options.map((option) =>
  typeof option === 'string' ? { label: option, value: option } : option
);
$: handleDisabled = preventHandler(disabled);
$: handleDisabledKeydown = preventKeyboardHandler(disabled);
</script>

<fieldset
  aria-disabled={disabled ? true : undefined}
  class={cx('flex', extraClasses)}
  {...$$restProps}
>
  {#if $$slots.legend}
    <legend
      class={cx(
        cx('mb-2 flex text-xs text-subtle-1', {
          'after:text-danger-dark after:content-["*"]': required,
        })
      )}
    >
      <slot name="legend" />
    </legend>
  {/if}

  <div class="flex flex-col gap-2">
    {#each optionsInternal as { label, value, description, icon }}
      {@const isSelected = value === selected}
      {@const radioIcon = isSelected ? 'radiobox-marked' : 'radiobox-blank'}
      <Label
        position="left"
        {disabled}
        cx={[
          'cursor-pointer text-xs',
          {
            'text-subtle-1': !isSelected && !disabled,
            'cursor-not-allowed text-disabled-dark': disabled,
          },
        ]}
      >
        <input
          {name}
          {value}
          type="radio"
          class="peer appearance-none"
          checked={isSelected}
          readonly={disabled ? true : undefined}
          aria-disabled={disabled ? true : undefined}
          bind:group={selected}
          on:input
          on:input|capture={handleDisabled}
          on:click|capture={handleDisabled}
          on:keydown|capture={handleDisabledKeydown}
        />
        <div>
          <Icon
            name={radioIcon}
            cx={cx({
              'text-disabled-dark': disabled,
              'text-gray-9': !disabled && isSelected,
              'text-gray-6': !disabled && !isSelected,
            })}
          />
        </div>
        <span class="pl-1.5">
          <span class="flex gap-1.5">
            {#if icon}
              <Icon
                cx="text-gray-7"
                name={icon}
              />
            {/if}
            <span
              class={cx({
                'font-semibold': isSelected,
                'text-default': isSelected && !disabled,
              })}>{label}</span
            >
          </span>
          {#if description}
            <p class="mt-0.5 text-subtle-2">{description}</p>
          {/if}
        </span>
      </Label>
    {/each}
  </div>
</fieldset>
