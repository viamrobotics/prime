<!--
@component
The Viam filter outline glyph.
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import Glyph from './Glyph.svelte';

	const paths = [
		{
			d: 'M10.7,20.8c-.4,0-.7-.1-.9-.4s-.4-.6-.4-.9.1-.7.4-.9c.3-.3.6-.4.9-.4h2.7c.4,0,.7.1,1,.4s.4.6.4.9-.1.7-.4,1c-.3.3-.6.4-.9.4h-2.7ZM5.3,14.1c-.4,0-.7-.1-.9-.4-.3-.3-.4-.6-.4-.9s.1-.7.4-.9.6-.4.9-.4h13.3c.4,0,.7.1,1,.4.3.3.4.6.4.9s-.1.7-.4,1c-.3.3-.6.4-.9.4H5.3ZM1.3,7.4c-.4,0-.7-.1-.9-.4C.1,6.8,0,6.5,0,6.1c0-.4.1-.7.4-.9.3-.3.6-.4.9-.4h21.3c.4,0,.7.1,1,.4.3.3.4.6.4.9s-.1.7-.4,1c-.3.3-.6.4-.9.4H1.3Z'
		}
	];

	const props: SVGAttributes<SVGElement> = $props();
</script>

<Glyph {...props} {paths} />
