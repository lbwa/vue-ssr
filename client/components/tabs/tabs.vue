<script>
export default {
  name: 'Tabs',

  // https://cn.vuejs.org/v2/api/#provide-inject
  // 1. 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件
  // 层次有多深，并在起上下游关系成立的时间里始终生效。
  // 2. provide / inject(于 tab.vue 中) 不是响应式的，但是解耦了 父子组件
  // 3. 可使用 Object.defineProperty() 来实现响应式
  // provide () {
  //   return {
  //     value: this.value
  //   }
  // },

  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },

  methods: {
    updateIndex (index) {
      // 基于 props 与 基础展示组件 的定位，不能在 tabs 组件内修改 value 值
      this.$emit('changeTab', index)
    }
  },

  render () {
    return (
      <div class="tabs">
        <ul class="tabs-header">
          {this.$slots.default}
        </ul>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/utils.scss';

.tabs {
  box-sizing: border-box;
  .tabs-header {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    text-align: left;
  }
}
</style>
