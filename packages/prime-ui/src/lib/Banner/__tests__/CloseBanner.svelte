<script lang="ts">
	import { Banner } from '../banner.ts';

	const { onclick }: { onclick: () => void } = $props();
</script>

<Banner>
	<Banner.Description>Heads up</Banner.Description>
	<Banner.Close {onclick} />
</Banner>
