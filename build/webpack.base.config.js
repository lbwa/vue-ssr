const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, '../'), // 当配置文件不在根目录时，此处不可少，因为 webpack 默认从当前目录解析
  entry: resolve('src/index.js'),
  output: {
    // 在生产环境中使用 chunkHash
    // 在开发环境中不能使用 chunkHash ，反之 webpack-dev-server 会报错
    filename: 'bundle.[hash:8].js', 
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx',  '.json'], // 自动解析确定的拓展名
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      /** 样式表在不同环境中使用的配置不同，具体体现在：在生产环境中，根据实际，一般要
       * 将 css 文件分离出打包的 .js，然后在头部引入。这样可以最优配置 http 请求。而
       * 在开发环境中，则不需要分离出 css。
       */
      {
        test: /\.vue$/,
        include: [resolve('src')],
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        include: [resolve('src')],
        loader: 'babel-loader'
      },
      {
        test: /\.( gif|jpg|jpeg|png|svg )$/,
        use: [
          {  // url-loader 是基于 file-loader 的封装
            loader: 'url-loader',  // 将图转换成 base64 格式插入 js 中
            options: {
              limit: 1024,  // 最大文件大小
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,  // 处理（包括 webfont）字体
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:8].[ext]'
        }
      }
    ]
  },

  node: {
    fs: 'empty'
  }
}