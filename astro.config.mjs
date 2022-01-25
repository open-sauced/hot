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
  ],
  vite: {
    define: {
      '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
    }
  }
};
