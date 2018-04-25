import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App'
import createRouter from '@/config/router'

Vue.use(VueRouter)

const router = createRouter()

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  render: h => h(App) // 渲染 App 组件，因是手动创建的环境，那么就是 runtime-only，那么就要使用 render 函数渲染组件
})
