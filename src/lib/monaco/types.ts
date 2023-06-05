export * as Monaco from 'monaco-editor';

export type MonacoSupportedLanguages =
  | 'json'
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'go'
  | 'shell';

export interface Schema {
  $ref: string;
  $schema: string;
  definitions: Definition;
}

export type Definition = Record<string, SubSchema>;

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

export type Property = Record<
  string,
  {
    description?: string;
    type?: string;
    items?: Item;
    patternProperties?: object;
    $ref?: string;
  }
>;

export interface SubSchema {
  additionalProperties?: boolean;
  properties: Property;
  required?: string[];
  type: string;
}

export type MonacoSupportedThemes = 'vs' | 'vs-dark';
export type MonacoMarker = monaco.editor.IMarker;
