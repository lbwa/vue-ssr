// routes 映射关系
import ContentMain from 'todo/ContentMain'
import Login from '@/views/login/Login'

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/app',
    component: ContentMain,

    // 路由独享守卫
    beforeEnter (to, from, next) {
      console.log('%c App route before enter', 'color: dodgerblue')
      next()
    },

    // 将会把匹配的动态片段当作 props 对象属性传递给匹配的组件
    props: true // 另有对象和函数形式

    // 命名视图
    // components: {
    //   default: ContentMain, // route-view 没有定义 name
    //   menu: menu // route-view 定义 name = "menu"
    // }
  },
  {
    path: '/login',
    component: Login
  }
]
