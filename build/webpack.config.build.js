const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const CompressionPlugin = require('compression-webpack-plugin');//制作zip压缩包的插件


module.exports = {
  mode: "production",
  entry: path.join(__dirname, '../src/digitalGauge.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: "digitalGauge.js",
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  module: {
    rules: [
      { test: /.js$/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CompressionPlugin()

  ]
}