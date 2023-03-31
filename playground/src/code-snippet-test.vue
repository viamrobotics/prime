<template>
  <main>
    <div style='width: 400px; height: 200px;'>
      <v-code-snippet
        data-testid='code-snippet-render'
        value='{"component": "JSON"}'
        language='json'
      >
        ${value}
      </v-code-snippet>
    </div>
    <div style='width: 400px; height: 200px;'>
      <v-code-snippet
        data-testid='code-snippet-dafault'
        value='{"component": "JSON"}'
        language='json'
      >
        ${value}
      </v-code-snippet>
    </div>
  </main>
</template>