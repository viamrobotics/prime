<script setup lang="ts">

</script>

<template>
  <main class="m-3">

    <!-- Selected Value -->
    <v-tabs
      data-testid="selected-test"
      tabs="Tab 1, Tab 2, Tab 3"
      selected="Tab 2"
    />

    <!-- No Selected Value, Default Should Be First Tab -->
    <v-tabs
      data-testid="default-test"
      class="mt-2"
      tabs="Tab A, Tab B, Tab C"
    />

    <!-- Focus KeyDown Test -->
    <v-tabs
      data-testid="key-enter-test"
      class="mt-2"
      tabs="Tab X, Tab Y, Tab Z"
      selected="Tab Z"
    />

  </main>
</template>
