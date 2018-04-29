<script>
export default {
  name: 'Tabs',

  props: {
    value: {
      type: [String, Number],
      required: true
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
