<svelte:options immutable />

<script lang="ts">
export let style = '';
</script>

<svelte:head>
  <style>
  v-tr[variant='success'] v-td::part(table-cell) {
    --tw-text-opacity: 1;
    color: rgba(4, 120, 87, var(--tw-text-opacity));
    /* @apply text-green-700; */
  }
  v-tr[variant='disabled'] v-td::part(table-cell) {
    --tw-text-opacity: 1;
    color: rgba(107, 114, 128, var(--tw-text-opacity));
    /* @apply text-gray-500; */
  }
  v-tr[variant='error'] v-td::part(table-cell) {
    --tw-text-opacity: 1;
    color: rgb(239 68 68 / var(--tw-text-opacity));
    /* @apply text-red-500; */
  }
  </style>
</svelte:head>

<tr
  {style}
  class="border-b"
>
  <slot />
</tr>

<style>
:host {
  display: contents !important;
}

:host([variant='success']) tr {
  --tw-bg-opacity: 1;
  --tw-border-opacity: 1;
  background-color: rgba(236, 253, 245, var(--tw-bg-opacity));
  border-color: rgba(209, 250, 229, var(--tw-border-opacity));
  /* @apply bg-green-50;
  @apply border-green-100; */
}

:host([variant='disabled']) tr {
  --tw-bg-opacity: 1;
  background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
  /* @apply bg-gray-50; */
}

:host([variant='error']) tr {
  --tw-bg-opacity: 1;
  --tw-border-opacity: 1;
  background-color: rgb(254 242 242 / var(--tw-bg-opacity));
  border-color: rgb(254 226 226 / var(--tw-border-opacity));
  /* @apply bg-red-50;
  @apply border-red-100; */
}
</style>
