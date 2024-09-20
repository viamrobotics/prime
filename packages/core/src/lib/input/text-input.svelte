<!--
@component

For text-based user inputs.

```svelte
<TextInput type="email"  on:input={onInput} />
```
-->
<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
export type TextInputTypes = 'text' | 'email' | 'password';
</script>

<script lang="ts">
import type cx from 'classnames';
import Input from './input.svelte';

/** The input type */
export let type: TextInputTypes | undefined = 'text';

/** The value of the input, if any. */
export let value: string | undefined = undefined;

/** The HTML input element. */
export let input: HTMLInputElement | undefined = undefined;

/** Additional CSS classes to pass to the input. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<Input
  cx={extraClasses}
  {type}
  {...$$restProps}
  on:input
  on:change
  on:keydown
  on:focus
  on:blur
  bind:value
  bind:input
/>
