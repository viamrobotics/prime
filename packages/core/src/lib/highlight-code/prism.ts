/**
 * Wrapper module for Prism.js
 */

import PrismPackage from 'prismjs/package.json';
import Prism from 'prismjs';
import './viam-prism-theme.css';

/**
 * We use the prism autoloader to handle loading in language grammar files. The
 * default path for the grammar files is a CDN link so we don't have to include
 * grammar files in our bundle. If you prefer to point to your own grammars and
 * bypass the CDN, define the path to those files.
 *
 * See: https://prismjs.com/plugins/autoloader/
 */
import 'prismjs/plugins/autoloader/prism-autoloader';
const grammarsPath = `https://cdnjs.cloudflare.com/ajax/libs/prism/${PrismPackage.version}/components/`;

export const getPrismModule = (): typeof import('prismjs') => {
  // Make sure the autoloader knows where to find our languages
  (Prism.plugins.autoloader as { languages_path: string }).languages_path =
    grammarsPath;
  return Prism;
};
