/* eslint-disable unicorn/prefer-export-from */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// TODO(mp, 2023-06-12): svelte 3 web components are all or nothing, remove when migrating to svelte 4
declare module '*.component' {
  import { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
}
