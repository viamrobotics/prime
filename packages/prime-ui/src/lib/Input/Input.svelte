<!--
@component

For user inputs.

This is the base input component that accepts all input properties without any
additional behaviors attached. Generally, other typed inputs like the
NumberInput or DateInput are preferable.

```svelte
<Input type="email" onblur={onBlur} />
```
-->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { type InputState, InputStates } from './input-state.ts';
	import { provideInput } from './useInput.svelte.ts';

	/** Additional CSS classes to pass to the input. */
	interface Props extends HTMLInputAttributes {
		/** The state of the input (info, warn, error, success), if any. */
		state?: InputState;
		/** The HTML input element. */
		ref?: HTMLInputElement;
	}

	let {
		state = InputStates.NONE,
		ref = $bindable(undefined),
		class: extraClasses = '',
		children,
		...rest
	}: Props = $props();

	const input = provideInput(() => state);

	const defaultClasses = $derived(
		!rest.disabled &&
			!rest.readonly &&
			!input.isError &&
			'border-light bg-white hover:border-gray-6 focus:border-gray-9'
	);

	const readonlyClasses = $derived(
		rest.readonly && 'bg-light focus:border-gray-9 border-transparent'
	);

	const disabledClasses = $derived(
		rest.disabled &&
			'border-disabled-light focus:border-disabled-dark bg-disabled-light text-disabled-dark cursor-not-allowed select-none'
	);

	const errorClasses = $derived(
		input.isError &&
			'border-danger-dark focus:outline-danger-dark focus:outline-[1.5px] focus:-outline-offset-1'
	);

	const warningClasses = $derived(
		input.isWarn &&
			'border-warning-dark focus:outline-warning-dark focus:outline-[1.5px] focus:-outline-offset-1'
	);
</script>

<div class="relative w-full">
	<input
		{...rest}
		aria-disabled={rest.disabled ? true : undefined}
		aria-invalid={input.isError ? true : undefined}
		class={[
			'h-7.5 w-full appearance-none border px-2 py-1.5 text-xs leading-tight text-default outline-none',
			defaultClasses,
			readonlyClasses,
			disabledClasses,
			errorClasses,
			warningClasses,
			extraClasses
		]}
		bind:this={ref}
	/>
	{@render children?.()}
</div>

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
