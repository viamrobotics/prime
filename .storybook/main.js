const { svelte } = require('@sveltejs/vite-plugin-svelte')
const { preprocess } = require('../svelte.config.js')
const { mergeConfig } = require('vite')

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
    '@storybook/addon-a11y'
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
