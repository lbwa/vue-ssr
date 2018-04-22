// import Vue from 'vue'
import LayoutFooter from '@/components/LayoutFooter'
import { mount } from '@vue/test-utils'
import { expect } from 'chai'

// describe('LayoutFooter.vue', () => {
//   it('渲染 footer', () => {
//     const Constructor = Vue.extend(LayoutFooter)
//     const vm = new Constructor().$mount()

//     expect(vm.$el.querySelector('span').textContent)
//       .to.contain('Written by lbwa')
//   })
// })

describe('LayoutFooter.vue', () => {
  it('渲染 footer', () => {
    const wrapper = mount(LayoutFooter)
    const vm = wrapper.vm

    expect(vm.$el.querySelector('span').textContent)
      .to.contain('Written by lbwa')
  })
})
