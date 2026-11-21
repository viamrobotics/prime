/** The grammars `CodeSnippet` can highlight. */
export const codeSnippetLanguages = [
	'bash',
	'dart',
	'go',
	'javascript',
	'json',
	'python',
	'rust',
	'typescript'
] as const;

/** A grammar name `CodeSnippet` accepts for `language`. */
export type CodeSnippetLanguage = (typeof codeSnippetLanguages)[number];
