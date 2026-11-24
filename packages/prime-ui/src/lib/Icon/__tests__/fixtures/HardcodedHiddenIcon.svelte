<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	const props: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg aria-hidden="true" {...props}><path d="M0 0" /></svg>
