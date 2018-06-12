const electron = require('electron')
const express_app = require('express')()
const http = require('http').Server(express_app)
const io = require('socket.io')(http)
const BuzzController = require('./BuzzController')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000")

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// Connect Buzz Controllers
const connect = socket => socket.emit('buzz_connection', BuzzController.connect())

let data_ondata, data_onerror

// Socket io
io.on('connection', socket => {
  if (data_ondata === undefined) {
     data_ondata = (data) => {
       data = BuzzController.identify(data)
       if (data !== undefined) socket.emit('buzz_click', data)
     }

     data_onerror = (error) => {
       console.log('BuzzController error: ' + error)
     }
  }

  connect(socket)
  if (BuzzController.connected && !BuzzController.ondata)
    BuzzController.data(data_ondata, data_onerror)

  socket.on('reconnect_buzz', (ev) => {
    connect(socket)
    if (BuzzController.connected && !BuzzController.ondata)
      BuzzController.data(data_ondata, data_onerror)
  })
})

http.listen(3001, () => console.log('listening port 3001'))