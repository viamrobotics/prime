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

Give an item a `description` to show a line of text under its label, and a `details` snippet for content that
appears under it only while the item is checked. With either, `class` lands on a wrapper `<div>` around the item:

```svelte
<RadioGroup.Item value="email" description="We send a code.">
	{#snippet details()}
		<Input aria-label="Email address" />
	{/snippet}
	Email
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

		/** Text under the label, which the radio's accessible description reads. */
		description?: string;

		/** Content under the label, rendered only while this item is checked. */
		details?: Snippet;
	}

	const {
		id,
		value,
		disabled,
		class: extraClasses,
		indicator,
		description,
		details,
		'aria-describedby': describedBy,
		children: label,
		...restProps
	}: Props = $props();

	const uid = $props.id();
	const itemId = $derived(id ?? uid);

	const itemClasses = [
		'group inline-flex items-center gap-2 text-sm focus-ring',
		'cursor-pointer text-default data-disabled:cursor-not-allowed data-disabled:text-disabled-dark'
	];
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

{#snippet content({ checked }: { checked: boolean })}
	{@const icon = indicator ?? radio}
	{@render icon({ checked })}
	{@render label?.()}
{/snippet}

{#if description || details}
	{@const descriptionId = description ? `${itemId}-description` : undefined}
	{@const describedByIds = [descriptionId, describedBy].filter(Boolean).join(' ') || undefined}
	<RadioGroup.Item {value} {disabled} {...restProps} id={itemId} class={itemClasses}>
		{#snippet child({ props, checked })}
			<div class={['flex flex-col', extraClasses]}>
				<button {...props} aria-describedby={describedByIds}>
					{@render content({ checked })}
				</button>
				{#if description}
					<p id={descriptionId} class="ps-6 text-sm text-subtle-1">{description}</p>
				{/if}
				{#if details && checked}
					<div class="ps-6">
						{@render details()}
					</div>
				{/if}
			</div>
		{/snippet}
	</RadioGroup.Item>
{:else}
	<RadioGroup.Item
		{value}
		{disabled}
		{...restProps}
		aria-describedby={describedBy}
		id={itemId}
		class={[itemClasses, extraClasses]}
	>
		{#snippet children({ checked })}
			{@render content({ checked })}
		{/snippet}
	</RadioGroup.Item>
{/if}
