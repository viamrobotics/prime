<!--
@component
The Viam grid perspective glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M11 11V4.5H6.7l-1 6.5H11Zm0 2H5.4l-1 6.5H11V13Zm2 6.5V13h5.6l1 6.5H13Zm-10.1 2a.7.7 0 0 1-.8-.9L5 3.1c0-.3.4-.6.7-.6h12.8c.3 0 .6.3.7.6L22 20.6c0 .5-.3.9-.8.9H3ZM18.3 11H13V4.5h4.3l1 6.5Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
