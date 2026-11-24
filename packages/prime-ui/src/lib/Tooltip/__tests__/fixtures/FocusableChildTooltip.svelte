<script lang="ts">
	import { Tooltip } from '../../tooltip.ts';

	interface Props {
		child: 'select' | 'textarea' | 'summary' | 'contenteditable';
	}

	const { child }: Props = $props();
</script>

<div style="padding: 120px 160px">
	<Tooltip openDelay={0}>
		<Tooltip.Trigger>
			{#if child === 'select'}
				<select data-testid="control" aria-label="Unit">
					<option>mm</option>
					<option>in</option>
				</select>
			{:else if child === 'textarea'}
				<textarea data-testid="control" aria-label="Notes"></textarea>
			{:else if child === 'summary'}
				<details>
					<summary data-testid="control">Advanced</summary>
					<p>More settings</p>
				</details>
			{:else}
				<div data-testid="control" role="textbox" aria-label="Notes" contenteditable="true"></div>
			{/if}
		</Tooltip.Trigger>
		<Tooltip.Content>Saved with the machine</Tooltip.Content>
	</Tooltip>
</div>
