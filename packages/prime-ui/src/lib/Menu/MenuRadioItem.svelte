<!--
@component
A choice in a [`Menu.RadioGroup`](./MenuRadioGroup.svelte). Selecting it sets the group's `value` to this item's
`value`. A check icon leads the label while selected, and an `indicator` snippet replaces it. The menu closes after a selection.

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

		/** Replaces the check icon. Receives `{ checked }`. */
		indicator?: Snippet<[{ checked: boolean }]>;

		/** The item's content. Receives `{ checked }`. */
		children?: Snippet<[{ checked: boolean }]>;
	}

	const { class: extraClasses, indicator, children: content, ...restProps }: Props = $props();
</script>

<DropdownMenu.RadioItem class={['listbox-option', extraClasses]} {...restProps}>
	{#snippet children({ checked })}
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
</DropdownMenu.RadioItem>
