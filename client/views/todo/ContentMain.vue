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
      v-for="item of filteredItems"
      :key="item.id"
      @destroyItem="destroyItem"
      @refreshItemCompleted="refreshItemCompleted"
    />

    <MainHelper
      :selected="hasSelected"
      :remainder="remainder"
      @clearCompleted="clearCompleted"
    />
  </section>
</template>

<script>
import MainItem from './MainItem'
import MainHelper from './MainHelper'

import { mapState, mapActions } from 'vuex'

export default {
  metaInfo: {
    title: 'Bowen\'s Todo App'
  },

  data () {
    return {
      hasSelected: 'all', // 当前用户选择的项 all/active/completed
      stats: ['all', 'active', 'completed']
    }
  },

  // 用于客户端界面渲染，执行时机慢于 SSR 数据预获取，SSR 数据获取在 server-entry 中触发
  beforeMount () {
    if (this.todoList && this.todoList.length === 0) {
      this.getTodoList()
    }
  },

  // 用于在 SSR 开始渲染前，预取并解析数据
  // https://github.com/vuejs/vue-ssr-docs/blob/master/zh/data.md#带有逻辑配置的组件logic-collocation-with-components
  // https://ssr.vuejs.org/zh/data.html
  asyncData ({ route, store }) {
    return store.dispatch('getTodoList')
    // 此处执行时，还未建立 vue 实例，故无法使用 this 对象
  },

  components: {
    MainItem,
    MainHelper
  },

  computed: {
    ...mapState(['todoList']),

    remainder () {
      return this.todoList.filter(item => { // 只要 items 发生变化就会重新计算
        return !item.completed
      }).length
    },

    filteredItems () { // 选择 hasSelected 时，应是过滤显示，而不是修改源数据
      if (this.hasSelected === 'all') {
        return this.todoList
      }
      const completed = this.hasSelected === 'completed'
      return this.todoList.filter(item => completed === item.completed)
    }
  },

  methods: {
    ...mapActions([
      'getTodoList',
      'addTodo',
      'deleteTodo',
      'editTodo',
      'deleteAllCompleted'
    ]),

    handleChangeTab (index) {
      this.hasSelected = index
    },

    addTodoItem (evt) {
      if (!evt.target.value.trim()) {
        this.$notify({
          content: '请输入待办事项 (=・ω・=)'
        })

        return
      }

      this.addTodo({
        content: evt.target.value.trim(),
        completed: false
      })
      evt.target.value = ''
    },

    destroyItem (todo) {
      this.deleteTodo(todo.id)
    },

    refreshItemCompleted (todo) {
      this.editTodo({id: todo.id, todo: {...todo, completed: !todo.completed}})
    },

    clearCompleted () {
      this.deleteAllCompleted()
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
