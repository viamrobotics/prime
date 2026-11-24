<script lang="ts">
	import { Dialog } from '../../Dialog/dialog.ts';
</script>

<Dialog>
	<Dialog.Trigger>Open dialog</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Title>Rename</Dialog.Title>
		<Dialog.Description>Pick a new name.</Dialog.Description>
		<Dialog.Close aria-label="Close" />
	</Dialog.Content>
</Dialog>
