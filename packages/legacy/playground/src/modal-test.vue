
<script setup lang="ts">

</script>

<template>
  <main>
    <div 
      id="overlay"
      style="width:100vw; height:100vh; background-color:gray">
    </div>
    <v-modal
      open="true"
      data-testid="modal-open"
      title="Puff the Magic Dragon"
      message="lived by the sea and frolicked in the autumn mist in a land called Honah Lee."
      onclose='this.removeAttribute("open")'
    >
      <v-button
        label="Bring him strings and sealing wax and other fancy stuff"
      />
    </v-modal>

    <v-modal
      data-testid="modal-default"
    >
    </v-modal>

    <v-modal
      open="false"
      data-testid="modal-closed"
    >
    </v-modal>
  </main>
</template>