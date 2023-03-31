<script setup lang="ts">
const javascriptString = `function getComponents(){

}`
const typescriptString = `function get(value: string) {

}`

const minimapString = `{
    "test": [],
    "test1": [],
    "test2": [],
    "test3": [],
    "test4": [],
    "test5": []
}
`

const diffString = `{
    "test": [],
    "test1": [],
    "test2": [],
    "test3": [],
    "test4": [],
}
`


const schema = JSON.stringify({
  $schema: 'http://json-schema.org/draft-04/schema#',
  $ref: '#/definitions/AttrConfig',
  definitions: {
    AttrConfig: {
      required: ['token', 'host'],
      properties: {
        hello: {
            type: 'integer',
            description: 'integer'
        }
      },
      additionalProperties: false,
      type: 'object',
    },
  },
});

const basicJson = `
{
  "hello": "world"
}
`

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
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-golang-valid'
          value="func (s *Custom) help(x int)"
          language='go'
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-golang-invalid'
          value="def help(x int)"
          language='go'
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-shell-valid'
          value="echo test"
          language='shell'
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-shell-invalid'
          value="help me!!"
          language='shell'
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-vs'
          value='{"component": "JSON"}'
          language='json'
          theme="vs"
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-readonly'
          value='{"component": "readonly"}'
          language='json'
          readonly="true"
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-minimap'
          :value="minimapString"
          language='json'
          minimap="true"
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-diff'
          :value="minimapString"
          :previous="diffString"
          variant="diff"
          language="json"
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-schema'
          :value="basicJson"
          :schema="schema"
          language="json"
        />
      </div>
      <div style='width: 400px; height: 200px;'>
        <v-code-editor
          data-testid='code-editor-vs-dark'
          value='{"component": "JSON"}'
          language='json'
          theme="vs-dark"
        />
      </div>
  </main>
</template>
