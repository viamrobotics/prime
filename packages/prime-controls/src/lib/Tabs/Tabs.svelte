<!--
@component
prime-ui's `Tabs` at a tool panel's scale. Compose it from [`Tabs.List`](./TabsList.svelte)
holding one [`Tabs.Trigger`](./TabsTrigger.svelte) per tab, and one
[`Tabs.Content`](./TabsContent.svelte) per tab, the same parts and keyboard as prime-ui's.

```svelte
<Tabs bind:value>
	<Tabs.List aria-label="Mode">
		<Tabs.Trigger value="move">Move</Tabs.Trigger>
		<Tabs.Trigger value="rotate">Rotate</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="move">…</Tabs.Content>
	<Tabs.Content value="rotate">…</Tabs.Content>
</Tabs>
```
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	// Aliased, because a `typeof Tabs` here would name this component in the published types.
	import { Tabs as PrimeTabs } from '@viamrobotics/prime-ui';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends ComponentProps<typeof PrimeTabs> {}

	let { value = $bindable(), class: extraClasses, children, ...restProps }: Props = $props();
</script>

<PrimeTabs bind:value class={['flex flex-col gap-1', extraClasses]} {...restProps}>
	{@render children?.()}
</PrimeTabs>
