<!--
@component
A collapsible group of controls inside a [`Panel`](../Panel/Panel.svelte), built on prime-ui's
`Collapsible`. The `title` is the disclosure button's text. Open by default.

```svelte
<Folder title="Lighting" bind:open>
	<Slider label="Intensity" min={0} max={1} step={0.01} bind:value={intensity} />
</Folder>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	import { Collapsible } from '@viamrobotics/prime-ui';

	interface Props {
		/** Visible title, the text of the button that opens and closes the folder. */
		title: string;

		/** Whether the controls are shown. Two-way bindable. @default true */
		open?: boolean;

		/** Disable the button that opens and closes the folder. @default false */
		disabled?: boolean;

		/** Classes for the root element. */
		class?: ClassValue;

		/** The folder's controls. */
		children?: Snippet;
	}

	let {
		title,
		open = $bindable(true),
		disabled = false,
		class: extraClasses,
		children
	}: Props = $props();
</script>

<Collapsible bind:open {disabled} class={extraClasses}>
	<Collapsible.Trigger class="min-h-6 rounded-sm text-xs font-semibold">{title}</Collapsible.Trigger
	>
	<Collapsible.Content class="mt-1 flex flex-col gap-1 border-l border-light pl-2">
		{@render children?.()}
	</Collapsible.Content>
</Collapsible>
