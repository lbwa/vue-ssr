<template>
  <div class="content-main">
    <input
      type="text"
      class="add-item"
      autofocus
      placeholder="What's next to do ?"
      @keyup.enter="addTodoItem"
    />
    <MainItem
      :item="item"
      :checkStatus="checkStatus"
      v-for="item of filteredItems"
      :key="item.id"
      @refreshItems="refreshItems"
      @refreshItemCompleted="refreshItemCompleted"
    />
    <MainHelper
      :selected="hasSelected"
      :remainder="remainder"
      :showCompletedText="completedText"
      @userSelect="refreshSelect"
      @clearCompleted="clearCompleted"
    />
  </div>
</template>

<script>
import MainItem from './MainItem'
import MainHelper from './MainHelper'

let id = 0 // 配置新建 item 的索引

export default {
  data () {
    return {
      items: [], // 所有条目的容器
      hasSelected: 'all', // 当前用户选择的项 all/active/completed
      completedText: 'Clear Completed',
      checkStatus: false,
      timer: 0
    }
  },

  components: {
    MainItem,
    MainHelper
  },

  computed: {
    remainder () {
      return this.items.filter(item => { // 只要 items 发生变化就会重新计算
        return !item.completed
      }).length
    },

    filteredItems () { // 选择 hasSelected 时，应是过滤显示，而不是修改源数据
      if (this.hasSelected === 'all') {
        return this.items
      }
      const completed = this.hasSelected === 'completed'
      return this.items.filter(item => completed === item.completed)
    }
  },

  methods: {
    addTodoItem (e) {
      if (!e.target.value) {
        return
      }
      this.items.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false,
        isDeleted: false
      })
      e.target.value = ''
    },

    refreshItems (todo) {
      todo.isDeleted = true
      this.items = this.items.filter(item => {
        return !item.isDeleted
      })
    },

    refreshSelect (statu) {
      this.hasSelected = statu
    },

    refreshItemCompleted (item) {
      item.completed = !item.completed
    },

    clearCompleted () {
      this.items = this.items.filter(item => {
        return !item.completed
      })
      this.completedText = 'Done !'
      if (!this.timer) { clearTimeout(this.timer) }
      this.timer = setTimeout(() => {
        this.completedText = 'Clear Completed'
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
 @import '~scss/utils.scss';

.content-main {
  margin: 0 auto;
  width: 600px;
  box-shadow: 0 0 5px $color-medium-well;
  .add-item {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
  }
};
</style>
