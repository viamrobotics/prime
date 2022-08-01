/* eslint-disable import/no-unresolved,import/default */
import 'monaco-editor/min/vs/editor/editor.main.css'
import 'monaco-editor/esm/vs/editor/editor.all'
import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp'
import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens'
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess'
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess'
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess'
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess'
import 'monaco-editor/esm/vs/editor/standalone/browser/referenceSearch/standaloneReferenceSearch'
import 'monaco-editor/esm/vs/language/json/monaco.contribution'
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// import { workers } from './config'

// const getWorkerModule = (type: string, label: string) => {
//   const url = `${workers.monaco ?? ''}/${type}.worker.js`
//   console.log('url', url)
// 
//   return new Worker(new URL(url, import.meta.url), {
//     name: label,
//     type: 'module',
//   })
// }

// In development mode we use a server that hosts assets in a dev environment on another port than our html files (:8080).
// This presents problems when working with web workers (Monaco uses them for syntax parsing / highlighting).
// When working locally, we copy the workers into the static folder and fetch them from the same origin using getWorkerModule().
// In prod, we let the bundler work its magic and decide how it wants to chunk files by using the worker imports above.
// This isn't optimal, but a better solution hasn't presented itself yet.
// self.MonacoEnvironment = import.meta.env.DEV ? {
//   getWorker: (_: unknown, label: string) => {
//     switch (label) {
//     case 'json':
//       return getWorkerModule('json', label)
//     case 'css':
//     case 'scss':
//       return getWorkerModule('css', label)
//     case 'html':
//       return getWorkerModule('html', label)
//     case 'typescript':
//     case 'javascript':
//       return getWorkerModule('ts', label)
//     default:
//       return getWorkerModule('editor', label)
//     }
//   },
// } : {
//   getWorker: (_: unknown, label: string) => {
//     switch (label) {
//     case 'json':
//       return new jsonWorker()
//     case 'css':
//     case 'scss':
//       return new cssWorker()
//     case 'html':
//       return new htmlWorker()
//     case 'typescript':
//     case 'javascript':
//       return new tsWorker()
//     default:
//       return new editorWorker()
//     }
//   },
// }

self.MonacoEnvironment = {
  getWorker: (_: unknown, label: string) => {
    switch (label) {
    case 'json':
      return new jsonWorker()
    case 'css':
    case 'scss':
      return new cssWorker()
    case 'html':
      return new htmlWorker()
    case 'typescript':
    case 'javascript':
      return new tsWorker()
    default:
      return new editorWorker()
    }
  },
}

export type MonacoSupportedLanguages =
| 'json'
| 'javascript'
| 'typescript'
| 'python'
| 'go';

export type MonacoSupportedThemes = 'vs' | 'vs-dark';

export type MonacoMarker = monaco.editor.IMarker

export * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
