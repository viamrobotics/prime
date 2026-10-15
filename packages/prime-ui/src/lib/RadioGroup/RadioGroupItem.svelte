<!--
@component
A single option within a [`RadioGroup`](./RadioGroup.svelte). Its children are the label.

```svelte
<RadioGroup.Item value="sm">Small</RadioGroup.Item>
```

Pass an `indicator` snippet to replace the radio icon:

```svelte
<RadioGroup.Item value="sm">
	{#snippet indicator({ checked })}
		<Icon icon={checked ? 'radiobox-marked' : 'radiobox-blank'} size="lg" />
	{/snippet}
	Small
</RadioGroup.Item>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { RadioGroup } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'value'> {
		/** The value this item selects when chosen. */
		value: string;

		/** Replaces the radio icon. Receives the current state. */
		indicator?: Snippet<[{ checked: boolean }]>;
	}

	const {
		id,
		value,
		disabled = false,
		class: extraClasses,
		indicator,
		children: label,
		...restProps
	}: Props = $props();

	const uid = $props.id();
</script>

{#snippet radio({ checked }: { checked: boolean })}
	<Icon
		icon={checked ? 'radiobox-marked' : 'radiobox-blank'}
		class={{
			'text-disabled-dark': disabled,
			'text-default': !disabled && checked,
			'text-subtle-2': !disabled && !checked
		}}
	/>
{/snippet}

<RadioGroup.Item
	{value}
	{disabled}
	{...restProps}
	id={id ?? uid}
	class={[
		'inline-flex items-center gap-2 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-power-button-dark',
		disabled ? 'cursor-not-allowed text-disabled-dark' : 'cursor-pointer text-default',
		extraClasses
	]}
>
	{#snippet children({ checked })}
		{@const icon = indicator ?? radio}
		{@render icon({ checked })}
		{@render label?.()}
	{/snippet}
</RadioGroup.Item>
