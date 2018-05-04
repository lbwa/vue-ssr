import notify from 'components/notification/function'
import globalBus from '../../util/global-bus'

export const createError = (err) => {
  if (err.code === 401) {
    notify({
      content: '请登录后再进行操作 ！'
    })
  } else if (err.code === 400) {
    notify({
      content: err.type
    })
  }

  // client-entry $on
  globalBus.$emit('authorize')
}
