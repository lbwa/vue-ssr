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
    })
  })
}

export default {
  getTodoList () {
    return handleRequest(request.get('/api/todoList'))
  },

  addTodo () {
    return handleRequest(request.post('/api/todo'))
  },

  editTodo (id) {
    return handleRequest(request.put(`/api/${id}`))
  },

  deleteTodo (id) {
    return handleRequest(request.delete(`/api/${id}`))
  },

  deleteTodoList () {
    return handleRequest(request.post('/delete/completed'))
  }
}
