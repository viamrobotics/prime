<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Banner } from '../banner.ts';

	const {
		variant,
		placement
	}: Pick<ComponentProps<typeof Banner>, 'variant' | 'placement'> = $props();
</script>

<Banner {variant} {placement}>
	<Banner.Description>Heads up</Banner.Description>
</Banner>
