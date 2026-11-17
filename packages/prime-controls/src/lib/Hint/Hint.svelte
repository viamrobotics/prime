<!--
@component
The hint beside a control's label: an info icon button that shows `hint` in a tooltip. It also
renders the hint as hidden text under `descriptionId`, so the control can point its
`aria-describedby` there. A tooltip's own content is not in the page until it opens, so the
description must live outside it. Render this beside the label, never inside it, because the
label of a number field is its scrub handle.

```svelte
<Hint label="Power" hint="Fraction of full power" descriptionId="power-hint" />
```
-->
<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import { mdiInformationOutline } from '@mdi/js';
	import { Icon, Tooltip } from '@viamrobotics/prime-ui';

	interface Props {
		/** The control's visible label, which names the button as `About <label>`. */
		label: string;

		/** The text the tooltip shows and the control is described by. */
		hint: string;

		/** The id of the hidden description, which the control lists in `aria-describedby`. */
		descriptionId: string;

		/** Disable the button, which then neither focuses nor opens the tooltip. */
		disabled?: boolean;

		/** Classes for the tooltip's trigger wrapper. */
		class?: ClassValue;
	}

	const { label, hint, descriptionId, disabled, class: extraClasses }: Props = $props();
</script>

<span id={descriptionId} hidden>{hint}</span>
<Tooltip {disabled}>
	<Tooltip.Trigger class={['flex shrink-0', extraClasses]}>
		<button
			type="button"
			aria-label="About {label}"
			{disabled}
			class={[
				'flex min-h-6 min-w-6 items-center justify-center rounded-sm text-subtle-2',
				'focus-ring hover:text-default',
				'disabled:cursor-not-allowed disabled:text-disabled-dark'
			]}
		>
			<Icon icon={mdiInformationOutline} size="sm" />
		</button>
	</Tooltip.Trigger>
	<Tooltip.Content>{hint}</Tooltip.Content>
</Tooltip>
