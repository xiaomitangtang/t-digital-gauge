const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const CompressionPlugin = require('compression-webpack-plugin');//制作zip压缩包的插件
const jionP = (str) => path.join(__dirname, str)

module.exports = {
  mode: "production",
  entry: {
    index: jionP('../src/index.js'),
    knob: jionP('../src/control/knob/index.js'),
    swtich: jionP('../src/control/swtich/index.js'),
    digitalgauge: jionP('../src/digitalgauge/digitalgauge.js'),
  },
  output: {
    path: jionP('../dist'),
    publicPath: "./",
    filename: "[name].js",
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
    moment: "moment",
    dayjs: "dayjs"
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CompressionPlugin()

  ]
}