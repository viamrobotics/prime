const path = require('path');
const fs = require('fs');

const { svelte } = require('@sveltejs/vite-plugin-svelte')
const { preprocess } = require('../svelte.config.js')
const { mergeConfig } = require('vite')

const monaco = path.resolve(__dirname, '../node_modules/monaco-editor/esm/vs')
const workers = path.resolve(__dirname, 'workers')

if (!fs.existsSync(workers)){
  fs.mkdirSync(workers);
}

fs.copyFileSync(path.resolve(monaco, 'language/json/json.worker.js'), path.resolve(workers, 'json.worker.js'), fs.constants.COPYFILE_FICLONE)
fs.copyFileSync(path.resolve(monaco, 'language/css/css.worker.js'), path.resolve(workers, 'css.worker.js'), fs.constants.COPYFILE_FICLONE)
fs.copyFileSync(path.resolve(monaco, 'language/html/html.worker.js'), path.resolve(workers, 'html.worker.js'), fs.constants.COPYFILE_FICLONE)
fs.copyFileSync(path.resolve(monaco, 'language/typescript/ts.worker.js'), path.resolve(workers, 'ts.worker.js'), fs.constants.COPYFILE_FICLONE)
fs.copyFileSync(path.resolve(monaco, 'editor/editor.worker.js'), path.resolve(workers, 'editor.worker.js'), fs.constants.COPYFILE_FICLONE)

module.exports = {
  stories: [
    '../src/stories/docs/introduction.stories.mdx',
    '../src/stories/**/*.stories.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  svelteOptions: {
    preprocess,
    compilerOptions: { customElement: true },
  },
  features: {
    storyStoreV7: true
  },
  staticDirs: ['workers'],
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        svelte({
          compilerOptions: {
            customElement: true
          },
          preprocess
        }),
      ],
      base: process.env.NODE_ENV === 'development' ? '/' : '/prime/'
    })
  },
}
