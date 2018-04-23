const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    extractCSS: isProduction, // vue 中的 css 是否单独打包

    // 用于模拟 scoped 效果，可加密 class
    // cssModules: {
    //   localIdentName: '[path]-[name]-[hash:base64:5]',
    //   camelCase: true
    // }

    // 默认为 true ，去除模板 HTML 中标签之间的空格
    // preserveWhitespace: true

    // 根据环境变量生成
    // hotReload: true
}