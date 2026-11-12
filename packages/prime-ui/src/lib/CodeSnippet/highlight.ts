// The core loads first, through its own module, so the language components find the global
// `Prism` they read. The import sorter leaves a side-effect import in place.
import './prism.ts';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';

import type { CodeSnippetLanguage } from './language.ts';

import Prism from './prism.ts';

/** Highlights `code` as `language` into HTML made of prism's `token` spans. */
export const highlight = (code: string, language: CodeSnippetLanguage): string =>
	Prism.highlight(code, Prism.languages[language], language);
