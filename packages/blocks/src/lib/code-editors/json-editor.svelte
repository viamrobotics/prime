<script lang="ts">
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { gutter, EditorView, lineNumbers } from '@codemirror/view';
import { history } from '@codemirror/commands';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { lintGutter } from '@codemirror/lint';
import { bracketMatching } from '@codemirror/language';
import { jsonSchema } from 'codemirror-json-schema';
import type { JSONSchema7 } from 'json-schema';

export let schema: string | JSONSchema7;

let container: HTMLDivElement | undefined = undefined;
let initialized = false;

/**
 * none of these are required for json4 or 5
 * but they will improve the DX
 */
const commonExtensions = [
  gutter({ class: 'CodeMirror-lint-markers' }),
  bracketMatching(),
  basicSetup,
  closeBrackets(),
  history(),
  autocompletion(),
  lineNumbers(),
  lintGutter(),
  EditorView.lineWrapping,
  EditorState.tabSize.of(2),
];

const initialize = async () => {
  try {
    let schemaJson: JSONSchema7;
    if (typeof schema === 'string') {
      const response = await fetch(schema);
      schemaJson = await response.json();
    } else {
      schemaJson = schema;
    }

    const json5State = EditorState.create({
      doc: '{ "test": true }',
      extensions: [commonExtensions, jsonSchema(schemaJson)],
    });

    new EditorView({
      state: json5State,
      parent: container!,
    });
  } catch (error) {
    console.error('Error loading schema', error);
  } finally {
    initialized = true;
  }
};

$: if (container !== undefined && !initialized) {
  void initialize();
}
</script>

<div bind:this={container} />
