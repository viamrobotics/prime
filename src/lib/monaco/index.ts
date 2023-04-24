import { version as MonacoVersion } from 'monaco-editor/package.json';
import type { Schema, SubSchema } from './types';

export const monacoURL = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${MonacoVersion}`;

const schemas: monaco.languages.json.DiagnosticsOptions['schemas'] = []

// Monaco doesn't understand our schema $ref paths, which look like:
// #/definitions/SomeAttr
// For now we're just transforming them into refs that monaco can understand.
const makeRefUri = (id: string, key: string) => {
  return `http://definitions/${id}-${key}.json`;
};

const keyFromRef = (ref = '') => ref.split('/').pop()!;

const updateRefs = (
  id: string,
  definition: SubSchema
): Record<string, string> => {
  for (const property of Object.values(definition.properties ?? [])) {
    if (property.type === 'array' && property.items?.type) {
      property.description = `"array" of type "${property.items?.type}"`;
    } else if (property.type === 'array') {
      property.description = '"array" of type "object"';
    } else {
      property.description = `"${property.type!}"`;
    }
  }

  return JSON.parse(JSON.stringify(definition), (key, value: string) => {
    if (key === '$ref') {
      return makeRefUri(id, keyFromRef(value));
    }

    if (key === '$schema') {
      return;
    }

    return value;
  }) as Record<string, string>;
};

const addSchemas = (id: string, schema: Schema, fileMatch: string[]) => {
  const { $ref, definitions = {} } = schema;
  for (const [key, definition] of Object.entries(definitions)) {
    schemas.push({
      uri: makeRefUri(id, key),
      schema: updateRefs(id, definition),
      // associate with our model
      ...(keyFromRef($ref) === key ? { fileMatch } : undefined),
    });
  }
  window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas,
  });
};

const getSchemaIndex = (id: string, key: string) => {
  return schemas.findIndex(({ uri }) => uri === makeRefUri(id, key));
};

const removeSchemas = (id: string, schema: Schema) => {
  let didRemove = false;

  const { definitions = {} } = schema;

  for (const key of Object.keys(definitions)) {
    const index = getSchemaIndex(id, key);
    schemas.splice(index, 1);
    didRemove = true;
  }

  if (!didRemove) {
    return;
  }

  window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas,
  });
};

export const monacoUtils = {
  addSchemas,
  removeSchemas,
};

export { version as MonacoVersion } from 'monaco-editor/package.json';
