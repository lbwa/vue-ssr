<template>
  <div class="spinner">
    <div class="dot1"></div>
    <div class="dot2"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~scss/utils.scss';

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg)
  }
}

@keyframes loading-bounce {
  0%, 100% {
    transform: scale(0)
  }
  50% {
    transform: scale(1.0)
  }
}

.spinner {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center;
  animation: loading-rotate 2s infinite linear;
  .dot1, .dot2 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #333333;
    border-radius: 100%;
    animation: loading-bounce 2.0s infinite ease-in-out;
  }.dot2 {
    top: auto;
    bottom: 0;
    animation-delay: -1.0s;
  }
}
</style>
