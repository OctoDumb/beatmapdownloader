const { app, BrowserWindow, ipcMain: ipc } = require('electron');
const path = require('path');

const startURL = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadURL(startURL);

    mainWindow.on('ready-to-show', () => mainWindow.show());
}

ipc.on("pls", (e) => {
    e.returnValue = startURL;
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});