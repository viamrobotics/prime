<!--
@component
The Viam remote part glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M4 6V4a12 12 0 0 1 12 12h-2A10 10 0 0 0 4 6Zm0 4V8a8 8 0 0 1 8 8h-2a6 6 0 0 0-6-6Zm0 2a4 4 0 0 1 4 4H4v-4Zm-1 6h16v-2l3 3-3 3v-2H3v-2Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
