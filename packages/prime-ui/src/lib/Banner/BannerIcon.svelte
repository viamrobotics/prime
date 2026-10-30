<!--
@component
The icon chip of a [`Banner`](./Banner.svelte). Its children replace the variant glyph, such as a
spinner for a pending state or a custom icon.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { onDestroy } from 'svelte';

	import { useBanner } from './useBanner.svelte.ts';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();

	const release = useBanner()?.claimIcon();
	onDestroy(() => release?.());
</script>

<span {...restProps} class={['banner-chip', extraClasses]} aria-hidden="true">
	{@render children?.()}
</span>
