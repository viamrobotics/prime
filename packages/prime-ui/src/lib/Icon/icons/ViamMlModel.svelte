<!--
@component
The Viam ML model glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M22 4.3a2.3 2.3 0 0 1-3 2.2L16.2 10a2.6 2.6 0 0 1-.2 3l3.1 4.5a2.3 2.3 0 1 1-1.6 3h-11a2.3 2.3 0 1 1-1-2.8l6.1-5.1a2.6 2.6 0 0 1 0-2l-6-4.4a2 2 0 0 1-1.3.4 2.3 2.3 0 1 1 2.2-3.1h11a2.3 2.3 0 0 1 4.6.8ZM14 14c-.4 0-.8 0-1.2-.2l-6.2 5h11l.2-.4-3.2-4.4H14Zm0-5.2c-.6 0-1 .2-1.5.4L7 5.2h10.7l.1.3L15 9l-1-.2Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
