<script lang="ts">
	import { Collapsible } from '../collapsible.ts';

	let open = $state<boolean>();
</script>

<Collapsible bind:open>
	<Collapsible.Trigger>Advanced</Collapsible.Trigger>
	<Collapsible.Content>
		<p>More settings</p>
	</Collapsible.Content>
</Collapsible>
<span data-testid="owner">{String(open)}</span>
