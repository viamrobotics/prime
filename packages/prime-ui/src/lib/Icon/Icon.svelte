<!--
@component

Renders SVG icons by name. Most icons come from `@mdi/js`; a few entries are
custom Svelte components (e.g. PyTorch, TensorFlow).
```svelte
  <Icon
    name='camera-outline'
    size='xl'
  />
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { type IconName, IconPathsByName, type IconSize, IconSizes } from './icons';

	interface Props extends HTMLAttributes<SVGElement> {
		/** The name of the icon. */
		name: IconName;
		/** The size of the icon. */
		size?: IconSize;
	}

	const { name, size = 'base', class: extraClasses, ...restProps }: Props = $props();

	const pathValue = $derived(IconPathsByName[name]);

	const IconComponent = $derived.by(() =>
		typeof pathValue === 'function' ? pathValue : undefined
	);

	const allPaths = $derived.by(() => {
		if (typeof pathValue === 'string') {
			return [{ path: pathValue, opacity: undefined }];
		}
		if (Array.isArray(pathValue)) {
			return pathValue.map((icon) => ({
				path: icon.path,
				opacity: 'opacity' in icon ? icon.opacity : undefined
			}));
		}
		return [];
	});
</script>

<!--
  Accessibility approach for icon svgs taken from:
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
-->
{#if IconComponent}
	<IconComponent class={[IconSizes[size], extraClasses]} {...restProps} />
{:else}
	<svg
		class={[IconSizes[size], extraClasses]}
		viewBox="0 0 24 24"
		aria-hidden="true"
		focusable="false"
		{...restProps}
	>
		<!-- index is safe to key, `allPaths` is rebuilt when `name` changes. -->
		{#each allPaths as { path: dAttribute, opacity }, index (index)}
			<path d={dAttribute} {opacity} fill-rule="evenodd" fill="currentColor" />
		{/each}
	</svg>
{/if}
