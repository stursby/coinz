const menubar = require('menubar')
const isDev = require('electron-is-dev')
const { CronJob } = require('cron')

const CONFIG = {
  icons: {
    default: `${__dirname}/icons/icon.png`,
    active: `${__dirname}/icons/icon-active.png`
  },
  entry: {
    dev: 'http://localhost:3000',
    prod: `file://${__dirname}/dist/index.html`
  },
  cron: '*/5 * * * *'
}

const mb = menubar({
  width: 350,
  minWidth: 350,
  maxWidth: 350,
  height: 400,
  minHeight: 280,
  maxHeight: 750,
  preloadWindow: true,
  alwaysOnTop: isDev,
  icon: CONFIG.icons.default,
  index: isDev ? CONFIG.entry.dev : CONFIG.entry.prod
})

function setupCron() {
  const cron = new CronJob(CONFIG.cron, () => {
    mb.window.webContents.send('cron')
  })
  cron.start()
}

function addWindowListeners() {
  mb.window.on('show', () => {
    mb.tray.setImage(CONFIG.icons.active)
  })
  mb.window.on('hide', () => {
    mb.tray.setImage(CONFIG.icons.default)
  })
}

mb.on('ready', () => {
  setupCron()
  addWindowListeners()
})
