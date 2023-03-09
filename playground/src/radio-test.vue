<script setup lang="ts">

</script>

<template>
  <main>

    <!-- Options, Selected Value, Click -->
    <v-radio
      options="Opt 1, Opt 2, Opt 3"
      data-testid="radio-selected-test"
      selected="Opt 3"
    />

    <!-- KeyDown -->
    <v-radio
      options="Opt 4, Opt 5, Opt 6"
      data-testid="radio-keydown-test"
      selected="Opt 5"
    />

    <!-- Label: Default -->
    <v-radio
      options="Def 1, Def 2, Def 3"
      data-testid="radio-def-label-test"
      selected="Def 2"
      label="Def Position"
    />

    <!-- Label: Top -->
    <v-radio
      options="Top 1, Top 2, Top 3"
      data-testid="radio-top-label-test"
      selected="Top 2"
      label="Top Position"
      labelposition="top"
    />

    <!-- Label: Left -->
    <v-radio
      options="Left 1, Left 2, Left 3"
      data-testid="radio-left-label-test"
      selected="Left 2"
      label="Left Position"
      labelposition="left"
    />

    <!-- Tooltip: Default -->
    <v-radio
      options="Tool 1, Tool 2, Tool 3"
      data-testid="radio-tooltip-def-test"
      selected="Tool 2"
      tooltip="This is the def tooltip test"
    />

    <!-- Tooltip: Warn -->
    <v-radio
      options="Tool 4, Tool 5, Tool 6"
      data-testid="radio-tooltip-warn-test"
      selected="Tool 5"
      tooltip="This is the warn tooltip test"
      state='warn'
    />

    <!-- Tooltip: Error -->
    <v-radio
      options="Tool 4, Tool 5, Tool 6"
      data-testid="radio-tooltip-error-test"
      selected="Tool 5"
      tooltip="This is the error tooltip test"
      state='error'
    />

    <!-- Tooltip: Info -->
    <v-radio
      options="Tool 7, Tool 8, Tool 9"
      data-testid="radio-tooltip-info-test"
      selected="Tool 8"
      tooltip="This is the info tooltip test"
      state='info'
    />

    <!-- Tooltip: Left -->
    <v-radio
      options="Tool 10, Tool 11, Tool 12"
      data-testid="radio-tooltip-left-test"
      selected="Tool 11"
      label="Tooltip Left Test"
      labelposition="left"
      tooltip="This is the left tooltip test"
    />

    <!-- Tooltip: Hover -->
    <v-radio
      options="Tool 13, Tool 14, Tool 15"
      data-testid="radio-tooltip-hover-test"
      selected="Tool 14"
      tooltip="This is the hover tooltip test"
    />

    <!-- Readonly, Click Readonly -->
    <v-radio
      options='Readonly 1, Readonly 2, Readonly 3'
      selected='Readonly 3'
      readonly='true'
    />

    <!-- Keydown Readonly -->
    <v-radio
      options='Readonly 4, Readonly 5, Readonly 6'
      selected='Readonly 6'
      readonly='true'
    />

  </main>
</template>
