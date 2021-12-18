export default {
    projectRoot: '.',
    pages: './src/pages',
    dist: './build',
    public: './public',
    buildOptions: {
        site: 'https://hot.opensauced.pizza',
        sitemap: true,
    },
    devOptions: {
        hostname: 'localhost',
        port: 3000,
        tailwindConfig: './tailwind.config.csj',
    },
    renderers: [
        '@astrojs/renderer-react'
    ],
};
