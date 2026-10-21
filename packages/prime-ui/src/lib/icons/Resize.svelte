<!--
@component
The Viam resize glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'm11 12 4-4h-4V6h7v7h-2V9l-4 4v3h8V4H8v8h3ZM22 2v16H12v4H2V12h4V2h16ZM10 14H4v6h6v-6Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
