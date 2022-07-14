const { version } = require('../package.json')
const { rename, copy, mkdir, write, read, readDir } = require('./util')
const terser = require('terser')

const minify = async (file) => {
  const minified = await terser.minify(file, {
    ecma: 2020,
    module: true,
    parse: {
      html5_comments: false
    },
    compress: {
      drop_console: true,
      keep_fargs: false,
      passes: 3,
      unsafe: true,
    },
    format: {
      comments: false
    },
  })

  return minified.code
}

const main = async () => {
  /**
   * LIBRARY POSTBUILD STEPS
   */

  // Rename our stylesheets to what the web components reference
  rename('dist/style.css', 'dist/prime.css')

  // Add Typescript definitions to the library directory
  copy('src/prime.d.ts', 'dist/prime.d.ts')

  // Add icon resources
  copy('public/icons.woff2', 'dist/icons.woff2')

  // Update icons path
  {
    const file = read('dist/prime.css')
      .replace(/.\/icons.woff2/, 'icons.woff2')
    write('dist/prime.css', file)
  }

  // Create versioned resources for consumers with cache-busting
  copy('dist/prime.es.js', `dist/prime@${version}.es.js`)
  copy('dist/prime.umd.js', `dist/prime@${version}.umd.js`)
  copy('dist/prime.css', `dist/prime@${version}.css`)
  copy('dist/icons.woff2', `dist/icons@${version}.woff2`)

  // Update paths for versioned resources
  {
    const file = read(`dist/prime@${version}.css`)
      .replace(/icons.woff2/, `icons@${version}.woff2'`)
    write(`dist/prime@${version}.css`, file)
  }

  {
    const file = read(`dist/prime@${version}.es.js`)
      .replace(/"\/prime.css"/g, `"/prime@${version}.css"`)
      .replace(/"\/icons.css"/g, `"/icons@${version}.css"`)
    write(`dist/prime@${version}.es.js`, file)
    write(`dist/prime@${version}.min.es.js`, await minify(file))
  }

  {
    const file = read(`dist/prime@${version}.umd.js`)
      .replace(/"\/prime.css"/g, `"/prime@${version}.css"`)
      .replace(/"\/icons.css"/g, `"/icons@${version}.css"`)
    write(`dist/prime@${version}.umd.js`, file)
  }

  /**
   * STORYBOOK POSTBUILD STEPS
   */

  // Disable Jekyll when deploying to gh-pages
  write('prime/.nojekyll', '')

  // Move assets to the storybook directory
  copy('dist/prime.es.js', 'prime/prime.es.js')
  copy('dist/prime.css', 'prime/prime.css')
  mkdir('prime/fonts')
  copy('dist/icons.woff2', 'prime/icons.woff2')

  {
    const file = read('prime/index.html')
      // Add noindex rule
      .replace('<meta charset="utf-8"/>', '<meta charset="utf-8"/><meta name="robots" content="noindex">')
      // Add production prime config
      .replace('<head>', `<head><script type="module">window.PRIME_CONFIG = { base: '/prime' }</script>`)
    write('prime/index.html', file)
  }

  // Update correct paths for iframe resources
  {
    const file = read('prime/iframe.html')
      // Add production prime config
      .replace('<head>', `<head><script type="module">window.PRIME_CONFIG = { base: '/prime' }</script>`)
      .replace("src='/src/elements/index.ts'", "src='/prime/prime.es.js'")
    write('prime/iframe.html', file)
  }


  const assets = readDir('prime/assets')

  // Update correct paths for stylesheets
  {
    const files = assets.filter(file => {
      return file.startsWith('iframe') && (file.endsWith('.js') || file.endsWith('.js.map'))
    })

    for (const filename of files) {
      const file = read(`prime/assets/${filename}`)
        .replace(/"\/prime.css"/g, '"/prime/prime.css"')
        .replace(/"\/icons.css"/g, '"/prime/icons.css"')
      write(`prime/assets/${filename}`, file)
    }
  }
}

main()
