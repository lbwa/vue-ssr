import model from '@/model/client-model'
import { createError } from '@/common/js/util'

export default {
  getTodoList () {
    return model.getTodoList()
      .then(res => res.data)
      .catch(err => {
        createError(err)
      })
  }
}
