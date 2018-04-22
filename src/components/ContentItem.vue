<template>
  <div :class="['content-item', item.completed ? 'completed' : '']">
    <span
     :class="['toggle', item.completed ? 'checked' : '']"
     @click="refreshThisCompleted()"
     >
    </span>
    <label>{{ item.content }}</label>
    <button class="destroy" @click="destroyItem"></button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    checkStatu: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    destroyItem () {
      // this.item.isDeleted = true
      this.$emit('refreshItems', this.item)
    },
    refreshThisCompleted () {
      this.$emit('refreshItemCompleted', this.item)
    }
  }
}
</script>

<style lang="scss">
@import '../common/style/utils.scss';

.content-item {
  position: relative;
  background-color: #ffffff;
  font-style: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  &:hover {
    .destroy:after {
      content: 'x'
    }
  }
  label {
    white-space: pre-line;
    text-align: left;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
    }
  &.completed {
    label {
      color: #d9d9d9;
      text-decoration: line-through;
    }
  }
  .toggle {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 2.5px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    outline: none;
    &:after {
      font-family: 'ionicons';
      font-size: 40px;
      padding-left: 4px;
      content: '\f401'
    }
    &.checked:after {
      font-family: 'ionicons';
      font-size: 40px;
      padding-left: 4px;
      content: '\f3fe'
    }
  }
  .destroy {
    position: absolute;
    top: 0;
    right: 10px;
    width: 40px;
    height: 50px;
    margin: auto 0;
    font-size: 30px;
    color: $color-negative;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    outline: none;
  }
}
</style>
