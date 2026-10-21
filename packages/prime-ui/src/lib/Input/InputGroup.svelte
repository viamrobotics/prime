<!--
@component
Wraps an input with leading or trailing content, such as an icon, a unit suffix, or a state
icon. The group wears the `control-frame`, and the [`Input`](./Input.svelte) or
[`NumberInput`](./NumberInput.svelte) directly inside it hands over its border, padding, and
focus ring. Clicking the group's padding or any non-interactive content focuses the input.

A disabled or readonly input restyles the group, and the input's `error` or `warn` state colors
the group's border. The frame reads the input's attributes in CSS, so no JavaScript runs. Only
an `<input>` counts, so a disabled button beside it leaves the group alone.

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

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** The input plus any content before or after it, in any order. */
		children?: Snippet;
	}

	const { class: extraClasses, children, onpointerdown, ...restProps }: Props = $props();

	const focusableSelector = 'button, a, input, select, textarea, [tabindex]';

	let group = $state<HTMLDivElement>();

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
	class={['inline-flex control-frame items-center gap-1 focus-ring-within', extraClasses]}
>
	{@render children?.()}
</div>
