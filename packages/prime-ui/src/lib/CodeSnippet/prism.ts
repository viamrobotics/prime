import Prism from 'prismjs';

// Prism's language components read a global `Prism` that the core sets as it evaluates. A bundler
// that inlines the CommonJS core evaluates it where its binding is first used, which can fall
// after the components, so this module is the one importer of the core, and `highlight.ts` loads
// it ahead of the components.

// Prism highlights every `language-*` element on the page once the DOM is ready unless told
// otherwise. Its callback reads this flag, so setting it after the import is early enough.
Prism.manual = true;

export default Prism;
