<script lang="ts">
	import { Banner } from '../../Banner/banner.ts';
</script>

<Banner variant="info">
	<Banner.Icon>!</Banner.Icon>
	<Banner.Title>Update available</Banner.Title>
	<Banner.Description>A new version is ready.</Banner.Description>
	<Banner.Progress aria-label="Download" value={40} />
	<Banner.Details summary="Details">More</Banner.Details>
	<Banner.Actions>Actions</Banner.Actions>
	<Banner.Close aria-label="Dismiss" />
</Banner>
