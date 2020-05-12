const { app, BrowserWindow, ipcMain: ipc } = require('electron');
const path = require('path');
const url = require('url');

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
        frame: false,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
            additionalArguments: [
                "--allow-file-access-from-files",
                "--disable-web-security",
                "--disable-features=CrossSiteDocumentBlockingIfIsolating"
            ]
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