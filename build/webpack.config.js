const path = require('path')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader')

const isDev = process.env.NODE_ENV === 'development'
const mode = isDev ? 'development' : 'production'
const target = 'web'
const devtool = 'eval-source-map'
const entry = './src/main.js'
const resolve = {  extensions: ['.js', '.json', '.css'] }
const proxy = {
  '/api': 'http://www.baidu.com'
}

const modules = {
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader?cacheDirectory=true'
  }, {
    test: /\.vue$/,
    loader: 'vue-loader'
  }, {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader'
    ]
  }]
}

const plugins = [
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: isDev ? '[name].css' : '[name].[hash].css',
    chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../index.html')
  })
]

const optimization = {
  splitChunks: {
    cacheGroups: {
      vue: {
        test: /[\\/]vue[\\/]/,
        chunks: 'initial',
        name: 'vue',
        enforce: true
      },
      vuex: {
        test: /[\\/]vuex[\\/]/,
        chunks: 'initial',
        name: 'vuex',
        enforce: true
      },
      vueRouter: {
        test: /[\\/]vue-router[\\/]/,
        chunks: 'initial',
        name: 'vue-router',
        enforce: true
      },
      main: {
        test: /[\\/]src[\\/]/,
        chunks: 'initial',
        name: 'main',
        enforce: true
      }
    }
  },
  runtimeChunk: {
    name: entrypoint => `runtimechunk~${entrypoint.name}`
  },
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
}

const config = {
  mode,
  entry,
  module: modules,
  target,
  resolve,
  plugins,
  optimization
}

if (isDev) {
  config.devtool = devtool
  config.devServer = {
    proxy,
    compress: true
  }
}
module.exports = config