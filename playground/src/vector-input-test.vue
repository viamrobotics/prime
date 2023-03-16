
<script setup lang="ts">

</script>

<template>
  <main>
    <!-- Default Configuration -->
    <v-vector-input
      data-testid="vector-input-default"
      label='Default Configuration'
    />

    <!-- Type: Number -->
    <v-vector-input
      data-testid="vector-input-type-number"
      type='number'
    />

    <!-- Type: Integer -->
    <v-vector-input
      data-testid="vector-input-type-integer"
      type='integer'
    />

    <!-- On: Input -->
    <v-vector-input
      data-testid="vector-input-on-input"
    />

    <!-- Label: Default Left -->
    <v-vector-input
      data-testid="vector-input-label"
      type='number'
      label='Label Left'
    />

    <!-- Value -->
    <v-vector-input
      data-testid="vector-input-value"
      value='1, 2, 3'
    />

    <!-- Step: .01 -->
    <v-vector-input
      data-testid="vector-input-step-test"
      type="number"
      step=".01"
    />

    <!-- Dimensions: 3 -->
    <v-vector-input
      data-testid="vector-input-dimensions-3"
      dimensions="3"
    />

    <!-- Dimensions: 4 -->
    <v-vector-input
      data-testid="vector-input-dimensions-4"
      dimensions="4"
    />

  </main>
</template>
