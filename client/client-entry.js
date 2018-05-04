import createApp from './create-app'
import globalBus from './util/global-bus'

const { app, router, store } = createApp()

// if (window.__INITIAL_STATE__) {
//   store.replaceState(window.__INITIAL_STATE__)
// }

if (window.__INITIAL_STATE__) {
  Object.assign(store.state, window.__INITIAL_STATE__)
}

globalBus.$on('authorize', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
