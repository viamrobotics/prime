<script lang="ts">
	import { Popover } from '../../Popover/popover.ts';
	import { clickOutside } from '../click-outside.ts';

	interface Props {
		onOutside: (event: PointerEvent) => void;
	}

	const { onOutside }: Props = $props();
</script>

<button type="button" data-testid="outside">Outside</button>

<div data-testid="inside" {@attach clickOutside(onOutside)}>
	<button type="button" data-testid="inner">Inner</button>
	<Popover>
		<Popover.Trigger data-testid="trigger">Open</Popover.Trigger>
		<Popover.Content aria-label="Details">
			<button type="button" data-testid="portaled">Portaled</button>
		</Popover.Content>
	</Popover>
</div>
