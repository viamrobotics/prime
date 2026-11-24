<script lang="ts">
	import { Dialog } from '../../dialog.ts';

	interface Props {
		label?: string;
	}

	const { label }: Props = $props();
</script>

<Dialog>
	<Dialog.Trigger class="button">Open</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Title>Rename</Dialog.Title>
		<Dialog.Description>Pick a new name.</Dialog.Description>
		<Dialog.Close class="button" aria-label={label}>Cancel</Dialog.Close>
	</Dialog.Content>
</Dialog>
