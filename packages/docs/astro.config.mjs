import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/': {
      status: 302,
      destination: '/guides/intro/'
    }
  },
  integrations: [starlight({
    title: 'Viam',
    social: {
      github: 'https://github.com/viamrobotics'
    },
    sidebar: [{
      label: 'Getting started',
			autogenerate: {
				directory: 'guides'
			}
    }, {
      label: 'Patterns',
      autogenerate: {
        directory: 'patterns'
      }
    }, {
      label: 'Components',
      autogenerate: {
        directory: 'components'
      }
    }, {
      label: 'APIs',
      autogenerate: {
        directory: 'apis'
      }
    }]
  }), svelte(), tailwind()],
	site: 'https://design.viam.com',
	trailingSlash: 'never'
});
