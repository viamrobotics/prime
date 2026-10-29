<!--
@component
The Viam cursor move glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M13 6v5h5V7.7l4.3 4.3-4.3 4.3V13h-5v5h3.3L12 22.3 7.7 18H11v-5H6v3.3L1.7 12 6 7.7V11h5V6H7.7L12 1.7 16.3 6H13Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
