const webpack = require('webpack')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const config = require('../config')
const merge = require('webpack-merge') // 合并设置
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 将打包好的 js 插入 HTML
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const createLocalIdentName = process.env.NODE_ENV === 'development'
  ? '[path]-[name]-[hash:base64:5]'
  : '[hash:base64:5]'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [{
      test: /\.scss$/,
      include: [resolve('client')],
      use: [ // 顺序重要
        'style-loader', // 将样式表写入 HTML 中
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
        // 当前面开启 sourceMap，此处可省略开启
        // options: {
        //   sourceMap: true
        // }
      ]
    }]
  },

  // 有助于调试文件，sourceMap 会做代码映射，即编译打包后的代码和源代码相互映射
  devtool: config.dev.devtool, // 'cheap-module-eval-source-map'

  devServer: {
    host: config.dev.host,

    // 直接设置为 IP 在局域网的其他设备也能访问，设置为 localhost 则不行。访问方式为：访问本机局域网 IP + port。
    port: config.dev.port,

    headers: { 'Access-Control-Allow-Origin': '*' },

    // 设置是否展示 编译时的错误
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,

    // 只热加载（重渲染） 修改的模块
    hot: true,

    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: {
      index: '/public/index.html'
    },

    // 启动本地服务器时，自动打开浏览器
    open: config.dev.autoOpenBrowser
  },

  plugins: [

    /**
     * 1.在业务代码中是不存在 Node 环境中的环境变量 process.env.NODE_ENV 的，所以 DefinePlugin 的作用就是在编译时向业务代码中注入环境变量
     * 2. 环境变量在打包时时唯一确定的。
     */

    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')

    }),

    new HtmlWebpackPlugin({
      // https://github.com/jantimon/html-webpack-plugin
      filename: 'index.html', // 输出 HTML 的文件名
      template: path.join(__dirname, 'template.html'), // 模板文件
      inject: true
    }), // 自动向 index.html 中插入 bundle.js

    // 服务器需要服务器 bundle 然后用于服务器端渲染(SSR)，而客户端 bundle 会发送给浏览器，用于混合静态标记。
    // 此插件在输出目录中生成 vue-ssr-client-manifest.json，即客户端 bundle，或称客户端构建清单（clientManifest）
    new VueClientPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin()
  ]
})
