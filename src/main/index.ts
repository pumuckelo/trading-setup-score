import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, Menu, Tray, app, ipcMain, screen } from 'electron'
import { join } from 'path'
import { autoUpdater } from 'electron-updater'

import { ipcCommands } from '@shared/ipcCommands'
import trayIcon from '../../resources/logo2.png?asset'

let floatingWindow: BrowserWindow
let checklistWindow: BrowserWindow

let tray

function createTray() {
  tray = new Tray(trayIcon) // Make sure to add an icon.png in your project directory
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Exit',
      click: function () {
        app.quit()
      }
    },
    {
      label: 'Restart',
      click: function () {
        app.relaunch()
        app.quit()
      }
    }
  ])
  tray.setToolTip('Setup Checklist')
  tray.setContextMenu(contextMenu)
}

function createFloatingButton(): void {
  // Create the browser window.
  floatingWindow = new BrowserWindow({
    width: 35,
    height: 35,
    x: 50,
    y: 50,
    alwaysOnTop: true,
    skipTaskbar: true,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    fullscreenable: false,
    // resizable: false,
    show: false,
    // focusable: false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  floatingWindow.setAlwaysOnTop(true, 'floating')
  floatingWindow.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true
  })

  floatingWindow.on('ready-to-show', () => {
    floatingWindow.showInactive()
  })

  floatingWindow.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true
  })

  // floatingWindow.webContents.setWindowOpenHandler((details) => {
  //   shell.openExternal(details.url)
  //   return { action: 'deny' }
  // })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    floatingWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    floatingWindow.loadFile(join(__dirname, '../renderer/floatingButton/index.html'))
  }
}

const createChecklistWindow = () => {
  checklistWindow = new BrowserWindow({
    width: 300,
    height: 450,
    alwaysOnTop: true,
    skipTaskbar: true,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    fullscreenable: false,

    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  checklistWindow.setAlwaysOnTop(true, 'floating')
  checklistWindow.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true
  })

  checklistWindow.loadFile(join(__dirname, '../renderer/main/index.html'))

  // checklistWindow.on('closed', () => {
  //   checklistWindow = null
  // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  autoUpdater.checkForUpdatesAndNotify()

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createTray()
  createFloatingButton()
  createChecklistWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createFloatingButton()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// LISTENERS

ipcMain.handle(ipcCommands.toggleChecklistVisibility, () => {
  if (checklistWindow.isVisible()) {
    hideChecklist()
  } else {
    openChecklist()
    floatingWindow.hide()
  }
})

const hideChecklist = () => {
  // set position of floating button to position of checklist
  const checklistBounds = checklistWindow.getBounds()

  const x = checklistBounds.x
  const y = checklistBounds.y

  floatingWindow.setPosition(x, y)
  floatingWindow.show()

  checklistWindow.hide()
}

const openChecklist = () => {
  // open checklist at position of floating button
  const floatingButtonBounds = floatingWindow.getBounds()
  const checklistBounds = checklistWindow.getBounds()

  const screenWidth = screen.getPrimaryDisplay().workAreaSize.width

  const x = floatingButtonBounds.x
  const y = floatingButtonBounds.y

  if (x + checklistBounds.width > screenWidth) {
    // Open on the left of the floating button
    checklistWindow.setPosition(floatingButtonBounds.x - checklistBounds.width, y)
  } else {
    // Open on the right of the floating button
    checklistWindow.setPosition(x, y)
  }

  checklistWindow.show()
}
