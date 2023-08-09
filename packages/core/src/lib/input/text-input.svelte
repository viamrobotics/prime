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
export let type: TextInputTypes = 'text';
</script>

<Input
  {...$$restProps}
  {type}
  on:input
  on:keydown
  on:focus
  on:blur
/>
