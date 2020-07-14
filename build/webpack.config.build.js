const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const CompressionPlugin = require('compression-webpack-plugin');//制作zip压缩包的插件


module.exports = {
  mode: "production",
  entry: {
    app: path.join(__dirname, '../src/index.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: "./",
    filename: "index.js",
    libraryTarget: "commonjs2"
    // libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /.js$/, loader: "babel-loader"
      },
      {
        test: /.svg$/,
        use: {
          loader: 'url-loader', options: {
            limit: 20000
          }
        }
      },
      {
        test: /.less$/, use: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      },
      {
        test: /.css$/, use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },
  externals: {
    moment: "moment"
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CompressionPlugin()

  ]
}