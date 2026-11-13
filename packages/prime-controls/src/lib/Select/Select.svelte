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

	import { Select } from '@viamrobotics/prime-ui';

	import SelectContent from './SelectContent.svelte';
	import SelectItems from './SelectItems.svelte';
	import { provideSelectItems } from './select-items.ts';
	import SelectTrigger from './SelectTrigger.svelte';
	import SelectValue from './SelectValue.svelte';
	import SelectViewport from './SelectViewport.svelte';

	type RootProps = Omit<ComponentProps<typeof Select>, 'children'>;

	interface ComposedProps extends RootProps {
		/** The `Select.*` parts. Without them the select renders its own trigger and list from `items`. */
		children: Snippet;
		placeholder?: never;
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
	}

	type AccessibleName = { 'aria-label': string } | { 'aria-labelledby': string };

	type Props = ComposedProps | (ChildlessProps & AccessibleName);

	let {
		value = $bindable(),
		items,
		children,
		placeholder,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		...restProps
	}: Props = $props();

	provideSelectItems(() => items);
</script>

<Select bind:value {items} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<SelectTrigger aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
			<SelectValue {placeholder} />
		</SelectTrigger>
		<SelectContent>
			<SelectViewport>
				<SelectItems />
			</SelectViewport>
		</SelectContent>
	{/if}
</Select>
