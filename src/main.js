const { app, BrowserWindow } = require('electron')

const { getData } =require("./get_data")

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('src/window/index.html')

  getData();
  
}


app.whenReady().then(createWindow)