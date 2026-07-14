import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
    ['meta', { charset: 'UTF-8'}],
    ['meta', { name: 'robots', content: 'noarchive' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#78c091' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
]