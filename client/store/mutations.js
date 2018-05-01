// 简单实现 vuex mutations
import state from './store'

export default {
  fillTodoList (data) {
    state.todoList = data
  },

  fillUserInfo (userInfo) {
    state.userInfo = userInfo
  },

  addTodo (todo) {
    state.todoList.unshift(todo)
  },

  /**
   * @param id 待删除 todo
   * @param data 返回的新值 todo
   */
  editTodo (id, todo) {
    const index = state.todoList.findIndex(item => item.id === id)
    state.todoList.splice(index, 1, todo)
  },

  deleteTodo (id) {
    const index = state.todoList.findIndex(item => item.id === id)
    state.todoList.splice(index, 1)
  },

  deleteAllCompleted () {
    state.todoList = state.todoList.filter(item => {
      return !item.completed
    })
  },

  startLoading () {
    state.loading = true
  },

  endLoading () {
    state.loading = false
  }
}
