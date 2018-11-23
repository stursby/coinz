export default {
  srcDir: 'client',

  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:500,700'
      }
    ]
  },

  css: ['~/assets/css/main.css'],

  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.target = 'electron-renderer'
      }
    }
  }
}
