<script lang="ts">
	import { Takeover } from '../takeover.ts';

	let open = $state<boolean>();
</script>

<Takeover bind:open>
	<Takeover.Trigger class="button">Open</Takeover.Trigger>
	<Takeover.Content>
		<Takeover.Header>
			<Takeover.Title>Settings</Takeover.Title>
			<Takeover.Close />
		</Takeover.Header>
		<p>Body</p>
	</Takeover.Content>
</Takeover>
<span data-testid="owner">{String(open)}</span>
