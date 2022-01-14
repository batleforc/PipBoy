// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "PipBoy",
  tagline: "Projet d'environnement de travail dans Kubernetes",
  url: "https://batleforc.github.io",
  baseUrl: "/PipBoy/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "batleforc", // Usually your GitHub org/user name.
  projectName: "PipBoy", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/batleforc/PipBoy/tree/master/doc/docs/",
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
        },
        pages: {
          path: "src/pages",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/batleforc/PipBoy/tree/master/doc/blog",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "PipBoy",
        logo: {
          alt: "PipBoy",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Doc",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/batleforc/PipBoy",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Doc",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Portfolio",
                href: "https://maxleriche.tech",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/Maxweebo",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/batleforc/PipBoy",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PipBoy, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
