const electron = require('electron')
const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/../view/main_view.html`)
  //mainWindow.webContents.openDevTools()

  const appName = electron.app.getName()
  const menuTemplate = [
    {
      label: appName,
      submenu: [{
          label: `About ${appName}`,
          click: _ => {
            console.log('About clicked')
          }
      },{
          type: 'separator'
      }, {
          label: 'Exit',
          click: _ => { app.quit() },
          accelerator: 'Alt+F4'
      }]
    }
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})
