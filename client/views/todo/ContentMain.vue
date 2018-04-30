<template>
  <section class="content-main">
    <div class="tabs-container">
      <tabs :value="hasSelected" @changeTab="handleChangeTab">
        <tab
          :label="tab"
          :index="tab"
          v-for="tab in stats"
          :key="tab"
        >
          <!-- 有内容的 tab 用法 -->
          <!-- <span>all content</span> -->
        </tab>
        <!-- <tab index="3">
          <span slot="completed"></span>
        </tab> -->
      </tabs>
    </div>

    <input
      type="text"
      class="add-item"
      autofocus
      placeholder="来写下你的计划吧 ！！"
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
      @clearCompleted="clearCompleted"
    />
  </section>
</template>

<script>
import MainItem from './MainItem'
import MainHelper from './MainHelper'

import model from '@/model/client-model'

// let id = 0 // 配置新建 item 的索引

export default {
  metaInfo: {
    title: 'Bowen\'s Todo App'
  },

  data () {
    return {
      items: [], // 所有条目的容器
      hasSelected: 'all', // 当前用户选择的项 all/active/completed
      completedText: 'Clear Completed',
      checkStatus: false,
      timer: 0,
      stats: ['all', 'active', 'completed']
    }
  },

  created () {
    model.getTodoList().then(res => console.log('res :', res))
    // model.getTodoList().then(res => {
    //   this.items = res.data
    // })
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
    handleChangeTab (index) {
      this.hasSelected = index
    },

    addTodoItem (e) {
      if (!e.target.value) {
        return
      }
      this.items.unshift({
        // id: id++,
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

  // 不可访问 this。
  // beforeRouteEnter: (to, from, next) => {
  //   // 因为当守卫执行前，组件实例还没被创建，所以在 beforeRouteEnter 中不能使用 this 访问 vue 实例
  //   next(vm => {
  //     // 在 next 回调中使用 vm 可访问 vue 实例。
  //     // 若配合路由中的 props: true 选项和动态路由匹配以及组件内 props: ['id']，可于此验证 vm.id，执行 ajax 等获取数据，并赋值给 vm 实例
  //     // props: ['id'] 的原因见文档 向路由组件传递 props（路由组件传参）
  //     console.log('%c Component before enter, loading data', 'color: dodgerblue')
  //   })
  // },

  // 可访问 this。该钩子在匹配动态片段时，且复用组件时被调用。
  // beforeRouteUpdate: (to, from, next) => {
  //   // 需全局路由配置 '/app/:dynamicId'和 props: true，组件内配置 props: ['dynamicId']
  //   if (this.dynamicId === '123') {
  //     getSomeData(this.dynamicId)
  //   }
  //   console.log('%c Component before update', 'color: dodgerblue')
  //   next()
  // },

  // 可访问 this。
  // beforeRouteLeave: (to, from, next) => {
  //   // 在用户离开当前页面时，可发出表单未保存提醒
  //   console.log('%c Component before leave', 'color: red')

  //   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')

  //   if (answer) {
  //     next()
  //   } else {
  //     next(false) // 传入 false 来取消路由跳转
  //   }
  // }
}
</script>

<style lang="scss" scoped>
 @import '~scss/utils.scss';

.content-main {
  margin: 0 auto;
  width: 600px;
  box-shadow: 0 0 5px $color-medium-well;
  .tabs-container {
    background-color: #ffffff;
    padding: 0 15px;
  }
  .add-item {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    line-height: 40px;
    border: 0;
    outline: none;
    padding: 6px 6px 6px 15px;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 -2px 1px 0 rgba(0, 0, 0, 0.03);
    box-sizing: border-box;
  }
};
</style>
