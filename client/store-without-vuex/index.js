// vue plugin navigator
import state from './store'
import actions from './actions'

export default {
  install (Vue) {
    const store = {
      state,
      actions
    }

    Vue.prototype.$globalStore = store
    Vue.$globalStore = store
  }
}
