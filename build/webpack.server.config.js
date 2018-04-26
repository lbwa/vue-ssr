const webpack = require('webpack')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const config = require('../config')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  // target: 'node' 重要，指定打包后的代码运行环境
  target: 'node',

  entry: resolve('client/server-entry.js'),

  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: resolve('server-build')
  },

  // 不要打包 dependencies
  externals: Object.keys(require('../package.json').dependencies),

  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config.js' // 以项目根目录为基准
              }
            }
          },
          'sass-loader',
        ]
      })
    }]
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      'model': resolve('client/model/server-model.js')
    }
  },

  plugins: [
    ...(process.env.NODE_ENV === 'development' ? [new VueServerPlugin()] : []),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),

    new ExtractTextPlugin('styles.[contentHash:8].css')
  ]
})
