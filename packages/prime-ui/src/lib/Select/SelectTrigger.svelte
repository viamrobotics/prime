<!--
@component
The button that opens a [`Select`](./Select.svelte). Inside a
[`Field`](../Field/Field.svelte) it takes its `id` (the field's `controlId`), `state`, and `aria-describedby` from there.
An `error` state sets `aria-invalid` and the error border. Pair it with a `Hint` or a
`Field.StateIcon` that says what is wrong, since the border color alone is not a signal
everyone can see.

Add a [`Select.Value`](./SelectValue.svelte) child to show the current selection.

A trailing chevron is rendered by default. Pass an `indicator` snippet to replace it:

```svelte
<script>
	import { mdiChevronDown } from '@mdi/js';
</script>

<Select.Trigger>
	<Select.Value placeholder="Pick one" />
	{#snippet indicator()}
		<Icon icon={mdiChevronDown} size="lg" />
	{/snippet}
</Select.Trigger>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiChevronDown } from '@mdi/js';
	import { Select } from 'bits-ui';

	import { FieldStates, type FieldState } from '../Field/state.ts';
	import { useField } from '../Field/useField.svelte.ts';
	import { FOCUS_RING } from '../focus-ring.ts';
	import Icon from '../Icon/Icon.svelte';
	import { frameBorder } from '../Input/frame.ts';

	interface Props extends HTMLButtonAttributes {
		/** Replaces the trailing chevron. */
		indicator?: Snippet;
		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	const {
		id,
		'aria-describedby': describedBy,
		state,
		class: extraClasses,
		indicator,
		children,
		...restProps
	}: Props = $props();

	const field = useField();
	const currentState = $derived(state ?? field?.state ?? FieldStates.None);
	const openBorder = $derived(
		currentState === FieldStates.None ? 'data-[state=open]:border-gray-9' : undefined
	);
</script>

{#snippet chevron()}
	<Icon icon={mdiChevronDown} size="sm" class="shrink-0 text-subtle-2" />
{/snippet}

<Select.Trigger
	id={id ?? field?.controlId}
	aria-describedby={describedBy ?? field?.describedBy}
	aria-invalid={currentState === FieldStates.Error || undefined}
	class={[
		'flex items-center justify-between gap-2 rounded-sm border bg-white px-2 py-1.5 text-sm text-default transition-colors data-disabled:cursor-not-allowed data-disabled:bg-disabled-light data-disabled:text-disabled-dark',
		FOCUS_RING,
		openBorder,
		frameBorder(currentState),
		extraClasses
	]}
	{...restProps}
>
	{@render children?.()}
	{@const suffix = indicator ?? chevron}
	{@render suffix()}
</Select.Trigger>
