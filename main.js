const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const remote = require("@electron/remote/main"); // 引入

// 如果仅在渲染器进程中使用，则需要在主进程中调用 Store.initRenderer()，或者在主进程中创建一个新的 Store 实例（new Store()）
const Store = require("electron-store");
Store.initRenderer();

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    remote.initialize(); // 初始化
    remote.enable(mainWindow.webContents); // 允许窗口的 webContents 访问

    // 环境判断
    const urlLocation = isDev ? 'http://localhost:3000' : 'dummyUrl';
    mainWindow.loadURL(urlLocation);
    mainWindow.webContents.openDevTools(); // 打开调试工具
})