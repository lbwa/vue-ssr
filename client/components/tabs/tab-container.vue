<!-- 用于解决 tab 中 tab-content 在绑定输入框时（即当一个插槽绑定输入框时）会慢一拍显示。原因是，插槽中的内容不是 响应式 的，是不能通过常规的 watch 手段来监听插槽内容的变化。解决的方案就是，通过 props 属性来使得 插槽内容 达到响应式的效果。 -->

<script>
export default {
  props: {
    panes: {
      type: Array,
      required: true
    }
  },

  render () {
    const contents = this.panes.map(pane => {
      return pane.active ? pane.$slots.default : null
    })

    return (
      <div class="tab-content">
        {contents}
      </div>
    )
  }
}
</script>
