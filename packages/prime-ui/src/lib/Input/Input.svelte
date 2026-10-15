<!--
@component
An input field with optional contextual state. Inside a [`Field`](../Field/Field.svelte)
it takes its `id`, `disabled`, `required`, `state`, and `aria-describedby` from there.

```svelte
<Field class="flex flex-col gap-1">
	<Label>Email</Label>
	<Input type="email" bind:value>
		<Input.StateIcon />
	</Input>
</Field>
```
-->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { useField } from '../Field/useField.svelte.ts';
	import { inputClasses, InputStates, type InputState } from './state.ts';
	import { provideInput } from './useInput.svelte.ts';

	interface Props extends HTMLInputAttributes {
		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: InputState;
	}

	let {
		id,
		value = $bindable(),
		state,
		disabled,
		required,
		readonly = false,
		'aria-describedby': describedBy,
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	const field = useField();

	const currentState = $derived(state ?? field?.state ?? InputStates.None);
	const isDisabled = $derived(disabled ?? field?.disabled ?? false);
	const isRequired = $derived(required ?? field?.required ?? false);

	provideInput(() => currentState);
</script>

<div class={[...inputClasses(currentState, { disabled: isDisabled, readonly }), extraClasses]}>
	<input
		{...restProps}
		bind:value
		id={id ?? field?.id}
		disabled={isDisabled}
		required={isRequired}
		{readonly}
		aria-describedby={describedBy ?? field?.describedBy}
		aria-invalid={currentState === InputStates.Error || undefined}
		class={[
			'size-full bg-transparent outline-none placeholder:text-subtle-2',
			isDisabled ? 'text-disabled-dark' : 'text-default'
		]}
	/>

	{@render children?.()}
</div>
