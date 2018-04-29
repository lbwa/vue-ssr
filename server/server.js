// 架起 ssr 服务器
// 只有 Nodejs 才能 ssr
const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const createDb = require('./db/db')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

/**
 * Koa API: http://koajs.com/
 * app.use(function)用于将给定的中间件方法添加到 app。以下调用涉及 Koa 级联（Cascading）
 * @param {Object} ctx - 每个请求都将创建一个 Context，并在中间件中作为接收器引用，或者 ctx 标识符
 * 此处 ctx 作为了渲染上下文使用，并贯穿整个渲染过程
 * @param {Function} next - 当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件
 */
app.use(async (ctx, next) => {
  try {
    console.log(`Request with path ${ctx.path}`)

    // 执行定义的下一个中间件 'app.use(pageRouter.routes())...'
    // 在下游没有更多的中间件执行时，resolved 并恢复函数执行
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'Please try again later.'
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

// 在生产环境中，访问静态资源的路由。它必须在 pageRouter 之前调用
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

const pageRouter = isDev
  ? require('./routers/dev-ssr')
  : require('./routers/ssr')

/**
 * 1. 在上游中间件调用 next() 之后执行，同时上游中间件的执行暂停
 * 2. 此处调用的是 koa-router 中间件
 * 3. routes() 返回路径匹配的路由中间件
 * 4. allowedMethods(options) 返回一个单独的中间件。它用于根据 options 设置来响应请
 * 求的 allow 头部（其中包含允许的请求方法），也用于响应 405 和 501
 * koa-router API：https://github.com/alexmingoia/koa-router#api-reference
 */
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

// 在所有中间件调用完成后执行
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8889

app.listen(PORT, HOST, () => {
  console.log(`Render server is listening on ${HOST}:${PORT}`)
})
