<!--
@component
Muted helper text for a form field. Inside a [`Field`](../Field/Field.svelte) it joins
the control's `aria-describedby` and follows the field's `disabled` and `state`.

```svelte
<Field class="flex flex-col gap-1">
	<Label>Email</Label>
	<Input type="email" bind:value />
	<Hint>We'll never share your email.</Hint>
</Field>
```

On its own, associate it with `aria-describedby`:

```svelte
<Input id="email" aria-describedby="email-hint" />
<Hint id="email-hint">We'll never share your email.</Hint>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { useField } from '../Field/useField.svelte.ts';
	import { InputStates, type InputState } from '../Input/state.ts';

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
		/** Dim the text. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Color the text for a contextual state. Defaults to the enclosing field's `state`. */
		state?: InputState;

		children: Snippet;
	}

	const { id, disabled, state, children, class: extraClasses, ...restProps }: Props = $props();

	const field = useField();
	const uid = $props.id();

	const hintId = $derived(id ?? uid);
	const isDisabled = $derived(disabled ?? field?.disabled ?? false);
	const currentState = $derived(state ?? field?.state ?? InputStates.None);

	const color = $derived.by(() => {
		if (isDisabled) return 'text-disabled';
		if (currentState === InputStates.Error) return 'text-danger-dark';
		return 'text-subtle-1';
	});

	$effect(() => field?.describe(hintId));
</script>

<p {...restProps} id={hintId} class={['text-xs', color, extraClasses]}>
	{@render children()}
</p>
