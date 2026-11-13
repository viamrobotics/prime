<!--
@component
A dense container for a tool panel's controls, with an optional visible `title`. The root is a
`role="group"` named by the title, or by `aria-label` or `aria-labelledby` without one.

```svelte
<Panel title="Camera">
	<NumberField label="FOV" bind:value={fov} />
</Panel>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		/** Visible title, which names the group. Without it, pass `aria-label` or `aria-labelledby`. */
		title?: string;

		/** Accessible name for the group when it has no visible `title`. */
		'aria-label'?: string;

		/** Id of the element that names the group when it has no visible `title`. */
		'aria-labelledby'?: string;

		/** Classes for the root `role="group"` element. */
		class?: ClassValue;

		/** The panel's controls. */
		children?: Snippet;
	}

	type AccessibleName =
		| { title: string }
		| { 'aria-label': string }
		| { 'aria-labelledby': string };

	const {
		title,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		class: extraClasses,
		children
	}: Props & AccessibleName = $props();

	const titleId = $props.id();
</script>

<div
	role="group"
	aria-labelledby={title ? titleId : ariaLabelledby}
	aria-label={title ? undefined : ariaLabel}
	class={[
		'flex flex-col gap-1 rounded-md border border-light bg-gray-1 p-2 text-default',
		extraClasses
	]}
>
	{#if title}
		<span id={titleId} class="min-h-6 text-xs font-semibold">{title}</span>
	{/if}
	{@render children?.()}
</div>
