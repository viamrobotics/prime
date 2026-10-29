<!--
@component
A choice in a [`Menu.RadioGroup`](./MenuRadioGroup.svelte). Selecting it sets the group's `value` to this item's
`value`. A check icon leads the label while selected. The menu closes after a selection.

```svelte
<Menu.RadioItem value="small">Small</Menu.RadioItem>
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

		/** The value this item selects in its `Menu.RadioGroup`. */
		value: string;

		/** Prevent the item from being selected. @default false */
		disabled?: boolean;

		/** The item's content. Receives `{ checked }`. */
		children?: Snippet<[{ checked: boolean }]>;
	}

	const { class: extraClasses, children: content, ...restProps }: Props = $props();
</script>

<DropdownMenu.RadioItem
	class={[
		'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-default outline-none select-none data-disabled:cursor-not-allowed data-disabled:text-disabled-dark data-highlighted:bg-light',
		extraClasses
	]}
	{...restProps}
>
	{#snippet children({ checked })}
		<span class="flex size-4 shrink-0 items-center justify-center">
			{#if checked}
				<Icon icon={mdiCheck} size="sm" />
			{/if}
		</span>
		{@render content?.({ checked })}
	{/snippet}
</DropdownMenu.RadioItem>
