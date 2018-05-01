// request api in vue components

import model from '@/model/client-model'
import { createError } from '@/common/js/util'
import mutations from '@/store/mutations'
import state from '@/store/store'
import notify from 'components/notification/function'

// 简单实现 vuex actions
export default {
  getTodoList () {
    mutations.startLoading()
    return model.getTodoList()
      .then(res => {
        mutations.fillTodoList(res)
        mutations.endLoading()
      })
      .catch(err => {
        createError(err)
        mutations.endLoading()
      })
  },

  login ({ username, password }) {
    // 为了在登录成功后，进行路由跳转，那么返回一个 promise 对象
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          mutations.fillUserInfo(data)

          notify({
            content: '登录成功'
          })

          resolve()
        })
        .catch(err => {
          createError(err)
          mutations.endLoading()

          reject(err)
        })
    })
  },

  addTodo (todo) {
    mutations.startLoading()
    return model.addTodo(todo)
      .then(data => {
        mutations.addTodo(data)

        mutations.endLoading()

        notify({
          content: '添加了一个新的 Todo'
        })
      })
      .catch(err => {
        createError(err)
        mutations.endLoading()
      })
  },

  editTodo (id, todo) {
    mutations.startLoading()
    return model.editTodo(id, todo)
      .then(data => {
        /**
         * @param id 待删除 todo
         * @param data 返回的新值 todo
         */
        mutations.editTodo(id, data)
        mutations.endLoading()
      })
      .catch(err => {
        createError(err)
        mutations.endLoading()
      })
  },

  deleteTodo (id) {
    mutations.startLoading()
    return model.deleteTodo(id)
      .then(() => {
        mutations.deleteTodo(id)
        mutations.endLoading()

        notify({
          content: '删除了一个 Todo'
        })
      })
      .catch(err => {
        createError(err)
        mutations.endLoading()
      })
  },

  deleteAllCompleted () {
    mutations.startLoading()
    const ids = state.todoList.filter(item => {
      return item.completed
    }).map(item => item.id)

    return model.deleteAllCompleted(ids)
      .then(() => {
        mutations.deleteAllCompleted()
        mutations.endLoading()

        notify({
          content: '已清除所有已完成的 Todo'
        })
      })
      .catch(err => {
        createError(err)
        mutations.endLoading()
      })
  }
}
