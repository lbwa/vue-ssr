// 为了防止内存溢出，每次创建一个新的 App 渲染
// 将用于生成 服务器 bundle
import Vue from 'vue'
import VueRouter from 'vue-router'
// import vuex from 'vuex'
import Meta from 'vue-meta'

import App from '@/App'
import createRouter from './config/router'
// import createStore from './store/store'
import Notification from './components/notification'

import 'scss/global.scss'

Vue.use(VueRouter)
// Vue.use(vuex)
Vue.use(Meta)

// 将 Notification 组件注册为全局组件。可在任意组件内调用
Vue.use(Notification)

export default () => {
  const router = createRouter()
  // const store = createStore()

  const app = new Vue({
    router,
    // store,
    render: h => h(App)
  })

  return { app, router }
  // return { app, router, store }
}
