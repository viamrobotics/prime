<!--
@component
One tab of a [`Tabs`](./Tabs.svelte) strip. Its children are the tab's content. It is a
`role="tab"` element rather than a `<button>`, so a control such as a close `icon-button` can
sit inside it; that control's keys stay with it, and it stops click propagation so the click
does not select the tab.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Tabs } from 'bits-ui';

	import { useTabs } from './useTabs.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** The value the root holds when this tab is selected. */
		value: string;
		/** Disable this tab. @default false */
		disabled?: boolean;
	}

	const { value, disabled = false, class: extraClasses, children, ...restProps }: Props = $props();

	const tabs = useTabs();

	$effect(() => tabs?.register(value));

	// bits-ui renders a button, so it sets the button-only `type` and `disabled` that a div must not carry.
	const buttonOnlyAttributes = { type: undefined, disabled: undefined };

	// bits-ui types its trigger as a button, which the div attributes exceed; it merges handlers and classes itself.
	const triggerProps = $derived(restProps as Record<string, unknown>);
</script>

<Tabs.Trigger
	{value}
	{disabled}
	class={[
		'-mb-px cursor-pointer border-b-2 pt-2 pb-1.5 text-sm focus-ring',
		'border-transparent text-subtle-2 hover:text-default',
		'data-[state=active]:border-gray-9 data-[state=active]:font-semibold data-[state=active]:text-default',
		'data-[disabled]:cursor-not-allowed data-[disabled]:text-disabled-dark',
		extraClasses
	]}
	{...triggerProps}
>
	{#snippet child({ props })}
		{@const { onkeydown } = props as { onkeydown?: (event: KeyboardEvent) => void }}
		<!-- A key from a control inside the tab must not reach bits-ui, which would swallow Enter and Space. -->
		<div
			{...props}
			{...buttonOnlyAttributes}
			aria-disabled={disabled || undefined}
			onkeydown={(event) => {
				if (event.target !== event.currentTarget) return;
				onkeydown?.(event);
			}}
		>
			{@render children?.()}
		</div>
	{/snippet}
</Tabs.Trigger>
