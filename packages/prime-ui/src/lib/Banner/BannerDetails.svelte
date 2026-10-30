<!--
@component
A disclosure under a divider in a [`Banner`](./Banner.svelte). The `summary` is the trigger label,
and the children are the content, set in small monospace type.

```svelte
<Banner.Details summary="Stack trace">{trace}</Banner.Details>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiChevronRight } from '@mdi/js';

	import { Collapsible } from '../Collapsible/collapsible.ts';
	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** Whether the content is shown. Two-way bindable. @default false */
		open?: boolean;
		/** The trigger label. @default 'Details' */
		summary?: string;
	}

	let {
		open = $bindable(),
		summary = 'Details',
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();
</script>

<Collapsible bind:open class={['banner-details', extraClasses]} {...restProps}>
	<Collapsible.Trigger>
		<span class="flex items-center gap-1 text-xs font-medium text-subtle-1">
			<Icon
				icon={mdiChevronRight}
				size="sm"
				class="shrink-0 transition-transform group-data-[state=open]:rotate-90"
			/>
			{summary}
		</span>
		{#snippet indicator()}{/snippet}
	</Collapsible.Trigger>
	<Collapsible.Content class="pl-9 font-roboto-mono text-xs text-subtle-1">
		{@render children?.()}
	</Collapsible.Content>
</Collapsible>
