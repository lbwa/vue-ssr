// 将用于 ssr 渲染得到 服务器 bundle，并在之后与 clientManifest 结合得到 renderer
// 作为 webpack.server.config.js 的打包入口文件入口
import createApp from './create-app'
import state from '@/store/store'

// server-render 中 context 对象被赋予 url
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // 服务端渲染区分路由的方法，它根据用户访问的 url 来触发 vue-router 跳转
    router.push(context.url)

    /**
     * router.onReady(callback[, errorCallback])
     * @param {Function} callback
     * @param {Function} errorCallback - optional
     * 1. 该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步
     * 进入钩子和路由初始化相关联的异步组件。这可以有效确保服务端渲染时服务端和客户端输
     * 出的一致。
     */
    router.onReady(() => {
      /**
       * router.getMatchedComponents(location?)
       * 1. 返回目标位置或是当前路由匹配的组件数组（是数组的定义/构造类，不是实例）。
       * 2. 通常在服务端渲染的数据预加载时时候。
       */
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('No component matched'))
      }

      // SSR 服务端数据预取
      // https://github.com/vuejs/vue-ssr-docs/blob/master/zh/data.md#服务器端数据预取server-data-fetching
      // https://ssr.vuejs.org/zh/data.html
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            // 当前路由对应的路由信息对象
            route: router.currentRoute,
            store: { state }
          })
        }
      }))
        .then(data => {
          // https://github.com/declandewet/vue-meta#step-21-exposing-meta-to-bundlerenderer
          // 将 vue-meta 在 vue 实例上的 $meta 方法返回值赋值给 context 对象（该对象将作为渲染根据）
          context.meta = app.$meta()

          context.state = state
          resolve(app)
        })
        .catch(err => {
          console.error(err)
        })
    })
  })
}
