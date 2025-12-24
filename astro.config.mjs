// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'WEB5 DOCS',
          logo: {
            light: './src/assets/web5-logo-light.svg',
            dark: './src/assets/web5-logo-dark.svg',
            replacesTitle: true,
          },
          social: [
            { icon: 'github', label: 'GitHub', href: 'https://github.com/TBD54566975/web5-js' },
            { icon: 'discord', label: 'Discord', href: 'https://discord.gg/tbd' },
            { icon: 'x.com', label: 'X', href: 'https://twitter.com/TBD54566975' },
          ],
          customCss: [
            './src/styles/global.css',
            './src/styles/starlight.css',
          ],
          sidebar: [
              {
                  label: 'Getting Started',
                  items: [
                      { label: 'Introduction', slug: 'docs' },
                      { label: 'Quick Start', slug: 'docs/guides/quickstart' },
                      { label: 'Core Concepts', slug: 'docs/guides/core-concepts' },
                  ],
              },
              {
                  label: 'Guides',
                  items: [
                      { label: 'Authentication', slug: 'docs/guides/authentication' },
                      { label: 'Working with Schemas', slug: 'docs/guides/schemas' },
                      { label: 'Protocol Development', slug: 'docs/guides/protocols' },
                  ],
              },
              {
                  label: 'API Reference',
                  items: [
                      { label: 'API Overview', slug: 'docs/reference/api-overview' },
                      { label: 'Web5 Class', slug: 'docs/reference/web5' },
                      { label: 'DID API', slug: 'docs/reference/did' },
                      { label: 'DWN Records', slug: 'docs/reference/dwn-records' },
                      { label: 'Protocols', slug: 'docs/reference/protocols' },
                      { label: 'Verifiable Credentials', slug: 'docs/reference/credentials' },
                  ],
              },
              {
                  label: 'Examples',
                  items: [
                      { label: 'Todo App', slug: 'docs/examples/todo-app' },
                      { label: 'Social Network', slug: 'docs/examples/social-network' },
                      { label: 'File Sharing', slug: 'docs/examples/file-sharing' },
                  ],
              },
          ],
          components: {
            //Header: './src/components/landing/Header.astro',
          },
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});
