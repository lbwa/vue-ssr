import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import MainHelper from 'todo/MainHelper'

describe('MainHelper.vue', () => {
  it('应该渲染 MainHelper', () => {
    const wrapper = mount(MainHelper, {
      propsData: {
        selected: 'all',
        remainder: 1,
        showCompletedText: 'Clear Completed' // 按钮文字
      }
    })

    expect(wrapper.find('.helper').exists()).to.equal(true)
    expect(wrapper.find('.helper-left').exists()).to.equal(true)
    expect(wrapper.find('.helper-buttons').exists()).to.equal(true)
    expect(wrapper.find('.clear').exists()).to.equal(true)
  })

  it('应该在切换 tab 后渲染 MainHelper - toggleSelect', () => {
    const wrapper = mount(MainHelper, {
      propsData: {
        selected: 'all',
        remainder: 1,
        showCompletedText: 'Clear Completed'
      }
    })
    const button = wrapper.find('.active')

    // event
    button.trigger('click')

    /**
     * wrapper.emitted() 返回如下对象:
     * { 事件名: [[第一次派发事件的载荷], [第二次派发事件的载荷], ...]}
     * 无载荷时，返回空数组
     */

    /**
     * 1. 触发监听函数 toggleSelect() ==> 其中，this.$emit('userSelect', status)
     * 2. 检测数组长度，而不是内容，有更好的普适性
     * 3. wrapper.emitted().userSelect === [[ 'active' ]]
     */
    expect(wrapper.emitted().userSelect[0].length).to.equal(1)
  })

  it('应该剔除标记为 completed 项 - clearAllCompleted', () => {
    const wrapper = mount(MainHelper, {
      propsData: {
        selected: 'all',
        remainder: 1,
        showCompletedText: 'Clear Completed'
      }
    })
    const button = wrapper.find('.clear')

    button.trigger('click')

    /**
     * 无载荷向父组件派发事件
     * wrapper.emitted().clearCompleted === [[]]
     */
    expect(wrapper.emitted().clearCompleted[0].length).to.equal(0)

    // 若派发事件时，添加载荷则继续以下检测
    // expect(wrapper.emitted().clearCompleted[0].length).to.equal(1)
  })
})
