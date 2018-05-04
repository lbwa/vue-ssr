<template>
  <div id="app">
    <div class="cover"></div><!-- 在 body 有背景图时，可调节背景图明暗的-->

    <div class="loading" v-show="loading">
      <Loading/>
    </div>

    <LayoutHeader/>

    <!-- 过渡模式: transition 组件默认进入和离开同时发生。mode 可选值为 in-out 或
    out-in，表示进入和离开的组件哪一个先开始动画过渡直至结束-->
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>

    <LayoutFooter/>

  </div>
</template>

<script>
import LayoutHeader from '@/layout/LayoutHeader'
import LayoutFooter from '@/layout/LayoutFooter'

import Loading from 'components/loading/loading'
import globalBus from '@/util/global-bus'

export default {
  name: 'App',

  data () {
    return {
      loading: false
    }
  },

  created () {
    // from store-without-vuex/mutations
    globalBus.$on('toggleLoading', status => {
      this.loading = status
    })
  },

  components: {
    LayoutHeader,
    LayoutFooter,
    Loading
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
  .loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .3);
  }
}
</style>
