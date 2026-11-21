<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Banner } from '../banner.ts';

	const {
		variant,
		placement,
		role
	}: Pick<ComponentProps<typeof Banner>, 'variant' | 'placement' | 'role'> = $props();
</script>

<Banner {variant} {placement} {role}>
	<Banner.Description>Heads up</Banner.Description>
</Banner>
