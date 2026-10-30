<script lang="ts">
	import { Banner } from '../banner.ts';
</script>

<Banner>
	<Banner.Description>Heads up</Banner.Description>
	<Banner.Progress value={30} label="Time until dismissed" />
</Banner>
