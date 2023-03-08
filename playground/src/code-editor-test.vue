<script setup lang="ts">
const javascriptString = "function getComponents(){" + "\n\n" + "}"
const typescriptString = "function get(value: string) {" + "\n\n" + "}"
</script>

<template>
  <main>
    <div style='width: 400px; height: 200px;'>
      <v-code-editor
        data-testid='code-editor-json-valid'
        value='{"component": "JSON"}'
        language='json'
      />
    </div>
    <div style='width: 400px; height: 200px;'>
      <v-code-editor
        data-testid='code-editor-json-invalid'
        value='{"component"}'
        language='json'
      />
    </div>
    <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-javascript-valid'
          :value="javascriptString"
          language='javascript'
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-javascript-invalid'
          value="def madeIt()"
          language='javascript'
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-typescript-valid'
          :value="typescriptString"
          language='typescript'
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-typescript-invalid'
          value="def help()"
          language='typescript'
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-python-valid'
          value="def help()"
          language='python'
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-python-invalid'
          value="const x = () => {}"
          language='python'
        />
      </div>
  </main>
</template>