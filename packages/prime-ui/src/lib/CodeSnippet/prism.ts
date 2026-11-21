// Prism's language components read a global `Prism` set as the core evaluates, so this is the one importer of the core and `highlight.ts` loads it first.
import Prism from 'prismjs';

// Without this flag prism highlights every `language-*` element once the DOM is ready. Its callback reads the flag, so setting it after the import is early enough.
Prism.manual = true;

export default Prism;
