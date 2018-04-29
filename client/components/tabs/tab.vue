<script>
export default {
  name: 'tab',

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

  computed: {
    active () {
      return false
    }
  },

  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }

    return (
      <li class={classNames}>
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
  margin: 0 10px;
  cursor: pointer;
  &.active {
    border-bottom: 2px solid red;
  }
  span {
    line-height: 40px;
  }
}
</style>
