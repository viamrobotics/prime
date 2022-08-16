<script setup lang="ts">

import { ref } from 'vue'

const loaded = ref(false)

const handleClick = () => {
  loaded.value = true
}

const value = `
function main() {
  console.log('hello world!')
}

main()
`

</script>

<template>
  <button @click="handleClick">
    Click
  </button>

  <div v-if="loaded" style="height: 400px;">
    <v-code-editor language="javascript" :value="value" />
  </div>
</template>