/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	}
};

export default config;
