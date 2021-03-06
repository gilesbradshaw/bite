// Gulpfile
var fs = require("fs");
// var _ = require("lodash");
var gulp = require("gulp");
var gutil = require("gulp-util");
var jsxcs = require("gulp-jsxcs");
var eslint = require("gulp-eslint");
var nodemon = require("gulp-nodemon");
var connect = require("gulp-connect");
var shell = require("gulp-shell");
var webpack = require("webpack");
var rimraf = require("gulp-rimraf");

var buildCfg = require("./webpack.config");
var buildDevCfg = require("./webpack.dev-config");

var mocha = require('gulp-mocha');
var karma = require('karma').server;
var nodeInspector = require('gulp-node-inspector');


// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------
var FRONTEND_FILES = [
  "client/**/*.{js,jsx}"
];

var BACKEND_FILES = [
  "scripts/**/*.js",
  "server/**/*.js",
  "test/**/*.js",
  "*.js"
];


// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------
// Strip comments from JsHint JSON files (naive).
var _jsonCfg = function (name) {
  var raw = fs.readFileSync(name).toString();
  return JSON.parse(raw.replace(/\/\/.*\n/g, ""));
};



// ----------------------------------------------------------------------------
// EsLint
// ----------------------------------------------------------------------------
gulp.task("eslint-frontend", function () {
  return gulp
    .src(FRONTEND_FILES)
    .pipe(eslint({
      envs: [
        "browser"
      ]
    }))
    .pipe(eslint.formatEach("stylish", process.stderr))
    .pipe(eslint.failOnError());
});

gulp.task("eslint-backend", function () {
  return gulp
    .src(BACKEND_FILES)
    .pipe(eslint({
      envs: [
        "node"
      ]
    }))
    .pipe(eslint.formatEach("stylish", process.stderr))
    .pipe(eslint.failOnError());
});

gulp.task("eslint", ["eslint-frontend", "eslint-backend"]);

// ----------------------------------------------------------------------------
// JsCs
// ----------------------------------------------------------------------------
gulp.task("jscs", function () {
  return gulp
    .src([].concat(
      FRONTEND_FILES,
      BACKEND_FILES
    ))
    .pipe(jsxcs(_jsonCfg(".jscsrc")));
});

// ----------------------------------------------------------------------------
// Quality
// ----------------------------------------------------------------------------
gulp.task("check",      ["jscs", "eslint"]);
gulp.task("check:ci",   ["jscs", "eslint"]);
gulp.task("check:all",  ["jscs", "eslint"]);

// ----------------------------------------------------------------------------
// Cleaning
// ----------------------------------------------------------------------------
gulp.task("clean:all", function () {
  return gulp
    .src([
        "app/css-dist",
        "app/js-dist"
      ], { read: false })
    .pipe(rimraf());
});

gulp.task("clean:dist", function () {
  return gulp
    .src([
        "app/css-dist",
        "app/js-dist"
      ], { read: false })
    .pipe(rimraf());
});

gulp.task("build:dev", function (done) {
  process.env.NODE_ENV='development';
  webpack(buildDevCfg).run(function (err, stats) {
    if (err) { throw new gutil.PluginError("webpack", err); }

    gutil.log("[webpack]", stats.toString({
      hash: true,
      colors: true,
      cached: false
    }));

    done();
  });
});

gulp.task("watch:dev", function () {
  gulp.watch([
    "client/**/*.{js,jsx,css}",
    "node_modules/react-router/**/*.{js,jsx}",

  ], ["build:dev"]);
});
gulp.task("watch", ["watch:dev"]);

// ----------------------------------------------------------------------------
// Production
// ----------------------------------------------------------------------------
gulp.task("build:prod", function (done) {
  process.env.NODE_ENV='production';
  webpack(buildCfg).run(function (err, stats) {
    if (err) { throw new gutil.PluginError("webpack", err); }

    gutil.log("[webpack]", stats.toString({
      hash: true,
      colors: true,
      cached: false
    }));

    done();
  });
});

gulp.task("build:prod-full", ["clean:dist"], function () {
  return gulp.run("build:prod");
});

gulp.task("watch:prod", function () {
  gulp.watch([
    "client/**/*.{js,jsx}"
  ], ["build:prod"]);
});

// ----------------------------------------------------------------------------
// Servers
// ----------------------------------------------------------------------------
// Dev. server
gulp.task("server", function () {
  nodemon({
    nodeArgs:['--debug'],
    script: "server/index.js",
    ext: "js,jsx",
    watch: [
      "server",
      "client",
    ]
  });
});

// Hot reload webpack server
gulp.task("webpack-server", shell.task(["node ./hot/server"]));

// Source maps server
gulp.task("server:sources", function () {
  connect.server({
    root: __dirname,
    port: 3001
  });
});

gulp.task('debug', function() {
 
  gulp.src([])
    .pipe(nodeInspector({
      debugPort: 5858,
      webHost: '0.0.0.0',
      webPort: 8080,
      saveLiveEdit: false,
      preload: true,
      inject: true,
      hidden: [],
      stackTraceLimit: 50,
      sslKey: '',
      sslCert: ''
    }));
});
gulp.task('test', function (done) {
    process.env.NODE_ENV='test';
    gulp.src('server/test.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());

        karma.start({
          configFile: __dirname+ '/karma.conf.js',
          singleRun: true
        }, done);


});

// ----------------------------------------------------------------------------
// Aggregations
// ----------------------------------------------------------------------------
gulp.task("ls",       ["build:ls", "watch:ls", "server:sources"]);
gulp.task("dev",      ["build:dev", "watch:dev", "server", "server:sources",'debug']);
gulp.task("hot",      ["webpack-server"]);
gulp.task("prod",     ["build:prod", "watch:prod", "server", "server:sources"]);
gulp.task("build",    ["build:prod-full"]);
gulp.task("default",  ["build:dev", "check"]);

