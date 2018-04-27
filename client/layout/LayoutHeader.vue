<template>
  <header class="layout-header">
    <h1>Todo List</h1>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~scss/utils.scss';

.layout-header {
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
