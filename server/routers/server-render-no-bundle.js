// ejs 渲染 renderer，template，bundle，style，scripts 等需要注入的内容

const ejs = require('ejs')

module.exports = async (ctx, renderer, template, bundle) => {
  ctx.headers['ContentType'] = 'text/html'
  const context = { url: ctx.path, userInfo: ctx.session.user }

  try {
    // const appString = await renderer.renderToString(context)
    const app = await bundle(context)

    // 重定向必须是在 app 与 appString 之间
    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const appString = await renderer.renderToString(app, context)

    const { title } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      initialState: context.renderState()
    })

    ctx.body = html
  } catch (err) {
    console.log('Render error', err)
  }
}
