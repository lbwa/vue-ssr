<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <h2 class="login-title">
      <span>用户登录</span>
      <span class="error-msg" v-show="errorMsg">{{errorMsg}}</span>
    </h2>

    <input
      type="text"
      class="login-input"
      placeholder="用户名"
      v-model="username">

    <input
      type="password"
      class="login-input"
      placeholder="密码"
      v-model="password"
      autocomplete="new-password">

    <button class="login-btn">登录</button>
  </form>
</template>

<script>
export default {
  methods: {
    validate () {
      if (!this.username.trim()) {
        this.errorMsg = '请输入用户名'
        return false
      }
      if (!this.password.trim()) {
        this.errorMsg = '请输入密码'
        return false
      }

      this.errorMsg = ''
      return true
    },

    handleSubmit (evt) {
      if (this.validate()) {
        // user api

        this.username = ''
        this.password = ''
      }
    }
  },

  data () {
    return {
      errorMsg: '',
      username: '',
      password: ''
    }
  },

  metaInfo: {
    title: 'Login page'
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/utils.scss';

.login-form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  width: 350px;
  background-color: #ffffff;
  box-shadow: 0 0 5px #666;
  .login-title {
    text-align: left;
  }
  .error-msg {
    font-size: 14px;
    font-weight: normal;
    color: red;
  }
  .login-input {
    margin-bottom: 15px;
    line-height: 30px;
  }
  .login-btn {
    line-height: 30px;
    background-color: #0d60c7;
    border-color: #0d60c7;
    color: #ffffff;
    transition: background-color .3s;
    &:hover {
      background-color: #0a4997;
    }
  }
}
</style>
