import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'

import { themes as prismThemes } from 'prism-react-renderer'
import { ScalarOptions } from '@scalar/docusaurus'

const config: Config = {
    title: 'Aura Documentation',
    tagline: 'Aura Documentation',
    favicon: 'img/favicon.ico',
    url: 'https://aura.zorin.space',
    baseUrl: '/',
    organizationName: 'Zorin Projects',
    projectName: 'panel',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    i18n: {
        defaultLocale: 'ru',
        locales: ['en']
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    sidebarPath: './sidebars.ts',
                    editUrl: 'https://github.com/localzet/aura-docs/tree/main'
                },
                // blog: {
                //     showReadingTime: true,
                //     editUrl: 'https://github.com/localzet/aura-docs/tree/main'
                // },
                blog: {
                    routeBasePath: '/blog',
                    path: 'blog',
                    showReadingTime: true,
                    // showLastUpdateAuthor: true,
                    // showLastUpdateTime: true,
                    // authorsMapPath: './blog/authors.yaml',
                    postsPerPage: 5,
                    feedOptions: {
                        type: 'all',
                        description:
                            'Keep up to date with upcoming Aura releases and articles by following our feed!',
                        copyright: `Copyright © ${new Date().getFullYear()} Zorin Projects S.P.`,
                        xslt: true
                    },
                    blogTitle: 'Aura blog',
                    blogDescription: 'Read blog posts about Aura from the team',
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'All our posts'
                },
                theme: {
                    customCss: './src/css/custom.css'
                }
            } satisfies Preset.Options
        ]
    ],

    plugins: [
        async function myPlugin() {
            return {
                name: 'docusaurus-mantineui',
                configurePostCss(postcssOptions) {
                    // Appends TailwindCSS and AutoPrefixer.
                    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
                    postcssOptions.plugins.push(require('postcss-preset-mantine'))
                    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
                    postcssOptions.plugins.push(require('postcss-simple-vars'))
                    return postcssOptions
                }
            }
        },
        [
            '@docusaurus/plugin-client-redirects',
            {
                redirects: [
                    // /docs/oldDoc -> /docs/newDoc
                    {
                        to: '/docs/install/reverse-proxies/',
                        from: '/category/reverse-proxies'
                    },
                    {
                        from: '/docs/',
                        to: '/docs/overview/introduction'
                    },
                ]
            }
        ],
        [
            '@scalar/docusaurus',
            {
                label: '🔗 API Specification',
                route: '/api',
                showNavLink: true, // optional, default is true
                configuration: {
                    spec: {
                        url: 'https://aura.zorin.space/openapi.json'
                    },
                    theme: 'purple',
                    hideDarkModeToggle: true,
                    searchHotKey: 'k',
                    metaData: {
                        title: 'Aura API Specification',
                        description: 'Aura API Specification',
                        ogDescription: 'Aura API Specification',
                        ogTitle: 'Aura API Specification'
                    },
                    hideTestRequestButton: true,
                    customCss: `a[href="https://www.scalar.com"][target="_blank"] {
                                display: none !important;
                    }`,
                    darkMode: true,
                    hiddenClients: [
                        'asynchttp',
                        'nethttp',
                        'okhttp',
                        'unirest',
                        'nsurlsession',
                        'httr',
                        'native',
                        'libcurl',
                        'httpclient',
                        'restsharp',
                        'clj_http',
                        'webrequest',
                        'restmethod',
                        'cohttp'
                    ],
                    defaultHttpClient: {
                        targetKey: 'js',
                        clientKey: 'axios'
                    }
                }
            } as ScalarOptions
        ]
    ],
    themeConfig: {
        // image: 'img/docusaurus-social-card.jpg',

        docs: {
            sidebar: {
                hideable: true,
                autoCollapseCategories: false
            }
        },
        navbar: {
            title: 'Aura',
            logo: {
                alt: 'Aura Logo',
                src: 'img/logo.svg'
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: '📓 Docs'
                },
                // {
                //     href: 'https://aura.zorin.space/changelog',
                //     label: '🚀 Releases',
                //     position: 'left'
                // },
                // {
                //     href: 'https://github.com/localzet/aura-docs',
                //     label: 'GitHub',
                //     position: 'left'
                // }
            ]
        },
        footer: {
            style: 'light',
            links: [
                // {
                //     title: 'Docs',
                //     items: [
                //         {
                //             label: 'Introduction',
                //             to: '/docs/overview/introduction'
                //         }
                //     ]
                // },
                // {
                //     title: 'Community',
                //     items: [
                //         {
                //             label: 'Telegram',
                //             href: 'https://t.me/localzet'
                //         }
                //     ]
                // },
                // {
                //     title: 'More',
                //     items: [
                //         {
                //             label: 'GitHub',
                //             href: 'https://github.com/localzet'
                //         }
                //     ]
                // }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Zorin Projects S.P.`
        },
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: true,
            respectPrefersColorScheme: false
        },

        prism: {
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['bash', 'nginx'],
            magicComments: [
                {
                    className: 'theme-code-block-highlighted-line',
                    line: 'highlight-next-line',
                    block: { start: 'highlight-start', end: 'highlight-end' }
                },
                {
                    className: 'code-block-error-line',
                    line: 'highlight-next-line-red'
                },
                {
                    className: 'code-block-success-line',
                    line: 'highlight-next-line-green'
                },
                {
                    className: 'code-block-warning-line',
                    line: 'highlight-next-line-yellow'
                }
            ]
        }
    } satisfies Preset.ThemeConfig
}

export default config
