<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div
      class="notification"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span class="content">{{content}}</span>
      <a
        href="javascript: void(0)" class="close-btn" @click.prevent="handleClick"
      >{{btn}}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'notification',

  props: {
    content: {
      type: String,
      required: true
    },

    btn: {
      type: String,
      default: '关闭'
    }
  },

  computed: {
    style () {
      return {}
    }
  },

  methods: {
    handleClick (evt) {
      this.$emit('close')
    },

    afterLeave () {
      this.$emit('closed')
    },

    // fn-notification.js 中定义以下方法

    afterEnter () {},

    clearTimer () {},

    createTimer () {}
  },

  data () {
    return {
      visible: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/utils.scss';

.notification {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  min-width: 280px;
  background-color: #303030;
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  transition: all .3s;
  .content {
    padding: 0;
  }
  .close-btn {
    color: #ff4081;
    padding-left: 24px;
    margin-left: auto;
    cursor: pointer;
  }
}
// 后插入的 transition 组件的（节点）无法应用全局样式
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
</style>
