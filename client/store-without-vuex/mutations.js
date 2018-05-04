// 简单实现 vuex mutations, 用于修改 state
import state from './store'
import globalBus from '@/util/global-bus'

export default {
  fillTodoList (data) {
    // 此处不能用 赋值，而是直接使用合并对象，因为赋值就在 client 端由一个 todoList 容器，转变为了引用两个 todoList 容器
    Object.assign(state.todoList, data)
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

    // 因为 state.todoList 引用了新的对象，派发事件同步 this.todoList 对 state.todoList 的引用
    globalBus.$emit('deleteAllCompleted')
  },

  startLoading () {
    state.loading = true
    globalBus.$emit('toggleLoading', true)
  },

  endLoading () {
    state.loading = false
    globalBus.$emit('toggleLoading', false)
  }
}
