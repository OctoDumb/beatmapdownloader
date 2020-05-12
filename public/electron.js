const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { default: installExtension, REACT_DEVELOPER_TOOLS, } = require('electron-devtools-installer');

const isDev = require('electron-is-dev');

async function createWindow() {   
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

    if (isDev) await installExtension(REACT_DEVELOPER_TOOLS);

    mainWindow.loadURL(isDev ? 'http://localhost:4500' : url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', () => mainWindow = null);

    mainWindow.on('ready-to-show', () => mainWindow.show());
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});