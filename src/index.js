import Vue from 'vue'
import App from './App'
import router from './router/index'

new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App)  // 渲染 App 组件，因是手动创建的环境，那么就是 runtime-only，那么就要使用 render 函数渲染组件
})