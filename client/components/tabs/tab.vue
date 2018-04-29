<script>
export default {
  name: 'Tab',

  props: {
    index: {
      type: [String, Number],
      required: true
    },

    label: {
      type: String,
      default: 'Tab'
    }
  },

  // inject: ['value'],

  computed: {
    active () {
      // 弊端：this.$parent 将父子组件紧紧耦合在一起了
      // 解决方案：provide / inject 选项
      return this.$parent.value === this.index
    }
  },

  methods: {
    handleClick () {
      this.$parent.updateIndex(this.index)
    }
  },

  mounted () {
    this.$parent.panes.push(this)
  },

  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }

    return (
      <li class={classNames} on-click={this.handleClick}>
        {tab}
      </li>
    )
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/utils.scss';

.tab {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  &.active {
    border-bottom: 2px solid red;
  }
  span {
    line-height: 40px;
  }
}
</style>
