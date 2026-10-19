<!--
@component
Muted helper text for a form field. Inside a [`Field`](../Field/Field.svelte) it joins
the control's `aria-describedby` and follows the field's `disabled` and `state`. A disabled hint is dimmed whatever its state. Otherwise `error`, `warn`, and `info` each
set a color.

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

	import { FieldStates, type FieldState } from '../Field/state.ts';
	import { useField } from '../Field/useField.svelte.ts';

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
		/** Dim the text. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Color the text for a contextual state: `error`, `warn`, or `info`. Defaults to the enclosing field's `state`. */
		state?: FieldState;

		/** The hint text. */
		children: Snippet;
	}

	const { id, disabled, state, children, class: extraClasses, ...restProps }: Props = $props();

	const field = useField();
	const uid = $props.id();

	const hintId = $derived(id ?? uid);
	const isDisabled = $derived(disabled ?? field?.disabled ?? false);
	const currentState = $derived(state ?? field?.state ?? FieldStates.None);
	const color = $derived.by(() => {
		if (isDisabled) return 'text-disabled';
		if (currentState === FieldStates.Error) return 'text-danger-dark';
		if (currentState === FieldStates.Warn) return 'text-warning-dark';
		if (currentState === FieldStates.Info) return 'text-info-dark';
		return 'text-subtle-1';
	});

	$effect(() => field?.describe(hintId));
</script>

<p {...restProps} id={hintId} class={['text-xs', color, extraClasses]}>
	{@render children()}
</p>
