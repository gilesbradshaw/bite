// Webpack configuration
var path = require("path");
var webpack = require("webpack");

module.exports = {
  cache: true,
  context: path.join(__dirname, "client"),
  entry: {
    app:"./app.js",
    css:"../Styles/main.css"
  },

  output: {
    path: path.join(__dirname, "app/js-dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "babel-loader?optional[]=runtime&stage=0" },
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?optional[]=runtime&stage=0' },
      { test: /\.js?$/, include:  path.resolve(__dirname, "node_modules/react-router"), loader: 'babel-loader?optional[]=runtime&stage=0' },
      { test: /\.js?$/, include:  path.resolve(__dirname, "node_modules/react-flexgrid"), loader: 'babel-loader?optional[]=runtime&stage=0' },
      { test: /\.js?$/, include:  path.resolve(__dirname, "node_modules/radium"), loader: 'babel-loader?optional[]=runtime&stage=0' },
      { test: /\.js?$/, include:  path.resolve(__dirname, "node_modules/rc-menu"), loader: 'babel-loader?optional[]=runtime&stage=0' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.svg$/, loader: "svg-loader" }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx", "css", ".json"]
  },
  plugins: [
    // Optimize
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        // Signal production mode for React JS libs.
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // Manually do source maps to use alternate host.
    new webpack.SourceMapDevToolPlugin(
      "bundle.js.map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/app/js-dist/[url]")
  ]
};
