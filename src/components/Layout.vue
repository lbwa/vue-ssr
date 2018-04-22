<template>
  <section>
    <div id="cover"></div> <!-- 在 body 有背景图时，可调节背景图明暗的-->
    <LayoutHeader/>
    <LayoutContent/>
    <LayoutFooter/>
  </section>
</template>

<script>
import LayoutHeader from './LayoutHeader'
import LayoutContent from './LayoutContent'
import LayoutFooter from './LayoutFooter'

export default {
  components: {
    LayoutHeader,
    LayoutContent,
    LayoutFooter
  }
}
</script>

<style lang="scss">
@import '../common/style/utils.scss';

#cover {
  @include position(absolute, 0, 0, 0, 0);
  background: #808080;
  opacity: .1;  // 此处调节透明度，可达到调节背景图明暗的目的
  z-index: -1;
}
</style>
