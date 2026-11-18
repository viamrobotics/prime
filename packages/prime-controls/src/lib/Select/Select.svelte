<!--
@component
prime-ui's `Select` at a tool panel's scale. Compose it from [`Select.Trigger`](./SelectTrigger.svelte)
holding a [`Select.Value`](./SelectValue.svelte), and a [`Select.Content`](./SelectContent.svelte) holding
a [`Select.Viewport`](./SelectViewport.svelte), the same parts and keyboard as prime-ui's.

```svelte
<Select bind:value items={modes}>
	<Select.Trigger>
		<Select.Value placeholder="Mode" />
	</Select.Trigger>
	<Select.Content>
		<Select.Viewport>
			<Select.Items />
		</Select.Viewport>
	</Select.Content>
</Select>
```

Without children it renders those parts itself from `items`, named by `aria-label` or `aria-labelledby`:

```svelte
<Select {items} bind:value aria-label="Mode" />
```
-->
<script lang="ts">
	import type { ComponentProps, Snippet } from 'svelte';

	// Aliased, because a `typeof Select` here would name this component in the published types.
	import { Select as PrimeSelect } from '@viamrobotics/prime-ui';

	import Hint from '../Hint/Hint.svelte';
	import SelectContent from './SelectContent.svelte';
	import SelectItems from './SelectItems.svelte';
	import { provideSelectItems } from './select-items.ts';
	import SelectTrigger from './SelectTrigger.svelte';
	import SelectValue from './SelectValue.svelte';
	import SelectViewport from './SelectViewport.svelte';

	type RootProps = Omit<ComponentProps<typeof PrimeSelect>, 'children'>;

	interface ComposedProps extends RootProps {
		/** The `Select.*` parts. Without them the select renders its own trigger and list from `items`. */
		children: Snippet;
		placeholder?: never;
		hint?: never;
		'aria-label'?: never;
		'aria-labelledby'?: never;
	}

	interface ChildlessProps extends RootProps {
		children?: never;

		/** Text the trigger shows while nothing is selected. Only without `children`. */
		placeholder?: string;

		/** Accessible name for the trigger. Only without `children`. */
		'aria-label'?: string;

		/** Id of the element that names the trigger. Only without `children`. */
		'aria-labelledby'?: string;

		/**
		 * Help text, shown in a tooltip from an info button beside the trigger, and the trigger's
		 * accessible description. The button is named from `aria-label`, so it needs one. Only
		 * without `children`.
		 */
		hint?: string;
	}

	// The hint button is named `About <aria-label>`, so a hint needs an `aria-label` and not an id.
	type AccessibleName = { 'aria-label': string } | { 'aria-labelledby': string; hint?: undefined };

	type Props = ComposedProps | (ChildlessProps & AccessibleName);

	let {
		value = $bindable(),
		items,
		children,
		placeholder,
		hint,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		...restProps
	}: Props = $props();

	provideSelectItems(() => items);

	const hintId = $props.id();
	const hintedName = $derived(hint ? ariaLabel : undefined);
</script>

<PrimeSelect bind:value {items} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		{#snippet trigger()}
			<SelectTrigger
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledby}
				aria-describedby={hintedName ? hintId : undefined}
			>
				<SelectValue {placeholder} />
			</SelectTrigger>
		{/snippet}
		{#if hint && hintedName}
			<div class="flex items-center gap-1">
				{@render trigger()}
				<Hint label={hintedName} {hint} descriptionId={hintId} />
			</div>
		{:else}
			{@render trigger()}
		{/if}
		<SelectContent>
			<SelectViewport>
				<SelectItems />
			</SelectViewport>
		</SelectContent>
	{/if}
</PrimeSelect>
