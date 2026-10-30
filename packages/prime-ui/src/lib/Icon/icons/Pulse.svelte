<!--
@component
The Viam pulse glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M12 22L9 7.95L6.8 18H2V16H5.2L8.025 3H10L13.05 17.3L15 9H17L18.8 16H22V18H17.25L16.05 13.3L14 22H12Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
