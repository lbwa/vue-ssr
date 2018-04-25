// router 设置
import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/', // 路由基路径

    // 路由激活时链接的 class，如 '/link/...' 匹配时，将有多个连接（如 '/link/1' 和 '/link/2'）激活 linkActiveClass
    // linkActiveClass: 'active-link',

    // 路由路径完全匹配时链接的 class
    // linkExactActiveClass: 'exact-active-link',

    // 路由跳转后是否需要滚动到目标位置
    scrollBehavior (to, from, savedPosition) {
    // 在浏览过的路由路径中会将路由信息对象保存至 savedPosition
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }

    // 定制 url 中 query 的解析函数，覆盖默认解析函数
    // parseQuery (query) {},

    // 定义反解析函数，覆盖默认行为
    // stringifyQuery (obj) {},

    // 当浏览器不支持前端路由（history.pushState 控制路由）跳转时，是否应该回退到 hash 模式。
    // history.pushState 控制路由的表现形式即为 url 发生变化，但页面仍是原页面
    // fallback: true // 默认值，值为 false 时，即为多页面应用
  })
}

// 下面写法的弊端：全局都是同一个 router，在 ssr 时生成新的 SPA 后 ，但此时路由未改变。仍是原路由，其中原路由的原 SPA 仍一直在被缓存，那么就可能造成内存溢出

// const router = new Router({
//   routes
// })
// export default router
