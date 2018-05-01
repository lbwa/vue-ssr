import axios from 'axios'
import { createError } from './util'

const request = axios.create({
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
