// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "WEB5 DOCS",
      logo: {
        light: "./src/assets/web5-logo-light.svg",
        dark: "./src/assets/web5-logo-dark.svg",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/TBD54566975/web5-js",
        },
        { icon: "discord", label: "Discord", href: "https://discord.gg/tbd" },
        { icon: "x.com", label: "X", href: "https://twitter.com/TBD54566975" },
      ],
      customCss: ["./src/styles/global.css", "./src/styles/starlight.css"],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "docs" },
            { label: "Quick Start", slug: "docs/guides/quickstart" },
            { label: "SDKs and Tools", slug: "docs/guides/sdk-and-tools" },
          ],
        },
        {
          label: "Protocol",
          items: [
            { label: "Overview", slug: "docs/protocol/overview" },
            { label: "On-chain DID", slug: "docs/protocol/did-ckb" },
            { label: "Off-chain PDS", slug: "docs/protocol/offchain-pds" },
            {
              label: "Signing Key Migration",
              slug: "docs/protocol/client-side-signing",
            },
            { label: "Off-chain Indexer", slug: "docs/protocol/indexer" },
          ],
        },
        {
          label: "API Reference",
          items: [
            { label: "Lexicon Overview", slug: "docs/reference/api-overview" },
            { label: "Web5 Lexicon", slug: "docs/reference/web5" },
          ],
        },
        {
          label: "Examples",
          items: [
            { label: "bbs.fans Community", slug: "docs/examples/todo-app" },
            { label: "CKB Community DAO", slug: "docs/examples/social-network" },
            { label: "XiangJiang DAO", slug: "docs/examples/file-sharing" },
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
