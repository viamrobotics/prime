<!--
@component
The Viam magnet off glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M21 16.8V11A9 9 0 0 0 7.2 3.4l3 3A5 5 0 0 1 17 11v2l4 3.8ZM3 19h4v3H3v-3Z M3 11v6h4v-6c0-.6.1-1.3.4-1.9L17.5 19H17v3h3.6l2 1.8 1.3-1.4-2.9-2.8-.6-.6-2-2-1.4-1.3-8.5-8.3-2.9-2.7L2 1 .5 2.5l3.9 3.7A9 9 0 0 0 3 11Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
