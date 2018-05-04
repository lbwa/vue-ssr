// routes 映射关系
// import ContentMain from 'todo/ContentMain'
// import Login from '@/views/login/Login'

/**
 * 路由懒加载(异步组件)
 * 1. 为识别 import() 语法，需安装 babel-plugin-syntax-dynamic-import
 * 2. 并在 .babelrc 配置使用插件 syntax-dynamic-import
 * 注：仅在开发环境时，在使用 createBundle 进行 SSR 渲染时，若使用 memory-fs 则不能
 * 使用异步加载组件，因为 memory-fs 无法在内存中找到 组件
 */

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/app',
    component: () => import(/* webpackChunkName: "todo-view" */ 'todo/ContentMain'),

    // 路由独享守卫
    beforeEnter (to, from, next) {
      console.log('%c App route before enter', 'color: dodgerblue')
      next()
    }

    // 将会把匹配的动态片段当作 props 对象属性传递给匹配的组件
    // props: true // 另有对象和函数形式

    // 命名视图
    // components: {
    //   default: ContentMain, // route-view 没有定义 name
    //   menu: menu // route-view 定义 name = "menu"
    // }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login-view" */ '@/views/login/Login')
    // component: Login
  }
]
