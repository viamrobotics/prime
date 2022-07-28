<svelte:options immutable={true} tag='v-tbody' />

<tbody>
  <slot />
</tbody>

<style>
  :host {
    display: contents
  }
</style>