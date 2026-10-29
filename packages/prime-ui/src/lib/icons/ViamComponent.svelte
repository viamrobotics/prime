<!--
@component
The Viam component glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'm12 4-8 8 8 8 8-8-8-8Zm.5-2.4a.8.8 0 0 0-1 0l-9.9 9.9c-.3.3-.3.7 0 1l9.9 9.9c.3.3.7.3 1 0l9.9-9.9c.3-.3.3-.7 0-1l-9.9-9.9Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
