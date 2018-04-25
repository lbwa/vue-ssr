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
    component: ContentMain

    // 将会把匹配的动态片段当作 props 对象属性传递给匹配的组件
    // props: true // 另有对象和函数形式
  },
  {
    path: '/login',
    component: Login
  }
]
