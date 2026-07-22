<!--
@component
A single option within a [`RadioGroup`](./RadioGroup.svelte).
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { RadioGroup } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'value'> {
		/** The value this item selects when chosen. */
		value: string;
	}

	const {
		id,
		value,
		disabled = false,
		class: extraClasses,
		children: label,
		...restProps
	}: Props = $props();

	const uid = $props.id();
</script>

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
		<Icon
			icon={checked ? 'radiobox-marked' : 'radiobox-blank'}
			size="lg"
			class={{
				'text-disabled-dark': disabled,
				'text-default': !disabled && checked,
				'text-subtle-2': !disabled && !checked
			}}
		/>
		{@render label?.()}
	{/snippet}
</RadioGroup.Item>
