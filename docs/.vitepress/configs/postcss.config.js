import { defineConfig } from 'vite';

export default defineConfig({
    // 其他配置...
    plugins: [
        require('postcss-modules')({
            // 可能的配置选项
            css: {
                modules: {
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                    hashPrefix: 'prefix',
                },
                // 如果你有其他CSS相关配置，也可以在这里添加
            },
        }),
        require('cssnano')({
            preset: 'default',
        }),
        tailwindcss(),
        autoprefixer(),
    ],
});