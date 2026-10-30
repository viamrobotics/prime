<script lang="ts">
	import { Collapsible } from '../collapsible.ts';
</script>

<Collapsible>
	<Collapsible.Trigger>
		Advanced
		{#snippet indicator({ open })}
			<span data-testid="indicator">{open ? 'less' : 'more'}</span>
		{/snippet}
	</Collapsible.Trigger>
	<Collapsible.Content>
		<p>More settings</p>
	</Collapsible.Content>
</Collapsible>
