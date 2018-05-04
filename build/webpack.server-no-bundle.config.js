/**
 * SSR 服务器配置
 * 1. 用于生成传递给 createRenderer 的服务器 bundle（'server/routers/dev-ssr-no-bundle'）
 * 2. 服务器需要服务器 bundle 然后用于服务器端渲染(SSR)。客户端 bundle 会发送给浏览
 * 器，用于混合静态标记。
 * https://ssr.vuejs.org/zh/build-config.html
 */

const webpack = require('webpack')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const config = require('../config')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const VueServerPlugin = require('vue-server-renderer/server-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  target: 'node',
  devtool: 'source-map',
  entry: resolve('client/server-entry.js'),

  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: resolve('server-build')
  },

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
                path: './postcss.config.js'
              }
            }
          },
          'sass-loader',
        ]
      })
    }]
  },

  resolve: {
    alias: {
      'model': resolve('client/model/server-model.js')
    }
  },

  plugins: [
    // new VueServerPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),

    new ExtractTextPlugin('styles.[contentHash:8].css')
  ]
})
