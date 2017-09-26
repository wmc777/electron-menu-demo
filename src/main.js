
const {app, Menu, Tray, BrowserWindow } = require('electron')
const path = require('path')

let mainUrl = require('url').format({
  protocol: 'file',
  slashes: false,
  pathname: path.join(__dirname, '../view/main_view.html')
})

let iconPath = path.join('img', 'coffee-icon.png')

let mainWindow
let tray = null

function initializeWindow() {

  tray = new Tray(iconPath)

  mainWindow = new BrowserWindow({
    title: 'Electron Demo Workbench',
    icon: iconPath
  })

  mainWindow.loadURL(mainUrl)

  // show dev tools on app start
  //mainWindow.webContents.openDevTools()

  const appName = app.getName()

  const tryContentMenu = new Menu.buildFromTemplate([
    {
      label: 'Show',
      click: _ => mainWindow.show()
    }, {
      label: 'Hide',
      click: _ => mainWindow.hide()
    }, {
      label: 'Exit',
      click: _ => { app.quit() }
    }
  ])

  const appMenu = Menu.buildFromTemplate([
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
  ])

  Menu.setApplicationMenu(appMenu);
  tray.setContextMenu(tryContentMenu)

  mainWindow.on('closed', function() {
    mainWindow = null
  })

  mainWindow.on('minimize', function(e) {
    e.preventDefault();
    mainWindow.hide();
  })
}

app.on('ready', initializeWindow)

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
