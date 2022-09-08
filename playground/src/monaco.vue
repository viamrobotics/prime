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

const json = `
{
  "hello": "world"
}
`

const schema = JSON.stringify({
  $schema: 'http://json-schema.org/draft-04/schema#',
  $ref: '#/definitions/AttrConfig',
  definitions: {
    AttrConfig: {
      required: ['token', 'host'],
      properties: {
        token: {
          type: 'string',
          description: 'string',
        },
        host: {
          type: 'string',
          description: 'string',
        },
      },
      additionalProperties: false,
      type: 'object',
    },
  },
});

</script>

<template>
  <div class="p-3 flex flex-col gap-3">
    <v-button label="Click to open editor" @click="handleClick" />

    <div v-if="loaded" style="height: 400px;">
      <v-code-editor language="javascript" :value="value" />
    </div>

    <div v-if="loaded" style="height: 400px;">
      <v-json-editor :value="json" :schema="schema" />
    </div>
  </div>
</template>
