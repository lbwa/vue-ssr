import notify from 'components/notification/function'
import globalBus from '../../util/global-bus'

export const createError = (err) => {
  if (err.code === 401) {
    notify({
      content: '请登录'
    })

    // client-entry
    globalBus.$emit('toggleRoute')
  }
}
