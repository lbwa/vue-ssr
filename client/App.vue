<template>
  <div id="app">
    <div class="cover"></div><!-- 在 body 有背景图时，可调节背景图明暗的-->

    <LayoutHeader/>

    <transition name="fade">
      <router-view/>
    </transition>
    <!-- <button @click="testNotify">click me</button> -->
    <!-- <notification content="Test notification"/> -->
    <LayoutFooter/>
  </div>
</template>

<script>
import LayoutHeader from '@/layout/LayoutHeader'
import LayoutFooter from '@/layout/LayoutFooter'

export default {
  name: 'App',

  mounted () {
    this.$notify({
      content: 'text $notify',
      btn: 'close'
    })
  },

  // methods: {
  //   testNotify () {
  //     this.$notify({
  //       content: 'text $notify',
  //       btn: 'close'
  //     })
  //   }
  // },

  components: {
    LayoutHeader,
    LayoutFooter
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/utils.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  .cover {
    @include position(absolute, 0, 0, 0, 0);
    background: #666;
    opacity: .1;  // 此处调节透明度，可达到调节背景图明暗的目的
    z-index: -1;
  }
}
</style>
