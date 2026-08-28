// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import ViteYaml from '@modyfi/vite-plugin-yaml';

// https://astro.build/config
export default defineConfig({
	site: 'https://rohannair.me',
	integrations: [pagefind()],
	vite: {
		plugins: [ViteYaml()],
	},
});
