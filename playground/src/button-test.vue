
<script setup lang="ts">

</script>

<template>
  <main>

    <v-button
      data-testid="label"
      label='Label'
    />

    <v-button
      data-testid="default-primary"
      label='Default Primary Label'
    />

    <v-button
      data-testid="primary"
      variant="primary"
      label='Primary Label'
    />

    <v-button
      data-testid="inverse-primary"
      variant="inverse-primary"
      label='Inverse Primary Label'
    />

    <v-button
      data-testid="success"
      variant="success"
      label='Success Label'
    />

    <v-button
      data-testid="danger"
      variant="danger"
      label='Danger Label'
    />

    <v-button
      data-testid="danger"
      variant="danger"
      label='Danger Label'
    />

    <v-button
      data-testid="outline-danger"
      variant="outline-danger"
      label='Outline Danger Label'
    />

    <v-button
      data-testid="disabled"
      variant="outline-danger"
      label='Outline Danger Label'
    />

    <v-button
      data-testid="disabled"
      disabled="true"
      label='Disabled Label'
    />

    <v-button
      data-testid="tooltip"
      tooltip="This is the message for the tooltip"
      label='Tooltip Label'
    />

    <v-button
      data-testid="icon-within-button"
      label="Icon Within Button Label"
      icon="refresh"
    />

    <v-button
      data-testid="icon-as-button"
      label="Icon As Button"
      variant="icon"
      icon="refresh"
    />

    <v-button
      data-testid="click"
      label="Click Me"
    />

    <v-button
      data-testid="full-button"
      label="Button"
      width="full"
    />

  </main>
</template>
