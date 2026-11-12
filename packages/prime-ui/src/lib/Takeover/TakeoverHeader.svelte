<!--
@component
The top row of a [`Takeover`](./Takeover.svelte), rendered as a `header`. Place a `Takeover.Title` and a
`Takeover.Close` in it. It does not shrink and has a bottom border.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<header
	class={[
		'flex shrink-0 items-center justify-between border-b border-medium px-4 py-3',
		extraClasses
	]}
	{...restProps}
>
	{@render children?.()}
</header>
