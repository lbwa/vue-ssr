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
      autoClose: 3000
    }
  }
}
