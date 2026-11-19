<!--
@component
The button that opens and closes the list of a [`Combobox`](./Combobox.svelte). Pressing it keeps
focus in the [`Combobox.Input`](./ComboboxInput.svelte). Place it beside the input in an
[`Input.Group`](../Input/InputGroup.svelte).

A chevron is rendered by default. Pass an `indicator` snippet to replace it:

```svelte
<script>
	import { mdiMenuDown } from '@mdi/js';
</script>

<Input.Group>
	<Combobox.Input />
	<Combobox.Trigger>
		{#snippet indicator()}
			<Icon icon={mdiMenuDown} size="lg" />
		{/snippet}
	</Combobox.Trigger>
</Input.Group>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiChevronDown } from '@mdi/js';
	import { Combobox } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Replaces the chevron. */
		indicator?: Snippet;
	}

	const {
		class: extraClasses,
		indicator,
		'aria-label': label = 'Show options',
		tabindex = -1,
		...restProps
	}: Props = $props();
</script>

{#snippet chevron()}
	<Icon icon={mdiChevronDown} size="sm" />
{/snippet}

<Combobox.Trigger
	aria-label={label}
	{tabindex}
	class={['-my-0.5 input-button', extraClasses]}
	{...restProps}
>
	{@const suffix = indicator ?? chevron}
	{@render suffix()}
</Combobox.Trigger>
