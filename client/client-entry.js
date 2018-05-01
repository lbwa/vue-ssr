import createApp from './create-app'
import globalBus from './util/global-bus'

const { app, router } = createApp()

globalBus.$on('toggleRoute', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
