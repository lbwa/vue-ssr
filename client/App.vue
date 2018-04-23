<template>
  <div id="app">
    <div class="cover"></div> <!-- 在 body 有背景图时，可调节背景图明暗的-->
    <LayoutHeader/>
    <ContentMain/>
    <LayoutFooter/>
  </div>
</template>

<script>
import LayoutHeader from '@/layout/LayoutHeader'
import LayoutFooter from '@/layout/LayoutFooter'
import ContentMain from '@/views/todo/ContentMain'

export default {
  name: 'App',

  components: {
    LayoutHeader,
    ContentMain,
    LayoutFooter
  }
}
</script>

<style lang="scss">
@import '~scss/utils.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.cover {
  @include position(absolute, 0, 0, 0, 0);
  background: #808080;
  opacity: .1;  // 此处调节透明度，可达到调节背景图明暗的目的
  z-index: -1;
}
</style>
