import * as types from '../mutations/mutation-types'
import model from 'model'

import { createError } from '@/common/js/util'
import notify from 'components/notification/function'

export default {
  getTodoList ({ commit }) {
    commit(types.START_LOADING)

    return model.getTodoList()
      .then(res => {
        commit(types.SET_TODO_LIST, res)
        commit(types.END_LOADING)
      })
      .catch(err => {
        createError(err)
        commit(types.END_LOADING)
      })
  },

  login ({ commit }, { username, password }) {
    commit(types.START_LOADING)

    // 为了在登录成功后，进行路由跳转，那么返回一个 promise 对象
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit(types.SET_USER_INFO)
          notify({
            content: '登录成功 !(^・ω・^ )'
          })
          commit(types.END_LOADING)
          resolve()
        })
        .catch(err => {
          createError(err)
          commit(types.END_LOADING)
        })
    })
  },

  addTodo ({ commit, state }, todo) {
    commit(types.START_LOADING)

    return model.addTodo(todo)
      .then(data => {
        const todoList = [...state.todoList]
        todoList.unshift(data)
        commit(types.SET_TODO_LIST, todoList)

        notify({
          content: '一个新的事件已被添加 !'
        })
        commit(types.END_LOADING)
      })
      .catch(err => {
        createError(err)
        commit(types.END_LOADING)
      })
  },

  editTodo ({ commit, state }, { id, todo }) {
    commit(types.START_LOADING)

    return model.editTodo(id, todo)
      .then(data => {
        const todoList = [...state.todoList]
        const index = todoList.findIndex(item => item.id === id)

        // 删除旧值，插入返回的新值
        todoList.splice(index, 1, data)
        commit(types.SET_TODO_LIST, todoList)

        commit(types.END_LOADING)
      })
      .catch(err => {
        createError(err)
        commit(types.END_LOADING)
      })
  },

  deleteTodo ({ commit, state }, id) {
    commit(types.START_LOADING)

    return model.deleteTodo(id)
      .then(() => {
        const todoList = [...state.todoList]
        const index = todoList.findIndex(item => item.id === id)

        // 删除旧值
        todoList.splice(index, 1)
        commit(types.SET_TODO_LIST, todoList)

        notify({
          content: '一个事件已被删除 !'
        })
        commit(types.END_LOADING)
      })
      .catch(err => {
        createError(err)
        commit(types.END_LOADING)
      })
  },

  deleteAllCompleted ({ commit, state }) {
    commit(types.START_LOADING)

    const todoList = [...state.todoList]
    const ids = todoList.filter(item => item.completed).map(item => item.id)

    return model.deleteAllCompleted(ids)
      .then(() => {
        const newTodoList = todoList.filter(item => !item.completed)
        commit(types.SET_TODO_LIST, newTodoList)

        notify({
          content: '已删除所有已完成事件 !╮(￣▽￣)╭'
        })
        commit(types.END_LOADING)
      })
      .catch(err => {
        createError(err)
        commit(types.END_LOADING)
      })
  }
}
