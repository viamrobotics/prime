<script setup lang="ts">

</script>

<template>
  <main>
    <v-notify data-testid="notify-default" title='title text' message='message text'/>
    <v-notify data-testid="notify-variant-error" title='title text' message='message text' variant="error"/>
    <v-notify data-testid="notify-variant-warning" title='title text' message='message text' variant="warning"/>
    <v-notify data-testid="notify-variant-success" title='title text' message='message text' variant="success"/>
    <v-notify data-testid="notify-variant-info" title='title text' message='message text' variant="info"/>
    <v-notify data-testid="notify-background-gray" title='title text' message='message text' background="gray"/>
    <v-notify data-testid="notify-background-white" title='title text' message='message text' background="white"/>
    <v-notify data-testid="notify-slot" title='title text' message="message text">slot text</v-notify>
  </main>
</template>
