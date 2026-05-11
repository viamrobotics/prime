<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	const props: SVGAttributes<SVGElement> = $props();
</script>

<svg
	aria-hidden="true"
	focusable="false"
	fill="none"
	viewBox="0 0 16 16"
	xmlns="http://www.w3.org/2000/svg"
	{...props}
>
	<path
		d="M7.73182 15L5.34307 13.6131V5.43516L1.74463 7.51438L1.75338 4.41687L7.73182 1V15ZM8.26885 1V15L10.6576 13.6131V9.67453L12.4612 10.7169L12.4503 8.02297L10.6576 6.99922V5.43516L14.2549 7.51438L14.2462 4.41687L8.26885 1Z"
		fill-rule="evenodd"
		fill="currentColor"
	/>
</svg>
