<script setup lang="ts">

</script>

<template>
  <main>

    <!-- Hover -->
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
    <v-tooltip data-testid="tooltip-hover-test" text='This is the hover test' location="top">
      <p>Hover here - Hover Test</p>
    </v-tooltip>
    </div>

    <!-- Top -->
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
      <v-tooltip data-testid="tooltip-top-test" text='This is the top test' location="top">
        <p>Top Test</p>
      </v-tooltip>
    </div>

    <!-- Bottom -->
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
      <v-tooltip data-testid="tooltip-bottom-test" text='This is the bottom test' location="bottom">
        <p>Bottom Test</p>
      </v-tooltip>
    </div>

    <!-- Right -->
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
      <v-tooltip data-testid="tooltip-right-test" text='This is the right test' location="right">
        <p>Right Test</p>
      </v-tooltip>
    </div>

    <!-- Left -->
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
      <v-tooltip data-testid="tooltip-left-test" text='This is the left test' location="left">
        <p>Left Test</p>
      </v-tooltip>
    </div>

    <!-- Default -->
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
      <v-tooltip data-testid="tooltip-def-test" text='This text should display above'>
        <p>Def Test</p>
      </v-tooltip>
    </div>

  </main>
</template>
