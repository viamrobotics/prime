import type { LanguageSupport } from '@codemirror/language';

import { go } from '@codemirror/lang-go';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { python } from '@codemirror/lang-python';
import { sql } from '@codemirror/lang-sql';

import type { CodeEditorLanguage } from './code-editor.ts';

const LANGUAGE_SUPPORT: Record<CodeEditorLanguage, () => LanguageSupport> = {
	go,
	javascript: () => javascript(),
	json,
	python,
	sql: () => sql(),
	typescript: () => javascript({ typescript: true })
};

export function languageSupport(language: CodeEditorLanguage): LanguageSupport {
	return LANGUAGE_SUPPORT[language]();
}
