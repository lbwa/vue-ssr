import { expect } from 'chai'
import VueRouter from 'vue-router'
import { mount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/login/Login'
import routes from '@/config/routes'

describe('routes.js', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)

  const router = new VueRouter({
    routes
  })

  const wrapper = mount(Login, {
    localVue,
    router
  })
  it("应该跳转 '/login'", () => {
    expect(wrapper.vm.$route.fullPath).to.equal('/login')
  })
  it("应该跳转 '/app'", () => {
    let string = null
    window.console.log = (params) => {
      string = params
    }

    wrapper.vm.$router.push({ path: '/app' })
    expect(string).to.equal('%c App route before enter', 'color: dodgerblue')
  })
})
