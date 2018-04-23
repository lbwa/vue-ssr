import Vue from 'vue'
import LayoutHeader from 'layout/LayoutHeader'
import { expect } from 'chai'

describe('LayoutHeader.vue', () => {
  it('渲染 header', () => {
    const Constructor = Vue.extend(LayoutHeader)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelector('h1').textContent)
      .to.contain('Todo List')
  })
})
