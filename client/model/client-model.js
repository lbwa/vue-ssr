import axios from 'axios'
import { createError } from './util'

/**
 * 1. 浏览器基于 baseURL 请求时，默认认为是同源请求，那么会在 baseURL 请求地址上加上
 * 协议、域名、端口，而服务器是没有同域限制的，那么在基于 baseURL 请求数据时，并没有补
 * 全请求地址的默认操作。
 * 2. 那么在服务端发起请求时，必须指明协议、域名、端口
 */
const request = axios.create({
  // 通过环境判断请求地址的弊端是，无法得到 cookie，即无法判断是否已经登录
  // baseURL: process.env.VUE_ENV === 'server' ? 'http://127.0.0.1:8889' : '/'
  baseURL: '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data

      if (!data) {
        return reject(createError(400, 'No matched data'))
      }

      if (!data.success) {
        return reject(createError(400, data.message))
      }

      resolve(data.data)
    }).catch(err => {
      const resp = err.response

      if (resp.status === 401) {
        reject(createError(401, '需要登录'))
      }
    })
  })
}

export default {
  getTodoList () {
    return handleRequest(request.get('/api/todoList'))
  },

  login (username, password) {
    return handleRequest(request.post('/user/login', { username, password }))
  },

  addTodo (todo) {
    return handleRequest(request.post('/api/todo', todo))
  },

  editTodo (id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },

  deleteTodo (id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },

  deleteAllCompleted (ids) {
    return handleRequest(request.post('/api/delete/completed', { ids }))
  }
}
