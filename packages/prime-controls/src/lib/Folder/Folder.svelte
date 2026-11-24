<!--
@component
A collapsible group of controls inside a [`Panel`](../Panel/Panel.svelte), built on prime-ui's
`Collapsible`. The `title` is the disclosure button's text. Open by default. A `summary` adds a
short text at the end of the title row, such as what the folder holds while it is closed.

```svelte
<Folder title="Lighting" bind:open>
	<Slider label="Intensity" min={0} max={1} step={0.01} bind:value={intensity} />
</Folder>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';

	import { mdiChevronDown } from '@mdi/js';
	import { Collapsible, Icon } from '@viamrobotics/prime-ui';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'children' | 'id'> {
		/** Element id of the root. */
		id?: string;

		/** Visible title, the text of the button that opens and closes the folder. */
		title: string;

		/**
		 * Short text at the end of the title row, before the chevron, such as what the folder holds
		 * while it is closed. It is part of the button's accessible name.
		 */
		summary?: string;

		/** Whether the controls are shown. Two-way bindable. Open while it is `undefined`. */
		open?: boolean;

		/**
		 * Replaces the default chevron at the end of the title row, after any `summary`. Receives
		 * `{ open }`.
		 */
		indicator?: Snippet<[{ open: boolean }]>;

		/** Disable the button that opens and closes the folder. @default false */
		disabled?: boolean;

		/** Classes for the root element. */
		class?: ClassValue;

		/** The folder's controls. */
		children?: Snippet;
	}

	let {
		title,
		summary,
		open = $bindable(),
		disabled = false,
		indicator,
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();
</script>

<!-- The trigger draws its chevron only when it has no indicator, so this one brings its own. -->
{#snippet trailing({ open: isOpen }: { open: boolean })}
	<span class="flex shrink-0 items-center gap-2">
		{#if summary}
			<span class="font-normal text-subtle-2">{summary}</span>
		{/if}
		{#if indicator}
			{@render indicator({ open: isOpen })}
		{:else}
			<Icon
				icon={mdiChevronDown}
				size="sm"
				class={['text-subtle-2 transition-transform', isOpen && 'rotate-180']}
			/>
		{/if}
	</span>
{/snippet}

<Collapsible
	{...restProps}
	bind:open={() => open ?? true, (next) => (open = next)}
	{disabled}
	class={extraClasses}
>
	<Collapsible.Trigger
		class="min-h-6 rounded-sm text-xs font-semibold"
		indicator={summary || indicator ? trailing : undefined}
	>
		{title}
	</Collapsible.Trigger>
	<Collapsible.Content class="mt-1 flex flex-col gap-1 border-l border-light pl-2">
		{@render children?.()}
	</Collapsible.Content>
</Collapsible>
