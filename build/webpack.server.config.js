/**
 * 服务器配置
 * 1. 用于生成传递给 createBundleRenderer 的服务器 bundle（'server/routers/dev-ssr'）
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
const VueServerPlugin = require('vue-server-renderer/server-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  // 指定打包后的代码运行环境，告知 vue-loader 输送面向服务器代码
  target: 'node',

  // 对于 bundle renderer 提供 source map 支持
  devtool: 'source-map',

  entry: resolve('client/server-entry.js'),

  output: {
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: resolve('server-build')
  },

  // 不要打包 dependencies，外置化应用程序依赖模块。可以使服务器构建速度更快，并生成较小的 bundle 文件。
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

  resolve: {
    alias: {
      'model': resolve('client/model/server-model.js')
    }
  },

  plugins: [
    // 传入字符串可指定生成文件名
    ...(process.env.NODE_ENV === 'development' ? [new VueServerPlugin()] : []),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),

    new ExtractTextPlugin('styles.[contentHash:8].css')
  ]
})
