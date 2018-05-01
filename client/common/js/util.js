import notify from 'components/notification/function'
import globalBus from '../../util/global-bus'

export const createError = (err) => {
  if (err.code === 401) {
    notify({
      content: '请登录后再进行操作 ！'
    })

    // client-entry $on
    globalBus.$emit('authorize')
  }
}
