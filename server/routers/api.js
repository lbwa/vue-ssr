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

apiRouter.get('/todo', async (ctx) => {
  const todoList = await ctx.db.getAllTodoList()
  ctx.body = successResponse(todoList)
})

module.exports = apiRouter
