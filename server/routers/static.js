// 处理生产环境下请求静态资源的路径
const Router = require('koa-router')
const send = require('koa-send')

const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async (ctx) => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
