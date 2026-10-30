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

export type CodeSnippetLanguage = (typeof codeSnippetLanguages)[number];
