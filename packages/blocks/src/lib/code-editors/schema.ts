/**
 * @module
 *
 * Monaco doesn't understand our schema $ref paths, which look like:
 * `#/definitions/SomeAttr`
 *
 * For now we're just transforming them into refs that monaco can understand.
 */

import type monaco from 'monaco-editor';
import { setMonacoDiagnostics } from './monaco';

type DataTypes =
  | 'array'
  | 'number'
  | 'string'
  | 'boolean'
  | 'integer'
  | 'object'
  | 'undefined';

export interface Item {
  $schema?: string;
  $ref?: string;
  type?: DataTypes;
}

export interface Property {
  description?: string;
  type?: string;
  items?: Item;
  patternProperties?: object;
  $ref?: string;
}

export type Properties = Record<string, Property>;

export interface Definition {
  additionalProperties?: boolean;
  properties?: Properties;
  required?: string[];
  type: string;
}

export type Definitions = Record<string, Definition>;

export interface Schema {
  $ref: string;
  $id: string;
  $schema: string;
  $defs: Definitions;
}

const schemas: monaco.languages.json.DiagnosticsOptions['schemas'] = [];

const keyFromRef = (ref = '') => ref.split('/').pop()!;
const makeRefUri = (id: string, key: string) =>
  `http://definitions/${id}-${key}.json`;

const updateRefs = (
  id: string,
  definition: Definition
): Record<string, string> => {
  if (!definition.properties) {
    return {};
  }

  for (const property of Object.values(definition.properties)) {
    if (property.type === 'array' && property.items?.type) {
      property.description = `"array" of type "${property.items.type}"`;
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

const getSchemaIndex = (id: string, key: string) => {
  return schemas.findIndex(({ uri }) => uri === makeRefUri(id, key));
};

export const addSchemas = (
  instance: typeof monaco,
  id: string,
  schema: Schema,
  fileMatch: string[]
) => {
  const { $ref, $defs: definitions = {} } = schema;
  for (const [key, definition] of Object.entries(definitions)) {
    schemas.push({
      uri: makeRefUri(id, key),
      schema: updateRefs(id, definition),
      // associate with our model
      ...(keyFromRef($ref) === key ? { fileMatch } : undefined),
    });
  }

  setMonacoDiagnostics(instance, schemas);
};

export const removeSchemas = (
  instance: typeof monaco,
  id: string,
  schema: Schema
) => {
  let didRemove = false;

  const { $defs: definitions = {} } = schema;

  for (const key of Object.keys(definitions)) {
    const index = getSchemaIndex(id, key);
    schemas.splice(index, 1);
    didRemove = true;
  }

  if (!didRemove) {
    return;
  }

  setMonacoDiagnostics(instance, schemas);
};
