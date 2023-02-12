<script setup lang="ts">

</script>

<template>
  <main class="m-3">

    <!-- 	
        GIVEN a "tabs" attribute has been applied to the v-tabs element
        AND the value passed to the "tabs" attribute is a comma-separated list of strings
        WHEN the element is rendered
        THEN the tabs should render the list of values as tabs 
    -->

    <!-- Selected Value -->
    <v-tabs
      tabs="Tab 1, Tab 2, Tab 3"
      selected="Tab 2"
    />

    <!-- No Selected Value, Default Should Be First Tab -->
    <v-tabs
      class="mt-2"
      tabs="Tab A, Tab B, Tab C"
    />

    <!-- Focus KeyDown Test -->
    <v-tabs
      class="mt-2"
      tabs="Tab X, Tab Y, Tab Z"
      selected="Tab Z"
    />

  </main>
</template>
