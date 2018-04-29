// 拓展 notification 组件

import Notification from './notification'

export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },

  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },

    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },

    // 在 transition 组件的子组件的 v-show 在开始阶段就为 true 时，是不会触发 after-enter 事件的，所以默认子组件的 v-show 要设置为 false
    afterEnter () {
      // 得到元素在出现时的高度
      this.height = this.$el.offsetHeight
    }
  },

  beforeDestroy () {
    this.clearTimer()
  },

  mounted () {
    this.createTimer()
  },

  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  }
}
