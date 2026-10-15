<!--
@component
A number input with optional contextual state.

```svelte
<NumberInput id="qty" min={0} max={10} bind:value />
```
-->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import type { InputState } from './state.ts';

	import Input from './Input.svelte';

	interface Props extends Omit<HTMLInputAttributes, 'value' | 'min' | 'max' | 'step' | 'type'> {
		/** Current value. An empty field is `undefined`. */
		value?: number;

		/** The minimum allowed value. */
		min?: number;

		/** The maximum allowed value. */
		max?: number;

		/** Step for keyboard or spin-button increments. */
		step?: number;

		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: InputState;
	}

	let { value = $bindable(), ...restProps }: Props = $props();
</script>

<Input type="number" bind:value={() => value, (next) => (value = next)} {...restProps} />
