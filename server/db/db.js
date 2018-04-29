const sha1 = require('sha1')
const axios = require('axios')

// 线上数据库的命名空间
const className = 'todo'

// 一个 axios 实例
const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
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

    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }

  return {
    async getAllTodoList () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    }
  }
}
