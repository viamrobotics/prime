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
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  svelteOptions: {
    preprocess
  },
  features: {
    storyStoreV7: true
  },
  async viteFinal(config) {
    const index = config.plugins.findIndex(({name}) => name === 'vite-plugin-svelte')
    console.log(index, config.plugins[index])
    config.plugins.splice(index, 1)

    config.plugins.push(
      svelte({
        compilerOptions: { customElement: true },
        preprocess
      })
    )

    return mergeConfig(config, {
      base: process.env.NODE_ENV !== 'development' ? '/prime/' : '/'
    })
  },
}
