<script lang="ts">
	import { Takeover } from '../../takeover.ts';

	interface Props {
		label?: string;
	}

	const { label }: Props = $props();
</script>

<Takeover>
	<Takeover.Trigger class="button">Open</Takeover.Trigger>
	<Takeover.Content>
		<Takeover.Header>
			<Takeover.Title>Settings</Takeover.Title>
		</Takeover.Header>
		<Takeover.Close class="button" aria-label={label}>Cancel</Takeover.Close>
	</Takeover.Content>
</Takeover>
