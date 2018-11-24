export default {
  srcDir: 'src/client',

  mode: 'spa',

  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:500,700'
      }
    ]
  },

  css: ['~/assets/css/main.css'],

  router: {
    mode: 'hash'
  },

  build: {
    extend(config, { isDev, isClient }) {
      if (isClient) {
        config.target = 'electron-renderer'
      }
      if (!isDev) {
        config.output.publicPath = './_nuxt/'
      }
    }
  }
}
