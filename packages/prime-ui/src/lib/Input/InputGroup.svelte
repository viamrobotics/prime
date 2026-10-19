<!--
@component
Wraps an input with leading or trailing content, such as an icon, a unit suffix, or a state
icon. The group carries the border and padding, and the [`Input`](./Input.svelte) or
[`NumberInput`](./NumberInput.svelte) inside it goes borderless. Clicking the group's
padding or any non-interactive content focuses the input.

A disabled or readonly input restyles the group. `state="error"` or `"warn"` on the input colors
the group's border. Both use CSS `has-` variants, so no JavaScript runs. Only the input counts,
so a disabled button beside it leaves the group alone.

```svelte
<Input.Group>
	<Icon icon={mdiMagnify} class="text-subtle-2" />
	<Input placeholder="Search" bind:value />
	<Field.StateIcon state="error" />
</Input.Group>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { FOCUS_RING_WITHIN } from '../focus-ring.ts';
	import { provideInputGroup } from './useInputGroup.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** The input plus any content before or after it, in any order. */
		children?: Snippet;
	}

	const { class: extraClasses, children, onpointerdown, ...restProps }: Props = $props();

	const focusableSelector = 'button, a, input, select, textarea, [tabindex]';

	let group = $state<HTMLDivElement>();

	provideInputGroup();

	const focusInput = (event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
		onpointerdown?.(event);
		if (event.defaultPrevented || !group || !(event.target instanceof Element)) return;

		const focusable = event.target.closest(focusableSelector);
		if (focusable && focusable !== group && group.contains(focusable)) return;

		event.preventDefault();
		group.querySelector('input')?.focus();
	};
</script>

<div
	{...restProps}
	bind:this={group}
	onpointerdown={focusInput}
	class={[
		'inline-flex items-center gap-1 rounded-sm border bg-white px-2 py-1.5 text-sm transition-colors',
		'border-light hover:border-gray-6',
		FOCUS_RING_WITHIN,
		'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-transparent has-[input:disabled]:bg-disabled-light',
		'has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-light',
		'has-[input[data-state=error]:not(:disabled):not([readonly])]:border-danger-dark',
		'has-[input[data-state=warn]:not(:disabled):not([readonly])]:border-warning-bright',
		extraClasses
	]}
>
	{@render children?.()}
</div>
