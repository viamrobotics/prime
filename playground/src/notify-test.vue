<script setup lang="ts">

</script>

<template>
  <main>
    <v-notify 
      data-testid="notify-default" 
      title='title text' 
      message='message text'
    />
    <v-notify 
      data-testid="notify-variant-danger" 
      title='title text' 
      message='message text' 
      variant="danger"
    />
    <v-notify 
      data-testid="notify-variant-warning" 
      title='title text' 
      message='message text' 
      variant="warning"
    />
    <v-notify 
      data-testid="notify-variant-success" 
      title='title text' 
      message='message text' 
      variant="success"
    />
    <v-notify 
      data-testid="notify-variant-info" 
      title='title text' 
      message='message text' 
      variant="info"
    />
    <v-notify 
      data-testid="notify-slot" 
      title='title text' 
      message="message text"
    >
      slot text
    </v-notify>
  </main>
</template>
