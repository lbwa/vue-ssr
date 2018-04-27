// 将用于 ssr 渲染得到 服务器 bundle，并在之后与 clientManifest 结合得到 renderer
// 作为 webpack.server.config.js 的入口
import createApp from './create-app'

// server-render 中 context 对象被赋予 url
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // 触发 vue-router 跳转
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents) {
        return reject(new Error('No component matched'))
      }

      resolve(app)
    })
  })
}
