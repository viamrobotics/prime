import * as monaco from 'monaco-editor'

export type MonacoSupportedLanguages =
| 'json'
| 'javascript'
| 'typescript'
| 'python'
| 'go';

export type MonacoSupportedThemes = 'vs' | 'vs-dark'
export type MonacoMarker = monaco.editor.IMarker

export { version as MonacoVersion } from 'monaco-editor/package.json'

export type { monaco as Monaco }
