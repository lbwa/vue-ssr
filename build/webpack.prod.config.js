const webpack = require('webpack')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const config = require('../config')
const utils = require('./utils')
const merge = require('webpack-merge')  // 合并配置
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 将打包好的 js 插入 HTML
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析工具
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

/**
 * 1. extract-text-webpack-plugin 该插件用于将样式表从 打包 js （这里指 output 中
 * 的 bundle.js）中分离出来单独打包成一个 css 文件，之后在头部单独引入。
 *
 * 2. 2018.3.14 该插件暂只有通过  extract-text-webpack-plugin@next 安装4.0-beta.0
 * 版本以支持 webpack 4.0+。
 * 正常安装将报错：DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead。
 * 原因 https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

// extract-text-webpack-plugin 在 webpack 4 中的替代解决方案
// https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/763
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")


function useAnalyzerPlugin () {
  return config.build.bundleAnalyzerReport ? [new BundleAnalyzerPlugin()] : []
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: resolve('client/client-entry.js'),
    vendor: ['vue'] // 数组中的类库将单独打包成 vendor.xxx.js
  },

  output: {
    filename: '[name].[chunkHash:8].js'
  },

  module: {
    rules: [
      // 样式表在生产环境中从打包的 js 中抽离，单独从头部引入到 HTML
      {
        test: /\.scss$/,

        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'sass-loader'
          ]
        })
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader',
        //   'postcss-loader', // postcss 调用 autoprefixer 以添加兼容前缀
        //   'sass-loader'
        // ]
      }
    ]
  },

  plugins: [
    ...useAnalyzerPlugin(),

    new VueClientPlugin(),

    /**
     * 1.在业务代码中是不存在 Node 环境中的环境变量 process.env.NODE_ENV 的，所以 DefinePlugin 的作用就是在编译时向业务代码中注入环境变量
     * 2. 环境变量在打包时时唯一确定的。
     */

    new webpack.DefinePlugin({
      'process.env': env

    }),

    // contentHash 是根据内容生成 hash，8表示生成 8 位 hash 值
    // new MiniCssExtractPlugin({
    //   filename: 'styles.[contenthash:8].css',
    //   allChunks: true
    // }),

    new ExtractTextPlugin({
      filename: 'styles.[contenthash:8].css'
    }),

    new HtmlWebpackPlugin({
      // https://github.com/jantimon/html-webpack-plugin
      filename: 'index.html',
      template: path.join(__dirname, 'template.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),

    // 以下为 webpack 3 的配置，用于打包第三方类库和生成的 webpack 代码
    // webpack 4.0 已经移除 webpack.optimize.CommonsChunkPlugin，使用 config.optimization.splitChunks 代替

    new webpack.optimize.CommonsChunkPlugin({ // 此函数执行分离类库并打包
      name: 'vendor'
    }),
    // 此处 vendor 一定要先于 runtime 执行，否则失效
    new webpack.optimize.CommonsChunkPlugin({  // 打包生成的 webpack 代码
      name: 'runtime'
    })
  ],

  // webpack 4.0+ 配置 splitChunks 教程：
  // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693?utm_source=aotu_io&utm_medium=liteo2_web

  // optimization: {
  //   // runtime 指 webpack 中内置的一个处理不同模块依赖关系的 js 模板
  //   runtimeChunk: {
  //     // runtimeChunk 用于将 app 中生成的 webpack 代码打包。

  //     /** 使用背景：新模块加入 webpack 时，webpack 会给模块添加一个索引，若新模块加入至
  //      * 中间位置，将导致后面所有模块 id 发生变化，这样会导致新的 chunkHash 生成。这样
  //      * 就不能使浏览器常缓存。
  //      */

  //     // 将 app 生成的 webpack 代码单独打包就可规避这个问题
  //     name: 'runtime' // 可指定为任意没有在 entry 使用过的名称
  //   },
  //   splitChunks: { // 4.0+ 打包类库等第三方引用代码，单独存放
  //     cacheGroups: { // 设置缓存的 chunks
  //       commons: { // 所有被处理类库文件的共享代码
  //         chunks: 'initial', // 必须三选一， 'initial'|'all'|'async'(默认值)
  //         minSize: 0,
  //         minChunks: 1
  //       },
  //       vendor: { // key 为 entry 中定义的入口名称，这是 key 的私有配置
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor', // 要缓存分离出的 chunk 名称
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // }
})

/**
 * 1. 按照以上配置 build 文件后生成的样式表文件不包含引入到 .vue 中的样式，在本 app 中就只有 .jsx 引入的样式表分离出来了。
 * 2. 原因：不分离引入单文件组件的 css 是 vue-loader 的默认设定处理方式。因为在异步加载组件时，该组件的样式也是异步加载的。
 * 3. 仍可通过自定义配置，将单文件组件中的样式分离出来。
 */
