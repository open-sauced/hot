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
    tailwindConfig: './tailwind.config.cjs',
  },
  renderers: [
    '@astrojs/renderer-react'
  ]
};
