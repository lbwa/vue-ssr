const Router = require('koa-router')

// 给路径自动添加前缀
const apiRouter = new Router({ prefix: '/api' })

// 封装数据，以利于前端判断
const successResponse = data => {
  return {
    success: true,
    data
  }
}

// 登录验证
const validateUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'Oops ! You need to login'
  } else {
    await next()
  }
}

apiRouter.use(validateUser)

apiRouter
  .get('/todoList', async (ctx) => {
    const todoList = await ctx.db.getAllTodoList()
    ctx.body = successResponse(todoList)
  })
  .post('/todo', async (ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })
  .put('/todo/:id', async (ctx) => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(data)
  })
  .delete('/todo/:id', async (ctx) => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResponse(data)
  })
  .post('/delete/completed', async (ctx) => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResponse(data)
  })

module.exports = apiRouter
