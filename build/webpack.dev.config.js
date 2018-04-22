const webpack = require('webpack')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const merge = require('webpack-merge') // 合并设置
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 将打包好的 js 插入 HTML


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [{
      test: /\.scss$/,
      include: [resolve('src')],
      use: [ // 顺序重要
        'style-loader', // 将样式表写入 HTML 中
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
        // 当前面开启 sourceMap，此处可省略开启
        // options: {
        //   sourceMap: true
        // }
      ]
    }]
  },

  devtool: '#cheap-module-eval-source-map', // 有助于调试文件，sourceMap 会做代码映射，即编译打包后的代码和源代码相互映射

  devServer: {
    port: '8080', // 直接设置为 IP 在局域网的其他设备也能访问，设置为 localhost 则不行。访问方式为：访问本机局域网 IP + port。
    host: '0.0.0.0',
    overlay: { // 设置是否展示 编译时的错误
      error: true,
    },
    hot: true // 只热加载（重渲染） 修改的模块
    // open: true  启动本地服务器时，自动打开浏览器
  },

  plugins: [

    /**
     * 1.在业务代码中是不存在 Node 环境中的环境变量 process.env.NODE_ENV 的，所以 DefinePlugin 的作用就是在编译时向业务代码中注入环境变量
     * 2. 环境变量在打包时时唯一确定的。
     */

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')

    }),

    new HtmlWebpackPlugin({
      // https://github.com/jantimon/html-webpack-plugin
      filename: 'index.html', // 输出 HTML 的文件名
      template: 'index.html', // 模板文件
      inject: true
    }), // 自动向 index.html 中插入 bundle.js
    
    new webpack.HotModuleReplacementPlugin(),
    
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
