<template>
  <div id="layout-header">
    <h1>Personal List</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '../common/style/utils.scss';

#layout-header {
  color: $color-full;
  h1 {
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, .5);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }
}
</style>
