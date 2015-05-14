// Patch require
require("node-jsx").install({ extension: ".jsx" });
// maybe es6??
require("babel/register")({
  sourceMap: "inline"
});
var path = require("path");
var express = require("express");
var compress = require("compression");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var init = require('../config/init')(),
  config = require('../config/config'),
  mongoose = require('mongoose'),
  chalk = require('chalk');
  //require('events').EventEmitter.defaultMaxListeners=1000;

// DB
var db = require("../db/db");


// Bootstrap db connection
var db1 = mongoose.connect(config.db, function(err) {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
  }
  else
  {
    console.log(chalk.green("Connected to mongodb"));
  }

});

process.setMaxListeners(0);
var app = require('../config/express')(db1);
require('../config/passport')();
var PORT = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server).of('/chat');
io.on('connection', function(){ /* … */ });

/*var wsserver = require('http').createServer();
var io = require('socket.io')(wsserver);
io.on('connection', function(socket){
  console.log("CONNECTED");
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
});
wsserver.listen(3010);
*/


// ----------------------------------------------------------------------------
// Setup, Static Routes
// ----------------------------------------------------------------------------
//app.use(compress());
//app.use(bodyParser());
//app.engine(".hbs", exphbs({ extname: ".hbs" }));
//app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

// ----------------------------------------------------------------------------
// Static Routes
// ----------------------------------------------------------------------------
app.use("/app/js-dist/*.map",  function (req, res) {
  res.send(404, "404"); // Prevent sourcemap serving.
});
app.use("/app/js-dist", express.static("app/js-dist"));
app.use("/app/css-dist", express.static("app/css-dist"));

// ----------------------------------------------------------------------------
// API
// ----------------------------------------------------------------------------
// TODO: Example wrapper.
// var _errOrData = function (res, dataOverride) {
//   return function (err, data) {
//     if (err) {
//       return res.status(500).json({ error: err.message || err.toString() });
//     }

//     res.json(dataOverride || data);
//   };
// };

// TODO: Old REST route using wrapper.
// app["delete"]("/api/notes/:id", function (req, res) {
//   db.run("delete from notes where id=?", req.params.id, _errOrData(res, {}));
// });

if(true)
{
// ----------------------------------------------------------------------------
// Dynamic Routes
// ----------------------------------------------------------------------------
app.get("/", function (req, res) {
  return res.render("index", {});
});

// ----------------------------------------------------------------------------
// Recipes crud
// ----------------------------------------------------------------------------


}


// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
  app.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) return next();

    // Log it
    console.error(err.stack);

    // Error page
    res.status(500).render('500', {
      error: err.stack
    });
  });

  // Assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not Found'
    });
  });


// ----------------------------------------------------------------------------
// Start
// ----------------------------------------------------------------------------
var start = function (opts, callback) {
  callback = callback || function () {};
  opts = opts || {};
  opts.port = opts.port || PORT;
  server.listen(opts.port, callback);
};

module.exports = {
  start: start
};

// Script. Use defaults (init dev. database).
if (require.main === module) {
  start();
}

setInterval(function()
  {
    io.emit('test','an event sent to all connected clients');
    
  }
  ,1000);
io.on('testResult', function(data,fn){
  console.log("got titititit");
  //fn('yah bollocks');
})