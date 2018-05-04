import * as types from './mutation-types'

export default {
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },

  [types.SET_TODO_LIST] (state, todoList) {
    state.todoList = todoList
  },

  [types.START_LOADING] (state, loading) {
    state.loading = true
  },

  [types.END_LOADING] (state, loading) {
    state.loading = false
  }
}
