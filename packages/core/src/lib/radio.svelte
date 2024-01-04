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

/** The set of options that is available in the radio button. */
export let options: string[];

/** The name for the inputs in the fieldset of radio options. */
export let name: string;

/** The selected option on the radio button. */
export let selected: string | undefined = undefined;

/**  Whether or not the radio should render as disabled. */
export let disabled = false;

/** Whether or not the fieldset should render as required */
export let required = false;

/** The `flex` direction to apply to the option radio inputs. */
export let direction: 'col' | 'row' = 'col';

/** Additional CSS classes to pass to the fieldset. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

$: isSelected = (option: string) => option === selected;
$: handleDisabled = preventHandler(disabled);
$: handleDisabledKeydown = preventKeyboardHandler(disabled);
$: getIcon = (option: string): IconName =>
  isSelected(option) ? 'radiobox-marked' : 'radiobox-blank';
</script>

<fieldset
  aria-disabled={disabled ? true : undefined}
  class={cx('flex', extraClasses)}
  {...$$restProps}
>
  {#if $$slots.legend}
    <legend
      class={cx(
        cx('mb-1 flex text-xs', {
          'text-subtle-1': !disabled,
          'cursor-not-allowed text-disabled-dark': disabled,
          'after:ml-1 after:text-danger-dark after:content-["*"]': required,
        })
      )}
    >
      <slot name="legend" />
    </legend>
  {/if}

  <div
    class={cx('flex', {
      'flex-col': direction === 'col',
      'flex-row gap-2': direction === 'row',
    })}
  >
    {#each options as option}
      <Label
        position="left"
        {disabled}
        cx={[
          'h-7.5 whitespace-nowrap text-xs',
          {
            'font-semibold': isSelected(option),
            'text-default': isSelected(option) && !disabled,
            'text-subtle-1': !isSelected(option) && !disabled,
            'cursor-not-allowed text-disabled-dark': disabled,
          },
        ]}
      >
        <input
          {name}
          type="radio"
          value={option}
          class="peer appearance-none"
          checked={isSelected(option)}
          readonly={disabled ? true : undefined}
          aria-disabled={disabled ? true : undefined}
          bind:group={selected}
          on:input
          on:input|capture={handleDisabled}
          on:click|capture={handleDisabled}
          on:keydown|capture={handleDisabledKeydown}
        />
        <Icon
          name={getIcon(option)}
          cx={cx({
            'text-disabled-dark': disabled,
          })}
        />
        <span class="pl-1.5 peer-focus:underline">
          {option}
        </span>
      </Label>
    {/each}
  </div>
</fieldset>
