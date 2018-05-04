const config = require('../../app.config')
const createDb = require('../../server/db/db')

const db = createDb(config.db.appId, config.db.appKey)

export default {
  getTodoList () {
    return db.getAllTodoList()
  }
}
