<!--
@component
The Viam local module glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M3 3v18h18V3H3Zm5.6 9.9H5V5h8v3.6H8.6V13Zm-3.6 6h14V5h-4v5.6h-4.4V15H5v4Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
