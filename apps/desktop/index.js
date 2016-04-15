const path = require('path');
const fs = require('fs');
const electron = require('electron');
const app = electron.app;
const appMenu = require('./src/menu');
const storage = require('./src/storage');
const createTray = require('./src/tray');

require('electron-debug')({
  showDevTools: true
});
require('electron-dl')();

let mainWindow;
let isQuitting = false;

const isAlreadyRunning = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

if (isAlreadyRunning) {
  app.quit();
}

function updateBadge(title) {
  if (!app.dock) {
    return;
  }

  const messageCount = (/\(([0-9]+)\)/).exec(title);
  app.dock.setBadge(messageCount ? messageCount[1] : '');
}

function createMainWindow() {
  const lastWindowState = storage.get('lastWindowState') || {width: 800, height: 600};
  const win = new electron.BrowserWindow({
    title: app.getName(),
    show: false,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    icon: process.platform === 'linux' && path.join(__dirname, 'media', 'Icon.png'),
    minWidth: 400,
    minHeight: 200,
    titleBarStyle: 'hidden-inset',
    // webPreferences: {
    //   // fails without this because of CommonJS script detection
    //   nodeIntegration: false,
    //   preload: path.join(__dirname, 'app.js'),
    //   // required for Facebook active ping thingy
    //   webSecurity: false,
    //   plugins: true
    // }
  });
  win.loadURL('file://' + __dirname + '/index.html');
  win.on('close', e => {
    if (!isQuitting) {
      e.preventDefault();

      if (process.platform === 'darwin') {
        app.hide();
      } else {
        win.hide();
      }
    }
  });
  win.on('page-title-updated', (e, title) => updateBadge(title));
  return win;
}

app.on('ready', () => {
  electron.Menu.setApplicationMenu(appMenu);
  mainWindow = createMainWindow();
  createTray(mainWindow);
  const page = mainWindow.webContents;
  page.on('dom-ready', () => {
    mainWindow.show();
  });
  page.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });
});

app.on('activate', () => {
  mainWindow.show();
});

app.on('before-quit', () => {
  isQuitting = true;
  if (!mainWindow.isFullScreen()) {
    storage.set('lastWindowState', mainWindow.getBounds());
  }
});
