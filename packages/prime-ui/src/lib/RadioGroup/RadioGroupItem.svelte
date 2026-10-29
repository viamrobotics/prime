<!--
@component
A single option within a [`RadioGroup`](./RadioGroup.svelte). Its children are the label.

```svelte
<RadioGroup.Item value="sm">Small</RadioGroup.Item>
```

Pass an `indicator` snippet to replace the radio icon:

```svelte
<script>
	import { mdiRadioboxBlank, mdiRadioboxMarked } from '@mdi/js';
</script>

<RadioGroup.Item value="sm">
	{#snippet indicator({ checked })}
		<Icon icon={checked ? mdiRadioboxMarked : mdiRadioboxBlank} size="lg" />
	{/snippet}
	Small
</RadioGroup.Item>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiRadioboxBlank, mdiRadioboxMarked } from '@mdi/js';
	import { RadioGroup } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'value'> {
		/** The value this item selects when chosen. */
		value: string;

		/** Replaces the radio icon. Receives `{ checked }`. */
		indicator?: Snippet<[{ checked: boolean }]>;
	}

	const {
		id,
		value,
		disabled,
		class: extraClasses,
		indicator,
		children: label,
		...restProps
	}: Props = $props();

	const uid = $props.id();
</script>

{#snippet radio({ checked }: { checked: boolean })}
	<Icon
		icon={checked ? mdiRadioboxMarked : mdiRadioboxBlank}
		class={[
			'group-aria-invalid:text-danger-dark group-data-disabled:text-disabled-dark',
			{ 'text-default': checked, 'text-subtle-2': !checked }
		]}
	/>
{/snippet}

<RadioGroup.Item
	{value}
	{disabled}
	{...restProps}
	id={id ?? uid}
	class={[
		'group inline-flex items-center gap-2 text-sm focus-ring',
		'cursor-pointer text-default data-disabled:cursor-not-allowed data-disabled:text-disabled-dark',
		extraClasses
	]}
>
	{#snippet children({ checked })}
		{@const icon = indicator ?? radio}
		{@render icon({ checked })}
		{@render label?.()}
	{/snippet}
</RadioGroup.Item>
