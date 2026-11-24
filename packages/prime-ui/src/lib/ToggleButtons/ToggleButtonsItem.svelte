<!--
@component
One option of a [`ToggleButtons`](./ToggleButtons.svelte) group. Its children are the option's
content.

```svelte
<ToggleButtons.Item value="grid">Grid</ToggleButtons.Item>
```
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { ToggleGroup } from 'bits-ui';

	import { useToggleButtons } from './useToggleButtons.svelte.ts';

	interface Props extends Omit<HTMLButtonAttributes, 'value'> {
		/** Element id. bits-ui accepts a string only, so `null` is not accepted. */
		id?: string;
		/** The value the group holds when this option is selected. */
		value: string;
	}

	const { value, class: extraClasses, children, ...restProps }: Props = $props();

	const group = useToggleButtons();

	const selectedStop = (state: unknown) => (state === 'on' ? 0 : -1);
</script>

<ToggleGroup.Item
	{value}
	class={[
		'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-sm border border-gray-6 px-3 py-1.5 text-sm whitespace-nowrap focus-ring transition-colors select-none',
		'bg-medium text-subtle-1 hover:bg-gray-3 active:bg-gray-4',
		'data-[state=on]:bg-light data-[state=on]:font-semibold data-[state=on]:text-default data-[state=on]:hover:bg-light',
		'group-aria-invalid:enabled:border-danger-dark',
		'disabled:cursor-not-allowed disabled:border-disabled-light disabled:bg-disabled-light disabled:text-disabled-dark',
		'disabled:data-[state=on]:bg-gray-4 disabled:data-[state=on]:text-disabled-dark disabled:data-[state=on]:hover:bg-gray-4',
		extraClasses
	]}
	{...restProps}
>
	{#snippet child({ props })}
		<button
			{...props}
			{...group?.hasEnabledSelection ? { tabindex: selectedStop(props['data-state']) } : {}}
			{@attach () => {
				if (props['data-state'] === 'on') group?.reportSelected(props.disabled === true);
			}}
		>
			{@render children?.()}
		</button>
	{/snippet}
</ToggleGroup.Item>
