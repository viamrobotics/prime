<!--
@component
The message a [`Combobox`](./Combobox.svelte) shows in its list when no option matches the
typed text. It is a `role="status"` region, so a screen reader announces the message, and it
stays empty while any option matches. Place it in the
[`Combobox.Viewport`](./ComboboxViewport.svelte) after
[`Combobox.Items`](./ComboboxItems.svelte).

```svelte
<Combobox.Viewport>
	<Combobox.Items />
	<Combobox.Empty>No matching region</Combobox.Empty>
</Combobox.Viewport>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { useCombobox } from './useCombobox.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();

	const combobox = useCombobox();
	if (!combobox) {
		throw new Error('Combobox.Empty must be rendered inside a Combobox.');
	}

	const isEmpty = $derived(combobox.matches.length === 0);
</script>

<div
	role="status"
	{...restProps}
	class={[isEmpty && 'px-2 py-1.5', 'text-sm text-subtle-2', extraClasses]}
>
	{#if isEmpty}
		{@render children?.()}
	{/if}
</div>
