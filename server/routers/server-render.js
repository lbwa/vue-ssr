// ejs 渲染 renderer，template，style，scripts，最后生成结果 HTML

const ejs = require('ejs')

/**
 * @param {*} ctx       - 渲染上下文
 * @param {*} renderer  - 由客户端和服务器 bundle 构成(见 'dev-ssr' 中 renderer)
 * @param {*} template  - HTML 包裹器（因为之前生成的 HTML 只包含 body 内的内容）
 */
module.exports = async (ctx, renderer, template) => {
  // 向 ctx 对象添加请求要返回的信息，即设置 HTML 头部 ContentType 属性
  ctx.headers['ContentType'] = 'text/html'

  // koa context 封装了 node 的 request 和 response 对象
  // 特别地，ctx.req 表示 Node 的 request，ctx.request 表示 koa request
  // ctx.path 是 ctx.request.path 的别名，表示请求路径

  // ctx.session.user 于 输入用户名 密码时写入。位于 /server/routers/user.js
  const context = { url: ctx.path, userInfo: ctx.session.user }

  try {
    // 将 vue 实例（renderer，由服务器 bundle 和 clientManifest 构成）渲染为字符串
    // 向 context 对象添加 context.renderStyles() 等方法
    const appString = await renderer.renderToString(context)
    // 在执行完 appString 后将产生 context.renderState() 方法

    /**
     * 在服务端重定向未登录时的页面
     * 1. 在此处重定向的优势在于，用户不会看到重定向的过程
     * 2. 此处弊端：因为 renderer 是 bundle renderer(dev-ssr 中)，那么之前需要被重
     * 定向的页面也要 SSR，并且要在 bundle 渲染为 json 之后才能重定向，这样给服务端造
     * 成了一个性能浪费
     */
    if (context.router.currentRoute.fullPath !== ctx.path) {
      // 重定向并重新渲染新的 SSR 页面
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const { title } = context.meta.inject()

    /**
     * ejs.render(str, data, options) 返回一个 Rendered HTML string
     * ejs API:https://github.com/mde/ejs
     * @param template  - 为整个页面提供一个模板容器，以包含 vue 实例渲染出的内容
     * @param {Object}  - 需要在渲染模板中插入的 HTML 内容
     * @return {String} - 返回渲染后的 HTML string
     */
    const html = ejs.render(template, {
      // 被渲染为字符串的 vue 实例
      appString,

      /**
       * 1. context.renderStyles() 将返回内联 style 标签包含的所有关键 CSS，其中关
       * 键 CSS 是在要用到 .vue 组件的渲染过程中收集的
       */
      style: context.renderStyles(),

      /**
       * 1. context.renderScripts() 返回引导客户端应用所需的 <script> 标签
       * 2. 需要 clientManifest，即客户端 bundle
       */
      scripts: context.renderScripts(),

      title: title.text(),

      initialState: context.renderState()
    })

    // 替换渲染上下文的 body 部分，原本为 dev-ssr 中的 '加载中...' 字样
    ctx.body = html
  } catch (err) {
    console.log('Render error', err)
  }
}
