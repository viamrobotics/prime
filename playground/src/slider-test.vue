
<script setup lang="ts">

</script>

<template>
  <main>
    <v-slider
      data-testid="slider-min-max"
      min="-50"
      max="50"
      start="-20"
      end="30"
    />
    <v-slider
      data-testid="slider-min"
      range="min"
      max="50"
      value="15"
    />
    <v-slider
      data-testid="slider-max"
      range="max"
      max="50"
      value="15"
    />
    <v-slider
      data-testid="slider-value"
      min="-50"
      max="50"
      value="15"
    />
    <v-slider
      data-testid="slider-step"
      min="-50"
      max="50"
      step="25"
    />
    <v-slider
      data-testid="slider-label"
      label="sliiide to the left"
    />
    <v-slider
      data-testid="slider-suffix"
      suffix="units"
      min="-50"
      max="50"
    />
  </main>
</template>