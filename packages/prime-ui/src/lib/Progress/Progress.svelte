<!--
@component
A horizontal progress bar. Determinate when `value` is set, indeterminate otherwise, when the fill
slides along the track unless the viewer prefers reduced motion. It is a `progressbar` with the
aria value attributes, named by `label`.

```svelte
<Progress value={uploaded} max={total} label="Upload" />
<Progress label="Connecting" />
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** How far along, from `0` to `max`. Leave it out for an indeterminate bar. */
		value?: number;
		/** The value that fills the bar. @default 100 */
		max?: number;
		/** The accessible name. A progressbar has no visible text to name it, so this is required. */
		label: string;
	}

	const { value, max = 100, label, class: extraClasses, ...restProps }: Props = $props();

	const percent = $derived(
		value === undefined ? undefined : (Math.min(Math.max(value, 0), max) / max) * 100
	);
</script>

<div
	{...restProps}
	role="progressbar"
	class={['progress', extraClasses]}
	aria-label={label}
	aria-valuemin="0"
	aria-valuemax={max}
	aria-valuenow={value === undefined ? undefined : Math.min(Math.max(value, 0), max)}
>
	<div class="progress-fill" style:width={percent === undefined ? undefined : `${percent}%`}></div>
</div>
