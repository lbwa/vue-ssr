// 为了防止内存溢出，每次创建一个新的 App 渲染
// 将用于生成 服务器 bundle
import Vue from 'vue'
import VueRouter from 'vue-router'
// import vuex from 'vuex'

import App from './app.vue'
import createRouter from './config/router'
// import createStore from './store/store'

Vue.use(VueRouter)
// Vue.use(vuex)

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
