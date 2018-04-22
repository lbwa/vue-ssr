import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import Layout from '@/components/Layout'

/**
 * 单元测试，侧重点在"单元"。在单元测试中更应该注重 单个 单文件组件的功能实现，而不是过
 * 多纠缠于组件之间的数据传递(这是端到端测试的内容，即 e2e)和组件中的功能实现过程。
 * 我们要在单元测试中的重点是，组件的渲染或功能的 结果，而不是过程!!
 */

// https://vue-test-utils.vuejs.org/zh-cn/guides/common-tips.html
// http://slides.com/mattoconnell/deck#/

describe('Layout.vue', () => {
  it('渲染主程序', () => {
    const wrapper = mount(Layout)

    expect(wrapper.find('section').exists()).to.equal(true)
    expect(wrapper.find('#cover').exists()).to.equal(true)
  })
})
