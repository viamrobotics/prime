import Prism from 'prismjs';
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

// Prism highlights every `language-*` element on the page once the DOM is ready unless told
// otherwise. Its callback reads this flag, so setting it after the import is early enough.
Prism.manual = true;

/** Highlights `code` as `language` into HTML made of prism's `token` spans. */
export const highlight = (code: string, language: CodeSnippetLanguage): string =>
	Prism.highlight(code, Prism.languages[language], language);
