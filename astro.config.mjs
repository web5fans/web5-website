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
          href: "https://github.com/web5fans",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/BPREZqjpUr",
        },
        { icon: "x.com", label: "X", href: "https://x.com/CKBEcoFund" },
      ],
      customCss: ["./src/styles/global.css", "./src/styles/starlight.css"],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "docs" },
            { label: "SDKs and Tools", slug: "docs/guides/sdk-and-tools" },
            { label: "Resources", slug: "docs/guides/resource" },
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
            {
              label: "Nostr Integration",
              slug: "docs/protocol/nostr-integration",
            },
            { label: "Off-chain Indexer", slug: "docs/protocol/indexer" },
          ],
        },
        {
          label: "API Reference",
          items: [
            { label: "Lexicon Overview", slug: "docs/reference/lexicon" },
            { label: "Web5 Lexicon", slug: "docs/reference/web5-lexicon" },
          ],
        },
        {
          label: "Examples",
          items: [
            { label: "bbs.fans", slug: "docs/examples/bbs-fans" },
            { label: "CKB Community DAO", slug: "docs/examples/community-dao" },
            { label: "XiangJiang DAO", slug: "docs/examples/xiangjian-dao" },
          ],
        },
      ],
      components: {},
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
