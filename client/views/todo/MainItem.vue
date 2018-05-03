<template>
  <div class="content-item">
    <span class="toggle" @click="refreshThisCompleted">
      <i :class="[item.completed ? 'icon-ok' : 'icon-ok-outline']"></i>
    </span>
    <div :class="['item-content', item.completed ? 'completed' : '']">
      <span class="content-text">{{ item.content }}</span>
    </div>
    <button class="destroy" @click="destroyItem">
      <i class="icon-cancel-1"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    destroyItem () {
      this.$emit('destroyItem', this.item)
    },
    refreshThisCompleted () {
      this.$emit('refreshItemCompleted', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
 @import '~scss/utils.scss';

.content-item {
  position: relative;
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  font-size: 0;
  &:hover {
    .icon-cancel-1 {
      font-size: 20px;
    }
  }
  .item-content {
    flex: 1;
    display: flex;
    text-align: left;
    height: 50px;
    align-items: center;
    &.completed {
      color: #d9d9d9;
      text-decoration: line-through;
    }
    .content-text {
      display: inline-block;
      font-size: 20px;
    }
  }
  .toggle {
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
    margin: auto 15px;
    border: 1px solid;
    border-radius: 50%;
    color: #666;
    .icon-ok-outline, .icon-ok {
      display: inline-block;
      font-size: 16px;
      line-height: 30px;
    }
  }
  .destroy {
    flex: 0 0 40px;
    width: 40px;
    margin-right: 5px;
    padding: 0;
    font-size: 30px;
    color: $color-negative;
    background-color: transparent;
    border: 0;
    font-size: 0;
    outline: none;
    cursor: pointer;
  }
  .icon-cancel-1 {
    display: inline-block;
    width: 40px;
    height: 50px;
    line-height: 50px;
  }
}
</style>
