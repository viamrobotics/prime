
import type * as monaco from 'monaco-editor'

export type MonacoSupportedLanguages =
| 'json'
| 'javascript'
| 'typescript'
| 'python'
| 'go';

export type MonacoSupportedThemes = 'vs' | 'vs-dark';

export type MonacoMarker = monaco.editor.IMarker

// eslint-disable-next-line unicorn/prefer-export-from
export type { monaco as Monaco }
