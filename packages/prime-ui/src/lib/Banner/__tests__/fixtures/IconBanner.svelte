<script lang="ts">
	import { Banner } from '../../banner.ts';

	const { showIcon = true }: { showIcon?: boolean } = $props();
</script>

<Banner>
	{#if showIcon}
		<Banner.Icon><span data-testid="custom-glyph">!</span></Banner.Icon>
	{/if}
	<Banner.Description>Heads up</Banner.Description>
</Banner>
