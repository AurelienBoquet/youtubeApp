var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var videoWindow = null;
var wcVideo = null;
var _id = null;


// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

// Create the browser window.
  mainWindow = new BrowserWindow({
    center: true,
    height: 660,
    width: 880,
    "auto-hide-menu-bar": true
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/main/_main.html');

  // Open the DevTools.
  //mainWindow.openDevTools();

  var wcMain = mainWindow.webContents;

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  ipc.on('launchVideo', function(event, videoId) {

    if (videoWindow) {

      wcVideo.send('videoData', videoId);

    } else {

      videoWindow = new BrowserWindow({
        fullscreen: true,
        "auto-hide-menu-bar": true
      });

      videoWindow.loadUrl('file://' + __dirname + '/video/_video.html');

      // Open the DevTools.
      //videoWindow.openDevTools();//

      wcVideo = videoWindow.webContents;

      mainWindow.hide();

      wcVideo.on('did-finish-load', function() {
        wcVideo.send('userData', _id);
        wcVideo.send('videoData', videoId);
      });

    }

    videoWindow.on('closed', function() {
      videoWindow = null;
      wcVideo = null;
      if (!mainWindow.isVisible()) {
        mainWindow.show();
        wcMain.send('videoClosed');
      }
    });
  });

  ipc.on('logoutMobile', function(){
    if (videoWindow) {
      videoWindow.close();
    }

    _id = null;
    wcVideo = null;
    videoWindow = null;
  });

  ipc.on('logoutDesktop', function() {
    if (videoWindow) {
      videoWindow.close();
    }

    _id = null;
    wcVideo = null;
    videoWindow = null;
  });

  ipc.on('login', function(event, id) {
    _id = id;
  });
});