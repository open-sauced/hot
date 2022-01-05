const config = {
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
};

const isGitpodBuild = process.env.GITPOD_WORKSPACE_URL || false;
// const isCloudIdeBuild = isGitpodBuild || false;

if (isGitpodBuild) {
  const hostname = `${process.env.GITPOD_WORKSPACE_URL.replace('https://', 'https://3000-')}`;
  config.buildOptions.site = hostname;
  config.devOptions.hostname = hostname;
}

export default config;
