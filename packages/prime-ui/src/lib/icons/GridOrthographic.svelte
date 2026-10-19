<!--
@component
The Viam grid orthographic glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M11 11V4H4v7h7Zm0 2H4v7h7v-7Zm2 7v-7h7v7h-7ZM3 22l-1-1V3l1-1h18l1 1v18l-1 1H3Zm17-11h-7V4h7v7Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
