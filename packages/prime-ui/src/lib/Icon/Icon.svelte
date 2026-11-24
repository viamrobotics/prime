<!--
@component
Renders an icon: an SVG path string (such as an `@mdi/js` export) drawn on a 24×24 viewBox,
or any Svelte icon component rendered directly. Decorative by default. Pass `aria-label` or
`aria-labelledby` to make it informative. It then gets `role="img"` instead of `aria-hidden`.

```svelte
<script lang="ts">
	import { mdiAlert } from '@mdi/js';
	import Rocket from '@lucide/svelte/icons/rocket';
</script>

<Icon icon={mdiAlert} size="lg" />
<Icon icon={Rocket} aria-label="Launch" />
```
-->
<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	import { iconRole } from './icon-role.ts';
	import { iconSizes, type IconSize, type IconType } from './icon.ts';

	interface Props extends SVGAttributes<SVGElement> {
		/** An SVG path string or a Svelte component. */
		icon: IconType;

		/** Size token. @default 'base' */
		size?: IconSize;
	}

	const { icon, size = 'base', class: extraClasses, ...restProps }: Props = $props();

	const roleAttributes = $derived(iconRole(restProps));
</script>

{#if typeof icon === 'string'}
	<svg
		{...roleAttributes}
		{...restProps}
		viewBox="0 0 24 24"
		focusable="false"
		class={[iconSizes[size], extraClasses]}
	>
		<path d={icon} fill="currentColor" />
	</svg>
{:else}
	{@const IconComponent = icon}
	<IconComponent {...roleAttributes} {...restProps} class={[iconSizes[size], extraClasses]} />
{/if}
