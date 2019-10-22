"use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol, installVueDevtools } from "vue-cli-plugin-electron-builder/lib";
import { autoUpdater } from "electron-updater";
import log from "electron-log";

const isDevelopment = process.env.NODE_ENV !== "production";

// Log
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(["app"], { secure: true });
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    // fullscreen: true,
    webPreferences: {
      webSecurity: false
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.maximize();
  win.show();
  win.setMenu(null);

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send("message", text);
}

// autoUpdater.on("checking-for-update", () => {
//   sendStatusToWindow("Checking for update...");
// });
autoUpdater.on("update-available", () => {
  sendStatusToWindow("Update available.");
  win.webContents.send("download");
});
// Se comenta para que no actualize automáticamente en Windows.
// autoUpdater.on("update-not-available", () => {
//   sendStatusToWindow("Update not available.");
// });
// autoUpdater.on("error", err => {
//   sendStatusToWindow("Error in auto-updater. " + err);
// });
// autoUpdater.on("download-progress", progressObj => {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + " - Downloaded " + progressObj.percent + "%";
//   log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
//   sendStatusToWindow(log_message);
// });
// autoUpdater.on("update-downloaded", () => {
//   sendStatusToWindow("Update downloaded");
//   win.webContents.send("downloaded");
// });

// ipcMain.on("update", () => {
//   autoUpdater.quitAndInstall();
// });
