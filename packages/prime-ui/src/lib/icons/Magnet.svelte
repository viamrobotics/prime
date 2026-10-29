<!--
@component
The Viam magnet glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M3 17v-6a9 9 0 1 1 18 0v6h-4v-6a5 5 0 0 0-10 0v6m10 2h4v3h-4M3 19h4v3H3'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
