<!--
@component
A dense container for a tool panel's controls, with an optional visible `title`. The root is a
`role="group"` named by the title, or by `aria-label` without one.

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
		/** Visible title, which names the group. Without it, pass `aria-label`. */
		title?: string;

		/** Accessible name for the group when it has no visible `title`. */
		'aria-label'?: string;

		/** Classes for the root `role="group"` element. */
		class?: ClassValue;

		/** The panel's controls. */
		children?: Snippet;
	}

	const { title, 'aria-label': ariaLabel, class: extraClasses, children }: Props = $props();

	const titleId = $props.id();
</script>

<div
	role="group"
	aria-labelledby={title ? titleId : undefined}
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
