<!--
@component
A toggle in a [`Menu.Content`](./MenuContent.svelte). Bind `checked` two-way, or as a getter and setter to
veto or transform a change. A check icon leads the label while checked. The menu closes after a toggle.

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

		/** The item's content. Receives `{ checked }`. */
		children?: Snippet<[{ checked: boolean }]>;
	}

	let {
		class: extraClasses,
		checked = $bindable(),
		children: content,
		...restProps
	}: Props = $props();
</script>

<DropdownMenu.CheckboxItem
	bind:checked={() => checked ?? false, (next) => (checked = next)}
	class={[
		'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-default outline-none select-none data-disabled:cursor-not-allowed data-disabled:text-disabled-dark data-highlighted:bg-light',
		extraClasses
	]}
	{...restProps}
>
	{#snippet children({ checked }: { checked: boolean })}
		<span class="flex size-4 shrink-0 items-center justify-center">
			{#if checked}
				<Icon icon={mdiCheck} size="sm" />
			{/if}
		</span>
		{@render content?.({ checked })}
	{/snippet}
</DropdownMenu.CheckboxItem>
