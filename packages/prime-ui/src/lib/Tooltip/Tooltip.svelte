<!--
@component
A tooltip: a short label that appears when its trigger is hovered or focused. Render
[`Tooltip.Trigger`](./TooltipTrigger.svelte) around the control it describes and
[`Tooltip.Content`](./TooltipContent.svelte) for the label.

Built on [bits-ui `Tooltip`](https://bits-ui.com/docs/components/tooltip).

```svelte
<Tooltip bind:open>
	<Tooltip.Trigger>
		<button type="button" aria-label="Copy">Copy</button>
	</Tooltip.Trigger>
	<Tooltip.Content>Copy to clipboard</Tooltip.Content>
</Tooltip>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Tooltip } from 'bits-ui';

	interface Props {
		/** Whether the tooltip is showing. Two-way bindable. */
		open?: boolean;

		/** Milliseconds the pointer rests on the trigger before the tooltip opens. @default 300 */
		openDelay?: number;

		/** Keep the tooltip from opening. @default false */
		disabled?: boolean;

		/**
		 * Keep the tooltip open while the pointer is over its content, so a link or button inside
		 * stays reachable. Otherwise it closes as the pointer leaves the trigger. @default false
		 */
		interactive?: boolean;

		/** The `Tooltip.*` parts. */
		children?: Snippet;
	}

	let {
		open = $bindable(),
		openDelay = 300,
		disabled,
		interactive = false,
		children
	}: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root
		bind:open={() => open ?? false, (next) => (open = next)}
		delayDuration={openDelay}
		disableHoverableContent={!interactive}
		{disabled}
	>
		{@render children?.()}
	</Tooltip.Root>
</Tooltip.Provider>
