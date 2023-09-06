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
import Input from './input.svelte';

/** The input type */
export let type: TextInputTypes | undefined = 'text';

/** The value of the input, if any. */
export let value: string | undefined = undefined;

/** The HTML input element. */
export let input: HTMLInputElement | undefined = undefined;
</script>

<Input
  {...$$restProps}
  {type}
  bind:value
  bind:input
  on:input
  on:keydown
  on:blur
/>
