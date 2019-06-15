const {app, BrowserWindow} = require('electron');
const printer = require('electron-print');
const fs = require('fs');
const path = require('path');

var nodeConsole = require('console');
var console = new nodeConsole.Console(process.stdout, process.stderr);

function print(text) {

  let win = new BrowserWindow({show : false});
  fs.writeFile(path.join(__dirname, 'print.txt'), text);
  win.loadURL('file://' + __dirname + '/print.txt');

  win.webContents.on('did-finish-load', () => {
    win.webContents.print({
      silent : true,
      deviceName : 'Samsung-ML-1210',
    });
    setTimeout(function () {
      win.close();
    }, 1000);
  });
}

// app.on('ready', function() {
// });
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width : 800, height : 600,
    webPreferences : {
      nodeIntegration : true
    }
  });

  // and load the index.html of the app.
  win.loadFile('index.html');
  win.webContents.openDevTools();
  console.log(win.webContents.getPrinters());
}

app.on('ready', createWindow);