const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'CyberChef',
    icon: path.join(__dirname, 'CyberChef_v10.19.4/aecc661b69309290f600.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'CyberChef_v10.19.4/CyberChef_v10.19.4.html'));

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(`
      (function() {
        let config = localStorage.getItem('config');
        if (config) {
          config = JSON.parse(config);
        } else {
          config = {};
        }
        if (!config.theme || config.theme !== 'dark') {
          config.theme = 'dark';
          localStorage.setItem('config', JSON.stringify(config));
          // Recarga para aplicar (o simula click en el toggle si existe)
          location.reload();
        }
      })();
    `);
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});