<!--
@component
A disclosure: a trigger that shows and hides a region of content. Render
[`Collapsible.Trigger`](./CollapsibleTrigger.svelte) and
[`Collapsible.Content`](./CollapsibleContent.svelte) inside it.

Built on [bits-ui `Collapsible`](https://bits-ui.com/docs/components/collapsible).

```svelte
<Collapsible bind:open>
	<Collapsible.Trigger>
		<span class="font-semibold">Advanced</span>
	</Collapsible.Trigger>
	<Collapsible.Content>
		<p>More settings</p>
	</Collapsible.Content>
</Collapsible>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Collapsible } from 'bits-ui';

	import { provideCollapsible } from './useCollapsible.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** Whether the content is shown. Two-way bindable. @default false */
		open?: boolean;
		/** Disable the trigger. @default false */
		disabled?: boolean;
	}

	let {
		open = $bindable(),
		disabled = false,
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	provideCollapsible({ open: () => open ?? false });
</script>

<Collapsible.Root
	bind:open={() => open ?? false, (next) => (open = next)}
	{disabled}
	class={extraClasses}
	{...restProps}
>
	{@render children?.()}
</Collapsible.Root>
