<script setup lang="ts">

</script>

<template>
  <main class="m-3">

    <!-- Selected Value -->
    <v-tabs
      data-testid="tabs-selected-test"
      tabs="Tab 1, Tab 2, Tab 3"
      selected="Tab 2"
    />

    <!-- Focus KeyDown Test -->
    <v-tabs
      data-testid="tabs-key-enter-test"
      class="mt-2"
      tabs="Tab X, Tab Y, Tab Z"
      selected="Tab Z"
    />

  </main>
</template>
