<!--
@component
The Viam dock-right glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M19 21C19.55 21 20.0208 20.8042 20.4125 20.4125C20.8042 20.0208 21 19.55 21 19V5C21 4.45 20.8042 3.97917 20.4125 3.5875C20.0208 3.19583 19.55 3 19 3H5C4.45 3 3.97917 3.19583 3.5875 3.5875C3.19583 3.97917 3 4.45 3 5V19C3 19.55 3.19583 20.0208 3.5875 20.4125C3.97917 20.8042 4.45 21 5 21H19ZM16 19V5H19V19H16ZM14 19H5V5H14V19Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
