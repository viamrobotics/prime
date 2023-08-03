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

<script lang="ts">
import cx from 'classnames';
import { paths } from './icons';

/**
 * Size options
 */
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

/**
 * The name of the icon.
 */
export let name = '';

/**
 * Boolean to verify that name exists.
 */
 const hasNameProperty = Object.hasOwn(paths, name);

/**
 * The TailwindCSS sizes map.
 */
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

/**
 * The size of the icon.
 */
export let size: Size = 'base';
</script>

<p class="leading-3">
  <svg
    class={cx(sizes[size], {
      'inline-block': hasNameProperty,
      hidden: !hasNameProperty,
    })}
    viewBox="0 0 24 24"
    aria-labelledby="name"
    role="img"
  >
    <title id={name}>{`${name} icon`}</title>
    <path
      d={paths[name]}
      fill="currentColor"
    />
  </svg>
</p>
