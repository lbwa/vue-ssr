// postcss 是 css 的后处理器，通过 postcss 中的插件优化产生的 css
const auto = require('autoprefixer')

module.exports = {
  plugins: {
    // 必须指定 browsers 的版本否则报错 (Emitted value instead of an instance of Error) autoprefixer undefined
    'autoprefixer': { browsers: 'last 5 version'} // 自动添加浏览器兼容前缀
  }
}