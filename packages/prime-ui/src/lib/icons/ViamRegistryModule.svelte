<!--
@component
The Viam registry module glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M3 21V3h18v18H3Zm2-2h14V5h-4.7v4.7H9.7v4.6H5V19Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
