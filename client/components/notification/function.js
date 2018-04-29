import Vue from 'vue'
import Component from './fn-notification'

// const A = Vue.extend() 得到一个 Vue 构造器子类，new A() 得到 一个 Vue 实例
const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = instance => {
  if (!instance) return

  const len = instances.length

  const index = instances.findIndex(item => instance.id === item.id)

  instances.splice(index, 1)

  if (len <= 1) return

  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  // 后端没有操作 DOM 的环境
  if (Vue.prototype.$isServer) return

  const {
    autoClose,
    ...rest
  } = options

  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },

    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)

  // 时间结束后移除节点
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)

    // 只会删除 vm 并不会删除节点
    instance.vm.$destroy()
  })

  instance.vm.$on('close', () => {
    instance.vm.visible = false
    // 在动画完成后，立即派发 closed 事件
  })

  return instance.vm
}

export default notify
