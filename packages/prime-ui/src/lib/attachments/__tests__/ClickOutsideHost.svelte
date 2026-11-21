<script lang="ts">
	import { Popover } from '../../Popover/popover.ts';
	import { clickOutside, type ClickOutsideOptions } from '../click-outside.ts';

	interface Props extends ClickOutsideOptions {
		onOutside: (event: PointerEvent) => void;
	}

	const { onOutside, exclude }: Props = $props();
</script>

<button type="button" data-testid="outside">Outside</button>
<button type="button" data-testid="excluded">Excluded</button>

<div data-testid="inside" {@attach clickOutside(onOutside, { exclude })}>
	<button type="button" data-testid="inner">Inner</button>
	<Popover>
		<Popover.Trigger data-testid="trigger">Open</Popover.Trigger>
		<Popover.Content aria-label="Details">
			<button type="button" data-testid="portaled">Portaled</button>
		</Popover.Content>
	</Popover>
</div>
