<!--
@component
The Viam service glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M12 3.95534L3.95534 12L12 20.0447L20.0447 12L12 3.95534ZM12.5303 1.62189C12.2374 1.329 11.7626 1.329 11.4697 1.62189L1.62189 11.4697C1.329 11.7626 1.329 12.2374 1.62189 12.5303L11.4697 22.3781C11.7626 22.671 12.2374 22.671 12.5303 22.3781L22.3781 12.5303C22.671 12.2374 22.671 11.7626 22.3781 11.4697L12.5303 1.62189Z'
		},
		{
			d: 'M13.0842 13.0842L12 16.7435L10.9158 13.0842L7.25649 12L10.9158 10.9157L12 7.25647L13.0842 10.9157L16.7435 12L13.0842 13.0842Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
