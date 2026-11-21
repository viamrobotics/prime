<script lang="ts">
	import { Banner } from '../banner.ts';

	const { onclick, label }: { onclick?: () => void; label?: string } = $props();
</script>

<Banner>
	<Banner.Description>Heads up</Banner.Description>
	<Banner.Close {onclick} aria-label={label} />
</Banner>
