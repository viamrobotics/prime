<!--
@component

A component that renders SVG icons from the @mdi/js package
```svelte
  <Icon
    name='camera-outline'
    size='xl'
  />
```
-->
<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
const sizes: Record<Size, string> = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  base: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
  '2xl': 'w-7 h-7',
  '3xl': 'w-8 h-8',
  '4xl': 'w-9 h-9',
};
</script>

<script lang="ts">
import cx from 'classnames';
import { paths, type IconName, type CustomIcon } from './icons';

/** The name of the icon. */
export let name: IconName;

/** The size of the icon. */
export let size: Size = 'base';

/** Additional CSS classes to pass to the svg. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

let allPaths: CustomIcon[] = [];

$: {
  const pathValue = paths[name];

  if (typeof pathValue === 'string') {
    allPaths = [{ path: pathValue }];
  } else if (Array.isArray(pathValue)) {
    allPaths = pathValue.map((icon) => ({
      path: icon.path,
      opacity: icon.opacity,
    }));
  }
}
</script>

<!--
  Accessibility approach for icon svgs taken from:
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
-->

<svg
  class={cx(sizes[size], extraClasses)}
  viewBox="0 0 24 24"
  aria-hidden="true"
  focusable="false"
  data-icon-name={name}
  {...$$restProps}
>
  {#each allPaths as { path: dAttribute, opacity }}
    <path
      d={dAttribute}
      {opacity}
      fill-rule="evenodd"
      fill="currentColor"
    />
  {/each}
</svg>
