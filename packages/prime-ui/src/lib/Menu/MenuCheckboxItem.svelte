<!--
@component
A toggle in a [`Menu.Content`](./MenuContent.svelte). Bind `checked` two-way, or as a getter and setter to
veto or transform a change. A check icon leads the label while checked, and an `indicator` snippet replaces it. The menu closes after a toggle.

```svelte
<Menu.CheckboxItem bind:checked={showHidden}>Show hidden</Menu.CheckboxItem>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiCheck } from '@mdi/js';
	import { DropdownMenu } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Checked state. Two-way bindable. @default false */
		checked?: boolean;

		/** Prevent the item from being toggled. @default false */
		disabled?: boolean;

		/** Replaces the check icon. Receives `{ checked }`. */
		indicator?: Snippet<[{ checked: boolean }]>;

		/** The item's content. Receives `{ checked }`. */
		children?: Snippet<[{ checked: boolean }]>;
	}

	let {
		class: extraClasses,
		checked = $bindable(),
		indicator,
		children: content,
		...restProps
	}: Props = $props();
</script>

<DropdownMenu.CheckboxItem
	bind:checked={() => checked ?? false, (next) => (checked = next)}
	class={['listbox-option', extraClasses]}
	{...restProps}
>
	{#snippet children({ checked }: { checked: boolean })}
		{#if indicator}
			{@render indicator({ checked })}
		{:else}
			<span class="flex size-4 shrink-0 items-center justify-center">
				{#if checked}
					<Icon icon={mdiCheck} size="sm" />
				{/if}
			</span>
		{/if}
		{@render content?.({ checked })}
	{/snippet}
</DropdownMenu.CheckboxItem>
