// request online database
const sha1 = require('sha1')
// const md5 = require('md5')
const axios = require('axios')

// 线上数据库的命名空间
const className = 'todo'
// const className = 'todo_list'

// 一个 axios 实例
const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
  // baseURL: 'https://leancloud.cn/dashboard/apionline/sourcedist/'
})

// 自定义错误信息
const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

const handleRequest = ({ status, data, ...rest }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()

    // apiCloud
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }

    // leanCloud
    // return {
    //   'X-LC-Id': appId,
    //   'X-LC-Sign': `${md5(`${now}${appKey}`)}`
    // }
  }

  return {
    async getAllTodoList () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },

    async addTodo (todo) {
      return handleRequest(await request.post(
        `/${className}`,
        todo,
        { headers: getHeaders() }
      ))
    },

    async updateTodo (id, todo) {
      return handleRequest(await request.put(
        `/${className}/${id}`,
        todo,
        { headers: getHeaders() }
      ))
    },

    async deleteTodo (id, todo) {
      return handleRequest(await request.delete(
        `/${className}/${id}`,
        { headers: getHeaders() }
      ))
    },

    async deleteCompleted (ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })

      return handleRequest(await request.post(
        '/batch',
        { requests },
        { headers: getHeaders() }
      ))
    }
  }
}
