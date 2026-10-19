<!--
@component
The Viam fragment glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M17 22v-2h3v-3h2v3.5c0 .4-.2.7-.5 1-.3.3-.6.5-1 .5H17ZM7 22H3.5c-.4 0-.7-.2-1-.5-.3-.3-.5-.6-.5-1V17h2v3h3v2ZM17 2h3.5c.4 0 .7.2 1 .5.3.3.5.6.5 1V7h-2V4h-3V2ZM7 2v2H4v3H2V3.5c0-.4.2-.7.5-1 .3-.3.6-.5 1-.5H7Zm6 15.3 4-2.4v-4.5l-4 2.3v4.6Zm-1-6.4 4-2.3-4-2.3-4 2.3 4 2.3Zm-5 4 4 2.3v-4.5l-4-2.3v4.5Zm11.2-7.3c.5.3.8.7.8 1.3v6.3c0 .6-.3 1-.8 1.4l-5.4 3.1c-.6.4-1 .4-1.6 0l-5.4-3.1c-.5-.4-.8-.8-.8-1.4V9c0-.6.3-1 .8-1.3l5.5-3.2a1.6 1.6 0 0 1 1.4 0l5.5 3.2Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
