import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import defaultState from './state/state'
// import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'

const debug = process.env.NODE_ENV === 'development'

// ssr 时，保证每次渲染去掉对之前的 store 引用，对应一个新的 store，以防止内存溢出。
export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    // getters,
    mutations,
    actions,
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })

  // 给 store 添加热模块加载功能
  if (module.hot) {
    module.hot.accept([
      './state/state',
      // './getters/getters',
      './mutations/mutations',
      './actions/actions'
    ], () => {
      // import 语句不能写在业务代码块中
      const newState = require('./state/state').default
      // const newGetters = require('./getters/getters').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        // getters: newGetters,
        mutations: newMutations,
        actions: newActions
      })
    })
  }
  return store
}
