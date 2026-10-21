<!--
@component
The Viam flutter glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M17 1.7h-5.2L3.5 10 6 12.6l2.3-2.3 8.6-8.6Zm-4.5 12.1 4.4-4.5H12l-.3.1-1.8 1.9-2.6 2.5 2.6 2.6 1.8 1.8s0 .2.2.1h5l-4.4-4.5Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
