import pkg from '../package.json' assert { type: 'json' };
import { rename, copy, write, read } from './util.js';
import { minify } from 'terser';

const { version } = pkg;

const compress = async (file) => {
  const minified = await minify(file, {
    ecma: 2020,
    module: true,
    parse: {
      html5_comments: false,
    },
    compress: {
      drop_console: true,
      keep_fargs: false,
      passes: 3,
      unsafe: true,
    },
    format: {
      comments: false,
    },
  });

  return minified.code;
};

const main = async () => {
  /**
   * LIBRARY POSTBUILD STEPS
   */

  // Rename our stylesheets to what the web components reference
  rename('dist/style.css', 'dist/prime.css');

  // Add Typescript definitions to the library directory
  copy('src/prime.d.ts', 'dist/prime.d.ts');

  // Add icon resources
  copy('public/icons.woff2', 'dist/icons.woff2');

  // Update icons path
  {
    const file = read('dist/prime.css').replace(
      /.\/icons.woff2/,
      'icons.woff2'
    );
    write('dist/prime.css', file);
  }

  // Create versioned resources for consumers with cache-busting
  copy('dist/prime.es.js', `dist/prime@${version}.es.js`);
  copy('dist/prime.umd.js', `dist/prime@${version}.umd.js`);
  copy('dist/prime.css', `dist/prime@${version}.css`);
  copy('dist/icons.woff2', `dist/icons@${version}.woff2`);

  // Update paths for versioned resources
  {
    const file = read(`dist/prime@${version}.css`).replace(
      /icons.woff2/,
      `icons@${version}.woff2'`
    );
    write(`dist/prime@${version}.css`, file);
  }

  {
    const file = read(`dist/prime@${version}.es.js`)
      .replace(/"\/prime.css"/g, `"/prime@${version}.css"`)
      .replace(/"\/icons.css"/g, `"/icons@${version}.css"`);
    write(`dist/prime@${version}.es.js`, file);
    write(`dist/prime@${version}.min.es.js`, await compress(file));
  }

  {
    const file = read(`dist/prime@${version}.umd.js`)
      .replace(/"\/prime.css"/g, `"/prime@${version}.css"`)
      .replace(/"\/icons.css"/g, `"/icons@${version}.css"`);
    write(`dist/prime@${version}.umd.js`, file);
  }

  /**
   * STORYBOOK POSTBUILD STEPS
   */

  // Disable Jekyll when deploying to gh-pages
  write('prime/.nojekyll', '');

  // Move assets to the storybook directory
  copy('dist/prime.es.js', 'prime/prime.es.js');
  copy('dist/prime.css', 'prime/prime.css');
  copy('dist/icons.woff2', 'prime/icons.woff2');

  {
    const file = read('prime/index.html')
      // Add noindex rule
      .replace(
        '<meta charset="utf-8"/>',
        '<meta charset="utf-8"/><meta name="robots" content="noindex">'
      );
    write('prime/index.html', file);
  }

  // Update correct paths for iframe resources
  {
    const file = read('prime/iframe.html').replace(
      '<script type="module" src="src/main.ts"></script>',
      '<script type="module" src="prime.es.js"></script>'
    );
    write('prime/iframe.html', file);
  }
};

main();
